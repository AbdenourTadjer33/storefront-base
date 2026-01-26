import { getLocaleDir } from "@i18n/config"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { NextIntlClientProvider, useLocale } from "next-intl"
import {getLocale, getMessages} from 'next-intl/server';
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages();

  return (
    <html lang={locale} dir={getLocaleDir(locale)} data-mode="light">
      <body>
        <main className="relative">
          <NextIntlClientProvider messages={messages}>
            {props.children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  )
}
