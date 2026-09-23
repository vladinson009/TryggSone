'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Bike, LogOut, UserCircle2 } from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NavigationHeader() {
  const { data } = authClient.useSession();
  const t = useTranslations('Navigation');

  return (
    <header className="border-y">
      <div className="flex justify-between items-center container mx-auto my-1">
        <div>
          <Link href="/">
            <Bike />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/" />}>
                {t('home')}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {!!data?.session && <AuthUser />}
              {!data?.session && <GuestUser />}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </header>
  );

  function AuthUser() {
    return (
      <Button onClick={async () => await authClient.signOut()}>
        <LogOut />
        {t('sign-out')}
      </Button>
    );
  }
  function GuestUser() {
    return (
      <NavigationMenuLink render={<Link href="/auth" />}>
        <UserCircle2 />
        {t('sign-in')}
      </NavigationMenuLink>
    );
  }
}
