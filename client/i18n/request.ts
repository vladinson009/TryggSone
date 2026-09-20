import { locale as rootLocale } from 'next/root-params';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootLocale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
// import {getTranslations} from 'next-intl/server';
// import {useTranslations} from 'next-intl';
