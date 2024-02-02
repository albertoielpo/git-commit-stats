import * as chalk from "chalk";
import { Service } from "./service";

// redirect console.warn and console.error to console.log colored with chalk
console.warn = (data: unknown) => console.log(chalk.yellow(data));
console.error = (data: unknown) => console.log(chalk.red(data));

const appEnv = process.env.APP_ENV ?? "local";
require("dotenv").config({ path: `${process.cwd()}/env/${appEnv}.env` });

// main function
(() => {
    try {
        const service = new Service();
        const stats = service.generateStats();
        console.log(stats);
    } catch (error) {
        console.error(error);
    }
})();
