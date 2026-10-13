// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  CrawlConfig,
  CrawlStats,
  DirectoryRecord,
  FileRecord,
  PageRecord,
  ExternalLinkRecord,
  ApiEndpointRecord,
  DomainIntelligence,
  CrtSubdomainsData,
  CrtSubdomainItem,
} from '../types';
import {
  DEMO_CONFIG,
  DEMO_STATS,
  DEMO_DIRECTORIES,
  DEMO_FILES,
  DEMO_PAGES,
  DEMO_EXTERNAL_LINKS,
  DEMO_API_ENDPOINTS,
  DEMO_LOGS,
  DEMO_DOMAIN_INTELLIGENCE,
} from './demoCrawlData';

export interface StoredReconProfile {
  id: string;
  label: string;
  description: string;
  domain: string;
  origin: string;
  config: CrawlConfig;
  stats: CrawlStats;
  directories: DirectoryRecord[];
  files: FileRecord[];
  apiEndpoints: ApiEndpointRecord[];
  externalLinks: ExternalLinkRecord[];
  pages: PageRecord[];
  logs: Array<{ level: 'info' | 'warn' | 'error' | 'success'; message: string; timestamp: number }>;
  domainIntelligence: DomainIntelligence;
  crtSubdomains: CrtSubdomainsData;
  probedSubdomains: Record<string, CrtSubdomainItem>;
}

const OWASP_PROBED_SUBDOMAINS: Record<string, CrtSubdomainItem> = {
  'community.owasp.org': { subdomain: 'community.owasp.org', isLive: true, ip: '104.26.12.31', statusCode: 200, latencyMs: 38, probed: true },
  'cheatsheetseries.owasp.org': { subdomain: 'cheatsheetseries.owasp.org', isLive: true, ip: '185.199.108.153', statusCode: 200, latencyMs: 42, probed: true },
  'api-security.owasp.org': { subdomain: 'api-security.owasp.org', isLive: true, ip: '185.199.109.153', statusCode: 200, latencyMs: 45, probed: true },
  'asvs.owasp.org': { subdomain: 'asvs.owasp.org', isLive: true, ip: '185.199.110.153', statusCode: 200, latencyMs: 39, probed: true },
  'docs.owasp.org': { subdomain: 'docs.owasp.org', isLive: true, ip: '185.199.111.153', statusCode: 200, latencyMs: 41, probed: true },
  'auth.owasp.org': { subdomain: 'auth.owasp.org', isLive: true, ip: '104.26.13.31', statusCode: 200, latencyMs: 50, probed: true },
  'genai.owasp.org': { subdomain: 'genai.owasp.org', isLive: true, ip: '185.199.108.153', statusCode: 200, latencyMs: 44, probed: true },
  'kubernetes-top10.owasp.org': { subdomain: 'kubernetes-top10.owasp.org', isLive: true, ip: '185.199.109.153', statusCode: 200, latencyMs: 46, probed: true },
  'devguide.owasp.org': { subdomain: 'devguide.owasp.org', isLive: true, ip: '185.199.110.153', statusCode: 200, latencyMs: 43, probed: true },
  'llm.owasp.org': { subdomain: 'llm.owasp.org', isLive: true, ip: '185.199.111.153', statusCode: 200, latencyMs: 47, probed: true },
  'nest.owasp.org': { subdomain: 'nest.owasp.org', isLive: true, ip: '104.26.12.31', statusCode: 200, latencyMs: 52, probed: true },
  'giving.owasp.org': { subdomain: 'giving.owasp.org', isLive: true, ip: '104.26.13.31', statusCode: 200, latencyMs: 49, probed: true },
};

// Primary Profile: Real Production Crawl of owasp.org (The only sample)
export const PROFILE_OWASP_ORG: StoredReconProfile = {
  id: 'owasp-org',
  label: 'owasp.org',
  description: 'OWASP Foundation — Production Web Security Matrix (Live Crawled & Discovered Structure)',
  domain: 'owasp.org',
  origin: 'https://owasp.org',
  config: DEMO_CONFIG,
  stats: DEMO_STATS,
  directories: DEMO_DIRECTORIES,
  files: DEMO_FILES,
  apiEndpoints: DEMO_API_ENDPOINTS,
  externalLinks: DEMO_EXTERNAL_LINKS,
  pages: DEMO_PAGES,
  logs: DEMO_LOGS,
  domainIntelligence: DEMO_DOMAIN_INTELLIGENCE,
  crtSubdomains: DEMO_DOMAIN_INTELLIGENCE.crtSubdomains || {
    apexDomain: 'owasp.org',
    count: 95,
    subdomains: [],
    fetchedAt: Date.now(),
    sourceUrl: 'https://crt.sh/?q=%25.owasp.org&output=json',
  },
  probedSubdomains: OWASP_PROBED_SUBDOMAINS,
};

export const STORED_RECON_PROFILES: StoredReconProfile[] = [
  PROFILE_OWASP_ORG,
];

export function getStoredProfile(_idOrDomain?: string): StoredReconProfile {
  return PROFILE_OWASP_ORG;
}
