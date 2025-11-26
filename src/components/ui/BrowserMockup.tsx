import React, { useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface BrowserMockupProps {
  children: React.ReactNode;
}

const BrowserMockup: React.FC<BrowserMockupProps> = ({ children }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const ControlButton = ({ color, icon: Icon, name }: { color: string, icon: React.ElementType, name: string }) => (
    <div
      onMouseEnter={() => setHovered(name)}
      onMouseLeave={() => setHovered(null)}
      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${color} ${
        hovered && hovered !== name ? 'opacity-50' : ''
      } ${hovered === name ? 'transform scale-125' : ''}`}
    >
      {hovered === name && <Icon className="w-2 h-2 text-black/60" />}
    </div>
  );

  return (
    <div className="light border rounded-lg overflow-hidden bg-white shadow-md">
      <div className="h-10 bg-gray-200 flex items-center px-4 border-b border-gray-300">
        <div className="flex gap-2">
          <ControlButton color="bg-red-500" icon={X} name="close" />
          <ControlButton color="bg-yellow-500" icon={Minus} name="minimize" />
          <ControlButton color="bg-green-500" icon={Maximize2} name="maximize" />
        </div>
        <div className="flex-grow text-center text-sm text-gray-500">
          <span>Signature Preview</span>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default BrowserMockup;
