import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function CustomSheetTrigger() {
  return (
    <SheetTrigger
      render={
        <Button variant="secondary">
          <Menu />
          <span>Menu</span>
        </Button>
      }
    />
  );
}
