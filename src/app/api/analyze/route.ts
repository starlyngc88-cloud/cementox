import { NextResponse } from "next/server";
import { validateUpload } from "@/lib/media-validation";
import { analyzeEngine } from "@/lib/analysis/engine";
import type { AnalyzeResponse } from "@shared/index";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  const subjectValue = form.get("subject");
  const subject = typeof subjectValue === "string" ? subjectValue : "concreto";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta el archivo en el formulario." }, { status: 400 });
  }

  const validation = validateUpload(file.type, file.size);
  if (!validation.ok || !validation.kind) {
    return NextResponse.json({ error: validation.errors.join(" ") }, { status: 422 });
  }

  const result = analyzeEngine(`${file.name}:${file.size}:${file.type}`, validation.kind, subject);
  const body: AnalyzeResponse = { result };
  return NextResponse.json(body);
}