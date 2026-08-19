import fs from "node:fs";
import type { ProcessStatus, FileDescription } from "../types/process.js";


export function     getStatus(pid: number): ProcessStatus {
    const readfile: string = fs.readFileSync(`/proc/${pid}/status`, "utf-8");
    const lines = readfile.split("\n");
    let pname: string | undefined, processid, ppid, memoryKb, threads, state;
    for (const line of lines) {
        const [key, value]: string[] = line.split(":");
        if (!key || !value) continue;
        if (key === "Name") {
            pname = value?.trim();
        } else if (key === "Pid") {
            processid = Number(value?.trim());
        } else if (key === "PPid") {
            ppid = Number(value?.trim());
        } else if (key === "VmRSS") {
            memoryKb = Number(value?.trim().split(/\s+/)[0]);
        } else if (key === "Threads") {
            threads = Number(value.trim());
        } else if (key === "State") {
            state = value.trim();
        }
    }

    return {

        processName: pname,
        pid: processid,
        ppid: ppid,
        VmRSS: memoryKb,
        Threads: threads,
        state: state
    }
}