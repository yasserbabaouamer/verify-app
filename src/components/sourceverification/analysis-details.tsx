import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Share, Verified } from "lucide-react";
import type { SourceVerificationResponse } from "@/models/api/news";

type AnalysisDetailsProps = {
  // Define any props if needed in the future
  analysis: SourceVerificationResponse;
};
export default function AnalysisDetails({ analysis }: AnalysisDetailsProps) {
  const analysisFactors = [
    { name: "Reputation", rating: "Excellent" },
    { name: "Transparency", rating: "High" },
    { name: "Factual Reporting History", rating: "Consistent" },
    { name: "Editorial Standards", rating: "Professional" },
  ];

  return (
    <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Analysis Details
      </h2>

      <div className="space-y-6">
        {analysisFactors.map((factor, index) => (
          <div
            key={index}
            className="flex items-center justify-between pb-4 border-b border-border last:border-b-0 last:pb-0"
            data-testid={`analysis-factor-${index}`}
          >
            <p className="text-muted-foreground font-medium">{factor.name}</p>
            <div className="flex items-center gap-2">
              <Verified
                className="text-green-500 dark:text-green-400"
                size={20}
              />
              <p className="font-semibold text-foreground">{factor.rating}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-start">
        <Button
          className="flex items-center justify-center gap-2 rounded-full h-12 px-6 bg-foreground text-background text-sm font-bold hover:bg-foreground/90 transition-colors"
          data-testid="button-full-report"
        >
          <span>View Full Report</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 rounded-full h-12 px-6 text-sm font-bold"
          data-testid="button-share-report"
        >
          <Share className="h-4 w-4" />
          <span>Share Analysis</span>
        </Button>
      </div>
    </Card>
  );
}
