import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function appendRecord<T>(fileName: string, record: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  let records: T[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    records = JSON.parse(raw);
  } catch {
    records = [];
  }
  records.push(record);
  await fs.writeFile(filePath, JSON.stringify(records, null, 2), "utf-8");
}

export async function readRecords<T>(fileName: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
