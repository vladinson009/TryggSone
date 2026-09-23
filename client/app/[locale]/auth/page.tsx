import { authClient } from '@/lib/auth-client';
import SignInForm from './components/sign-in-form';
import { headers } from 'next/headers';
import SignUpForm from './components/sign-up-form';

type Props = {
  searchParams: Promise<{ mode?: string }>;
};

export default async function AuthenticationPage({ searchParams }: Props) {
  // const a = data?.user;
  const { mode } = await searchParams;
  console.log(mode);
  // console.log(session.data);

  return mode === 'signup' ? <SignUpForm /> : <SignInForm />;
}
