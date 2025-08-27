import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  icon: LucideIcon;
  data: {
    nouns: number;
    verbs: number;
    adjectives: number;
    adverbs: number;
    uniqueWords: number;
    totalWords: number;
  };
}

export const AnalysisCard = ({
  title,
  icon: Icon,
  data,
}: AnalysisCardProps) => {
  return (
    <Card className="stats-card">
      <div className="flex items-center gap-4 mb-6">
        <Icon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-accent/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{data.nouns}</div>
          <div className="text-sm text-muted-foreground">Nouns</div>
        </div>
        <div className="text-center p-3 bg-accent/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{data.verbs}</div>
          <div className="text-sm text-muted-foreground">Verbs</div>
        </div>
        <div className="text-center p-3 bg-accent/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {data.adjectives}
          </div>
          <div className="text-sm text-muted-foreground">Adjectives</div>
        </div>
        <div className="text-center p-3 bg-accent/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{data.adverbs}</div>
          <div className="text-sm text-muted-foreground">Adverbs</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t text-center">
        <div className="text-lg font-semibold">
          {data.totalWords} total words analyzed
        </div>
      </div>
    </Card>
  );
};
