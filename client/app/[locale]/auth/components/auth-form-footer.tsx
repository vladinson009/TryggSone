'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from 'cn';
import { useSearchParams } from 'next/navigation';

export default function AuthFormFooter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const rawMode = searchParams.get('mode');
  const currentMode = rawMode === 'signup' ? 'signup' : 'signin';
  const targetMode = currentMode === 'signup' ? 'signin' : 'signup';

  return (
    <div className="flex flex-col justify-between gap-4 w-full">
      {currentMode === 'signin' && (
        <>
          <ForgotPasswordLink />
          <JoinCommunityMessage />
        </>
      )}
      <Link
        replace
        className={cn(
          'font-semibold underline underline-offset-3',
          currentMode === 'signup' && 'ml-auto',
        )}
        href={{
          pathname: pathname,
          query: {
            ...Object.fromEntries(searchParams.entries()),
            mode: targetMode,
          },
        }}
      >
        {currentMode === 'signin' ?
          'Become a member'
        : 'Already have an account? Sign in'}
      </Link>
    </div>
  );
}

function ForgotPasswordLink() {
  return (
    <div className="ml-auto">
      <Link className="underline underline-offset-3 font-semibold" href="/">
        Forgot password?
      </Link>
    </div>
  );
}

function JoinCommunityMessage() {
  return (
    <div className="flex flex-col gap-1.5 flex-wrap">
      <span className="font-semibold">Not a member?</span>
      <span>Join our free community and help us to improve our mission :=).</span>
    </div>
  );
}
