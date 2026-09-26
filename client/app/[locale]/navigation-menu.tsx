'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Bike, HouseIcon, LogOut, UserCircle2, UserCircle2Icon } from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const userNav = [
  {
    title: 'Sign in',
    href: '/auth',
    isAuth: false,
  },
  {
    title: 'Sign Out',
    href: '/',
    isAuth: true,
  },
];

export default function NavigationHeader() {
  const { data } = authClient.useSession();
  const t = useTranslations('Navigation');
  const isAuth = !!data?.user;

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
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link href="/">
                    <HouseIcon />
                    <span>{t('home')}</span>
                  </Link>
                }
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-0.5">
                {isAuth ?
                  <Avatar>
                    <AvatarImage
                      src={(data && data.user.image) || ''}
                      alt={data?.user.name[0] || ''}
                    />
                    <AvatarFallback>{data?.user.name[0] || ''}</AvatarFallback>
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                  </Avatar>
                : <UserCircle2Icon />}
                <span>Profile</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li>
                    <NavigationMenuLink
                      render={
                        <Link href="/">
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="leading-none font-medium">Title</div>
                            <div className="line-clamp-2 text-muted-foreground">
                              Component Description
                            </div>
                          </div>
                        </Link>
                      }
                    />
                  </li>

                  <li>
                    <NavigationMenuLink
                      render={
                        <Link href="/">
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="leading-none font-medium">
                              Title Long title Lorem ipsum dolor sit amet.
                            </div>
                            <div className="line-clamp-2 text-muted-foreground">
                              Component Description Ipsum Description
                            </div>
                          </div>
                        </Link>
                      }
                    />
                  </li>
                  <li>
                    <NavigationMenuLink
                      render={
                        <Link href="/">
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="leading-none font-medium">Title</div>
                            <div className="line-clamp-2 text-muted-foreground">
                              Component Name
                            </div>
                          </div>
                        </Link>
                      }
                    />
                  </li>
                  <li>
                    <NavigationMenuLink render={<SignOutBtn />} />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              {/* {!!data?.session && <AuthUser />} */}
              {!data?.session && <GuestUser />}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </header>
  );

  function SignOutBtn() {
    return (
      <Button onClick={async () => await authClient.signOut()}>
        <LogOut />
        <span>{t('sign-out')}</span>
      </Button>
    );
  }
  function GuestUser() {
    return (
      <NavigationMenuLink render={<Link href="/auth" />}>
        <UserCircle2 />
        <span>{t('sign-in')}</span>
      </NavigationMenuLink>
    );
  }
}
