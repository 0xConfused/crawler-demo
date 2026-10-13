// SPDX-License-Identifier: AGPL-3.0-or-later

import { DirectoryRecord, DirectoryTreeNode, FileRecord, FileCategory } from '../types';

export function normalizeUrl(
  rawUrl: string,
  options: { stripQueryParams?: boolean; stripHash?: boolean } = { stripQueryParams: true, stripHash: true }
): string | null {
  try {
    let urlStr = rawUrl.trim();
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = 'https://' + urlStr;
    }
    const parsed = new URL(urlStr);
    
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }

    if (options.stripHash) {
      parsed.hash = '';
    }

    if (options.stripQueryParams) {
      parsed.search = '';
    }

    parsed.pathname = parsed.pathname.replace(/\/+/g, '/');
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.replace(/\/+$/, '');
    }

    return parsed.href;
  } catch {
    return null;
  }
}

export function canonicalizeApiEndpointUrl(rawUrl: string): { url: string; pathname: string } {
  try {
    let urlStr = rawUrl.trim();
    const isRelative = !/^https?:\/\//i.test(urlStr);
    const parsed = new URL(isRelative ? 'https://dummy.local' + (urlStr.startsWith('/') ? '' : '/') + urlStr : urlStr);

    let cleanPath = parsed.pathname.replace(/\/+/g, '/');
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.replace(/\/+$/, '');
    }
    parsed.pathname = cleanPath;

    if (isRelative) {
      const search = parsed.search ? parsed.search : '';
      return { url: cleanPath + search, pathname: cleanPath };
    }
    return { url: parsed.href, pathname: cleanPath };
  } catch {
    let clean = rawUrl.trim().replace(/\/+/g, '/');
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.replace(/\/+$/, '');
    }
    return { url: clean, pathname: clean };
  }
}

export function isSameDomain(candidateUrl: string, baseDomain: string, allowSubdomains = false): boolean {
  try {
    const candidateHost = new URL(candidateUrl).hostname.toLowerCase();
    const baseHost = baseDomain.toLowerCase();

    if (candidateHost === baseHost) {
      return true;
    }

    if (allowSubdomains) {
      return candidateHost.endsWith('.' + baseHost) || baseHost.endsWith('.' + candidateHost);
    }

    return false;
  } catch {
    return false;
  }
}

const MULTI_PART_TLDS = new Set([
  'co.uk', 'org.uk', 'gov.uk', 'ac.uk', 'net.uk', 'me.uk', 'ltd.uk', 'plc.uk',
  'com.au', 'net.au', 'org.au', 'edu.au', 'gov.au', 'asn.au', 'id.au',
  'co.jp', 'ne.jp', 'or.jp', 'ac.jp', 'go.jp', 'ed.jp',
  'co.nz', 'net.nz', 'org.nz', 'govt.nz', 'ac.nz',
  'com.br', 'net.br', 'org.br', 'gov.br', 'edu.br',
  'com.mx', 'org.mx', 'edu.mx', 'gob.mx', 'net.mx',
  'co.in', 'net.in', 'org.in', 'gen.in', 'firm.in', 'ind.in', 'nic.in', 'ac.in', 'edu.in', 'gov.in',
  'com.sg', 'edu.sg', 'gov.sg', 'net.sg', 'org.sg',
  'co.za', 'net.za', 'org.za', 'web.za', 'gov.za',
  'com.tr', 'net.tr', 'org.tr', 'edu.tr', 'gov.tr',
  'com.hk', 'org.hk', 'net.hk', 'edu.hk', 'gov.hk',
  'com.tw', 'org.tw', 'net.tw', 'edu.tw', 'gov.tw',
  'com.cn', 'net.cn', 'org.cn', 'gov.cn', 'edu.cn',
  'gc.ca', 'qc.ca', 'ab.ca', 'bc.ca', 'on.ca',
]);

