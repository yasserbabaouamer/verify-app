import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield } from "lucide-react";

interface SourceCardProps {
  source: {
    name: string;
    url: string;
    credibility: number;
    status: string;
  };
}

export const SourceCard = ({ source }: SourceCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h4 className="font-semibold">{source.name}</h4>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Credibility</span>
          <Badge variant="secondary">{source.credibility}%</Badge>
        </div>

        <Badge
          className={`verification-badge ${source.status} w-full justify-center`}
        >
          {source.status.toUpperCase()}
        </Badge>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(source.url, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Source
        </Button>
      </div>
    </Card>
  );
};
