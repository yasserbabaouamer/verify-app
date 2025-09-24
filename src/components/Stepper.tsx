import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StepperProps {
  leftText?: string;
  rightText?: string;
  leftTo?: string;
  rightTo?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Stepper({
  leftText = "Back",
  rightText = "Next",
  leftTo = "/",
  rightTo = "/",
  leftIcon = <ArrowLeft className="h-5 w-5" />,
  rightIcon = <ArrowRight className="h-5 w-5" />,
}: StepperProps) {
  const navigate = useNavigate();
  return (
    <div className="mt-12 text-center flex justify-center gap-1">
      <Button
        className="inline-flex items-center rounded-full gradient-card text-neutral-foreground sm:p-7 text-base font-bold shadow-lg transition-transform hover:scale-105"
        data-testid="button-stepper-left"
        onClick={() => navigate(leftTo)}
      >
        {leftIcon}
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
