import { getConfig } from "@/lib/config";
import type { AnalysisResult, ColorToken, EvidenceIssue, MeasurementConfig } from "@shared/index";

type Scenario = "completed" | "warning" | "error";

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 1_000_003;
  }
  return hash;
}

function pickScenario(seed: number): Scenario {
  const bucket = seed % 10;
  if (bucket < 6) return "completed";
  if (bucket < 9) return "warning";
  return "error";
}

function classify(
  value: number,
  consistencyRanges: MeasurementConfig["consistencyRanges"],
): { label: string | null; color: ColorToken } {
  const range = consistencyRanges.find((r) => value >= r.min && value < r.max);
  if (!range) {
    return { label: null, color: "neutral" };
  }
  return { label: range.label, color: range.color };
}

export function analyzeEngine(seedSource: string): AnalysisResult {
  const config = getConfig();
  const { measurement, media } = config;
  const thresholds = measurement.confidenceThresholds;
  const scenario = pickScenario(stableHash(seedSource));
  const baseMessage = (status: keyof typeof media.statuses) => media.statuses[status].label;
  const factor = measurement.conversions[measurement.outputUnit];
  const toOutputValue = (rawValue: number) => Math.round(rawValue * factor * 10) / 10;

  if (scenario === "error") {
    const reason = "low_sharpness" as const;
    const issues: EvidenceIssue[] = [
      { reason, message: measurement.messages.reasons[reason] },
    ];
    return {
      status: "error",
      color: "error",
      estimatedValue: null,
      unit: null,
      confidence: null,
      consistencyLabel: null,
      preliminary: false,
      message: measurement.messages.notConclusive,
      issues,
    };
  }

  const span = Math.max(
    1,
    measurement.consistencyRanges[measurement.consistencyRanges.length - 1].max,
  );
  const rawValue = ((stableHash(seedSource) % 1000) / 1000) * span;
  const value = toOutputValue(rawValue);

  if (scenario === "warning") {
    const reason = "reference_missing" as const;
    return {
      status: "warning",
      color: "warning",
      estimatedValue: value,
      unit: measurement.outputUnit,
      confidence: Math.round((thresholds.warning + thresholds.success) / 2),
      consistencyLabel: classify(rawValue, measurement.consistencyRanges).label,
      preliminary: true,
      message: baseMessage("warning"),
      issues: [{ reason, message: measurement.messages.reasons[reason] }],
    };
  }

  const consistency = classify(rawValue, measurement.consistencyRanges);
  return {
    status: "completed",
    color: thresholds.success > 0 ? consistency.color : "success",
    estimatedValue: value,
    unit: measurement.outputUnit,
    confidence: Math.max(thresholds.success, Math.round((thresholds.success + 100) / 2)),
    consistencyLabel: consistency.label,
    preliminary: true,
    message: measurement.messages.preliminary,
    issues: [],
  };
}