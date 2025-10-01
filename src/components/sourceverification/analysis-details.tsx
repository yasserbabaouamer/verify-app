import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeAlert,
  ShieldX,
  Share,
  Verified,
  HelpCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { SourceVerificationResponse } from "@/models/api/news";
import { useState } from "react";

type AnalysisDetailsProps = {
  // Define any props if needed in the future
  analysis: SourceVerificationResponse;
};

type AnalysisFactor = {
  name: string;
  rating: "High" | "Moderate" | "Low";
  reason?: string;
};

export default function AnalysisDetails({ analysis }: AnalysisDetailsProps) {
  const analysisFactors: AnalysisFactor[] = [
    {
      name: "Reputation",
      rating:
        analysis.reputation.score > 60
          ? "High"
          : analysis.reputation.score > 30
          ? "Moderate"
          : "Low",
      reason: analysis.reputation.reason,
    },
    {
      name: "Transparency",
      rating:
        analysis.transparency.score > 60
          ? "High"
          : analysis.transparency.score > 30
          ? "Moderate"
          : "Low",
      reason: analysis.transparency.reason,
    },
    {
      name: "Factual Reporting History",
      rating:
        analysis.factual_reporting_history.score > 60
          ? "High"
          : analysis.factual_reporting_history.score > 30
          ? "Moderate"
          : "Low",
      reason: analysis.factual_reporting_history.reason,
    },
    {
      name: "Editorial Standards",
      rating:
        analysis.editorial_standards.score > 60
          ? "High"
          : analysis.editorial_standards.score > 30
          ? "Moderate"
          : "Low",
      reason: analysis.editorial_standards.reason,
    },
  ];

  const [activeId, setActiveId] = useState<number>(-1);

  const renderBadge = (rating: "High" | "Moderate" | "Low") => {
    switch (rating) {
      case "High":
        return (
          <Verified className="text-green-500 dark:text-green-400" size={20} />
        );
      case "Moderate":
        return (
          <BadgeAlert
            className="text-yellow-500 dark:text-yellow-400"
            size={20}
          />
        );
      case "Low":
        return <ShieldX className="text-red-600 dark:text-red-400" size={20} />;
      default:
        return (
          <HelpCircle className="text-gray-600 dark:text-gray-400" size={20} />
        );
    }
  };

  return (
    <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Analysis Details
      </h2>

      <div className="space-y-6">
        {analysisFactors.map((factor, index) => (
          <div
            key={index}
            className="flex flex-col border-border last:border-b-0 last:pb-0"
            data-testid={`analysis-factor-${index}`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border last:border-b-0 last:pb-0">
              <div className="flex-1 text-muted-foreground font-medium">
                {factor.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {renderBadge(factor.rating)}
                  <p className="font-semibold text-foreground">
                    {factor.rating}
                  </p>
                </div>
                {activeId === index ? (
                  <ChevronUp
                    size={20}
                    className="h-7 w-7 p-1 cursor-pointer hover:shadow-lg hover:bg-gray-200 rounded-full"
                    onClick={() => setActiveId(-1)}
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="h-7 w-7 p-1 cursor-pointer hover:shadow-lg hover:bg-gray-200 rounded-full"
                    onClick={() => setActiveId(index)}
                  />
                )}
              </div>
            </div>
            {/* Collapsible content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden text-muted-foreground text-sm ${
                activeId === index ? "py-4" : "max-h-0"
              }`}
            >
              {factor.reason}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-start">

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
