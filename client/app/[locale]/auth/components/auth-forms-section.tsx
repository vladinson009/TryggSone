'use client';

import { useSearchParams } from 'next/navigation';
import SignUpForm from './signup-form';
import SignInForm from './signin-form';

export default function AuthFormsSection() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';

  return mode === 'signup' ? <SignUpForm /> : <SignInForm />;
}
