import * as fs from 'fs';
import * as path from 'path';

export function createUploadPath(): string {
  const uploadDir = path.join(process.cwd(), 'upload', 'qrcodes');
  fs.mkdirSync(uploadDir, { recursive: true });
  return uploadDir;
}

export function saveFile(folder: string, fileName: string, buffer: Buffer): string {
  const filePath = path.join(folder, fileName);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}