// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  CrawlConfig,
  CrawlStatus,
  CrawlStats,
  DirectoryRecord,
  FileRecord,
  PageRecord,
  ExternalLinkRecord,
  ViewTab,
  DomainIntelligence,
  ApiEndpointRecord,
} from './types';
import { CrawlerHeader } from './components/CrawlerHeader';
import { CrawlForm } from './components/CrawlForm';
import { CrawlMetrics } from './components/CrawlMetrics';
import { DirectoryTreeView } from './components/DirectoryTreeView';
import { DirectoryTableView } from './components/DirectoryTableView';
import { PagesLogView } from './components/PagesLogView';
import { ExternalLinksView } from './components/ExternalLinksView';
import { SubdomainsSansView } from './components/SubdomainsSansView';
import { DomainIntelligenceView } from './components/DomainIntelligenceView';
import { ApiEndpointsView } from './components/ApiEndpointsView';
import { DirectoryDetailModal } from './components/DirectoryDetailModal';
import { ExportModal } from './components/ExportModal';
import { ExternalLinkWarningModal } from './components/ExternalLinkWarningModal';
import { OwnershipWarningModal } from './components/OwnershipWarningModal';
import { LocalDownloadFooter } from './components/LocalDownloadFooter';
import { FolderTree, ListFilter, FileText, ExternalLink, ShieldCheck, Network, Code } from 'lucide-react';
import { extractApexDomain } from './utils/urlUtils';

const INITIAL_CONFIG: CrawlConfig = {
  startUrl: '',
  maxDepth: 3,
  maxPages: 40,
  allowSubdomains: false,
  stripQueryParams: false,
  stripHash: false,
  concurrency: 3,
  requestDelayMs: 150,
  includeRobotsTxt: false,
  includeAiAssistance: false,
  captureApiCalls: false,
  autoQueryApis: false,
  randomizeUserAgent: false,
};

const INITIAL_STATS: CrawlStats = {
  pagesVisited: 0,
  pagesQueued: 0,
  uniqueDirectories: 0,
  uniqueFiles: 0,
  externalLinksCount: 0,
  externalDomainsCount: 0,
  totalLinksFound: 0,
  sameDomainLinksFound: 0,
  apiEndpointsCount: 0,
  errorsCount: 0,
  status2xx: 0,
  status3xx: 0,
  status4xx: 0,
  status5xx: 0,
  startTime: null,
  endTime: null,
  currentUrl: null,
};

