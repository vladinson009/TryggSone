'use client';

import { useSearchParams } from 'next/navigation';
import SignUpForm from './forms/signup-form';
import SignInForm from './forms/signin-form';
import { useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

const VALID_MODES = ['signin', 'signup'];

export default function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawMode = searchParams.get('mode');
  const currentMode = rawMode === 'signup' ? 'signup' : 'signin';

  useEffect(() => {
    if (rawMode !== null && !VALID_MODES.includes(rawMode)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('mode', currentMode);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [rawMode, currentMode, pathname, router, searchParams]);

  return currentMode === 'signup' ? <SignUpForm /> : <SignInForm />;
}
