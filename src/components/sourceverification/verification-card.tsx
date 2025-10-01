import { Card } from "@/components/ui/card";
import { BadgeAlert, ShieldCheck, ShieldX, Verified } from "lucide-react";

export default function VerificationCard({
  overall,
}: {
  overall: number | null | undefined;
}) {
  const getPredictionUI = () => {
    if (!overall) {
      return {
        credibility: "No Data",
        bgColor: "bg-gray-100 dark:bg-gray-900/20",
        color: "text-gray-600 dark:text-gray-400",
        icon: (
          <ShieldX className="text-gray-600 dark:text-gray-400" size={36} />
        ),
        description: "No credibility data available for this source.",
      };
    }
    if (overall!! > 60) {
      return {
        credibility: "Highly Trusted",
        bgColor: "bg-green-100 dark:bg-green-900/20",
        color: "text-green-600 dark:text-green-400",
        icon: (
          <ShieldCheck
            className="text-green-600 dark:text-green-400"
            size={36}
          />
        ),
        description:
          "This source has demonstrated a strong commitment to accuracy and reliability.",
      };
    }
    if (overall!! > 30) {
      return {
        credibility: "Moderately Trusted",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        color: "text-yellow-600 dark:text-yellow-400",
        icon: (
          <BadgeAlert
            className="text-yellow-600 dark:text-yellow-400"
            size={36}
          />
        ),
        description:
          "This source has a mixed record; exercise caution and verify information.",
      };
    }
    return {
      credibility: "Low Trust",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      color: "text-red-600 dark:text-red-400",
      icon: <ShieldX className="text-red-600 dark:text-red-400" size={36} />,
      description:
        "This source has a history of misinformation; cross-check with reliable sources.",
    };
  };

  const { credibility, bgColor, color, icon, description } = getPredictionUI();

  return (
    <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className={`${bgColor} rounded-full p-3 flex-shrink-0`}>
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Confidence Rating</p>
            <p
              className={`text-xl sm:text-2xl font-bold ${color}`}
              data-testid="trust-rating"
            >
              {credibility}
            </p>
          </div>
        </div>

        <p
          className="text-muted-foreground text-sm sm:text-base md:ml-auto md:max-w-md leading-relaxed"
          data-testid="analysis-description"
        >
          {description}
        </p>
      </div>
    </Card>
  );
}
