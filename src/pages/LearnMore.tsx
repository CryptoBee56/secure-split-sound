import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Users, MessageCircle, ArrowRight, ExternalLink } from "lucide-react";

const LearnMore = () => {
  const resources = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Technical Documentation",
      description: "Deep dive into FHE technology and implementation details",
      type: "Documentation",
      href: "#"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides for developers and artists",
      type: "Video",
      href: "#"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Forum",
      description: "Connect with other developers and get help from the community",
      type: "Community",
      href: "#"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Support",
      description: "Get real-time help from our technical support team",
      type: "Support",
      href: "#"
    }
  ];

  const faqs = [
    {
      question: "What is Fully Homomorphic Encryption (FHE)?",
      answer: "FHE allows computations to be performed on encrypted data without ever decrypting it, ensuring complete privacy while maintaining functionality."
    },
    {
      question: "How does RoyaltyFHE protect my data?",
      answer: "All sensitive data is encrypted using FHE before being stored on the blockchain, ensuring your royalty percentages and revenue data remain private."
    },
    {
      question: "Is RoyaltyFHE compatible with existing music platforms?",
      answer: "Yes, RoyaltyFHE can integrate with existing music streaming platforms and distribution services through our API."
    },
    {
      question: "What are the costs involved?",
      answer: "RoyaltyFHE charges a minimal 2.5% platform fee, with no setup costs. Gas fees for blockchain transactions are separate."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Learn More
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive resources to understand how RoyaltyFHE 
            revolutionizes music royalty distribution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {resource.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary/10">
                  Access Resource
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about RoyaltyFHE and FHE technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-sm">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Technology Stack</CardTitle>
              <CardDescription>
                Built with cutting-edge technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <p className="text-sm text-muted-foreground">
                    React, TypeScript, Vite, Tailwind CSS, shadcn/ui
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Blockchain</h4>
                  <p className="text-sm text-muted-foreground">
                    Ethereum, Solidity, Hardhat, FHE Protocol
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    Fully Homomorphic Encryption, Zero-Knowledge Proofs
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    Vercel, IPFS, Multi-chain support
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Dive Deeper?</CardTitle>
              <CardDescription className="text-lg mb-6">
                Explore our comprehensive resources and start building with 
                the most advanced music royalty platform available.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore Resources
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
