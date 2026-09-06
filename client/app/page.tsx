'use client';

import { authClient } from '@/lib/auth-client';

export default function Home() {
  async function signInWithGitHub() {
    console.log('Sign Github client here');

    try {
      const { error } = await authClient.signIn.social({
        provider: 'github',
      });

      if (error) {
        console.error('GitHub authentication failed:', error);
      }
    } catch (error) {
      console.log(error);
      console.log('Sign Github client ERROR');
    }
  }
  async function testSignUp() {
    try {
      const { data, error } = await authClient.signUp.email({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      console.log('Signup data:', data);
      console.log('Signup error:', error);
    } catch (error) {
      console.log('Test signup credentials catch block here');

      console.log(error);
    }
  }
  async function testSignIn() {
    try {
      const { data, error } = await authClient.signIn.email({
        email: 'test@example.com',
        password: 'password123',
        callbackURL: '/api/bikes',
      });
      console.log('testSignIn data:', data);
      console.log('testSignIn error:', error);
    } catch (error) {
      console.log('testSignIn credentials catch block here');

      console.log(error);
    }
  }
  async function testLogOut() {
    try {
      const { data, error } = await authClient.signOut();
      console.log('testLogOut data:', data);
      console.log('testLogOut error:', error);
    } catch (error) {
      console.log('testLogOut credentials catch block here');

      console.log(error);
    }
  }

  return (
    <div className="container flex flex-col gap-5">
      <button onClick={signInWithGitHub}>Continue with GitHub</button>
      <button onClick={testSignUp}>Test Email Signup</button>
      <button onClick={testSignIn}>Test Email SignIn</button>
      <button onClick={testLogOut}>Test LogOut</button>
    </div>
  );
}
