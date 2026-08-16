import fs from "node:fs";


const readdir: string[] = fs.readdirSync("/proc");
const command = process.argv[2];
const PID: string[] = readdir.filter((id) => /^\d+$/.test(id));
interface ProcessStatus {
    processName: string | undefined;
    pid: number | undefined;
    ppid: number | undefined;
    VmRSS: number | undefined;
    Threads: number | undefined;
}

interface ProcessInfo {
    status: ProcessStatus;
    command: string[];
    filedescription: FileDescription[];
}

interface FileDescription {
    fd: number;
    target: string;
}

function getStatus(pid: number): ProcessStatus {
    const readfile: string = fs.readFileSync(`/proc/${pid}/status`, "utf-8");
    const lines = readfile.split("\n");
    let pname: string | undefined, processid, ppid, memoryKb, threads;
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
            memoryKb = Number(value?.split(/\s+/)[0]);
        } else if (key === "Threads") {
            threads = Number(value.trim());
        }
    }

    return {

        processName: pname,
        pid: processid,
        ppid: ppid,
        VmRSS: memoryKb,
        Threads: threads
    }
}


function getCommand(pid: number) {
    const readfile: string = fs.readFileSync(`/proc/${pid}/cmdline`, "utf-8");
    return readfile.split("\0").filter(Boolean);
}

function getFileDescription(pid: number): FileDescription[] {
    const readfile: string[] = fs.readdirSync(`/proc/${pid}/fd`, "utf-8");
    const result: FileDescription[] = [];
    for (const file of readfile) {
        const target = fs.readlinkSync(`/proc/${pid}/fd/${file}`)

        result.push({
            fd: Number(file),
            target: target
        })
    }

    return result;
}

function getProcessInfo(pid: number): ProcessInfo {

    const process = getStatus(Number(pid));
    const command = getCommand(pid);
    const filedesc = getFileDescription(pid);

    return {
        status: process,
        command: command,
        filedescription: filedesc
    }
}


if (command) {
    const processInfo = getProcessInfo(Number(command));
    console.log(processInfo);
} else {
    console.log("Invalid Format");
}
