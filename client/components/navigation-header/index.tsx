'use client';

import { authClient } from '@/lib/auth-client';
import { Heart, SearchIcon, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import NavigationSheet from './navigation-sheet';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import TryggLogo from '../trygg-logo';
import Container from '../container';
import LanguageToggle from './change-language/change-language';

export default function NavigationHeader() {
  const { data } = authClient.useSession();
  const t = useTranslations('Navigation');
  const isAuth = !!data?.user;

  return (
    <header className="border-y py-1">
      <Container className="flex justify-between items-center my-1">
        {/* Menu Sheet and Logo */}
        <div className="flex items-center gap-4">
          <NavigationSheet />
          <TryggLogo />
        </div>

        {/* Search Bar */}
        <InputGroup className="max-w-1/2">
          <InputGroupInput id="input-button-group" placeholder="Type to search..." />
          <InputGroupAddon align="inline-end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        {/* Quick Access */}
        {/* //TODO: */}
        <div className="flex items-center gap-3">
          <LanguageToggle
            // className="flex flex-col items-center justify-center text-md"/
          >
          </LanguageToggle>
          <Link
            className="flex flex-col items-center justify-center text-md"
            href="/"
          >
            <User className="h-[1.5em] w-[1.5em]" />
            <span>Demo</span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-md"
          >
            <Heart className="h-[1.5em] w-[1.5em]" />
            <span>Demo</span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
