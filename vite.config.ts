import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Middleware to serve static image assets whether placed in public/, root, or src/assets/
function serveStaticAssets(): Plugin {
  return {
    name: 'serve-static-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.endsWith('.png') || req.url.endsWith('.jpg') || req.url.endsWith('.jpeg') || req.url.endsWith('.webp'))) {
          const cleanUrl = req.url.split('?')[0].replace(/^\//, '');
          const candidatePaths = [
            path.resolve(__dirname, 'public', cleanUrl),
            path.resolve(__dirname, cleanUrl),
            path.resolve(__dirname, 'src/assets', cleanUrl),
          ];
          for (const candidate of candidatePaths) {
            if (fs.existsSync(candidate)) {
              const ext = path.extname(candidate).toLowerCase();
              const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
              res.setHeader('Content-Type', mime);
              fs.createReadStream(candidate).pipe(res);
              return;
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/hpybody/',
    plugins: [react(), tailwindcss(), serveStaticAssets()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
