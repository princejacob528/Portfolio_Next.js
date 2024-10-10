import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  
  if (!file) {
    return NextResponse.json({ message: "No file found", success: false });
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  // Path for the CV folder and file
  const path = './public/Asset/CV/resume.pdf';

  // Writing the uploaded file to replace resume.pdf
  await writeFile(path, buffer);

  return NextResponse.json({ message: "Resume uploaded and replaced successfully", success: true });
}
