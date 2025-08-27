import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) => {
  return (
    <div
      className="feature-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
