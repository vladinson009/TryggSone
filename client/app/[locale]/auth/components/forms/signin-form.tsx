'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { signInSchema } from '../../validators/signin-schema';
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from 'lucide-react';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(userInput: z.infer<typeof signInSchema>) {
    const { data, error } = await authClient.signIn.email({
      email: userInput.email,
      password: userInput.password,
    });
    if (error && error.code === 'INVALID_EMAIL_OR_PASSWORD') {
      return form.setError('email', { message: error.message });
    }
    if (error && error.code === 'EMAIL_NOT_VERIFIED') {
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
      description: <span>Now you are signed in</span>,
    });
  }

  return (
    <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signin-form-email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="signin-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email address"
                  disabled={form.formState.isSubmitting}
                  className="px-10"
                />
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signin-form-password">
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="signin-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  disabled={form.formState.isSubmitting}
                  className="px-10"
                />
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <button
                  disabled={form.formState.isSubmitting}
                  tabIndex={-1}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
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
        <Field>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            form="signin-form"
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
      </FieldGroup>
    </form>
  );
}
