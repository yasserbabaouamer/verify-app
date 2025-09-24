export function ContributionRatioCard({
  headline,
  body,
}: {
  headline: number;
  body: number;
}) {
  const bodyPercentage = body * 100;
  const headlinePercentage = headline * 100;

  // Calculate stroke-dasharray for the circles
  const circumference = 2 * Math.PI * 15.9155;
  const bodyDashArray = `${
    (bodyPercentage / 100) * circumference
  }, ${circumference}`;
  const headlineDashArray = `${
    (headlinePercentage / 100) * circumference
  }, ${circumference}`;
  const headlineOffset = -((bodyPercentage / 100) * circumference);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        Contribution Ratio
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative size-48">
          <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <path
              className="text-gray-200"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.8"
            />
            {/* Body percentage (green) */}
            <path
              className="text-green-500"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={bodyDashArray}
              strokeWidth="3.8"
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 1s ease-out" }}
            />
            {/* Headline percentage (yellow) */}
            <path
              className="text-[#f9f506]"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={headlineDashArray}
              strokeDashoffset={headlineOffset}
              strokeWidth="3.8"
              strokeLinecap="round"
              style={{
                transition:
                  "stroke-dasharray 1s ease-out, stroke-dashoffset 1s ease-out",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500">Headline/Body</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-green-500" />
            <span>Body</span>
          </div>
          <span className="font-semibold">{bodyPercentage}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#f9f506]" />
            <span>Headline</span>
          </div>
          <span className="font-semibold">{headlinePercentage}%</span>
        </div>
      </div>

      
    </div>
  );
}
