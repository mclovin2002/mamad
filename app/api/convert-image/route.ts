import { NextResponse } from 'next/server';
import { convertHeicToJpeg } from '@/app/utils/imageConversion';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    const inputPath = path.join(process.cwd(), 'public', 'team', filename);
    const jpegBuffer = await convertHeicToJpeg(inputPath);
    
    return new NextResponse(jpegBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
} 