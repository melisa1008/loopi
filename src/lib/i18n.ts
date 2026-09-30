export const languages = ['es', 'en', 'fr'] as const;
export type Lang = (typeof languages)[number];

export const languageNames: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
};

export function isLang(value: string | undefined): value is Lang {
  return !!value && languages.includes(value as Lang);
}

export function localeFromId(id: string): Lang {
  return id.split('/')[0] as Lang;
}

export function slugFromId(id: string) {
  return id.split('/').slice(1).join('/').replace(/\.md$/, '');
}

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}
