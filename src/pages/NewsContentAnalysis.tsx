import { Header } from "@/components/Header";
import { ConfidenceLevelCard } from "@/components/newscontentanalysis/ConfidenceLevelCard";
import { HighlightedSentencesCard } from "@/components/newscontentanalysis/HighlightedSentencesCard";
import { SensationalAnalysisCard } from "@/components/newscontentanalysis/SensationalAnalysisCard";
import { ContributionRatioCard } from "@/components/newscontentanalysis/ContributionRatioCard";
import { FormattingCard } from "@/components/newscontentanalysis/FormattingCard";
import { StylisticAnalysisCard } from "@/components/newscontentanalysis/StylisticAnalysisCard";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";
import { NewsPrediction } from "@/utils/enums";
import useAnalysisStore from "@/store";

function NewsContentAnalysis() {
  const store = useAnalysisStore();
  const analysis = store.analysis.content_analysis;

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-gray-50 text-gray-800 font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex-1 px-10 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tighter text-gray-900">
                News Content Analysis
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Detailed analysis of the news content to assess its credibility
                and potential biases.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                <ConfidenceLevelCard
                  confidence={analysis.confidence}
                  prediction={analysis.prediction}
                />
                <HighlightedSentencesCard
                  headline_sentences={
                    analysis.sentence_analysis.headline_sentences
                  }
                  body_sentences={analysis.sentence_analysis.body_sentences}
                />
                {/* Most Repeated Words */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Most Repeated Words
                  </h3>
                  <div className="space-y-2" dir="rtl">
                    {analysis.style_analysis.most_repeated_words.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-gray-700"
                        >
                          <span>
                            {index + 1}. {item.keyword}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {item.repetitions_count} times
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <SensationalAnalysisCard
                  sensationalAnalysis={analysis.sensation_analysis}
                />
              </div>

              <div className="space-y-8">
                <ContributionRatioCard
                  headline={analysis.headline_contribution}
                  body={analysis.body_contribution}
                />
                <FormattingCard formatAnalysis={analysis.format_analysis} />
                <StylisticAnalysisCard
                  styleAnalysis={analysis.style_analysis}
                />
              </div>
            </div>

            <div className="mt-12">
              <Stepper currentPage="NEWS_CONTENT" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default NewsContentAnalysis;
