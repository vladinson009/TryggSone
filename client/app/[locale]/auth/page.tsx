import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldSeparator } from '@/components/ui/field';
import FormFooter from './components/form-footer';
import AuthFormsSection from './components/auth-forms-section';
import ProvidersButtons from './components/providers-buttons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TryggSone: Authentication',
  description: 'User authentication page',
};

export default function AuthenticationPage() {
  return (
    <Card className="w-full sm:max-w-md m-auto ring-0 shadow-none bg-background">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
        <ProvidersButtons />
      </CardHeader>
      <FieldSeparator />
      <CardContent>
        <AuthFormsSection />
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <FormFooter />
      </CardFooter>
    </Card>
  );
}
