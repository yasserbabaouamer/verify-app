import { Card } from "@/components/ui/card";

export default function TechnicalDetails() {
  const methodologies = [
    {
      icon: "psychology",
      title: "AI Analysis",
      description:
        "Advanced natural language processing to detect bias, inconsistencies, and factual claims.",
    },
    {
      icon: "network_check",
      title: "Source Cross-Reference",
      description:
        "Verification against multiple trusted databases and fact-checking organizations.",
    },
    {
      icon: "history",
      title: "Historical Tracking",
      description:
        "Long-term monitoring of source reliability and accuracy patterns.",
    },
    {
      icon: "groups",
      title: "Expert Review",
      description:
        "Human verification by certified fact-checkers and domain experts.",
    },
  ];

  return (
    <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Verification Methodology
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {methodologies.map((method, index) => (
          <div key={index} className="space-y-4">
            <div
              className="flex items-start gap-3"
              data-testid={`methodology-${index}`}
            >
              <div className="bg-primary/10 rounded-full p-2 mt-1 flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-lg">
                  {method.icon}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
