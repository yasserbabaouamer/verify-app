import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface NewsInputProps {
  value: string;
  onChange: (value: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
}

export const NewsInput = ({
  value,
  onChange,
  onVerify,
  isVerifying,
}: NewsInputProps) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          className="news-input"
          placeholder="Paste your news article, headline, or claim here for instant verification..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
        />
        <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">
          {value.length}/5000 characters
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Supports: News articles, headlines, social media posts, and claims
        </div>

        <Button
          onClick={onVerify}
          disabled={!value.trim() || isVerifying}
          size="lg"
          className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium px-8"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Verify News
            </>
          )}
        </Button>
      </div>

      {isVerifying && (
        <div className="bg-accent/50 rounded-lg p-4 animate-pulse-slow">
          <div className="text-sm text-center text-muted-foreground">
            🔍 Analyzing content • 🌐 Checking sources • 🧠 Running AI models
          </div>
        </div>
      )}
    </div>
  );
};
