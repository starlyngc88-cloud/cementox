import { getConfig } from "@/lib/config";
import { UploadAnalyzer } from "@/components/analyzer/upload-analyzer";
import type { AnalysisStatus } from "@shared/index";

export default function HomePage() {
  const { media, measurement } = getConfig();

  const statusLabels = Object.fromEntries(
    Object.entries(media.statuses).map(([status, entry]) => [status, entry.label]),
  ) as Record<AnalysisStatus, string>;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <UploadAnalyzer
        limits={{
          allowedImageTypes: media.allowedImageTypes,
          allowedVideoTypes: media.allowedVideoTypes,
          maxImageBytes: media.maxImageBytes,
          maxVideoBytes: media.maxVideoBytes,
        }}
        progressMs={{ uploadingMs: media.progress.uploadingMs, analyzingMs: media.progress.analyzingMs }}
        statusLabels={statusLabels}
        preliminaryLabel={measurement.messages.preliminary}
        testTypeLabel={measurement.testType}
      />
    </main>
  );
}