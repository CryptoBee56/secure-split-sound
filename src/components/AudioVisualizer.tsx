import { useEffect, useState } from 'react';

const AudioVisualizer = () => {
  const [bars] = useState(Array.from({ length: 12 }, (_, i) => i));

  return (
    <div className="flex items-end justify-center gap-2 h-32">
      {bars.map((_, index) => (
        <div
          key={index}
          className="audio-bar w-3 rounded-t-lg"
          style={{
            height: `${Math.random() * 60 + 20}%`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;