import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  MapPin,
  Building,
  ExternalLink,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/Header";
import { AnalysisCard } from "@/components/AnalysisCard";
import { SourceCard } from "@/components/SourceCard";
import { LinguisticChart } from "@/components/LinguisticChart";
import { Footer } from "@/components/Footer";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newsText = location.state?.newsText || "";

  // Mock analysis results - in real app, this would come from API
  const analysisResults = {
    confidenceLevel: 78,
    verificationStatus: "verified",
    objectivityScore: 72,
    linguisticAnalysis: {
      nouns: 45,
      verbs: 32,
      adjectives: 18,
      adverbs: 12,
      uniqueWords: 89,
      totalWords: 156,
    },
    entities: {
      people: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      locations: ["New York", "California", "United States"],
      organizations: ["Stanford University", "WHO", "CDC"],
    },
    sources: [
      {
        name: "Reuters",
        url: "https://reuters.com",
        credibility: 95,
        status: "verified",
      },
      {
        name: "Associated Press",
        url: "https://apnews.com",
        credibility: 92,
        status: "verified",
      },
      {
        name: "BBC News",
        url: "https://bbc.com/news",
        credibility: 89,
        status: "verified",
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-6 w-6" />;
      case "suspicious":
        return <AlertTriangle className="h-6 w-6" />;
      case "false":
        return <XCircle className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "verified";
      case "suspicious":
        return "suspicious";
      case "false":
        return "false";
      default:
        return "verified";
    }
  };

  if (!newsText) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No content to analyze</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              New Analysis
            </Button>
            <h1 className="text-3xl font-bold">Verification Results</h1>
          </div>

          {/* Confidence Level Card */}
          <Card className="gradient-card p-8 mb-8 border-0 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-full bg-${getStatusColor(
                    analysisResults.verificationStatus
                  )}/10`}
                >
                  {getStatusIcon(analysisResults.verificationStatus)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Confidence Level</h2>
                  <Badge
                    className={`verification-badge ${getStatusColor(
                      analysisResults.verificationStatus
                    )}`}
                  >
                    {analysisResults.verificationStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary mb-2">
                  {analysisResults.confidenceLevel}%
                </div>
                <div className="text-muted-foreground">Reliability Score</div>
              </div>
            </div>

            <Progress
              value={analysisResults.confidenceLevel}
              className="h-3 mb-4"
            />

            <div className="text-sm text-muted-foreground">
              Based on linguistic analysis, source verification, and AI pattern
              recognition
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Linguistic Analysis */}
            <AnalysisCard
              title="Linguistic Analysis"
              icon={BarChart3}
              data={analysisResults.linguisticAnalysis}
            />

            {/* Objectivity Score */}
            <Card className="stats-card">
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Objectivity Analysis</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Objectivity Score</span>
                    <span className="font-semibold">
                      {analysisResults.objectivityScore}%
                    </span>
                  </div>
                  <Progress
                    value={analysisResults.objectivityScore}
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {analysisResults.linguisticAnalysis.uniqueWords}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Unique Words
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(
                        (analysisResults.linguisticAnalysis.uniqueWords /
                          analysisResults.linguisticAnalysis.totalWords) *
                          100
                      )}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Vocabulary Diversity
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Entities Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="stats-card">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">People Mentioned</h4>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">
                {analysisResults.entities.people.length}
              </div>
              <div className="space-y-1">
                {analysisResults.entities.people.map((person, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {person}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="stats-card">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Locations</h4>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">
                {analysisResults.entities.locations.length}
              </div>
              <div className="space-y-1">
                {analysisResults.entities.locations.map((location, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {location}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="stats-card">
              <div className="flex items-center gap-3 mb-4">
                <Building className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Organizations</h4>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">
                {analysisResults.entities.organizations.length}
              </div>
              <div className="space-y-1">
                {analysisResults.entities.organizations.map((org, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {org}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Linguistic Chart */}
          <LinguisticChart data={analysisResults.linguisticAnalysis} />

          {/* Source Verification */}
          <Card className="gradient-card p-8 mt-8">
            <h3 className="text-2xl font-bold mb-6">Source Verification</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisResults.sources.map((source, index) => (
                <SourceCard key={index} source={source} />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Results;
