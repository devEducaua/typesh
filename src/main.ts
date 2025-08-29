import { cwd } from "node:process";
import { exec } from "node:child_process";
import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function readCmd(cmd: string) {
    return new Promise(resolve => {
        rl.question(cmd, result => resolve(result));
    })
}

function execCmd(result: any) {
     exec(result, (error, stdout, stderr) => {
        if (error) {
            console.error(`ERROR: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`STDERR: ${stderr}`);
            return;
        }

        console.log(`${stdout}`);
        return;
    })   
}

async function main() {
    
    let quit: boolean = false;

    while(!quit) {
        const result = await readCmd(`${cwd()} $ `);

        switch(result) {
            case "exit":
                quit = true;
                break;
            default:
                execCmd(result);
                break;
        }
    }

    rl.close();
    process.exit(0);
}

main();
