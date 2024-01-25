import * as child from "child_process";
import { existsSync } from "fs";
import { ObjectsUtil } from "./objects.util";
import { Configuration, Stats } from "./types";

export class Service {
    public assertGitInstalled(): void {
        const data = child.execSync("git --version");
        const serialized = data.toString().toLowerCase();
        if (!serialized.startsWith("git version")) {
            throw new Error("Git must be installed");
        }
    }

    public buildFromEnv(): Configuration {
        const baseDir = process.env.BASE_DIR;

        if (!baseDir) {
            throw new Error("base dir not valid");
        }

        const projectNames = process.env.PROJECT_SUBFOLDERS;
        const repos = projectNames?.split(",");

        if (!repos) {
            throw new Error("repos not valid");
        }

        return { baseDir, repos };
    }

    public generateStats(conf: Configuration): Stats[] {
        const statsRecord: Record<string, number> = {};
        for (const cur of conf.repos) {
            const cwd = `${conf.baseDir}/${cur.trim()}`;
            if (!existsSync(cwd)) {
                console.error(`${cwd} does not exist... continue`);
                continue;
            }

            try {
                const res = child.execSync("git shortlog -sn --all", {
                    cwd: cwd
                });
                const resStr = res.toString();

                const parts = resStr.split("\n");
                for (const part of parts) {
                    const valueName = part.trim().split("\t"); //stats + name

                    let uniqueKey = valueName[1];
                    if (process.env.NORMALIZE === "true" && valueName[1]) {
                        uniqueKey = valueName[1]
                            .split("@")[0]
                            .toLowerCase()
                            .replaceAll(" ", "")
                            .replaceAll(".", "");
                    }

                    if (statsRecord[uniqueKey] == null) {
                        statsRecord[uniqueKey] = 0;
                    }
                    statsRecord[uniqueKey] += Number(valueName[0]);
                }
            } catch (error) {
                console.error(`Error examining ${cwd}. Is this a git repo?`);
            }
        }

        return ObjectsUtil.sort(statsRecord, "desc").filter(
            (x) => x.name !== "undefined"
        );
    }
}
