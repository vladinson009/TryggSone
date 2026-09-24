import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProvidersButtons() {
  return (
    <>
      <Button className="flex gap-2 items-center" variant="outline">
        <Image
          src="/icons/google-color.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <span>Continue with Google</span>
      </Button>
      <Button className="flex gap-2 items-center" variant="outline">
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
