import { Card } from "@/components/ui/card";
import { ShieldCheck, Verified } from "lucide-react";

export default function VerificationCard() {
  return (
    <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 flex-shrink-0">
            <ShieldCheck className="text-green-600 dark:text-green-400" size={36} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Confidence Rating</p>
            <p
              className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400"
              data-testid="trust-rating"
            >
              Highly Trusted
            </p>
          </div>
        </div>

        <p
          className="text-muted-foreground text-sm sm:text-base md:ml-auto md:max-w-md leading-relaxed"
          data-testid="analysis-description"
        >
          Our system analyzes various factors to determine the trustworthiness
          of a source, including its reputation, transparency, and history of
          factual reporting. This source has demonstrated a strong commitment to
          accuracy and reliability.
        </p>
      </div>
    </Card>
  );
}
