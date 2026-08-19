export interface ProcessStatus {
    processName: string | undefined;
    pid: number | undefined;
    ppid: number | undefined;
    state:string | undefined;
    VmRSS: number | undefined;
    Threads: number | undefined;
}

export interface ProcessInfo {
    status: ProcessStatus;
    command: string[];
    filedescription: FileDescription[];
    fileaccesibility:boolean|undefined;
}

export  interface FileDescription {
    fd: number;
    target: string;
}
export interface cpuutil {
    stime:number;
    utime:number;
    clocktime:number;
}