import { Link } from '@/i18n/navigation';
import { PropsWithChildren } from 'react';

type Props = {
  href: string;
  title: string;
};

export default function LinkIcon({
  href,
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Link className="group flex flex-col items-center" href={href}>
      <div className="p-2 rounded-full hover:text-hover-accent transition-all duration-300">
        {children}
      </div>
      <span className="text-muted-foreground group-hover:scale-110 transition-all duration-300">
        {title}
      </span>
    </Link>
  );
}
