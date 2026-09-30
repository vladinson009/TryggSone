import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
} & Omit<React.ComponentPropsWithRef<T>, 'as' | 'children'>;

export default function Container<T extends ElementType = 'div'>(
  props: ContainerProps<T>,
) {
  const { as, children, className, ...rest } = props;
  const Component = (as ?? 'div') as ElementType;
  // ! Max Width Screen size XL 1280px
  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
