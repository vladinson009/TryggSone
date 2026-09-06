import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/index.js';
import * as schema from '../db/auth-schema.js';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  trustedOrigins: ['https://localhost.dev', process.env.BASE_URL! ?? ''],

  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
  }),

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github'],
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: { enabled: true, requireEmailVerification: false },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ token, url, user }) => {
      //TODO Resend logic
      // No need to manually change the fields in DB. Url handle this for us
    },
  },
  plugins: [admin()],
});
