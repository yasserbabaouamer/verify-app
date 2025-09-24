import {
  BadgeCheck,
  XCircle,
  HelpCircle,
  AlertTriangle,
  BadgeAlert,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { NewsPrediction } from "@/utils/enums";

interface ConfidenceLevelCardProps {
  confidence: number;
  prediction: string;
}

function getPredictionBadgeClassAndIcon(prediction: string): {
  className: string;
  icon: React.ReactNode;
} {
  console.log("Enum:", NewsPrediction.LIKELY_REAL);
  console.log("Type of Enum value:", typeof NewsPrediction.LIKELY_REAL);
  switch (prediction) {
    case NewsPrediction.LIKELY_REAL:
      return {
        className:
          "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
        icon: <BadgeCheck className="mr-2" />,
      };
    case NewsPrediction.LIKELY_FAKE:
      return {
        className:
          "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
        icon: <BadgeAlert className="mr-2" />,
      };
    case NewsPrediction.UNCERTAIN_LEAN_REAL:
      return {
        className:
          "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
        icon: <HelpCircle className="mr-2" />,
      };
    case NewsPrediction.UNCERTAIN_LEAN_FAKE:
      return {
        className:
          "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
        icon: <AlertTriangle className="mr-2" />,
      };
    default:
      return {
        className:
          "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300",
        icon: <HelpCircle className="mr-2" />,
      };
  }
}

export function ConfidenceLevelCard({
  prediction,
  confidence,
}: ConfidenceLevelCardProps) {
  const { className, icon } = getPredictionBadgeClassAndIcon(prediction);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        Overall Prediction
      </h3>
      <div className="flex items-center justify-between">
        <Badge
          className={`rounded-full px-4 py-1 text-lg font-bold ${className}`}
        >
          {icon} {prediction}
        </Badge>
        <div className="flex items-baseline gap-2">
          <p className="font-medium text-gray-700">Confidence</p>
          <p className="text-2xl font-bold text-gray-900">{confidence}%</p>
        </div>
      </div>
      <div className="mt-5 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}
