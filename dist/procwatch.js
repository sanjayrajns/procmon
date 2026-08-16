import { profileEnd } from "node:console";
import { privateDecrypt } from "node:crypto";
import fs, { read, readlinkSync } from "node:fs";
const readdir = fs.readdirSync("/proc");
const command = process.argv[2];
const PID = readdir.filter((id) => /^\d+$/.test(id));
function getStatus(pid) {
    const readfile = fs.readFileSync(`/proc/${pid}/status`, "utf-8");
    const lines = readfile.split("\n");
    let pname, processid, ppid, memoryKb, threads;
    for (const line of lines) {
        const [key, value] = line.split(":");
        if (!key || !value)
            continue;
        if (key === "Name") {
            pname = value?.trim();
        }
        else if (key === "Pid") {
            processid = Number(value?.trim());
        }
        else if (key === "PPid") {
            ppid = Number(value?.trim());
        }
        else if (key === "VmRSS") {
            memoryKb = Number(value?.split(/\s+/)[0]);
        }
        else if (key === "Threads") {
            threads = Number(value.trim());
        }
    }
    return {
        processName: pname,
        pid: processid,
        ppid: ppid,
        VmRSS: memoryKb,
        Threads: threads
    };
}
function getCommand(pid) {
    const readfile = fs.readFileSync(`/proc/${pid}/cmdline`, "utf-8");
    return readfile.split("\0").filter(Boolean);
}
function getFileDescription(pid) {
    const readfile = fs.readdirSync(`/proc/${pid}/fd`, "utf-8");
    // console.log(readfile)  ;
    const result = [];
    for (const file of readfile) {
        const target = readlinkSync(`/proc/${pid}/fd/${file}`);
        result.push({
            fd: Number(file),
            target: target
        });
    }
    return result;
}
function getProcessInfo(pid) {
    const process = getStatus(Number(pid));
    const command = getCommand(pid);
    const filedesc = getFileDescription(pid);
    // console.log(
    //     process.processName,
    //     process.pid,
    //     process.ppid,
    //     process.VmRSS,
    //     command,
    //     filedesc
    // )
    return {
        status: process,
        command: command,
        filedescription: filedesc
    };
}
if (command) {
    const processInfo = getProcessInfo(Number(command));
    console.log(processInfo);
}
else {
    console.log("Invalid Format");
}
//# sourceMappingURL=procwatch.js.map