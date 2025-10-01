import { Header } from "@/components/Header";
import VerificationCard from "@/components/sourceverification/verification-card";
import AnalysisDetails from "@/components/sourceverification/analysis-details";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";
import type { NewsAnalysisResponse } from "@/models/api/news";
import { useLocation } from "react-router-dom";
import useAnalysisStore from "@/store";

export default function Home() {
  const store = useAnalysisStore();
  const analysis = store.analysis.source_verification;

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              data-testid="page-title"
            >
              Source Verification Results
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Analysis for:{" "}
              <span
                className="font-medium text-foreground break-all"
                data-testid="analysis-url"
              >
                {analysis?.url}
              </span>
            </p>
          </div>

          <VerificationCard overall={analysis?.overall} />
          <AnalysisDetails analysis={analysis} />

          <div className="mt-12">
            <Stepper currentPage="SOURCE_VERIFICATION" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
