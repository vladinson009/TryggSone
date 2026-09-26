import { Link } from '@/i18n/navigation';
import { cn } from 'cn';
import { Bike } from 'lucide-react';

export default function TryggLogo({ className }: { className?: string }) {
  return (
    <Link className={cn('flex items-center', className)} href="/">
      <Bike className="w-[1em] h-[1em]" />
      <span className="tracking-widest">TryggSone</span>
    </Link>
  );
}
