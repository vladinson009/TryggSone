import { Metadata } from 'next';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FieldSeparator } from '@/components/ui/field';
import AuthForm from './components/auth-form';
import AuthFormHeader from './components/auth-form-header';
import AuthFormFooter from './components/auth-form-footer';
import AuthFormProvidersButtons from './components/auth-form-providers-btns';

export const metadata: Metadata = {
  title: 'TryggSone: Authentication',
  description: 'User authentication page',
};

export default function AuthenticationPage() {
  return (
    <Card className="w-full sm:max-w-md m-auto ring-0 shadow-none bg-background">
      <CardHeader>
        <AuthFormHeader />
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <AuthForm />
        <FieldSeparator />
        <AuthFormProvidersButtons />
      </CardContent>

      <CardFooter className="flex flex-col gap-5">
        <AuthFormFooter />
      </CardFooter>
    </Card>
  );
}
