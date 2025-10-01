import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  FileText,
  Building,
  CheckCircle,
  ArrowRight,
  XCircle,
  BadgeAlert,
} from "lucide-react";

import { NewsPrediction } from "@/utils/enums";
import { useNavigate } from "react-router-dom";
import useAnalysisStore from "@/store";

export default function AnalysisDashboard() {
  const navigate = useNavigate();
  const store = useAnalysisStore();
  const analysis = store.analysis.content_analysis;

  const analysisCategories = [
    {
      icon: FileText,
      iconBg: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      title: "News Content",
      description: "Examines the claims, arguments, and evidence.",
      link: "/analysis/content",
    },
    {
      icon: Building,
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      title: "Source",
      description: "Assesses the credibility and reputation of the source.",
      link: "/analysis/source",
    },
    {
      icon: CheckCircle,
      iconBg: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      title: "Cross-Check & Fact-Check",
      description: "Compares info with multiple independent sources.",
      link: "/analysis/cross-check",
    },
  ];

  const renderBadge = () => {
    if (analysis.prediction === NewsPrediction.LIKELY_REAL) {
      return (
        <div className="relative flex size-48 items-center justify-center rounded-full border-4 border-green-200 dark:border-green-800 bg-card shadow-md">
          <ShieldCheck className="h-20 w-20 text-green-500 dark:text-green-400" />
        </div>
      );
    }
    if (analysis.prediction === NewsPrediction.LIKELY_FAKE) {
      return (
        <div className="relative flex size-48 items-center justify-center rounded-full border-4 border-red-200 dark:border-red-800 bg-card shadow-md">
          <XCircle className="h-20 w-20 text-red-500 dark:text-red-400" />
        </div>
      );
    }
    return (
      <div className="relative flex size-48 items-center justify-center rounded-full border-4 border-orange-200 dark:border-orange-800 bg-card shadow-md">
        <BadgeAlert className="h-20 w-20 text-orange-500 dark:text-orange-400" />
      </div>
    );
  };

  const renderConfidenceBadge = () => {
    if (analysis.prediction === NewsPrediction.LIKELY_REAL)
      return (
        <Badge className="rounded-full bg-green-100 dark:bg-green-900/20 px-4 py-1 text-sm font-medium text-green-700 dark:text-green-300">
          {analysis.confidence}% Confidence
        </Badge>
      );

    if (analysis.prediction === NewsPrediction.LIKELY_FAKE)
      return (
        <Badge className="rounded-full bg-red-100 dark:bg-red-900/20 px-4 py-1 text-sm font-medium text-red-700 dark:text-red-300">
          {analysis.confidence}% Confidence
        </Badge>
      );

    return (
      <Badge className="rounded-full bg-orange-100 dark:bg-orange-900/20 px-4 py-1 text-sm font-medium text-orange-700 dark:text-orange-300">
        {analysis.confidence}% Confidence
      </Badge>
    );
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <Header />

      <main className="flex-1 bg-background p-6 sm:p-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-foreground text-3xl sm:text-4xl font-bold leading-tight tracking-tighter"
            data-testid="page-title"
          >
            Analysis Dashboard
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base sm:text-lg">
            Below, you can explore the detailed breakdown of our verification
            process.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          {/* Main Confidence Card */}
          <Card className="rounded-3xl border shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                {renderConfidenceBadge()}
                <h2
                  className="mt-4 text-3xl sm:text-4xl font-bold text-foreground"
                  data-testid="confidence-rating"
                >
                  {analysis.prediction}
                </h2>
                <p
                  className="mt-2 text-base sm:text-lg text-muted-foreground"
                  data-testid="confidence-description"
                >
                  {analysis.description}
                </p>
              </div>

              <div className="relative flex h-64 items-center justify-center">
                <div className="absolute h-full w-full rounded-full bg-green-100 dark:bg-green-900/20 blur-3xl opacity-50"></div>
                {renderBadge()}
              </div>
            </div>
          </Card>

          {/* Analysis Categories */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {analysisCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={index}
                  className="flex flex-col items-center rounded-2xl p-6 text-center shadow-sm"
                >
                  <div
                    className={`flex size-16 items-center justify-center rounded-full ${category.iconBg}`}
                  >
                    <IconComponent
                      className={`h-8 w-8 ${category.iconColor}`}
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <Button
                    variant="link"
                    className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 p-0 h-auto"
                    data-testid={`button-analysis-${index}`}
                    onClick={() => {
                      navigate(category.link, {
                        state: { analysis: analysis },
                      });
                    }}
                  >
                    <span>Detailed Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Button
              className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 sm:px-8 py-3 
              sm:py-7 text-base sm:text-lg font-bold shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
              data-testid="button-full-report"
              onClick={() => {
                console.log("analysis:", analysis);
                navigate("/analysis/content", {
                  state: { analysis: analysis },
                });
              }}
            >
              <span>Proceed to Full Report</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
