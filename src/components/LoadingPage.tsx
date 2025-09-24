import { Shield, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage = ({ onComplete }: LoadingPageProps) => {
  const [progress, setProgress] = useState(1);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    "Analyzing content structure...",
    "Verifying source credibility...",
    "Cross-checking with trusted media...",
    "Validating against fact-check databases...",
  ];

  const didYouKnowTips = [
    "Fake news often uses emotional language to manipulate readers. Be wary of articles that evoke strong feelings without providing solid evidence.",
    "Check the publication date - old stories are sometimes shared as if they're current news to mislead readers.",
    "Look for multiple sources reporting the same story. Credible news is usually covered by several reputable outlets.",
    "Be suspicious of headlines with excessive capitalization, exclamation marks, or sensational claims.",
    "Check the author's credentials and the website's 'About' page. Legitimate news sources are transparent about their staff.",
    "Examine the URL carefully - fake news sites often mimic legitimate ones with slight spelling variations.",
    "Read beyond the headline - sometimes the content doesn't match what the headline suggests.",
    "Be aware of confirmation bias - we tend to believe information that confirms our existing beliefs.",
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.4;
        // Update stage based on progress
        const newStage = Math.floor(newProgress / 25);
        if (newStage !== currentStage && newStage < stages.length) {
          setCurrentStage(newStage);
        }
        // Complete when reaching 100%
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    // Rotate tips every 4 seconds
    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % didYouKnowTips.length);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, [onComplete, currentStage, stages.length, didYouKnowTips.length]);

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TruthEngine</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Verifying your news for accuracy and credibility
          </p>
        </div>

        {/* Main Loading Card */}
        <div className="gradient-card rounded-xl shadow-lg p-8 space-y-6 animate-slide-up border border-border">
          {/* Current Stage */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-medium">
                Step {currentStage + 1} of {stages.length}
              </span>
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">
              {stages[currentStage]}
            </p>
            <p className="text-muted-foreground">
              Please wait while we analyze your content
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`text-center p-2 rounded-lg transition-all duration-300 ${
                  index <= currentStage
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                    index < currentStage
                      ? "bg-verified"
                      : index === currentStage
                      ? "bg-primary animate-pulse"
                      : "bg-muted-foreground/30"
                  }`}
                ></div>
                <span className="text-xs font-medium">
                  {stage.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Did You Know Section */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Did you know?
              </h2>
            </div>
            <div className="min-h-[4rem] flex items-center">
              <p
                key={currentTip}
                className="text-muted-foreground text-base leading-relaxed animate-fade-in"
              >
                {didYouKnowTips[currentTip]}
              </p>
            </div>

            {/* Tip indicators */}
            <div className="flex justify-center gap-1 mt-4">
              {didYouKnowTips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTip
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            This process typically takes 30-60 seconds depending on content
            complexity
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
