import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

const WalletConnection = () => {
  return (
    <Card className="neon-glow bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/20">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">Wallet Connection</h3>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to manage encrypted royalty data and view your music revenue
          </p>
        </div>
        <ConnectButton 
          chainStatus="icon"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />
      </div>
    </Card>
  );
};

export default WalletConnection;