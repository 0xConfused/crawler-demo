// SPDX-License-Identifier: AGPL-3.0-or-later

import { DirectoryRecord, DirectoryTreeNode, FileRecord, FileCategory } from '../types';

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

