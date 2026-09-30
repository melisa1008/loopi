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

## Conectar formularios de Google

La web no guarda historias ni comentarios por sí misma. Esto evita exponer datos privados en la página estática. Crea dos formularios de Google desde tu propia cuenta:

1. **Historias:** título, historia, categoría, idioma, nombre/seudónimo opcional, publicación anónima, petición de cambiar detalles, correo opcional, confirmación de tener 16+ años y aceptación de normas.
2. **Comentarios:** historia a la que responde, comentario, nombre/seudónimo opcional, publicación anónima, correo opcional y aceptación de normas.

Configura los formularios para recibir notificaciones por correo y que las respuestas se guarden en hojas de cálculo privadas. Después:

1. Copia `.env.example` a `.env`.
2. Pega el enlace de cada formulario en su variable correspondiente.
3. Vuelve a publicar la web.

No subas `.env` ni compartas contraseñas, hojas privadas ni enlaces de edición.

## Moderación privada

Tu cuenta de Google será la única con acceso de edición a las hojas de respuestas. En cada una crea o usa una columna `Estado` con estos valores:

- `Nuevo`
- `Por revisar`
- `Aceptado y publicado`
- `Rechazado`

El panel visual con esos estados y la publicación automática al aprobar requieren una integración segura adicional entre la hoja privada y el sitio publicado. No debe implementarse solo en el navegador, porque expondría tus datos de moderación. Esta primera versión deja la web pública lista y no publica ningún envío automáticamente.

## Añadir una historia aprobada

Las historias públicas están en `src/content/stories/`. Cada archivo Markdown incluye título, texto, autor visible, categoría, etiquetas, idioma y fecha. Crea o actualiza solo contenido que ya hayas aprobado.
