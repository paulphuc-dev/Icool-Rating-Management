import * as path from 'path';
import * as QRCode from 'qrcode';
import { saveFile } from './file.util';

export async function generateQRCode(
  baseUrl: string,
  uploadPath: string,
  id: string,
  name: string,
): Promise<string> {
  const qrData = `${baseUrl}?id=${id}`;

  const buffer = await QRCode.toBuffer(qrData, {
    color: { dark: '#0000', light: '#fff' },
    width: 300,
  });

  const fileName = `region-${name}.png`;
  const filePath = saveFile(uploadPath, fileName, buffer);

  const relativePath = path
    .relative(process.cwd(), filePath)
    .replace(/\\/g, '/');

  return relativePath;
}
