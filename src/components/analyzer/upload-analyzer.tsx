"use client";

import { useRef, useState } from "react";
import { checkUpload, type AnalysisResult, type AnalysisStatus } from "@shared/index";
import type { UploadLimits } from "@shared/index";
import { requestAnalysis } from "@/components/services/analyze-client";
import { ResultCard } from "./result-card";
import { StatusBadge } from "./status-badge";

export interface UploadAnalyzerProps {
  limits: UploadLimits;
  progressMs: { uploadingMs: number; analyzingMs: number };
  statusLabels: Record<AnalysisStatus, string>;
  preliminaryLabel: string;
  testTypeLabel: string;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function UploadAnalyzer(props: UploadAnalyzerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function reset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    setResult(null);
    setError(null);
    setStatus(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function run(selected: File) {
    const check = checkUpload(selected.type, selected.size, props.limits);
    if (!check.ok) {
      setError(check.errors.join(" "));
      setResult(null);
      setStatus("error");
      return;
    }

    setError(null);
    setResult(null);
    setBusy(true);
    setStatus("uploading");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(selected));
    setFile(selected);

    await wait(props.progressMs.uploadingMs);
    setStatus("analyzing");
    await wait(props.progressMs.analyzingMs);

    const analysis = await requestAnalysis(selected, props.statusLabels.error);
    setResult(analysis);
    setStatus(analysis.status);
    setBusy(false);
  }

  const statusLabel = status ? props.statusLabels[status] : null;
  const statusColor =
    status === "completed"
      ? "success"
      : status === "warning"
        ? "warning"
        : status === "error"
          ? "error"
          : "info";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-info">Cementox</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Análisis de asentamiento de concreto
        </h1>
        <p className="text-sm text-slate-600">
          Ensayo configurado: <strong>{props.testTypeLabel}</strong>. Adjunta una foto o un video y el
          sistema lo analiza automáticamente.
        </p>
      </header>

      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm backdrop-blur sm:p-10">
        <input
          ref={inputRef}
          type="file"
          accept={[...props.limits.allowedImageTypes, ...props.limits.allowedVideoTypes].join(",")}
          className="mx-auto block w-full cursor-pointer text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-info file:px-5 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-info/90"
          onChange={(event) => {
            const selected = event.target.files?.[0];
            if (selected) void run(selected);
          }}
        />
        <p className="mt-4 text-sm text-slate-500">
          Formatos permitidos y peso máximo definidos en <code>config/media.json</code>.
        </p>
      </div>

      {statusLabel ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <StatusBadge color={statusColor} label={statusLabel} />
          {busy ? (
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={reset}
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={reset}
            >
              Limpiar
            </button>
          )}
        </div>
      ) : null}

      {file && previewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {file.type.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt={file.name} className="max-h-96 w-full object-contain" />
          ) : (
            <video src={previewUrl} controls className="max-h-96 w-full" />
          )}
          <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
            {file.name} - {Math.round(file.size / 1024)} KB
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">{error}</p>
      ) : null}

      {result ? (
        <ResultCard
          result={result}
          statusLabel={props.statusLabels[result.status]}
          preliminaryLabel={props.preliminaryLabel}
        />
      ) : null}
    </div>
  );
}