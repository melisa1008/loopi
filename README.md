# Loopi

Loopi es una web comunitaria de historias de texto. Las personas envían historias, comentarios y respuestas mediante formularios; todo debe moderarse antes de publicarse.

## Lo que ya incluye

- Portada, historias destacadas, recientes y categorías.
- Páginas de historia, normas, privacidad y envío.
- Nombre, seudónimo o anonimato en los textos publicados.
- Aviso de privacidad para solicitar cambios de nombres y detalles identificables.
- Selector de interfaz en español, inglés y francés, más un selector de traducción externa para muchos idiomas.
- PWA instalable.

## Ejecutar localmente

Necesitas Node.js 20.3 o superior. Después ejecuta:

```bash
npm install
npm run dev
```

Para crear la versión publicable:

```bash
npm run build
```

## Envíos y moderación dentro de Loopi

Loopi usa Supabase para recibir historias y moderarlas desde `/admin/`, sin Google Forms ni GitHub. La web pública solo puede leer historias con estado `published`; los envíos nuevos quedan en `pending`.

### Configuración inicial (una sola vez)

1. Crea un proyecto gratuito en [Supabase](https://supabase.com).
2. En **SQL Editor**, ejecuta el contenido completo de `supabase/schema.sql`.
3. Copia `.env.example` como `.env` y completa `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` desde **Settings → API**.
4. En **Authentication → URL Configuration**, añade `https://melisa1008.github.io/admin/` a las URL de redirección permitidas (y la URL local si vas a probar en tu ordenador).
5. Publica Loopi y entra una vez en `/admin/` con tu correo. En **Authentication → Users**, copia el UUID que se haya creado y ejecuta la última instrucción de `supabase/schema.sql` para convertir esa cuenta en administradora.
6. Añade las mismas dos variables de entorno en la configuración de tu alojamiento antes de publicar.

La clave anónima es pública por diseño. Nunca uses ni publiques la clave `service_role`: las reglas de la base de datos protegen los envíos y permiten moderar solo a tu cuenta administradora.

### Uso diario

- Las personas envían historias en `/es/enviar/` (o cualquier idioma de Loopi).
- Tú inicias sesión en `/admin/` y puedes corregir, publicar, rechazar o eliminar cada historia.
- Al publicarla, queda disponible en la portada y en la sección de historias sin crear archivos Markdown ni salir de Loopi.
