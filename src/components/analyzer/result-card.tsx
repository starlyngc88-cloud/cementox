import type { AnalysisResult } from "@shared/index";
import { StatusBadge } from "./status-badge";

interface ResultCardProps {
  result: AnalysisResult;
  statusLabel: string;
  preliminaryLabel: string;
}

export function ResultCard({ result, statusLabel, preliminaryLabel }: ResultCardProps) {
  const hasValue = result.estimatedValue !== null && result.unit !== null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between gap-3">
        <StatusBadge color={result.color} label={statusLabel} />
        {result.confidence !== null ? (
          <span className="text-sm text-slate-500">Confianza {result.confidence}%</span>
        ) : null}
      </header>

      {hasValue ? (
        <p className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
          {result.estimatedValue}
          <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-base font-semibold text-slate-600">
            {result.unit}
          </span>
        </p>
      ) : (
        <p className="mt-6 text-lg text-slate-500">Sin medida estimada</p>
      )}

      {result.consistencyLabel ? (
        <p className="mt-2 text-sm text-slate-600">Consistencia: {result.consistencyLabel}</p>
      ) : null}

      {result.formula ? (
        <p className="mt-3 text-xs text-slate-500">
          Formula: <span className="font-mono">{result.formula}</span>
        </p>
      ) : null}
      {result.formulaBasis ? (
        <p className="mt-1 text-xs text-slate-500">Base: {result.formulaBasis}</p>
      ) : null}
      {result.requiredAngles && result.requiredAngles.length > 0 ? (
        <p className="mt-2 text-xs text-slate-500">Angulos requeridos: {result.requiredAngles.join(", ")}</p>
      ) : null}

      <p className="mt-3 text-sm text-slate-700">{result.message}</p>

      {result.preliminary ? (
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{preliminaryLabel}</p>
      ) : null}

      {result.issues.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-warning">
          {result.issues.map((issue) => (
            <li key={issue.reason}>- {issue.message}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}