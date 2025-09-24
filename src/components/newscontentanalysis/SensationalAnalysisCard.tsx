import { Slider } from "../ui/slider";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface MetricBarProps {
  label: string;
  value: number;
  status: string;
  color: "red" | "orange" | "yellow" | "green";
}

function MetricBar({ label, value, status, color }: MetricBarProps) {
  const colorClasses = {
    red: { text: "text-red-600", bg: "bg-red-500" },
    orange: { text: "text-orange-600", bg: "bg-orange-500" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-500" },
    green: { text: "text-green-600", bg: "bg-green-500" },
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium text-gray-700">{label}</p>
        <p className={`font-bold ${colorClasses[color].text}`}>
          {status} ({value})
        </p>
      </div>
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div
          className={`absolute h-2 rounded-full ${colorClasses[color].bg} transition-all duration-1000 ease-out`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

export function SensationalAnalysisCard({
  sensationalAnalysis,
}: {
  sensationalAnalysis: { objectivity: number; polarity: number };
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        Sensational Analysis
      </h3>
      <div className="space-y-6">
        <MetricBar
          label="Objectivity"
          value={sensationalAnalysis.objectivity}
          status={
            sensationalAnalysis.objectivity > 7
              ? "Good"
              : sensationalAnalysis.objectivity > 4
              ? "Average"
              : "Poor"
          }
          color={
            sensationalAnalysis.objectivity > 7
              ? "green"
              : sensationalAnalysis.objectivity > 4
              ? "yellow"
              : "orange"
          }
        />
        {/* Slider titles */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-700">Polarity</p>
        </div>
        <Slider
          min={-1}
          max={1}
          step={0.01}
          defaultValue={[0]}
          value={[sensationalAnalysis.polarity]}
          disabled
        />
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Negative</span>
          <span>Neutral</span>
          <span>Positive</span>
        </div>
      </div>
    </div>
  );
}
