import type { StyleAnalysis } from "@/models/api/news";

interface StylisticMetric {
  label: string;
  value: number;
  status: "Alarmist" | "Noticeable" | "Good";
}

function StylisticMetricBar({ label, value, status }: StylisticMetric) {
  const colorClasses = {
    Alarmist: { text: "text-red-600", bg: "bg-red-500" },
    Noticeable: { text: "text-yellow-600", bg: "bg-yellow-500" },
    Good: { text: "text-green-600", bg: "bg-green-500" },
  } as const;

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-medium">
        <span className="text-gray-700">{label}</span>
        <span className={colorClasses[status].text}>
          {value}% ({status})
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${colorClasses[status].bg} transition-all duration-1000 ease-out`}
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
  const getColorClass = (label: string) => {
    const colorMap: any = {
      Alarmist: "text-red-600",
      Noticeable: "text-orange-600",
      Normal: "text-green-600",
      black: "text-gray-900",
    };
    return colorMap[label];
  };

  const metrics: StylisticMetric[] = [
    {
      label: "Spelling Accuracy",
      value: styleAnalysis.spelling_accuracy,
      status:
        styleAnalysis.spelling_accuracy < 70
          ? "Alarmist"
          : styleAnalysis.spelling_accuracy < 80
          ? "Noticeable"
          : "Good",
    },
    {
      label: "Keyword Repetition",
      value: styleAnalysis.keyword_repetition_rate,
      status:
        styleAnalysis.keyword_repetition_rate > 40
          ? "Alarmist"
          : styleAnalysis.keyword_repetition_rate > 25
          ? "Noticeable"
          : "Good",
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
