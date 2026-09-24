import z from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(10, 'Password must be at least 10 characters long'),
});
