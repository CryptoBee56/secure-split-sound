import AudioVisualizer from '@/components/AudioVisualizer';
import WalletConnection from '@/components/WalletConnection';
import VinylFooter from '@/components/VinylFooter';
import RoyaltySplits from '@/components/RoyaltySplits';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.png';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Private Royalties Logo" className="w-12 h-12" />
            <span className="text-xl font-bold text-foreground">RoyaltyFHE</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Docs</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Fair & Confidential 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-neon-pulse">
              {" "}Royalties{" "}
            </span>
            with FHE
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Revenue splits between artists and producers are encrypted until payout, 
            ensuring complete privacy and fairness for all parties in the music industry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg animate-stage-glow">
              Start Earning
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Audio Visualizer */}
        <div className="mb-16">
          <AudioVisualizer />
        </div>

        {/* Wallet Connection */}
        <div className="mb-16 max-w-2xl mx-auto">
          <WalletConnection />
        </div>

        {/* Royalty Splits Preview */}
        <div className="mb-16 max-w-4xl mx-auto">
          <RoyaltySplits />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="neon-glow bg-card/30 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Encrypted Splits</h3>
            <p className="text-muted-foreground">
              Revenue percentages remain encrypted using FHE until payout time
            </p>
          </div>
          
          <div className="neon-glow bg-card/30 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Instant Payouts</h3>
            <p className="text-muted-foreground">
              Automatic distribution to all parties when revenue thresholds are met
            </p>
          </div>
          
          <div className="neon-glow bg-card/30 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-3xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Music Focused</h3>
            <p className="text-muted-foreground">
              Purpose-built for artists, producers, labels, and music collaborators
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <VinylFooter />
    </div>
  );
};

export default Index;
