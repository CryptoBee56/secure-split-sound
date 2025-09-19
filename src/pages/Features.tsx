import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Shield, Zap, Lock, Eye, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "FHE Encryption",
      description: "All sensitive data encrypted using Fully Homomorphic Encryption",
      badge: "Privacy"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Zero-Knowledge Proofs",
      description: "Verify ownership without revealing sensitive information",
      badge: "Security"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automated Distribution",
      description: "Smart contract triggers automatic payouts when thresholds are met",
      badge: "Automation"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Music Industry Focus",
      description: "Built specifically for artists, producers, and labels",
      badge: "Industry"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparent Process",
      description: "All transactions are verifiable on-chain while keeping data private",
      badge: "Transparency"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Chain Support",
      description: "Deploy on multiple blockchain networks for maximum reach",
      badge: "Scalability"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Platform Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful features that make RoyaltyFHE the next-generation 
            platform for music royalty distribution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg mb-6">
                Experience the future of music royalty distribution with our 
                privacy-preserving technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Building
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Features;
