// SPDX-License-Identifier: AGPL-3.0-or-later

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const archiver = require('archiver');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CRAWLER_FULL_DIR = path.resolve(ROOT_DIR, 'crawler_full');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

function createZipArchive() {
  if (typeof archiver === 'function') {
    return archiver('zip', { zlib: { level: 9 } });
  }
  if (archiver && archiver.ZipArchive) {
    return new archiver.ZipArchive({ zlib: { level: 9 } });
  }
  throw new Error('Unsupported archiver module structure');
}

export async function packCrawlerFull() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  if (!fs.existsSync(CRAWLER_FULL_DIR)) {
    fs.mkdirSync(CRAWLER_FULL_DIR, { recursive: true });
  }

  // Ensure .nojekyll in public directory for GitHub Pages
  const noJekyllPath = path.join(PUBLIC_DIR, '.nojekyll');
  if (!fs.existsSync(noJekyllPath)) {
    fs.writeFileSync(noJekyllPath, '', 'utf8');
  }

  // Generate manifest
  const items = fs.readdirSync(CRAWLER_FULL_DIR);
  const manifestFiles = [];

  for (const filename of items) {
    const fullPath = path.join(CRAWLER_FULL_DIR, filename);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      manifestFiles.push({
        path: filename,
        size: stat.size,
        isBase64: false,
        content: content,
      });
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalFiles: manifestFiles.length,
    files: manifestFiles,
  };

  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'crawler_full_manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  // Generate zip archive
  const zipPath = path.join(PUBLIC_DIR, 'crawler_full.zip');
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = createZipArchive();

    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    if (items.length === 0) {
      archive.append(
        '# crawler_full\nDrop complete crawler files here.\n',
        { name: 'README.md' }
      );
    } else {
      archive.directory(CRAWLER_FULL_DIR, false);
    }

    archive.finalize();
  });

  // If dist/ exists, sync files into dist as well
  if (fs.existsSync(DIST_DIR)) {
    fs.copyFileSync(zipPath, path.join(DIST_DIR, 'crawler_full.zip'));
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf8');
    const distIndex = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(distIndex)) {
      fs.copyFileSync(distIndex, path.join(DIST_DIR, '404.html'));
    }
  }

  return { totalFiles: manifestFiles.length };
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  packCrawlerFull()
    .then((res) => console.log(`[pack-crawler-full] Packaged ${res.totalFiles} files into crawler_full.zip`))
    .catch((err) => {
      console.error('[pack-crawler-full error]', err);
      process.exit(1);
    });
}
