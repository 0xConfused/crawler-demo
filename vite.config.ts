// SPDX-License-Identifier: AGPL-3.0-or-later

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { execSync } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function crawlerFullPlugin(): Plugin {
  return {
    name: 'crawler-full-sync-plugin',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && (req.url.startsWith('/crawler_full.zip') || req.url.startsWith('/crawler_full_manifest.json'))) {
          try {
            execSync('node scripts/pack-crawler-full.mjs', { stdio: 'ignore' });
          } catch {}
        }
        next();
      });
    },
    closeBundle() {
      try {
        execSync('node scripts/pack-crawler-full.mjs', { stdio: 'inherit' });
      } catch {}
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [crawlerFullPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: false,
    },
  };
});


