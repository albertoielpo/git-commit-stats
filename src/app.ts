import { Service } from "./service";

// init env file
require("dotenv").config({ path: `${process.cwd()}/env/local.env` });

// main function
(() => {
    const service = new Service();

    // git must be installed
    service.assertGitInstalled();

    const conf = service.buildFromEnv();
    const stats = service.generateStats(conf);

    console.log(stats);
})();
