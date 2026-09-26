'use client';

import { Button } from '@/components/ui/button';
import { CardAction, CardDescription, CardTitle } from '@/components/ui/card';
import { useRouter } from '@/i18n/navigation';
import { ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AuthFormHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';

  const title =
    mode === 'signin' ? 'Sign in to your account' : 'Sign up to get access';
  const description =
    mode === 'signin' ?
      'Sign in and get access to all of our membership benefits!'
    : 'Sign up by email';

  function onClick() {
    router.back();
  }
  return (
    <>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardAction>
        <Button className="flex items-center" variant="ghost" onClick={onClick}>
          <ChevronLeft />
          <span>Go back</span>
        </Button>
      </CardAction>
    </>
  );
}
