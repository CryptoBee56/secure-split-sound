import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, FileText, Play, Download, ExternalLink } from "lucide-react";

const Docs = () => {
  const docSections = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Getting Started",
      description: "Learn the basics of RoyaltyFHE and how to set up your first project",
      items: ["Quick Start Guide", "Installation", "Configuration", "First Steps"]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API Reference",
      description: "Complete documentation of all available functions and methods",
      items: ["Smart Contracts", "Frontend SDK", "Encryption Utils", "Hooks"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Guides",
      description: "Step-by-step tutorials for common use cases and integrations",
      items: ["Music Track Setup", "Revenue Distribution", "Security Best Practices", "Deployment"]
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Examples",
      description: "Real-world examples and code samples to help you get started",
      items: ["Basic Integration", "Advanced Features", "Custom Components", "Testing"]
    }
  ];

  const quickLinks = [
    { title: "Smart Contract ABI", href: "#", icon: <Code className="w-4 h-4" /> },
    { title: "Environment Setup", href: "#", icon: <FileText className="w-4 h-4" /> },
    { title: "Security Guidelines", href: "#", icon: <BookOpen className="w-4 h-4" /> },
    { title: "Video Tutorials", href: "#", icon: <Play className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guides, API references, and examples to help you 
            build with RoyaltyFHE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {docSections.map((section, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  View Section
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Download className="w-6 h-6" />
                Quick Downloads
              </CardTitle>
              <CardDescription>
                Get started quickly with our starter templates and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Starter Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Code className="w-4 h-4 mr-2" />
                  Smart Contract Examples
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Developer Guide PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <ExternalLink className="w-6 h-6" />
                Quick Links
              </CardTitle>
              <CardDescription>
                Essential resources for developers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Button key={index} variant="ghost" className="w-full justify-start">
                    {link.icon}
                    <span className="ml-2">{link.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Need Help?</CardTitle>
              <CardDescription className="text-lg mb-6">
                Our documentation is comprehensive, but if you need additional 
                support, we're here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Contact Support
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

export default Docs;
