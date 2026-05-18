import { Zap } from 'lucide-react';
import { cn } from '../../lib/cn';

interface BatteryIlloProps {
  label: string;
  sub: string;
  code: string;
  mAh: number;
  vol: string;
  className?: string;
}

export function BatteryIllo({ label, sub, code, mAh, vol, className }: BatteryIlloProps) {
  return (
    <div className={cn('relative aspect-[5/8] drop-shadow-sm flex flex-col', className)}>
      {/* Top stub */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1/4 h-1.5 bg-ink rounded-t-sm" />
      
      {/* Main body */}
      <div className="flex-1 rounded-md border border-hairline bg-gradient-to-b from-white to-[#f5f5f5] p-3.5 pt-4 flex flex-col justify-between relative z-10">
        
        {/* Label box */}
        <div className="bg-ink text-paper rounded-sm p-2.5 flex justify-between items-center bg-gradient-to-br from-ink to-ink-2">
          <div>
            <div className="font-bold text-[1.3em] leading-none uppercase">{label}</div>
            <div className="text-[0.6em] text-ink-mute mt-0.5">{sub}</div>
          </div>
          <Zap className="w-4 h-4 text-yellow" fill="currentColor" />
        </div>

        {/* Specs */}
        <div className="font-mono text-[7.5px] mt-auto">
          <div className="flex justify-between py-1 border-t border-hairline">
            <span className="text-ink-mute">CODE</span>
            <span className="text-ink">{code}</span>
          </div>
          <div className="flex justify-between py-1 border-t border-hairline">
            <span className="text-ink-mute">CAP</span>
            <span className="text-ink">{mAh} mAh</span>
          </div>
          <div className="flex justify-between py-1 border-t border-hairline">
            <span className="text-ink-mute">VOL</span>
            <span className="text-ink">{vol}</span>
          </div>
          <div className="flex justify-between py-1 border-t border-hairline">
            <span className="text-ink-mute">TYPE</span>
            <span className="text-ink">Li-ion</span>
          </div>
        </div>
      </div>

      {/* Bottom feet */}
      <div className="absolute -bottom-1 left-4 w-[14%] h-1 bg-ink-mute rounded-b-sm" />
      <div className="absolute -bottom-1 right-4 w-[14%] h-1 bg-ink-mute rounded-b-sm" />
    </div>
  );
}
