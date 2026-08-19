#!/usr/bin/env node
import { listcommmand } from "./cli/list.js";
import { infocommand } from "./cli/info.js";
import { statcommand } from "./cli/stat.js";

const command = process.argv[2];
const pid = Number(process.argv[3]);

switch(command) {
    case "list":
        listcommmand();
        break;
    case "info":
        infocommand(pid);
        break;
    case "stat":
        statcommand(pid);
        break;
    default:
        console.log(
            `Usage:
                procmon list
                procmon info <pid>
                procmon stat <pid>
            `
        );
}