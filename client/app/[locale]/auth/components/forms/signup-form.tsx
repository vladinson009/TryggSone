'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { signUpSchema } from '../../validators/signup-schema';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(formData: z.infer<typeof signUpSchema>) {
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });
    if (error && error.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
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
    <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="signup-form-email"
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
              <FieldLabel htmlFor="signup-form-name">
                Full name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="signup-form-name"
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
              <FieldLabel htmlFor="signup-form-password">
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="signup-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  disabled={form.formState.isSubmitting}
                  className="pr-10"
                />
                <button
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
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-confirmPassword">
                Confirm password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="signup-form-confirmPassword"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm your password"
                autoComplete="off"
                type="password"
                disabled={form.formState.isSubmitting}
                className="pr-10"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            form="signup-form"
          >
            {form.formState.isSubmitting ?
              'Thinking...'
            : <>
                Sign Up
                <ArrowRightIcon />
              </>
            }
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
