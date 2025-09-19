import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock, Users, DollarSign } from 'lucide-react';

interface RoyaltyData {
  role: string;
  percentage: number;
  encrypted: boolean;
  icon: any;
}

const RoyaltySplits = () => {
  const royaltyData: RoyaltyData[] = [
    { role: 'Artist', percentage: 60, encrypted: true, icon: Users },
    { role: 'Producer', percentage: 25, encrypted: true, icon: DollarSign },
    { role: 'Label', percentage: 15, encrypted: true, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-3">Revenue Splits</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          All royalty percentages are encrypted using FHE until payout time, 
          ensuring complete privacy and fairness for all parties.
        </p>
      </div>

      <div className="grid gap-4">
        {royaltyData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} className="neon-glow bg-card/30 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{item.role}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Encrypted</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revenue Share</span>
                  <span className="font-mono text-accent">
                    {item.encrypted ? '████' : `${item.percentage}%`}
                  </span>
                </div>
                <Progress 
                  value={item.encrypted ? 0 : item.percentage} 
                  className="h-2 bg-muted/30"
                />
                {item.encrypted && (
                  <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Percentage hidden until payout
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoyaltySplits;