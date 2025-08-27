
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LinguisticChartProps {
  data: {
    nouns: number;
    verbs: number;
    adjectives: number;
    adverbs: number;
    uniqueWords: number;
    totalWords: number;
  };
}

export const LinguisticChart = ({ data }: LinguisticChartProps) => {
  const chartData = [
    { category: 'Nouns', count: data.nouns },
    { category: 'Verbs', count: data.verbs },
    { category: 'Adjectives', count: data.adjectives },
    { category: 'Adverbs', count: data.adverbs },
  ];

  return (
    <Card className="stats-card">
      <h3 className="text-xl font-semibold mb-6">Word Category Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};