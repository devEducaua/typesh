import { promises as fs } from "node:fs";

async function parseConfig(filename: string) {
    const text = await fs.readFile(filename, "utf8");
    const lines = text.split("\n");

    const cmds = lines
        .map(l => l.slice(l.indexOf(" ")))
        .map(l => l.trim())
        .filter(Boolean);

    const aliases = lines
        .map(l => l.slice(0, l.indexOf(":")))
        .map(l => l.trim())
        .filter(Boolean);

    return [aliases, cmds];
}

const [aliases, cmds] = await parseConfig("config");

console.log(aliases);
console.log(cmds);