export function extractApexDomain(hostname: string): string {
  if (!hostname) return '';
  const clean = hostname.toLowerCase().trim().replace(/:\d+$/, '').replace(/^\.+|\.+$/g, '');
  
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(clean) || clean.includes(':')) {
    return clean;
  }

  const parts = clean.split('.').filter(Boolean);
  if (parts.length <= 2) return clean;

  const lastTwo = parts.slice(-2).join('.');
  if (MULTI_PART_TLDS.has(lastTwo) && parts.length >= 3) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

export function extractDirectoryPaths(pathnameOrUrl: string): string[] {
  let pathname = pathnameOrUrl;
  try {
    if (pathnameOrUrl.startsWith('http://') || pathnameOrUrl.startsWith('https://')) {
      pathname = new URL(pathnameOrUrl).pathname;
    }
  } catch {
    // fallback to original
  }

  pathname = pathname.replace(/\/+/g, '/');
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }

  const segments = pathname.split('/').filter(Boolean);
  const directories = new Set<string>();
  directories.add('/'); 

  let current = '';
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isLast = i === segments.length - 1;
    const hasFileExtension = /\.[a-zA-Z0-9]{1,8}$/.test(seg);

    if (isLast && hasFileExtension) {
      break;
    }

    current += '/' + seg;
    const dirPath = current.endsWith('/') ? current : current + '/';
    directories.add(dirPath);
  }

  return Array.from(directories);
}

export function buildSingleDomainDirectoryTree(
  directories: DirectoryRecord[],
  files: FileRecord[] = [],
  domain?: string
): DirectoryTreeNode {
  const rootNode: DirectoryTreeNode = {
    name: domain || 'root',
    fullPath: '/',
    domain,
    depth: 0,
    directUrls: [],
    totalDescendantUrls: 0,
    children: {},
    files: [],
  };

  const rootRecord = directories.find((d) => d.path === '/');
  if (rootRecord) {
    rootNode.directUrls = rootRecord.directPageUrls;
  }

  const sorted = [...directories].sort((a, b) => a.depth - b.depth);

  for (const record of sorted) {
    if (record.path === '/') continue;

    const segments = record.path.split('/').filter(Boolean);
    let currentNode = rootNode;
    let accumulatedPath = '';

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      accumulatedPath += '/' + seg;
      const fullPath = accumulatedPath + '/';

      if (!currentNode.children[seg]) {
        currentNode.children[seg] = {
          name: seg,
          fullPath: fullPath,
          domain,
          depth: i + 1,
          directUrls: [],
          totalDescendantUrls: 0,
          children: {},
          files: [],
        };
      }

      currentNode = currentNode.children[seg];
    }

    currentNode.directUrls = record.directPageUrls;
  }

  for (const file of files) {
    let targetNode: DirectoryTreeNode | null = null;
    if (file.directory === '/') {
      targetNode = rootNode;
    } else {
      const segments = file.directory.split('/').filter(Boolean);
      let curr = rootNode;
      for (const seg of segments) {
        if (curr.children[seg]) {
          curr = curr.children[seg];
        } else {
          break;
        }
      }
      if (curr.fullPath === file.directory) {
        targetNode = curr;
      }
    }

    if (targetNode) {
      if (!targetNode.files) targetNode.files = [];
      targetNode.files.push(file);
    }
  }

  function calculateTotals(node: DirectoryTreeNode): number {
    let total = node.directUrls.length + (node.files?.length || 0);
    for (const childKey of Object.keys(node.children)) {
      total += calculateTotals(node.children[childKey]);
    }
    node.totalDescendantUrls = total;
    return total;
  }

  calculateTotals(rootNode);
  return rootNode;
}

