'use client';
import { Controller, useForm } from 'react-hook-form';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
const loginSchema = z.object({
  email: z.email(),
  //   name: z.string().min(10, 'Name must be at least 10 characters long'),
  password: z.string().min(10, 'Password must be at least 10 characters long'),
});

export default function AuthenticationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      //   name: '',
      password: '',
    },
  });

  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      //   name: formData.name,
      password: formData.password,
    });
    if (error && error.code === 'INVALID_EMAIL_OR_PASSWORD') {
      return form.setError('email', { message: error.message });
    }
    router.push('/');
    if (!data) {
      return;
    }
    toast.add({
      title: (
        <span>
          Welcome,
          <span className="text-secondary-foreground"> {data.user.name}</span>
        </span>
      ),
      description: <span>Successfull registration</span>,
    });
  }

  return (
    <Card className="w-full sm:max-w-md m-auto ring-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
        <Button className="flex gap-2 items-center" variant="outline">
          <Image
            src="/icons/google-color.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span>Sign In with Google</span>
        </Button>
        <Button className="flex gap-2 items-center" variant="outline">
          <div
            className="h-5 w-5 bg-foreground
               mask-[url(/icons/github.svg)]
               mask-contain
               mask-no-repeat
               mask-center"
          />
          <span>Sign In with GitHub</span>
        </Button>
      </CardHeader>
      <FieldSeparator />
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-email">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email address"
                    disabled={form.formState.isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-password">
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="login-form-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      type={showPassword ? 'text' : 'password'}
                      disabled={form.formState.isSubmitting}
                      className="pr-10"
                    />
                    <button onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ?
                        <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      : <EyeOffIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      }
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Field orientation="vertical">
          {/* <Button
            disabled={form.formState.isSubmitting}
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button> */}
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            form="login-form"
          >
            {form.formState.isSubmitting ?
              'Thinking...'
            : <>
                Sign In
                <ArrowRightIcon />
              </>
            }
          </Button>
        </Field>
        <div className="flex justify-between w-full">
          <Link className="hover:underline underline-offset-4" href="/">
            Forgot password?
          </Link>
          <Link className="hover:underline underline-offset-4" href="/">
            New user? Create an account
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
