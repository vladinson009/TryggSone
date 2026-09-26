'use client';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useState } from 'react';
import CustomSheetTrigger from './sheet-trigger';
import { MenuTypes } from './types';
import MainSheet from './sheets/main-sheet';
import UserSheet from './sheets/user-sheet';
import BikesSheet from './sheets/bikes-sheet';

export default function NavigationSheet() {
  const [menuStack, setMenuStack] = useState<MenuTypes[]>(['main']);

  const currentMenu = menuStack[menuStack.length - 1];

  function navigate(menu: MenuTypes) {
    setMenuStack((stack) => [...stack, menu]);
  }
  function goBack() {
    setMenuStack((stack) => stack.slice(0, -1));
  }

  return (
    <Sheet>
      <CustomSheetTrigger />
      <SheetContent className="px-2 bg-secondary" side="left">
        {currentMenu === 'main' && <MainSheet navigate={navigate} />}
        {currentMenu === 'user' && <UserSheet goBack={goBack} />}
        {currentMenu === 'bikes' && <BikesSheet goBack={goBack} />}
      </SheetContent>
    </Sheet>
  );
}
