import fs from "node:fs"
import { getStatus } from "../proc/status.js"

export function listcommmand() {
    const readdir: string[] = fs.readdirSync("/proc");
    const PID: string[] = readdir.filter((id) => /^\d+$/.test(id));
    console.log(
                "-------------------------------------------","\n",
                "PID".padEnd(8)+
                "PPID".padEnd(8)+
                "Name".padEnd(20)+
                "Memory(kB)",  "\n" ,
                 "-------------------------------------------"
            )
        for (const entries of PID) {
        let processinfo;
    
        try {
    
            processinfo = getStatus(Number(entries));
    
            console.log(
                String(processinfo.pid).padEnd(8) +
                String(processinfo.ppid).padEnd(8) +
                String(processinfo.processName).padEnd(20) +
                String(processinfo.VmRSS)
    
            );
        } catch (err) {
            console.log("Process Does not Exist !!\n", {
                "Process ID": entries,
            });
        }
        };
}
