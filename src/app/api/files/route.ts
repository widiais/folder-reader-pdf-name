import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface ReportItem {
  name: string;
  path: string;
  type: 'quiz' | 'test';
  size?: number;
}

export async function GET(request: NextRequest) {
  try {
    const reports: ReportItem[] = [];

    // Path to the parent directory containing the report folders
    const basePath = path.join(process.cwd(), '../../../');

    try {
      // Read quiz reports
      const quizPath = path.join(basePath, 'Rekap Ganesa 20250705 (quiz.ganesa.id)');
      try {
        const quizFiles = await fs.readdir(quizPath);
        for (const file of quizFiles) {
          if (file.endsWith('.pdf')) {
            const filePath = path.join(quizPath, file);
            const stats = await fs.stat(filePath);
            reports.push({
              name: file,
              path: `/api/files/${encodeURIComponent(file)}`,
              type: 'quiz',
              size: stats.size
            });
          }
        }
      } catch (error) {
        console.log('Quiz directory not found or accessible');
      }

      // Read test reports
      const testPath = path.join(basePath, 'Rekap Ganesa 20250705 (test.ganesa.id)');
      try {
        const testFiles = await fs.readdir(testPath);
        for (const file of testFiles) {
          if (file.endsWith('.pdf')) {
            const filePath = path.join(testPath, file);
            const stats = await fs.stat(filePath);
            reports.push({
              name: file,
              path: `/api/files/${encodeURIComponent(file)}`,
              type: 'test',
              size: stats.size
            });
          }
        }
      } catch (error) {
        console.log('Test directory not found or accessible');
      }
    } catch (error) {
      console.error('Error reading reports:', error);
    }

    return NextResponse.json({
      success: true,
      data: reports.sort((a, b) => a.name.localeCompare(b.name))
    });

  } catch (error) {
    console.error('Error in files API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
