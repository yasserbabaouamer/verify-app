import { Button } from "@/components/ui/button";
import useAnalysisStore from "@/store";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StepperProps {
  currentPage: "NEWS_CONTENT" | "SOURCE_VERIFICATION" | "CROSS_CHECK";
}

export function Stepper({ currentPage }: StepperProps) {
  const navigate = useNavigate();
  const store = useAnalysisStore();

  const [leftText, setLeftText] = useState("");
  const [leftTo, setLeftTo] = useState("");
  const [rightText, setRightText] = useState("");
  const [rightTo, setRightTo] = useState("");
  const [rightIcon, setRightIcon] = useState<React.ReactNode>(
    <ArrowRight className="h-5 w-5" />
  );

  useEffect(() => {
    const setupNavigation = () => {
      if (currentPage == "NEWS_CONTENT") {
        setLeftTo("/analysis");
        if (store.analysis.source_verification.url != null) {
          setRightText("Let's verify the source");
          setRightTo("/analysis/source");
        } else {
          setRightText("Let's cross-check");
          setRightTo("/analysis/cross-check");
        }
      }
      if (currentPage == "SOURCE_VERIFICATION") {
        setRightText("Let's cross-check");
        setRightTo("/analysis/cross-check");
        setLeftTo("/analysis/content");
      }
      if (currentPage == "CROSS_CHECK") {
        setRightText("Finish analysis");
        setRightIcon(<Check className="h-5 w-5" />);
        setRightTo("/analysis");
        if (store.analysis.source_verification.url != null) {
          setLeftTo("/analysis/source");
        } else {
          setLeftTo("/analysis/content");
        }
      }
    };
    setupNavigation();
  }, []);

  return (
    <div className="mt-12 text-center flex justify-center gap-1">
      <Button
        className="inline-flex items-center rounded-full gradient-card text-neutral-foreground sm:p-7 text-base font-bold shadow-lg transition-transform hover:scale-105"
        data-testid="button-stepper-left"
        onClick={() => navigate(leftTo)}
      >
        <ArrowLeft className="h-5 w-5" />
        {leftText && <span className="ml-2">{leftText}</span>}
      </Button>
      <Button
        className="inline-flex items-center gap-3 rounded-full gradient-card text-neutral-foreground px-7 sm:px-8 py-3 sm:py-7 text-base font-bold shadow-lg transition-transform hover:scale-105"
        data-testid="button-stepper-right"
        onClick={() => navigate(rightTo)}
      >
        {rightText && <span>{rightText}</span>}
        {rightIcon}
      </Button>
    </div>
  );
}
