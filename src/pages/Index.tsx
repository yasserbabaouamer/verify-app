import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Search,
  CheckCircle,
  AlertTriangle,
  Users,
  Globe,
  Zap,
  Brain,
} from "lucide-react";
import { NewsInput } from "@/components/NewsInput";
import { FeatureCard } from "@/components/FeatureCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [newsText, setNewsText] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerification = async () => {
    if (!newsText.trim()) return;

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      // Pass the news text to results page via state
      navigate("/results", { state: { newsText } });
    }, 3000);
  };

  const features = [
    {
      icon: Zap,
      title: "Quick Verification",
      description:
        "Get instant analysis of news credibility with our advanced AI algorithms",
    },
    {
      icon: Globe,
      title: "Reliable Sources",
      description:
        "Cross-reference with trusted news outlets and fact-checking organizations",
    },
    {
      icon: AlertTriangle,
      title: "Smart Alerts",
      description:
        "Real-time notifications about suspicious content and misinformation",
    },
    {
      icon: Brain,
      title: "AI Detection",
      description:
        "Sophisticated machine learning models to identify false information patterns",
    },
    {
      icon: Search,
      title: "Deep Analysis",
      description:
        "Comprehensive linguistic and semantic analysis of news content",
    },
    {
      icon: Users,
      title: "Community Verified",
      description:
        "Leverage collective intelligence from verified fact-checkers worldwide",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12" />
              <h1 className="text-5xl font-bold text-balance">VERIFY</h1>
            </div>
            <p className="text-xl mb-8 text-primary-foreground/90 text-balance max-w-2xl mx-auto leading-relaxed">
              Combat misinformation with AI-powered news verification. Get
              instant credibility analysis, source verification, and detailed
              linguistic insights.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                <CheckCircle className="h-4 w-4 mr-1" />
                AI-Powered
              </Badge>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                <Shield className="h-4 w-4 mr-1" />
                Trusted Sources
              </Badge>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                <Zap className="h-4 w-4 mr-1" />
                Instant Results
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* News Input Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="gradient-card border-0 shadow-xl p-8 animate-slide-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Verify News Instantly
                </h2>
                <p className="text-muted-foreground text-lg">
                  Paste any news article, headline, or claim below to get
                  instant verification
                </p>
              </div>

              <NewsInput
                value={newsText}
                onChange={setNewsText}
                onVerify={handleVerification}
                isVerifying={isVerifying}
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Verification Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Our comprehensive suite of tools helps you identify misinformation
              and verify news credibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-8">
              Trusted by Professionals Worldwide
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Articles Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Trusted Sources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
