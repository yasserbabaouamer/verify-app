import type { StyleAnalysis } from "@/models/api/news";

interface StylisticMetric {
  label: string;
  value: number;
  status: string;
  color: "red" | "orange" | "yellow" | "green";
}

function StylisticMetricBar({ label, value, status, color }: StylisticMetric) {
  const colorClasses = {
    red: { text: "text-red-600", bg: "bg-red-500" },
    orange: { text: "text-orange-600", bg: "bg-orange-500" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-500" },
    green: { text: "text-green-600", bg: "bg-green-500" },
  };

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-medium">
        <span className="text-gray-700">{label}</span>
        <span className={colorClasses[color].text}>
          {value}% ({status})
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${colorClasses[color].bg} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function StylisticAnalysisCard({
  styleAnalysis,
}: {
  styleAnalysis: StyleAnalysis;
}) {
  const metrics: StylisticMetric[] = [
    {
      label: "Spelling Accuracy",
      value: styleAnalysis.spelling_accuracy,
      status: "Excellent",
      color: "green",
    },
    {
      label: "Keyword Repetition",
      value: styleAnalysis.keyword_repetition_rate,
      status: "High",
      color: "red",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        Stylistic/Lexical Analysis
      </h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <StylisticMetricBar key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}
