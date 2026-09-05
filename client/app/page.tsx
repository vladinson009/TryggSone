'use client';

import { authClient } from '@/lib/auth-client';

export default function Home() {
  async function signInWithGitHub() {
    const { data, error } = await authClient.signIn.social({
      provider: 'github',
    });

    if (error) {
      console.error('GitHub authentication failed:', error);
    }
  }
  async function testSignUp() {
    const { data, error } = await authClient.signUp.email({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    console.log('Signup data:', data);
    console.log('Signup error:', error);
  }

  return (
    <div>
      <button onClick={signInWithGitHub}>Continue with GitHub</button>
      <button onClick={testSignUp}>Test Email Signup</button>
    </div>
  );
}
