import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";

interface NewsInputProps {
  headline: string;
  body: string;
  url?: string;
  date?: string;
  onHeadlineChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
}

export const NewsInput = ({
  headline,
  body,
  url,
  date,
  onHeadlineChange,
  onBodyChange,
  onUrlChange,
  onDateChange,
  onVerify,
  isVerifying,
}: NewsInputProps) => {
  const totalLength = headline.length + body.length;
  const hasContent = headline.trim() && body.trim();

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="headline" className="text-sm font-medium">
            News Headline
          </Label>
          <Input
            id="headline"
            placeholder="Enter the news headline..."
            value={headline}
            onChange={(e) => onHeadlineChange(e.target.value)}
            dir="auto"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="body" className="text-sm font-medium">
            News Body
          </Label>
          <div className="relative">
            <Textarea
              id="body"
              className="news-input min-h-[120px]"
              placeholder="Paste the full news article content here..."
              value={body}
              onChange={(e) => onBodyChange(e.target.value)}
              rows={6}
              dir="auto"
            />
            <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">
              {totalLength}/5000 characters
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL (Optional)
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/news-article"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">
              News Date (Optional)
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Supports: News articles, headlines, social media posts, and claims
        </div>

        <Button
          onClick={onVerify}
          disabled={!hasContent || isVerifying}
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
