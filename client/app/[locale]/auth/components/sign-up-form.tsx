'use client';
import { Button } from '@/components/ui/button';
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
import { toast } from '@/components/ui/toast';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const registerSchema = z
  .object({
    email: z.email(),
    name: z.string().min(1),
    password: z.string().min(10, 'Password must be at least 10 characters long'),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords does not match',
      });
    }
  });

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  //TODO: submit handler
  async function onSubmit(formData: z.infer<typeof registerSchema>) {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });
    if (error && error.code === 'INVALID_EMAIL_OR_PASSWORD') {
      return form.setError('email', { message: error.message });
    }
    router.push('/');

    toast.add({
      title: (
        <span>
          Welcome,
          <span className="text-secondary-foreground"> {data?.user.name}</span>
        </span>
      ),
      description: <span>Successfull registration</span>,
    });
  }

  return (
    <Card className="w-full sm:max-w-md m-auto ring-0 shadow-none bg-background">
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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-name">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-confirmPassword">
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="register-form-password"
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
        <div className="flex flex-wrap justify-between gap-4 w-full">
          <Link className="hover:underline underline-offset-4" href="/">
            Forgot password?
          </Link>
          <Link
            className="hover:underline underline-offset-4"
            href={{
              pathname: pathname,
              query: {
                ...Object.fromEntries(searchParams.entries()),
                mode: 'signin',
              },
            }}
          >
            Already have an account? Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
