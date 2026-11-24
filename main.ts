import * as fs from "node:fs";
import * as path from "node:path";

// One Word for the Boss: a single word that has to land on its own.
// The boss this word describes sprays blame in every direction, the way
// a flamethrower sprays fire — never his fault, always someone else's.
const BOSS_WORD = "Blamethrower";

const ENTRY_FILENAME = "entry.txt";
const DEFAULT_OUTPUT_DIR = "/output";

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
}

function pickWord(): string {
  const word = BOSS_WORD.trim();
  if (!/^[A-Za-z]{1,30}$/.test(word)) {
    throw new Error("entry word must be one alphabetic word of 1-30 letters");
  }
  return word;
}

function emptyDirectory(dir: string): void {
  for (const name of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

function run(): void {
  const dir = resolveOutputDir();
  fs.mkdirSync(dir, { recursive: true });
  emptyDirectory(dir);
  fs.writeFileSync(path.join(dir, ENTRY_FILENAME), pickWord() + "\n", "utf8");
}

run();
