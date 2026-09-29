import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    // `import photo from './photo.jpg?responsive'` → WebP at up to four widths
    // (never upscaled), with a srcset. See src/lib/picture.ts for the shape.
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has('responsive')
          ? new URLSearchParams({ w: '400;800;1200;1800', format: 'webp', quality: '72', as: 'picture' })
          : new URLSearchParams(),
    }),
  ],
})
