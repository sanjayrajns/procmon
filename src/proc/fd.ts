import fs from "node:fs";

import type { FileDescription } from "../types/process.js";



export function getFileDescription(pid: number): FileDescription[] {
    const readfile: string[] = fs.readdirSync(`/proc/${pid}/fd`, "utf-8");
    const result: FileDescription[] = [];
    for (const file of readfile) {
        try {
        const target = fs.readlinkSync(`/proc/${pid}/fd/${file}`)

            result.push({
                fd: Number(file),
                target: target
            })
        }catch(err:any){
             if (err.code === "ENOENT"){
                continue;
            }
            throw err;
        }
            
        }    

    return result;
}