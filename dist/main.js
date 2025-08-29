import { cwd } from "node:process";
import { exec } from "node:child_process";
import readline from "node:readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function updatePrompt() {
    rl.setPrompt(`[${cwd()}]$ `);
    rl.prompt();
}
function execCmd(result) {
    exec(result, (error, stdout, stderr) => {
        if (error) {
            console.error(`ERROR: ${error.message}`);
        }
        else if (stderr) {
            console.error(`STDERR: ${stderr}`);
        }
        else {
            console.log(stdout);
        }
        updatePrompt();
    });
}
rl.on("line", (line) => {
    const cmd = line.trim();
    switch (cmd) {
        case "exit":
            rl.close();
            process.exit(0);
            break;
        default:
            if (cmd != "") {
                execCmd(cmd);
            }
            break;
    }
});
updatePrompt();
