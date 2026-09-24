import z from 'zod';

export const signUpSchema = z
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
