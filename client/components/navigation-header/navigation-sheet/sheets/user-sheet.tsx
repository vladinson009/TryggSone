import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, LogOut, UserStar } from 'lucide-react';
import { UserSheetProps } from '../types';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { authClient } from '@/lib/auth-client';
import { Separator } from '@/components/ui/separator';

export default function UserSheet({ goBack }: UserSheetProps) {
  return (
    <>
      <SheetHeader className="flex flex-row items-center justify-between">
        <button onClick={goBack}>
          <ArrowLeft className="font-semibold" />
        </button>

        <SheetTitle className="text-4xl font-bold">User</SheetTitle>
        <SheetDescription className="flex items-center gap-4 underline underline-offset-3"></SheetDescription>
      </SheetHeader>
      <NavigationMenu className="flex-col gap-3 flex-0 max-w-none">
        <NavigationMenuList className="flex-col items-stretch bg-background w-full">
          {/* Profile */}
          <NavigationMenuItem
            className="hover:bg-border hover:cursor-pointer"
            render={<SheetClose />}
          >
            <Link href="/user/profile">
              <Item>
                <ItemMedia variant="icon">
                  <UserStar />
                </ItemMedia>
                <ItemContent className="flex-row justify-between items-center">
                  <ItemTitle>Profile</ItemTitle>
                </ItemContent>
              </Item>
            </Link>
          </NavigationMenuItem>
          <Separator />
          {/* User */}
          <NavigationMenuItem
            render={<SheetClose />}
            className="hover:bg-border hover:cursor-pointer"
            onClick={async () => await authClient.signOut()}
          >
            <Item>
              <ItemMedia variant="icon">
                <LogOut />
              </ItemMedia>
              <ItemContent className="flex-row justify-between items-center">
                <ItemTitle>Logout</ItemTitle>
              </ItemContent>
            </Item>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
