import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export default createMiddleware({
  ...routing,
  localeDetection: true,
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
