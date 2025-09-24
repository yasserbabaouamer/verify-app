import { NewsPrediction } from "@/utils/enums";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

export interface AnalyzedSentence {
  sentence: string;
  prediction: string;
  confidence: number;
}

interface HighlightedSentencesCardProps {
  title?: string;
  headline_sentences: AnalyzedSentence[];
  body_sentences: AnalyzedSentence[];
}

export function HighlightedSentencesCard({
  title = "Highlighted Sentences",
  headline_sentences,
  body_sentences,
}: HighlightedSentencesCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-4 text-gray-600">
        Key sentences that contribute significantly to the overall analysis are
        highlighted below. These sentences may contain strong indicators of the
        news's credibility or potential biases.
      </p>
      <div
        className="rounded-lg bg-gray-50 p-4 text-gray-800 ring-1 ring-inset ring-gray-200 space-y-4"
        dir="rtl"
      >
        {/* Headline sentences */}
        {headline_sentences.map(({ sentence, prediction, confidence }, idx) => (
          <div key={idx} className="mb-6 hover:cursor-pointer">
            <Tooltip>
              <TooltipTrigger asChild>
                <h2
                  className={cn(
                    "inline",
                    prediction === NewsPrediction.LIKELY_REAL
                      ? "bg-green-100 px-1 py-0.5 rounded"
                      : prediction === NewsPrediction.LIKELY_FAKE
                      ? "bg-red-300 px-1 py-0.5 rounded"
                      : prediction === NewsPrediction.UNCERTAIN_LEAN_FAKE
                      ? "bg-red-100 px-1 py-0.5 rounded"
                      : ""
                  )}
                >
                  {sentence}
                </h2>
              </TooltipTrigger>
              <TooltipContent>
                <span>{prediction} </span>
                <span className="font-bold text-blue-600">
                  {(confidence * 100).toFixed(0)}%
                </span>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
        <p></p>
        {/* Body sentences */}
        {body_sentences.map(({ sentence, prediction, confidence }, idx) => (
          <div key={idx} className="mb-2 hover:cursor-pointer">
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={
                    prediction === NewsPrediction.LIKELY_REAL
                      ? "bg-green-100 px-1 py-0.5 rounded"
                      : prediction === NewsPrediction.LIKELY_FAKE
                      ? "bg-red-300 px-1 py-0.5 rounded"
                      : prediction === NewsPrediction.UNCERTAIN_LEAN_FAKE
                      ? "bg-red-100 px-1 py-0.5 rounded"
                      : ""
                  }
                >
                  {sentence}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <span>{prediction} </span>
                <span className="font-bold text-blue-600">
                  {(confidence * 100).toFixed(0)}%
                </span>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}
