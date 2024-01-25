import * as chalk from "chalk";
import { Service } from "./service";

/**
 * redirect console.warn and console.error to console.log colored with chalk
 */
console.warn = (data: unknown) => {
    console.log(chalk.yellow(data));
};
console.error = (data: unknown) => {
    console.log(chalk.red(data));
};

// init env file
require("dotenv").config({ path: `${process.cwd()}/env/local.env` });

// main function
(() => {
    try {
        const service = new Service();

        // git must be installed
        service.assertGitInstalled();

        const conf = service.buildFromEnv();
        const stats = service.generateStats(conf);

        console.log(stats);
    } catch (error) {
        console.error(error);
    }
})();
