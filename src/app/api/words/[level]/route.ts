import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  
  try {
    const wordsDir = path.join(process.cwd(), 'src/data/words');
    
    if (!fs.existsSync(wordsDir)) {
      return NextResponse.json({ error: 'Words directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(wordsDir);
    const targetFile = files.find(f => f.startsWith(`level-${level}-`) && f.endsWith('.json'));

    if (targetFile) {
      const filePath = path.join(wordsDir, targetFile);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json(JSON.parse(fileContents));
    }
    
    return NextResponse.json({ error: 'Level data not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
