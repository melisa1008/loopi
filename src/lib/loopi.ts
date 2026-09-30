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

export const storyFormUrl = import.meta.env.PUBLIC_LOOPI_STORY_FORM_URL || '';
export const commentFormUrl = import.meta.env.PUBLIC_LOOPI_COMMENT_FORM_URL || '';

export const translationLanguages = [
  ['es', 'Español'], ['en', 'English'], ['fr', 'Français'], ['pt', 'Português'],
  ['it', 'Italiano'], ['de', 'Deutsch'], ['nl', 'Nederlands'], ['ca', 'Català'],
  ['pl', 'Polski'], ['uk', 'Українська'], ['ru', 'Русский'], ['tr', 'Türkçe'],
  ['el', 'Ελληνικά'], ['sv', 'Svenska'], ['fi', 'Suomi'], ['ja', '日本語'],
  ['ko', '한국어'], ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['id', 'Bahasa Indonesia'],
  ['vi', 'Tiếng Việt'], ['th', 'ไทย'], ['ms', 'Bahasa Melayu'], ['tl', 'Filipino'],
] as const;
