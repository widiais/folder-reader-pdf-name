import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const encodedFilename = params.filename;
    const filename = decodeURIComponent(encodedFilename);

    // Validate filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Path to the parent directory containing the report folders
    const basePath = path.join(process.cwd(), '../../../');

    // Check both directories for the file
    const quizPath = path.join(basePath, 'Rekap Ganesa 20250705 (quiz.ganesa.id)', filename);
    const testPath = path.join(basePath, 'Rekap Ganesa 20250705 (test.ganesa.id)', filename);

    let filePath = '';

    try {
      await fs.access(quizPath);
      filePath = quizPath;
    } catch {
      try {
        await fs.access(testPath);
        filePath = testPath;
      } catch {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);

    // Return the PDF file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
