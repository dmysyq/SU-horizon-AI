import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  whiteText?: boolean;
  showText?: boolean;
  size?: number;
}

export function Logo({ whiteText, size = 40, showText = true }: LogoProps) {
  return (
    <Link href="/">
      <div className={cn('flex w-fit items-center', showText && 'gap-2')}>
        <Image src="/logo.svg" alt="SU-Horizon AI" width={size} height={size} unoptimized />
        {showText && (
          <span className={cn('text-xl font-bold select-none', whiteText && 'text-white')}>
            SU-Horizon AI
          </span>
        )}
      </div>
    </Link>
  );
}