export default function App() {
  const [config, setConfig] = useState<CrawlConfig>(INITIAL_CONFIG);
  const [status, setStatus] = useState<CrawlStatus>('idle');
  const [stats, setStats] = useState<CrawlStats>(INITIAL_STATS);
  const [directories, setDirectories] = useState<DirectoryRecord[]>([]);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [externalLinks, setExternalLinks] = useState<ExternalLinkRecord[]>([]);
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpointRecord[]>([]);
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [logs, setLogs] = useState<Array<{ level: 'info' | 'warn' | 'error' | 'success'; message: string; timestamp: number }>>([]);
  const [activeTab, setActiveTab] = useState<ViewTab>('table');
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryRecord | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);
  const [targetOrigin, setTargetOrigin] = useState<string>('');
  const [pendingExternalUrl, setPendingExternalUrl] = useState<string | null>(null);
  const [domainIntelligenceCache, setDomainIntelligenceCache] = useState<Record<string, DomainIntelligence>>({});
  const [whoisTargetDomain, setWhoisTargetDomain] = useState<string | null>(null);
  const [whoisRefreshKey, setWhoisRefreshKey] = useState<number>(0);
  const [showOwnershipWarning, setShowOwnershipWarning] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('0xconfused_ownership_agreed');
    } catch {
      return true;
    }
  });

  const handleAgreeOwnership = () => {
    try {
      sessionStorage.setItem('0xconfused_ownership_agreed', 'true');
    } catch {}
    setShowOwnershipWarning(false);
  };

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href') || '';
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:') || rawHref.startsWith('blob:') || rawHref.startsWith('data:')) {
        return;
      }

      if (anchor.getAttribute('data-bypass-warning') === 'true') {
        return;
      }

      const href = anchor.href;
      if (/^https?:\/\//i.test(href)) {
        try {
          if (sessionStorage.getItem('skip_external_link_warning') === 'true') {
            return;
          }
        } catch {
          // ignore
        }

        e.preventDefault();
        e.stopPropagation();
        setPendingExternalUrl(href);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  const handleConfirmExternalNavigation = (url: string) => {
    setPendingExternalUrl(null);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleUpdateConfig = useCallback((newConfig: Partial<CrawlConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleStopCrawl = useCallback(() => {
    if (eventSourceRef.current) {
      const activeEs = eventSourceRef.current;
      eventSourceRef.current = null;
      try {
        activeEs.close();
      } catch {}
    }
    setStatus('stopped');
    setStats((prev) => ({
      ...prev,
      endTime: prev.endTime || Date.now(),
    }));
    setLogs((prev) => [
      { level: 'warn', message: 'Recon halted by user. Discovered directories, files, and links preserved.', timestamp: Date.now() },
      ...prev,
    ]);
  }, []);

  const handleReset = useCallback(() => {
    handleStopCrawl();
    setStatus('idle');
    setStats(INITIAL_STATS);
    setDirectories([]);
    setFiles([]);
    setExternalLinks([]);
    setApiEndpoints([]);
    setPages([]);
    setLogs([]);
    setSelectedDirectory(null);
    setCurrentDomain(null);
    setTargetOrigin('');
    setWhoisRefreshKey(0);
    setWhoisTargetDomain(null);
  }, [handleStopCrawl]);

  const handleStartCrawl = useCallback((overrideUrl?: string) => {
    const rawUrl = overrideUrl || config.startUrl;
    if (!rawUrl.trim()) return;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    let start = rawUrl.trim();
    if (!/^https?:\/\//i.test(start)) {
      start = 'https://' + start;
    }

    if (overrideUrl) {
      setConfig((prev) => ({ ...prev, startUrl: start }));
    }

    try {
      const parsed = new URL(start);
      const cleanHost = parsed.hostname.toLowerCase().replace(/:\d+$/, '');
      setCurrentDomain(parsed.hostname);
      setTargetOrigin(parsed.origin);
      setWhoisTargetDomain(cleanHost);
    } catch {
      setCurrentDomain(null);
      setTargetOrigin('');
    }

    setStatus('running');

    setPages([]);
    setDirectories([]);
    setFiles([]);
    setExternalLinks([]);
    setApiEndpoints([]);
    setLogs([]);
    setStats({
      ...INITIAL_STATS,
      startTime: Date.now(),
      currentUrl: start,
    });

    const params = new URLSearchParams({
      startUrl: start,
      maxDepth: String(config.maxDepth),
      maxPages: String(config.maxPages),
      allowSubdomains: String(config.allowSubdomains),
      queryCrtSubdomains: String(config.queryCrtSubdomains === true),
      stripQueryParams: String(config.stripQueryParams),
      stripHash: String(config.stripHash),
      concurrency: String(config.concurrency),
      requestDelayMs: String(Math.max(50, config.requestDelayMs || 50)),
      includeRobotsTxt: String(config.includeRobotsTxt !== false),
      includeAiAssistance: String(config.includeAiAssistance === true),
      captureApiCalls: String(config.captureApiCalls !== false),
      autoQueryApis: String(config.autoQueryApis !== false),
      randomizeUserAgent: String(config.randomizeUserAgent === true),
      pathFilter: config.pathFilter || '',
      excludeFilter: config.excludeFilter || '',
    });

    const sseUrl = `/api/crawl/stream?${params.toString()}`;
    const es = new EventSource(sseUrl);
    eventSourceRef.current = es;

    es.addEventListener('init', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        setCurrentDomain(data.baseHostname);
      } catch {}
    });

    es.addEventListener('page', (e: MessageEvent) => {
      try {
        const pageData: PageRecord = JSON.parse(e.data);
        setPages((prev) => [pageData, ...prev]);
      } catch {}
    });

    es.addEventListener('directories_update', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data.directories && Array.isArray(data.directories)) {
          setDirectories(data.directories);
        }
        if (data.files && Array.isArray(data.files)) {
          setFiles(data.files);
        }
        if (data.externalLinks && Array.isArray(data.externalLinks)) {
          setExternalLinks(data.externalLinks);
        }
        if (data.apiEndpoints && Array.isArray(data.apiEndpoints)) {
          setApiEndpoints(data.apiEndpoints);
        }
      } catch {}
    });

    es.addEventListener('stats', (e: MessageEvent) => {
      try {
        const statsData: CrawlStats = JSON.parse(e.data);
        setStats((prev) => ({ ...prev, ...statsData }));
      } catch {}
    });

    es.addEventListener('log', (e: MessageEvent) => {
      try {
        const logData = JSON.parse(e.data);
        setLogs((prev) => [logData, ...prev]);
      } catch {}
    });

    es.addEventListener('error_event', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        setStatus('error');
        setLogs((prev) => [
          {
            level: 'error',
            message: data.message || 'Crawl session could not be established.',
            timestamp: Date.now(),
          },
          ...prev,
        ]);
      } catch {}
      es.close();
      eventSourceRef.current = null;
    });

    es.addEventListener('complete', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        setStatus(data.status === 'stopped' ? 'stopped' : 'completed');
        if (data.directories) {
          setDirectories(data.directories);
        }
        if (data.files) {
          setFiles(data.files);
        }
        if (data.externalLinks) {
          setExternalLinks(data.externalLinks);
        }
        if (data.apiEndpoints && Array.isArray(data.apiEndpoints)) {
          setApiEndpoints(data.apiEndpoints);
        }
      } catch {
        setStatus('completed');
      }
      es.close();
      eventSourceRef.current = null;
    });

    es.onerror = () => {
      if (eventSourceRef.current !== es) {
        return;
      }
      if (es.readyState === EventSource.CLOSED) {
        setStatus((prev) => (prev === 'running' ? 'completed' : prev));
      } else {
        setStatus('error');
        setLogs((prev) => [
          { level: 'error', message: 'Connection to crawler stream was interrupted or completed.', timestamp: Date.now() },
          ...prev,
        ]);
        es.close();
        eventSourceRef.current = null;
      }
    };
  }, [config]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const subdomainsCount = useMemo(() => {
    if (!currentDomain && !config.startUrl) return 0;
    let targetHost = (currentDomain || '').toLowerCase().replace(/:\d+$/, '');
    if (!targetHost && config.startUrl) {
      try {
        let s = config.startUrl.trim();
        if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
        targetHost = new URL(s).hostname.toLowerCase().replace(/:\d+$/, '');
      } catch {}
    }
    const apex = extractApexDomain(targetHost) || targetHost;
    const subHosts = new Set<string>();
    for (const l of externalLinks) {
      const h = (l.domain || '').toLowerCase().trim().replace(/:\d+$/, '');
      const root = (l.rootDomain || extractApexDomain(h) || '').toLowerCase().trim();
      if (
        (apex && (root === apex || h === apex || h.endsWith('.' + apex))) ||
        (targetHost && (h === targetHost || h.endsWith('.' + targetHost)))
      ) {
        if (h !== targetHost) {
          subHosts.add(h);
        }
      }
    }
    return subHosts.size;
  }, [currentDomain, config.startUrl, externalLinks]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0f0f0] flex flex-col font-sans relative">
      {/* Ambient Horizon Diffusion */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(195,8,0,0.06),transparent_70%)] z-0" />

      {/* Header */}
      <CrawlerHeader
        status={status}
        stats={stats}
        currentDomain={currentDomain}
        onOpenExport={() => setShowExportModal(true)}
        onReset={handleReset}
        onStop={handleStopCrawl}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
        {/* URL Input Form & Controls */}
        <CrawlForm
          config={config}
          status={status}
          onUpdateConfig={handleUpdateConfig}
          onStartCrawl={handleStartCrawl}
          onStopCrawl={handleStopCrawl}
        />

        {/* Live Metrics */}
        {(status !== 'idle' || directories.length > 0 || files.length > 0 || externalLinks.length > 0) && (
          <CrawlMetrics stats={stats} status={status} maxPages={config.maxPages} />
        )}

        {/* Views & Explorers */}
        <div className="space-y-4">
          {/* Navigation View Tabs */}
          <div className="flex items-center gap-1 border-b border-[#383838] pb-0 w-full overflow-hidden">
            <div className="flex items-center gap-1 flex-1 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                id="tab-table-btn"
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'table'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <ListFilter className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'table' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>Table</span>
                {(directories.length > 0 || files.length > 0) && (
                  <span className={activeTab === 'table' ? 'tag tag-sm tag-accent font-bold shrink-0' : 'tag tag-sm tag-accent-outline font-bold shrink-0'}>
                    {directories.length + files.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                id="tab-tree-btn"
                onClick={() => setActiveTab('tree')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'tree'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <FolderTree className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'tree' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>Directory Tree</span>
              </button>

              <button
                type="button"
                id="tab-api-btn"
                onClick={() => setActiveTab('api')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'api'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <Code className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'api' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>API Calls</span>
                {apiEndpoints.length > 0 && (
                  <span className={activeTab === 'api' ? 'tag tag-sm tag-accent font-bold shrink-0' : 'tag tag-sm tag-accent-outline font-bold shrink-0'}>
                    {apiEndpoints.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                id="tab-subdomains-sans-btn"
                onClick={() => setActiveTab('subdomains-sans')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'subdomains-sans'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <Network className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'subdomains-sans' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>Subdomains &amp; SANs</span>
                {subdomainsCount > 0 && (
                  <span className={activeTab === 'subdomains-sans' ? 'tag tag-sm tag-accent font-bold shrink-0' : 'tag tag-sm tag-accent-outline font-bold shrink-0'}>
                    {subdomainsCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                id="tab-external-btn"
                onClick={() => setActiveTab('external')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'external'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <ExternalLink className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'external' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>External Links</span>
                {externalLinks.length > 0 && (
                  <span className={activeTab === 'external' ? 'tag tag-sm tag-accent font-bold shrink-0' : 'tag tag-sm tag-accent-outline font-bold shrink-0'}>
                    {externalLinks.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                id="tab-whois-btn"
                onClick={() => setActiveTab('whois')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'whois'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'whois' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>WHOIS &amp; DNS</span>
              </button>

              <button
                type="button"
                id="tab-pages-btn"
                onClick={() => setActiveTab('pages')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-t-2 border-x whitespace-nowrap ${
                  activeTab === 'pages'
                    ? 'bg-[#141414] text-[#f0f0f0] border-t-[#c30800] border-x-[#383838] border-b-[#141414] -mb-[1px] font-bold shadow-sm'
                    : 'border-t-transparent border-x-transparent text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'pages' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                <span>LOGS</span>
                {(logs.length > 0 || pages.length > 0) && (
                  <span className={activeTab === 'pages' ? 'tag tag-sm tag-accent font-bold shrink-0' : 'tag tag-sm tag-accent-outline font-bold shrink-0'}>
                    {logs.length || pages.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active View Container */}
          <div>
            <div className={activeTab === 'table' ? 'block' : 'hidden'}>
              <DirectoryTableView
                directories={directories}
                files={files}
                targetOrigin={targetOrigin}
                onSelectDirectory={(dir) => setSelectedDirectory(dir)}
              />
            </div>

            <div className={activeTab === 'tree' ? 'block' : 'hidden'}>
              <DirectoryTreeView
                directories={directories}
                files={files}
                targetOrigin={targetOrigin}
                onSelectDirectory={(dir) => setSelectedDirectory(dir)}
              />
            </div>

            <div className={activeTab === 'api' ? 'block' : 'hidden'}>
              <ApiEndpointsView
                apiEndpoints={apiEndpoints}
                targetDomain={currentDomain}
                onOpenExternalWarning={(url) => setPendingExternalUrl(url)}
                onUpdateEndpoint={(updated) => {
                  setApiEndpoints((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
                }}
              />
            </div>

            <div className={activeTab === 'subdomains-sans' ? 'block' : 'hidden'}>
              <SubdomainsSansView
                currentDomain={currentDomain}
                startUrl={config.startUrl}
                externalLinks={externalLinks}
                refreshKey={whoisRefreshKey}
                onOpenWhois={(dom) => {
                  setWhoisTargetDomain(dom);
                  setActiveTab('whois');
                }}
                onCrawlHost={(host) => {
                  const targetUrl = `https://${host}`;
                  setConfig((prev) => ({ ...prev, startUrl: targetUrl }));
                  setActiveTab('table');
                  handleStartCrawl(targetUrl);
                }}
              />
            </div>

            <div className={activeTab === 'external' ? 'block' : 'hidden'}>
              <ExternalLinksView
                externalLinks={externalLinks}
                targetDomain={currentDomain}
                onOpenWhois={(dom) => {
                  setWhoisTargetDomain(dom);
                  setActiveTab('whois');
                }}
              />
            </div>

            <div className={activeTab === 'whois' ? 'block' : 'hidden'}>
              <DomainIntelligenceView
                targetDomain={whoisTargetDomain || currentDomain || null}
                refreshKey={whoisRefreshKey}
                domainCacheMap={domainIntelligenceCache}
                onCacheData={(dom, data) =>
                  setDomainIntelligenceCache((prev) => ({ ...prev, [dom]: data }))
                }
                onDomainChange={(dom) => setWhoisTargetDomain(dom)}
                onCrawlHost={(host) => {
                  const targetUrl = `https://${host}`;
                  setConfig((prev) => ({ ...prev, startUrl: targetUrl }));
                  setActiveTab('table');
                  handleStartCrawl(targetUrl);
                }}
              />
            </div>

            <div className={activeTab === 'pages' ? 'block' : 'hidden'}>
              <PagesLogView pages={pages} logs={logs} isRunning={status === 'running'} />
            </div>
          </div>
        </div>
      </main>

      {/* Download for Local Use Footer */}
      <LocalDownloadFooter />

      {/* Directory Detail Inspector Modal */}
      {selectedDirectory && (
        <DirectoryDetailModal
          directory={selectedDirectory}
          files={files.filter((f) => f.directory === selectedDirectory.path)}
          pages={pages}
          targetOrigin={targetOrigin}
          onClose={() => setSelectedDirectory(null)}
          onSelectSubdir={(subdirPath) => {
            const found = directories.find((d) => d.path === subdirPath);
            if (found) {
              setSelectedDirectory(found);
            }
          }}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          directories={directories}
          files={files}
          apiEndpoints={apiEndpoints}
          targetOrigin={targetOrigin}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* External Destination Warning Modal */}
      {pendingExternalUrl && (
        <ExternalLinkWarningModal
          url={pendingExternalUrl}
          isOpen={Boolean(pendingExternalUrl)}
          onClose={() => setPendingExternalUrl(null)}
          onConfirm={handleConfirmExternalNavigation}
        />
      )}

      {/* Authorized Ownership Warning Modal on Page Load */}
      <OwnershipWarningModal
        isOpen={showOwnershipWarning}
        onAgree={handleAgreeOwnership}
      />
    </div>
  );
}
