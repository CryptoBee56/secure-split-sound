import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Music, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

const StartEarning = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Link your crypto wallet to start earning royalties",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Register Your Music",
      description: "Upload your tracks and set up royalty splits",
      icon: <Music className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Start Earning",
      description: "Receive automatic payouts when revenue thresholds are met",
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const benefits = [
    "Automatic royalty distribution",
    "Transparent revenue tracking",
    "Privacy-preserving technology",
    "Multi-stakeholder support",
    "Real-time analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Start Earning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the future of music royalty distribution. Set up your account 
            and start earning from your music in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {step.icon}
                  </div>
                  <Badge variant="outline" className="text-lg font-bold">
                    {step.number}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Get Started Now
              </CardTitle>
              <CardDescription>
                Create your account and start earning royalties today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wallet">Wallet Address</Label>
                  <Input 
                    id="wallet" 
                    placeholder="Connect your wallet to continue"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="artistName">Artist Name</Label>
                  <Input 
                    id="artistName" 
                    placeholder="Enter your artist name"
                    className="mt-1"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Connect Wallet & Start
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Why Choose RoyaltyFHE?
              </CardTitle>
              <CardDescription>
                Discover the benefits of our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">$0</div>
            <div className="text-sm text-muted-foreground mb-4">Setup Fee</div>
            <p className="text-sm">No upfront costs to get started</p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">2.5%</div>
            <div className="text-sm text-muted-foreground mb-4">Platform Fee</div>
            <p className="text-sm">Lowest fees in the industry</p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground mb-4">Support</div>
            <p className="text-sm">Round-the-clock assistance</p>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Start Earning?</CardTitle>
              <CardDescription className="text-lg mb-6">
                Join thousands of artists who are already earning with RoyaltyFHE. 
                Your music deserves fair and transparent royalty distribution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Earning Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartEarning;
