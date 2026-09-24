'use client';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function FormFooter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const rawMode = searchParams.get('mode');
  const currentMode = rawMode === 'signup' ? 'signup' : 'signin';
  const targetMode = currentMode === 'signup' ? 'signin' : 'signup';

  const VALID_MODES = ['signin', 'signup'];

  useEffect(() => {
    if (rawMode !== null && !VALID_MODES.includes(rawMode)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('mode', currentMode);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-between gap-4 w-full">
      <Link
        className="hover:underline underline-offset-4"
        href={{
          pathname: pathname,
          query: {
            ...Object.fromEntries(searchParams.entries()),
            mode: targetMode,
          },
        }}
      >
        {currentMode === 'signin' ?
          'New user? Create an account'
        : 'Already have an account? Sign in'}
      </Link>
      {currentMode === 'signin' && (
        <Link className="hover:underline underline-offset-4" href="/">
          Forgot password?
        </Link>
      )}
    </div>
  );
}
