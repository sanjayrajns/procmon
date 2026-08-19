import fs from "node:fs";

export function getCommand(pid: number) {
    const readfile: string = fs.readFileSync(`/proc/${pid}/cmdline`, "utf-8");
    return readfile.split("\0").filter(Boolean);
}