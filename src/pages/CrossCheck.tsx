import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, Check } from "lucide-react";
import { Stepper } from "@/components/Stepper";
import useAnalysisStore from "@/store";

interface VerificationData {
  source: string;
  result: "Agreement" | "Disagreement";
  link: string;
  linkText: string;
}

export default function VerificationResults() {
  const store = useAnalysisStore();
  const analysis = store.analysis.cross_check;

  const factCheckDatabases: VerificationData[] = [
    {
      source: "Politifact",
      result: "Agreement",
      link: "#",
      linkText: "View Fact-Check",
    },
    {
      source: "Snopes",
      result: "Disagreement",
      link: "#",
      linkText: "View Fact-Check",
    },
  ];

  const getResultBadge = (result: string) => {
    if (result === "Agreement") {
      return (
        <Badge className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/20 px-3 py-1 text-sm font-medium text-green-800 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          Agreement
        </Badge>
      );
    } else {
      return (
        <Badge className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/20 px-3 py-1 text-sm font-medium text-red-800 dark:text-red-400">
          <XCircle className="h-4 w-4" />
          Disagreement
        </Badge>
      );
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <Header />

      <main className="flex-1 bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl font-extrabold text-foreground tracking-tight mb-8"
            data-testid="page-title"
          >
            Verification Results
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6">
              Cross-Check Over Trustful Media Sources
            </h2>
            <Card className="overflow-hidden rounded-2xl border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Source
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Verification Result
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {analysis.media.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-accent transition-colors"
                        data-testid={`verification-row-${index}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getResultBadge(item.check)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            href={item.url || "#"}
                            data-testid={`link-view-${index}`}
                          >
                            View article
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6">
              Cross-Validate Over Fact-Check Databases
            </h2>
            <Card className="overflow-hidden rounded-2xl border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Source
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Verification Result
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {analysis.fact_check_dbs.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-accent transition-colors"
                        data-testid={`verification-row-${index}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getResultBadge(item.check)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            href={item.url || "#"}
                            data-testid={`link-view-${index}`}
                          >
                            View Fact-check
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          <div className="mt-12">
            <Stepper
              leftText=""
              leftTo="/analysis/source"
              rightText="Finish analysis"
              rightIcon={<Check className="h-5 w-5" />}
              rightTo="/analysis"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
