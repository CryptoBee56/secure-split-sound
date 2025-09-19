import { useEffect, useState } from 'react';

const VinylFooter = () => {
  const [binaryDigits, setBinaryDigits] = useState<string[]>([]);

  useEffect(() => {
    // Generate random binary numbers for the sparkle effect
    const generateBinary = () => {
      const newDigits = Array.from({ length: 50 }, () => 
        Math.random() > 0.5 ? '1' : '0'
      );
      setBinaryDigits(newDigits);
    };

    generateBinary();
    const interval = setInterval(generateBinary, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative mt-20 py-12 border-t border-border/50 overflow-hidden">
      {/* Binary sparks background */}
      <div className="absolute inset-0 pointer-events-none">
        {binaryDigits.map((digit, index) => (
          <span
            key={index}
            className="binary-spark absolute text-xs font-mono select-none"
            style={{
              left: `${(index * 2) % 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {digit}
          </span>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Spinning vinyl records */}
          <div className="flex gap-8">
            {[1, 2].map((_, index) => (
              <div key={index} className="relative">
                <div className="vinyl-record w-16 h-16 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border-4 border-zinc-700">
                  <div className="absolute inset-4 rounded-full bg-zinc-900">
                    <div className="absolute inset-2 rounded-full bg-zinc-800">
                      <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer content */}
          <div className="text-center flex-1">
            <p className="text-muted-foreground mb-2">
              Powered by Fully Homomorphic Encryption
            </p>
            <p className="text-xs text-muted-foreground/60">
              © 2024 Private Royalty Platform. All rights reserved.
            </p>
          </div>

          {/* More spinning records */}
          <div className="flex gap-8">
            {[3, 4].map((_, index) => (
              <div key={index} className="relative">
                <div className="vinyl-record w-16 h-16 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border-4 border-zinc-700" style={{ animationDirection: 'reverse' }}>
                  <div className="absolute inset-4 rounded-full bg-zinc-900">
                    <div className="absolute inset-2 rounded-full bg-zinc-800">
                      <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VinylFooter;