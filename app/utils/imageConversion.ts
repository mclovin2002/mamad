import sharp from 'sharp';
import { promises as fs } from 'fs';

export async function convertHeicToJpeg(inputPath: string): Promise<Buffer> {
  try {
    // Read the input file
    const inputBuffer = await fs.readFile(inputPath);
    
    // Convert HEIC to JPEG using sharp
    const outputBuffer = await sharp(inputBuffer)
      .jpeg({
        quality: 90,
        mozjpeg: true,
      })
      .toBuffer();

    return outputBuffer;
  } catch (error) {
    console.error('Error converting image:', error);
    throw new Error('Failed to convert image');
  }
} 