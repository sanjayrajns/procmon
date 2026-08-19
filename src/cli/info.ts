import { getProcessInfo } from "../proc/proc.js";

export function infocommand(pid:number){
        const processInfo = getProcessInfo(Number(pid));
        console.log("\n",
            "Process Information","\n",
            "--------------------------------------------","\n",
            "PID:              ",  processInfo.status.pid, "\n",
            "Name:             ",  processInfo.status.processName,"\n",        
            "Parent PID:       ",  processInfo.status.ppid,      "\n",  
            "State:            ",  processInfo.status.state,"\n",
            "\n" , "\n",
            "Memory ", "\n", "     VmRSS:       ",  processInfo.status.VmRSS, " kB",
            "\n", "\n", "\n",
            "Threads:           ", processInfo.status.Threads,
            "\n","\n", 
            "Command:" , "\n", "   " , processInfo.command,"\n","\n",
        ) 
        
        if(processInfo.fileaccesibility){
            console.log("File Descriptors: " , "\n")
            for(const file of processInfo.filedescription){
                console.log(file.fd, "---->" , file.target  )
            }
        }else {
            console.log("File Descriptors " , "\n" , "Permission denied PID : " , processInfo.status.pid);
        }
}