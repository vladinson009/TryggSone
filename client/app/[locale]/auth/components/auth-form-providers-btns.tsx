'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

type SocialOptions = Parameters<typeof authClient.signIn.social>[0];
type Provider = SocialOptions['provider'];

export default function AuthFormProvidersButtons() {
  return (
    <>
      {/* Google Button */}
      <Button
        onClick={() => signInWithSocial('google')}
        className="flex gap-2 items-center"
        variant="outline"
      >
        <Image
          src="/icons/google-color.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <span>Continue with Google</span>
      </Button>
      {/* GitHub Button */}
      <Button
        onClick={() => signInWithSocial('github')}
        className="flex gap-2 items-center"
        variant="outline"
      >
        <div
          className="h-5 w-5 bg-foreground
                mask-[url(/icons/github.svg)]
                mask-contain
                mask-no-repeat
                mask-center"
        />
        <span>Continue with GitHub</span>
      </Button>
    </>
  );
}

async function signInWithSocial(provider: Provider) {
  console.log(`Sign ${provider} client here`);

  try {
    const { error } = await authClient.signIn.social({
      provider,
    });

    if (error) {
      console.error(`${provider} authentication failed:`, error);
    }
  } catch (error) {
    console.log(error);
    console.log(`Sign ${provider} client ERROR`);
  }
}