export function buildMultiHostDirectoryTree(
  directories: DirectoryRecord[],
  files: FileRecord[] = []
): DirectoryTreeNode {
  const domainSet = new Set<string>();
  directories.forEach((d) => {
    if (d.domain) domainSet.add(d.domain);
  });
  files.forEach((f) => {
    if (f.domain) domainSet.add(f.domain);
  });

  const domains = Array.from(domainSet).sort((a, b) => a.localeCompare(b));

  if (domains.length <= 1) {
    return buildSingleDomainDirectoryTree(directories, files, domains[0]);
  }

  const multiHostRoot: DirectoryTreeNode = {
    name: 'All Subdomains',
    fullPath: '::ALL_HOSTS::',
    depth: 0,
    directUrls: [],
    totalDescendantUrls: 0,
    children: {},
    files: [],
    isDomainRoot: false,
  };

  for (const domain of domains) {
    const domainDirs = directories.filter((d) => d.domain === domain || (!d.domain && domain === domains[0]));
    const domainFiles = files.filter((f) => f.domain === domain || (!f.domain && domain === domains[0]));

    const subTree = buildSingleDomainDirectoryTree(domainDirs, domainFiles, domain);
    subTree.name = domain;
    subTree.fullPath = `${domain}::/`;
    subTree.isDomainRoot = true;
    subTree.domain = domain;
    multiHostRoot.children[domain] = subTree;
  }

  let totalAll = 0;
  for (const domKey of Object.keys(multiHostRoot.children)) {
    totalAll += multiHostRoot.children[domKey].totalDescendantUrls;
  }
  multiHostRoot.totalDescendantUrls = totalAll;

  return multiHostRoot;
}

export function buildDirectoryTree(
  directories: DirectoryRecord[],
  files: FileRecord[] = [],
  selectedDomain?: string
): DirectoryTreeNode {
  if (selectedDomain && selectedDomain !== 'all') {
    const filteredDirs = directories.filter((d) => !d.domain || d.domain === selectedDomain);
    const filteredFiles = files.filter((f) => !f.domain || f.domain === selectedDomain);
    return buildSingleDomainDirectoryTree(filteredDirs, filteredFiles, selectedDomain);
  }

  const domainSet = new Set<string>();
  directories.forEach((d) => {
    if (d.domain) domainSet.add(d.domain);
  });
  files.forEach((f) => {
    if (f.domain) domainSet.add(f.domain);
  });

  if (domainSet.size > 1) {
    return buildMultiHostDirectoryTree(directories, files);
  }

  return buildSingleDomainDirectoryTree(directories, files, Array.from(domainSet)[0]);
}

export function getFileCategoryColor(category?: FileCategory): { bg: string; text: string; border: string; className: string } {
  switch (category) {
    case 'code':
    case 'script':
      return { bg: 'bg-[#c30800]', text: 'text-[#0c0c0f]', border: 'border-[#c30800]', className: 'tag tag-sm tag-accent !text-[#0c0c0f] font-bold uppercase shrink-0' };
    default:
      return { bg: 'bg-[#141414]', text: 'text-[#c30800]', border: 'border-[#c30800]/50', className: 'tag tag-sm tag-accent-outline font-bold uppercase shrink-0' };
  }
}

export function exportDirectoriesAsTxt(
  directories: DirectoryRecord[],
  baseUrl?: string,
  files?: FileRecord[],
  mode: 'dirs' | 'files' | 'all' = 'dirs'
): string {
  let defaultOrigin = '';
  if (baseUrl) {
    try {
      defaultOrigin = new URL(baseUrl).origin;
    } catch {}
  }

  const lines: string[] = [];

  if (mode === 'dirs' || mode === 'all') {
    const sortedDirs = [...directories].sort((a, b) => (a.domain || '').localeCompare(b.domain || '') || a.path.localeCompare(b.path));
    for (const d of sortedDirs) {
      const dirOrigin = d.domain ? `https://${d.domain}` : defaultOrigin;
      lines.push(dirOrigin ? `${dirOrigin}${d.path}` : d.path);
    }
  }

  if (mode === 'files' || mode === 'all') {
    const sortedFiles = [...(files || [])].sort((a, b) => (a.domain || '').localeCompare(b.domain || '') || a.path.localeCompare(b.path));
    for (const f of sortedFiles) {
      const fileOrigin = f.domain ? `https://${f.domain}` : defaultOrigin;
      lines.push(fileOrigin ? `${fileOrigin}${f.path}` : f.url || f.path);
    }
  }

  return lines.join('\n');
}

