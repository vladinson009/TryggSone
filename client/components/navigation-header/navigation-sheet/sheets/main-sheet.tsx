import { ModeToggle } from '@/components/theme/theme-toggle';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Link } from '@/i18n/navigation';
import { ChevronRight, HouseIcon, User } from 'lucide-react';
import { MainSheetProps } from '../types';
import TryggLogo from '@/components/trygg-logo';

export default function MainSheet({ navigate }: MainSheetProps) {
  return (
    <>
      <SheetHeader>
        <SheetTitle className="bg-background w-fit rounded-sm px-1 py-0.5">
          <SheetClose
            nativeButton={false}
            render={<TryggLogo className="gap-2 font-semibold text-2xl" />}
          />
        </SheetTitle>
        <div className="flex items-center gap-2 underline underline-offset-3 text-primary">
          <SheetClose
            nativeButton={false}
            render={<Link href="/auth?mode=signin">Sign In</Link>}
          />
          <Separator orientation="vertical" />
          <SheetClose
            nativeButton={false}
            render={<Link href="/auth?mode=signup">Become a member</Link>}
          />
          <Separator orientation="vertical" />
          <ModeToggle />
        </div>
      </SheetHeader>

      <NavigationMenu className="flex-col gap-3 flex-0 max-w-none">
        <NavigationMenuList className="flex-col items-stretch bg-background w-full">
          {/* Home */}
          <NavigationMenuItem
            className="hover:bg-border hover:cursor-pointer"
            render={<SheetClose />}
          >
            <Link href="/">
              <Item>
                <ItemMedia variant="icon">
                  <HouseIcon />
                </ItemMedia>
                <ItemContent className="flex-row justify-between items-center">
                  <ItemTitle>Home</ItemTitle>
                </ItemContent>
              </Item>
            </Link>
          </NavigationMenuItem>
          <Separator />
          {/* User */}
          <NavigationMenuItem
            className="hover:bg-border hover:cursor-pointer"
            onClick={() => navigate('user')}
          >
            <Item>
              <ItemMedia variant="icon">
                <User />
              </ItemMedia>
              <ItemContent className="flex-row justify-between items-center">
                <ItemTitle>User</ItemTitle>
                <ChevronRight />
              </ItemContent>
            </Item>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* //TODO:  */}
        {/* <NavigationMenuList className="flex-col items-stretch bg-background w-full">
          <NavigationMenuItem className="w-full">
            <Item>
              <ItemMedia variant="icon">
                <HouseIcon />
              </ItemMedia>
              <ItemContent className="flex-row justify-between items-center">
                <ItemTitle>Home</ItemTitle>
                <ChevronRight />
              </ItemContent>
            </Item>
          </NavigationMenuItem>
          <Separator />
          <NavigationMenuItem>
            <Item>
              <ItemMedia variant="icon">
                <HouseIcon />
              </ItemMedia>
              <ItemContent className="flex-row justify-between items-center">
                <ItemTitle>Users</ItemTitle>
                <ChevronRight />
              </ItemContent>
            </Item>
          </NavigationMenuItem>
        </NavigationMenuList> */}
      </NavigationMenu>
    </>
  );
}
