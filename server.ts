// SPDX-License-Identifier: AGPL-3.0-or-later

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { createServer as createViteServer } from 'vite';

const require = createRequire(import.meta.url);
const archiver = require('archiver');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CRAWLER_FULL_DIR = path.resolve(__dirname, 'crawler_full');
const DIST_DIR = path.resolve(__dirname, 'dist');

// Ensure crawler_full directory exists
if (!fs.existsSync(CRAWLER_FULL_DIR)) {
  fs.mkdirSync(CRAWLER_FULL_DIR, { recursive: true });
}

app.set('trust proxy', 1);
app.disable('x-powered-by');

function createZipArchive() {
  if (typeof archiver === 'function') {
    return archiver('zip', { zlib: { level: 9 } });
  }
  if (archiver && archiver.ZipArchive) {
    return new archiver.ZipArchive({ zlib: { level: 9 } });
  }
  throw new Error('Unsupported archiver module structure');
}

// Serve zipped contents of crawler_full/ directory
app.get(['/crawler_full.zip', '/api/download-full', '/api/download-complete', '/download/crawler_full.zip'], (_req, res) => {
  try {
    if (!fs.existsSync(CRAWLER_FULL_DIR)) {
      fs.mkdirSync(CRAWLER_FULL_DIR, { recursive: true });
    }

    const zipFilename = 'crawler_full.zip';
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${zipFilename}"`);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const archive = createZipArchive();

    archive.on('warning', (err: { code?: string; message: string }) => {
      if (err.code === 'ENOENT') {
        console.warn('[archiver warning]', err.message);
      } else {
        throw err;
      }
    });

    archive.on('error', (err: Error) => {
      console.error('[archiver error]', err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to create zip archive.' });
      }
    });

    archive.pipe(res);

    const files = fs.readdirSync(CRAWLER_FULL_DIR);
    if (files.length === 0) {
      const defaultNotice =
        '# crawler_full\n\n' +
        'Place the complete crawler distribution files in crawler_full/.\n' +
        'All files in this directory are bundled into this archive automatically.\n';
      archive.append(defaultNotice, { name: 'README.md' });
    } else {
      archive.directory(CRAWLER_FULL_DIR, false);
    }

    archive.finalize();
  } catch (error) {
    console.error('[download-full error]', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error while archiving full version.' });
    }
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(DIST_DIR));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server] Serving on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[server startup failed]', err);
  process.exit(1);
});
