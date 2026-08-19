import { cpuUtils } from "../proc/cpu.js";
import { getStatus } from "../proc/status.js";
export function statcommand(pid:number) {
    const status = getStatus(Number(pid))
    const first = cpuUtils(Number(pid));

    setTimeout(() => {
        const second = cpuUtils(Number(pid));

        const deltautime =  second.utime - first.utime;
        const deltastime =  second.stime - first.stime;
        const cputick = deltautime+deltastime;
        console.log("CPUTICK : ", cputick);
        const cputime = cputick/100;
        console.log("CPUTime : " , cputime)
        const elapsedseconds = 4 
        const cpuEfficiency:number = (cputime/elapsedseconds) * 100 ;
        console.log("CPU Efficiency: " , cpuEfficiency, "%") 

    } , 4000)   
}