export function exportDirectoriesAsCsv(
  directories: DirectoryRecord[],
  baseUrl?: string,
  files: FileRecord[] = [],
  mode: 'dirs' | 'files' | 'all' = 'all'
): string {
  let defaultOrigin = '';
  if (baseUrl) {
    try {
      defaultOrigin = new URL(baseUrl).origin;
    } catch {
      defaultOrigin = '';
    }
  }

  const rows = [
    ['Type', 'Subdomain / Host', 'Path / Filename', 'Category', 'Where Found', 'Full URL', 'Depth Level', 'Direct Count / Ext', 'First Discovered'].join(','),
  ];

  if (mode === 'dirs' || mode === 'all') {
    const sortedDirs = [...directories].sort((a, b) => (a.domain || '').localeCompare(b.domain || '') || a.path.localeCompare(b.path));
    for (const dir of sortedDirs) {
      const host = dir.domain || (defaultOrigin ? new URL(defaultOrigin).hostname : 'main');
      const dirOrigin = dir.domain ? `https://${dir.domain}` : defaultOrigin;
      const fullUrl = dirOrigin ? `${dirOrigin}${dir.path}` : dir.path;
      const foundOn = dir.foundOnUrl || (dir.directPageUrls.length > 0 ? dir.directPageUrls[0] : fullUrl);
      const dateStr = dir.firstDiscoveredAt ? new Date(dir.firstDiscoveredAt).toISOString() : '';
      rows.push(
        [
          '"Directory"',
          `"${host}"`,
          `"${dir.path}"`,
          '"Directory"',
          `"${foundOn}"`,
          `"${fullUrl}"`,
          dir.depth,
          `"${dir.directPageUrls.length} pages"`,
          `"${dateStr}"`,
        ].join(',')
      );
    }
  }

  if (mode === 'files' || mode === 'all') {
    const sortedFiles = [...files].sort((a, b) => (a.domain || '').localeCompare(b.domain || '') || a.path.localeCompare(b.path));
    for (const f of sortedFiles) {
      const host = f.domain || (defaultOrigin ? new URL(defaultOrigin).hostname : 'main');
      const fileOrigin = f.domain ? `https://${f.domain}` : defaultOrigin;
      const fullUrl = fileOrigin ? `${fileOrigin}${f.path}` : f.url;
      const dateStr = f.firstDiscoveredAt ? new Date(f.firstDiscoveredAt).toISOString() : '';
      rows.push(
        [
          '"File"',
          `"${host}"`,
          `"${f.path}"`,
          `"${f.fileType}"`,
          `"${f.foundOnUrl}"`,
          `"${fullUrl}"`,
          f.depth,
          `".${f.extension}"`,
          `"${dateStr}"`,
        ].join(',')
      );
    }
  }

  return rows.join('\n');
}

export function exportDirectoriesAsSitemapXml(
  directories: DirectoryRecord[],
  baseUrl: string,
  files: FileRecord[] = []
): string {
  let origin = '';
  try {
    origin = new URL(baseUrl).origin;
  } catch {
    origin = baseUrl.replace(/\/+$/, '');
  }

  const sorted = [...directories].sort((a, b) => a.path.localeCompare(b.path));
  const sortedFiles = [...files].sort((a, b) => a.path.localeCompare(b.path));
  const dateStr = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const dir of sorted) {
    const loc = `${origin}${dir.path}`;
    const priority = dir.depth === 0 ? '1.0' : dir.depth === 1 ? '0.8' : '0.6';
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const f of sortedFiles) {
    const loc = `${origin}${f.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(loc)}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.5</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export function safeClampInput(text: string | null | undefined, maxLen = 200): string {
  if (!text) return '';
  let str = String(text);
  try {
    str = str.normalize('NFC');
  } catch {
    // ignore
  }
  const codePoints = Array.from(str);
  if (codePoints.length <= maxLen) {
    return str;
  }
  return codePoints.slice(0, maxLen).join('');
}

