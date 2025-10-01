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

export function ConfidenceLevelCard({
  prediction,
  confidence,
}: ConfidenceLevelCardProps) {
  const renderBadge = () => {
    if (prediction === NewsPrediction.LIKELY_REAL) {
      return (
        <Badge className="rounded-full bg-green-100 dark:bg-green-900/20 px-4 py-1 text-sm font-semibold text-green-700 dark:text-green-300">
          <BadgeCheck className="mr-2" /> {prediction}
        </Badge>
      );
    }

    if (prediction === NewsPrediction.LIKELY_FAKE) {
      return (
        <Badge className="rounded-full bg-red-100 dark:bg-red-900/20 px-4 py-1 text-sm font-semibold text-red-700 dark:text-red-300">
          <BadgeAlert className="mr-2" /> {prediction}
        </Badge>
      );
    }

    return (
      <Badge className="rounded-full bg-orange-100 dark:bg-orange-900/20 px-4 py-1 text-sm font-semibold text-orange-700 dark:text-orange-300">
        <HelpCircle className="mr-2" /> {prediction}
      </Badge>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        Overall Prediction
      </h3>
      <div className="flex items-center justify-between">
        {renderBadge()}
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
