import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "ru", "kk"] as const;
export type Locale = (typeof locales)[number];
export const localePrefix = 'as-needed';


export const { Link, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales });
