'use client';
import Link from 'next/link';
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

export default function NavigationHeader() {
  const { data } = authClient.useSession();

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
                Home
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
}

const AuthUser = () => {
  return (
    <Button onClick={async () => await authClient.signOut()}>
      <LogOut />
      Sign out
    </Button>
  );
};
const GuestUser = () => {
  return (
    <NavigationMenuLink render={<Link href="/auth" />}>
      <UserCircle2 />
      Sign In
    </NavigationMenuLink>
  );
};
