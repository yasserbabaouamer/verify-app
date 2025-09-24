import type { FormatAnalysis } from "@/models/api/news";

interface FormattingMetric {
  label: string;
  value: number;
  category: string;
  color: "red" | "orange" | "yellow" | "green" | "black";
}

export function FormattingCard({
  formatAnalysis,
}: {
  formatAnalysis: FormatAnalysis;
}) {
  const getColorClass = (color: string) => {
    const colorMap: any = {
      Alarmist: "text-red-600",
      Noticeable: "text-orange-600",
      Normal: "text-green-600",
      black: "text-gray-900",
    };
    return colorMap[color];
  };

  const metrics: FormattingMetric[] = [
    {
      label: "Exclamation Rate",
      value: formatAnalysis.exclamation.rate,
      category: formatAnalysis.exclamation.label,
      color: getColorClass(formatAnalysis.exclamation.label),
    },
    {
      label: "Alarmist Words",
      value: formatAnalysis.alarmist.rate,
      category: formatAnalysis.alarmist.label,
      color: getColorClass(formatAnalysis.alarmist.label),
    },
    {
      label: "All Caps Ratio",
      value: formatAnalysis.all_caps.rate,
      category: formatAnalysis.all_caps.label,
      color: getColorClass(formatAnalysis.all_caps.label),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">Formatting</h3>
      <div className="space-y-4 text-sm">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-gray-600">{metric.label}</p>
            <p className={`${metric.color}`}>
              {metric.value}% ({metric.category})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
