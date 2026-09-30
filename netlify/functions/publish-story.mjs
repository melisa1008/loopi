import { timingSafeEqual } from 'node:crypto';

const respond = (statusCode, body) => new Response(JSON.stringify(body), {
  status: statusCode,
  headers: { 'Content-Type': 'application/json' },
});

const sameSecret = (value, expected) => {
  const left = Buffer.from(value || '');
  const right = Buffer.from(expected || '');
  return left.length === right.length && timingSafeEqual(left, right);
};

const makeSlug = (title) => title
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default async (request) => {
  if (request.method !== 'POST') return respond(405, { message: 'Método no permitido.' });
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!sameSecret(supplied, process.env.LOOPI_ADMIN_PASSWORD)) return respond(401, { message: 'Contraseña incorrecta.' });

  try {
    const { title, author, excerpt, category, tags, body, featured } = await request.json();
    if (![title, excerpt, category, body].every(value => typeof value === 'string' && value.trim())) return respond(400, { message: 'Completa título, resumen, tema e historia.' });
    const slug = makeSlug(title);
    if (!slug) return respond(400, { message: 'El título no es válido.' });
    const date = new Date().toISOString().slice(0, 10);
    const tagList = (tags || '').split(',').map(tag => tag.trim()).filter(Boolean);
    const frontmatter = [
      '---', `title: ${JSON.stringify(title.trim())}`, `excerpt: ${JSON.stringify(excerpt.trim())}`, `date: ${date}`,
      `author: ${JSON.stringify((author || 'Anónimo').trim() || 'Anónimo')}`, `category: ${JSON.stringify(category)}`,
      `tags: [${tagList.map(tag => JSON.stringify(tag)).join(', ')}]`, `featured: ${Boolean(featured)}`, 'language: es', 'draft: false', '---', '', body.trim(), '',
    ].join('\n');
    const path = `src/content/stories/es/${slug}.md`;
    const api = `https://api.github.com/repos/melisa1008/loopi/contents/${path}`;
    const github = await fetch(api, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Publicar historia: ${title.trim()}`, content: Buffer.from(frontmatter).toString('base64'), branch: 'main' }),
    });
    if (github.status === 422) return respond(409, { message: 'Ya existe una historia con ese título. Cambia el título.' });
    if (!github.ok) throw new Error(`GitHub respondió ${github.status}`);
    return respond(201, { message: 'Historia publicada.' });
  } catch (error) {
    return respond(500, { message: error.message || 'No se pudo publicar la historia.' });
  }
};
