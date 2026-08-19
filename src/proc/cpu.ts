import fs from "node:fs";
import type { cpuutil } from "../types/process.js";

export function cpuUtils(pid:number) :cpuutil {
    const readfile = fs.readFileSync(`/proc/${pid}/stat`,"utf-8");
    const cpuArray = readfile.split(" ");
    const utime = Number(cpuArray[14]);
    const stime = Number(cpuArray[15]);
    const clocktime = Number(cpuArray[22    ]);
    return {
        utime : utime,
        stime : stime,
        clocktime : clocktime
    }

}