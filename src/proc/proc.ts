

import { getStatus } from "./status.js";
import { getCommand } from "./command.js";
import { getFileDescription } from "./fd.js";
import type { ProcessInfo,FileDescription  } from "../types/process.js";


export function getProcessInfo(pid: number): ProcessInfo {

    const process = getStatus(Number(pid));
    const command = getCommand(pid);
    let filedesc:FileDescription[] = [];  
    let fileaccess = true;
    try{
        filedesc = getFileDescription(pid);
    } catch (err:any) {
        if(err.code != "EACCES") {
            fileaccess = false;
        }
    } 
        return {
        status: process,
        command: command,
        filedescription: filedesc,
        fileaccesibility:fileaccess
    }
}