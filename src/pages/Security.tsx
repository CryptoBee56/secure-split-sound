import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, CheckCircle, AlertTriangle, Key } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Fully Homomorphic Encryption",
      description: "Process data without ever decrypting it, ensuring complete privacy",
      level: "Maximum"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Zero-Knowledge Proofs",
      description: "Verify computations without revealing the underlying data",
      level: "Advanced"
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "All sensitive data encrypted from client to blockchain",
      level: "Maximum"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Private Smart Contracts",
      description: "Contract logic executes on encrypted data only",
      level: "Advanced"
    }
  ];

  const auditItems = [
    "Smart contract security audit completed",
    "FHE implementation verified by cryptography experts",
    "Zero-knowledge proof system validated",
    "Penetration testing passed",
    "Code review by security specialists"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Security & Privacy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with the highest security standards to protect your sensitive 
            music royalty data using cutting-edge cryptographic techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge 
                    variant={feature.level === "Maximum" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {feature.level}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Security Audit
              </CardTitle>
              <CardDescription>
                Our platform has undergone comprehensive security testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {auditItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                Security Best Practices
              </CardTitle>
              <CardDescription>
                We follow industry-leading security standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    All sensitive data is encrypted using FHE before being stored on-chain
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Access Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Role-based permissions ensure only authorized users can access data
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Regular Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Security patches and updates are applied automatically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Security-First Design</CardTitle>
              <CardDescription className="text-lg mb-6">
                Your data privacy is our top priority. Every aspect of our platform 
                is designed with security in mind.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Learn More
                </Button>
                <Button size="lg" variant="outline">
                  Security Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Security;
