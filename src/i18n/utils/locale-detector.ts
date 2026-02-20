// import { type NextRequest } from 'next/server';
// import { i18nConfig, isValidLocale, type Locale } from '../config';

// interface LocaleDetectorOptions {
//   request: NextRequest;
//   pathname?: string;
// }

// export class LocaleDetector {
//   private request: NextRequest;
//   private pathname: string;

//   constructor({ request, pathname }: LocaleDetectorOptions) {
//     this.request = request;
//     this.pathname = pathname || request.nextUrl.pathname;
//   }

//   /**
//    * Detect locale based on configured detection order
//    */
//   detect(): Locale {
//     for (const method of i18nConfig.detectionOrder) {
//       let locale: Locale | null = null;

//       switch (method) {
//         case 'cookie':
//           locale = this.fromCookie();
//           break;
//         case 'header':
//           locale = this.fromHeader();
//           break;
//         case 'default':
//           locale = i18nConfig.defaultLocale;
//           break;
//       }

//       if (locale && isValidLocale(locale)) {
//         return locale;
//       }
//     }

//     return i18nConfig.defaultLocale;
//   }

//   // /**
//   //  * Extract locale from URL pathname
//   //  */
//   // fromPathname(): Locale | null {
//   //   const segments = this.pathname.split('/').filter(Boolean);
//   //   const potentialLocale = segments[0];

//   //   if (potentialLocale && isValidLocale(potentialLocale)) {
//   //     return potentialLocale;
//   //   }

//   //   return null;
//   // }

//   /**
//    * Get locale from cookie
//    */
//   fromCookie(): Locale | null {
//     const cookieLocale = this.request.cookies.get(i18nConfig.localeCookieName)?.value;

//     if (cookieLocale && isValidLocale(cookieLocale)) {
//       return cookieLocale;
//     }

//     return null;
//   }

//   /**
//    * Parse Accept-Language header
//    */
//   fromHeader(): Locale | null {
//     const acceptLanguage = this.request.headers.get('accept-language');

//     if (!acceptLanguage) {
//       return null;
//     }

//     // Parse: "en-US,en;q=0.9,fr;q=0.8" -> ["en-US", "en", "fr"]
//     const languages = acceptLanguage
//       .split(',')
//       .map(lang => {
//         const [locale, qValue] = lang.trim().split(';');
//         const q = qValue ? parseFloat(qValue.replace('q=', '')) : 1.0;
//         return { locale: locale.split('-')[0], q };
//       })
//       .sort((a, b) => b.q - a.q)
//       .map(item => item.locale);

//     // Find first matching locale from our supported locales
//     for (const lang of languages) {
//       if (isValidLocale(lang)) {
//         return lang;
//       }
//     }

//     return null;
//   }

//   // /**
//   //  * Check if pathname already contains a locale
//   //  */
//   // pathnameHasLocale(): boolean {
//   //   return this.fromPathname() !== null;
//   // }

//   // /**
//   //  * Get pathname without locale prefix
//   //  */
//   // getPathnameWithoutLocale(): string {
//   //   const locale = this.fromPathname();

//   //   if (!locale) {
//   //     return this.pathname;
//   //   }

//   //   // Remove locale from pathname: /fr/products -> /products
//   //   return this.pathname.replace(`/${locale}`, '') || '/';
//   // }

//   // /**
//   //  * Add locale to pathname
//   //  */
//   // addLocaleToPathname(locale: Locale): string {
//   //   const pathnameWithoutLocale = this.getPathnameWithoutLocale();

//   //   // Handle default locale based on URL strategy
//   //   if (
//   //     i18nConfig.urlStrategy === 'prefix-except-default' &&
//   //     locale === i18nConfig.defaultLocale
//   //   ) {
//   //     return pathnameWithoutLocale;
//   //   }

//   //   return `/${locale}${pathnameWithoutLocale}`;
//   // }
// }

// /**
//  * Utility function for quick locale detection
//  */
// export function detectLocale(request: NextRequest): Locale {
//   const detector = new LocaleDetector({ request });
//   return detector.detect();
// }

// ==========================================
// STEP 2: Handle i18n Locale Detection
// ==========================================
// const detector = new LocaleDetector({ request, pathname })
// const detectedLocale = detector.detect()

// // Handle different URL strategies
// if (i18nConfig.urlStrategy === "prefix-except-default") {
//   // Strategy: Default locale has no prefix, others do

//   if (pathnameLocale) {
//     // URL has a locale prefix (e.g., /fr/products, /ar/checkout)

//     if (pathnameLocale === i18nConfig.defaultLocale) {
//       // URL has default locale prefix, but shouldn't → redirect to remove it
//       // /en/products → /products
//       const pathnameWithoutLocale = detector.getPathnameWithoutLocale()
//       response = NextResponse.redirect(
//         new URL(pathnameWithoutLocale + request.nextUrl.search, request.url)
//       )
//     } else {
//       // URL has non-default locale prefix, this is correct → continue
//       response = NextResponse.next()
//     }

//     // Set locale cookie to match URL
//     response.cookies.set(i18nConfig.localeCookieName, pathnameLocale, {
//       maxAge: i18nConfig.localeCookieExpiry * 24 * 60 * 60,
//       path: "/",
//       httpOnly: false,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV === "production",
//     })
//   } else {
//     // URL has no locale prefix (e.g., /products, /checkout)

//     if (detectedLocale === i18nConfig.defaultLocale) {
//       // Detected locale is default, no prefix needed → continue
//       response = NextResponse.next()
//     } else {
//       // Detected locale is NOT default, needs prefix → redirect
//       // /products → /fr/products
//       const newPathname = `/${detectedLocale}${pathname}`
//       response = NextResponse.redirect(
//         new URL(newPathname + request.nextUrl.search, request.url)
//       )
//     }

//     // Set locale cookie
//     response.cookies.set(i18nConfig.localeCookieName, detectedLocale, {
//       maxAge: i18nConfig.localeCookieExpiry * 24 * 60 * 60,
//       path: "/",
//       httpOnly: false,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV === "production",
//     })
//   }
// } else {
//   // Strategy: 'prefix' - All locales always have prefix

//   if (pathnameLocale) {
//     // URL has locale prefix → continue
//     response = NextResponse.next()

//     // Update locale cookie to match URL
//     response.cookies.set(i18nConfig.localeCookieName, pathnameLocale, {
//       maxAge: i18nConfig.localeCookieExpiry * 24 * 60 * 60,
//       path: "/",
//       httpOnly: false,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV === "production",
//     })
//   } else {
//     // URL has no locale prefix → redirect with detected locale
//     const newPathname = `/${detectedLocale}${pathname}`
//     response = NextResponse.redirect(
//       new URL(newPathname + request.nextUrl.search, request.url)
//     )

//     // Set locale cookie
//     response.cookies.set(i18nConfig.localeCookieName, detectedLocale, {
//       maxAge: i18nConfig.localeCookieExpiry * 24 * 60 * 60,
//       path: "/",
//       httpOnly: false,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV === "production",
//     })
//   }
// }

// ==========================================
// STEP 3: Set Medusa Cookies on Response
// ==========================================
