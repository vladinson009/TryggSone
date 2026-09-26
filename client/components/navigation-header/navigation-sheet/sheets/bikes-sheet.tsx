import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Bike, Boxes, CirclePlus } from 'lucide-react';
import { NestedSheetProps } from '../types';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';

export default function BikesSheet({ goBack }: NestedSheetProps) {
  return (
    <>
      <SheetHeader className="flex flex-row items-center justify-between">
        <button onClick={goBack}>
          <ArrowLeft className="font-semibold" />
        </button>

        <SheetTitle className="text-4xl font-bold">Bikes</SheetTitle>
        <SheetDescription className="flex items-center gap-4 underline underline-offset-3"></SheetDescription>
      </SheetHeader>
      <NavigationMenu className="flex-col gap-3 flex-0 max-w-none">
        <NavigationMenuList className="flex-col items-stretch bg-background w-full">
          {/* My bikes */}
          <NavigationMenuItem
            className="hover:bg-border hover:cursor-pointer"
            render={<SheetClose />}
          >
            <Link href="/bikes/my-bikes">
              <Item>
                <ItemMedia variant="icon">
                  <Bike />
                </ItemMedia>
                <ItemContent className="flex-row justify-between items-center">
                  <ItemTitle>My bikes</ItemTitle>
                </ItemContent>
              </Item>
            </Link>
          </NavigationMenuItem>
          <Separator />
          {/* Register new bike */}
          <NavigationMenuItem
            className="hover:bg-border hover:cursor-pointer"
            render={<SheetClose />}
          >
            <Link href="/bikes/register">
              <Item>
                <ItemMedia variant="icon">
                  <CirclePlus />
                </ItemMedia>
                <ItemContent className="flex-row justify-between items-center">
                  <ItemTitle>Register new bike</ItemTitle>
                </ItemContent>
              </Item>
            </Link>
          </NavigationMenuItem>
          <Separator />
          {/* Bikes catalogue */}
          <NavigationMenuItem
            className="hover:bg-border hover:cursor-pointer"
            render={<SheetClose />}
          >
            <Link href="/bikes">
              <Item>
                <ItemMedia variant="icon">
                  <Boxes />
                </ItemMedia>
                <ItemContent className="flex-row justify-between items-center">
                  <ItemTitle>Bikes catalogue</ItemTitle>
                </ItemContent>
              </Item>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
