export const categories = [
  { id: 'emocional', emoji: '☾', label: 'Triste / emocional' },
  { id: 'romance', emoji: '♡', label: 'Romance' },
  { id: 'graciosa', emoji: '☀', label: 'Graciosa' },
  { id: 'amistad', emoji: '✦', label: 'Amistad' },
  { id: 'familia', emoji: '⌂', label: 'Familia' },
  { id: 'escuela-trabajo', emoji: '✎', label: 'Escuela o trabajo' },
  { id: 'viajes', emoji: '⌁', label: 'Viajes' },
  { id: 'confesion', emoji: '◌', label: 'Confesión' },
  { id: 'superacion', emoji: '↗', label: 'Superación' },
  { id: 'misterio', emoji: '✧', label: 'Misterio' },
  { id: 'otra', emoji: '…', label: 'Otra' },
] as const;

const categoryTranslations = {
  es: ['Triste / emocional', 'Romance', 'Graciosa', 'Amistad', 'Familia', 'Escuela o trabajo', 'Viajes', 'Confesión', 'Superación', 'Misterio', 'Otra'],
  en: ['Sad / emotional', 'Romance', 'Funny', 'Friendship', 'Family', 'School or work', 'Travel', 'Confession', 'Growth', 'Mystery', 'Other'],
  fr: ['Triste / émotionnelle', 'Romance', 'Drôle', 'Amitié', 'Famille', 'École ou travail', 'Voyages', 'Confession', 'Dépassement de soi', 'Mystère', 'Autre'],
  pt: ['Triste / emocional', 'Romance', 'Engraçada', 'Amizade', 'Família', 'Escola ou trabalho', 'Viagens', 'Confissão', 'Superação', 'Mistério', 'Outra'],
  it: ['Triste / emotiva', 'Romantica', 'Divertente', 'Amicizia', 'Famiglia', 'Scuola o lavoro', 'Viaggi', 'Confessione', 'Crescita personale', 'Mistero', 'Altro'],
  de: ['Traurig / emotional', 'Romantik', 'Lustig', 'Freundschaft', 'Familie', 'Schule oder Arbeit', 'Reisen', 'Geständnis', 'Persönliche Entwicklung', 'Geheimnis', 'Andere'],
} as const;

export function categoriesForLanguage(lang: keyof typeof categoryTranslations) {
  return categories.map((category, index) => ({ ...category, label: categoryTranslations[lang][index] }));
}

export const storyFormUrl = import.meta.env.PUBLIC_LOOPI_STORY_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSc3vY8zmNe9wJJFikw9RCX9PEVdkZGoFoRBzTLN5pvZWVcovg/viewform?usp=publish-editor';
export const commentFormUrl = import.meta.env.PUBLIC_LOOPI_COMMENT_FORM_URL || '';

export const translationLanguages = [
  ['es', 'Español'], ['en', 'English'], ['fr', 'Français'], ['pt', 'Português'],
  ['it', 'Italiano'], ['de', 'Deutsch'], ['nl', 'Nederlands'], ['ca', 'Català'],
  ['pl', 'Polski'], ['uk', 'Українська'], ['ru', 'Русский'], ['tr', 'Türkçe'],
  ['el', 'Ελληνικά'], ['sv', 'Svenska'], ['fi', 'Suomi'], ['ja', '日本語'],
  ['ko', '한국어'], ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['id', 'Bahasa Indonesia'],
  ['vi', 'Tiếng Việt'], ['th', 'ไทย'], ['ms', 'Bahasa Melayu'], ['tl', 'Filipino'],
] as const;
