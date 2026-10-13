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
import { ExternalLinkWarningModal } from './components/ExternalLinkWarningModal';
import { OwnershipWarningModal } from './components/OwnershipWarningModal';
import { LocalDownloadFooter } from './components/LocalDownloadFooter';
import { FolderTree, ListFilter, FileText, ExternalLink, ShieldCheck, Network, Code } from 'lucide-react';
import { extractApexDomain } from './utils/urlUtils';
import { STORED_RECON_PROFILES, StoredReconProfile, getStoredProfile } from './data/storedReconData';

const PRIMARY_PROFILE = STORED_RECON_PROFILES[0];

export default function App() {
  const [config, setConfig] = useState<CrawlConfig>(PRIMARY_PROFILE.config);
  const [status, setStatus] = useState<CrawlStatus>('completed');
  const [stats, setStats] = useState<CrawlStats>(PRIMARY_PROFILE.stats);
  const [directories, setDirectories] = useState<DirectoryRecord[]>(PRIMARY_PROFILE.directories);
  const [files, setFiles] = useState<FileRecord[]>(PRIMARY_PROFILE.files);
  const [externalLinks, setExternalLinks] = useState<ExternalLinkRecord[]>(PRIMARY_PROFILE.externalLinks);
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpointRecord[]>(PRIMARY_PROFILE.apiEndpoints);
  const [pages, setPages] = useState<PageRecord[]>(PRIMARY_PROFILE.pages);
  const [logs, setLogs] = useState<Array<{ level: 'info' | 'warn' | 'error' | 'success'; message: string; timestamp: number }>>(PRIMARY_PROFILE.logs);
  const [activeTab, setActiveTab] = useState<ViewTab>('table');
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryRecord | null>(null);
  const [currentDomain, setCurrentDomain] = useState<string | null>(PRIMARY_PROFILE.domain);
  const [targetOrigin, setTargetOrigin] = useState<string>(PRIMARY_PROFILE.origin);
  const [pendingExternalUrl, setPendingExternalUrl] = useState<string | null>(null);
  const [domainIntelligenceCache, setDomainIntelligenceCache] = useState<Record<string, DomainIntelligence>>(() => {
    const cache: Record<string, DomainIntelligence> = {};
    for (const p of STORED_RECON_PROFILES) {
      cache[p.domain.toLowerCase()] = p.domainIntelligence;
    }
    return cache;
  });
  const [whoisTargetDomain, setWhoisTargetDomain] = useState<string | null>(PRIMARY_PROFILE.domain);
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

  const handleApplyProfile = useCallback((profile: StoredReconProfile) => {
    setConfig(profile.config);
    setStats(profile.stats);
    setDirectories(profile.directories);
    setFiles(profile.files);
    setExternalLinks(profile.externalLinks);
    setApiEndpoints(profile.apiEndpoints);
    setPages(profile.pages);
    setLogs(profile.logs);
    setCurrentDomain(profile.domain);
    setTargetOrigin(profile.origin);
    setWhoisTargetDomain(profile.domain);
    setStatus('completed');
    setDomainIntelligenceCache((prev) => ({
      ...prev,
      [profile.domain.toLowerCase()]: profile.domainIntelligence,
    }));
  }, []);

  const crawlTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStopCrawl = useCallback(() => {
    if (crawlTimerRef.current) {
      clearInterval(crawlTimerRef.current);
      crawlTimerRef.current = null;
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
    if (crawlTimerRef.current) {
      clearInterval(crawlTimerRef.current);
      crawlTimerRef.current = null;
    }
    handleApplyProfile(PRIMARY_PROFILE);
  }, [handleApplyProfile]);

  const handleStartCrawl = useCallback((overrideUrl?: string) => {
    const rawUrl = overrideUrl || config.startUrl;
    if (!rawUrl.trim()) return;

    if (crawlTimerRef.current) {
      clearInterval(crawlTimerRef.current);
      crawlTimerRef.current = null;
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
      setCurrentDomain(parsed.hostname);
      setTargetOrigin(parsed.origin);
      setWhoisTargetDomain(parsed.hostname.toLowerCase().replace(/:\d+$/, ''));
    } catch {}

    const matched = getStoredProfile(start);
    setStatus('running');

    // Smooth offline population of stored dataset without server or network scanning
    let step = 0;
    const totalSteps = 6;
    setStats({
      ...matched.stats,
      pagesVisited: 1,
      currentUrl: start,
      startTime: Date.now(),
      endTime: null,
    });
    setLogs([
      { level: 'info', message: `Initialized reconnaissance engine for target: ${start}`, timestamp: Date.now() },
    ]);

    crawlTimerRef.current = setInterval(() => {
      step++;
      if (step >= totalSteps) {
        if (crawlTimerRef.current) {
          clearInterval(crawlTimerRef.current);
          crawlTimerRef.current = null;
        }
        handleApplyProfile(matched);
      } else {
        const fraction = step / totalSteps;
        const pageCount = Math.max(1, Math.floor(matched.stats.pagesVisited * fraction));
        const dirCount = Math.max(1, Math.floor(matched.directories.length * fraction));
        const fileCount = Math.max(1, Math.floor(matched.files.length * fraction));
        const epCount = Math.max(1, Math.floor(matched.apiEndpoints.length * fraction));

        const currentPage = matched.pages[step % matched.pages.length];
        setStats((prev) => ({
          ...prev,
          pagesVisited: pageCount,
          uniqueDirectories: dirCount,
          uniqueFiles: fileCount,
          apiEndpointsCount: epCount,
          currentUrl: currentPage?.url || start,
        }));
        setDirectories(matched.directories.slice(0, dirCount));
        setFiles(matched.files.slice(0, fileCount));
        setApiEndpoints(matched.apiEndpoints.slice(0, epCount));
        setPages(matched.pages.slice(0, pageCount));
        if (step <= matched.logs.length) {
          setLogs(matched.logs.slice(0, step + 2));
        }
      }
    }, 220);
  }, [config.startUrl, handleApplyProfile]);

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

  const handleDownloadCompleteVersion = useCallback(() => {
    const link = document.createElement('a');
    link.href = './crawler_full.zip';
    link.download = 'crawler_full.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0f0f0] flex flex-col font-sans relative">
      {/* Ambient Horizon Diffusion */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(195,8,0,0.06),transparent_70%)] z-0" />

      {/* Header */}
      <CrawlerHeader
        status={status}
        stats={stats}
        currentDomain={currentDomain}
        onDownloadComplete={handleDownloadCompleteVersion}
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
          storedProfiles={STORED_RECON_PROFILES}
          activeProfileId={STORED_RECON_PROFILES.find((p) => p.domain === currentDomain)?.id || 'owasp-org'}
          onSelectProfile={handleApplyProfile}
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
                initialDomainInfo={domainIntelligenceCache[currentDomain?.toLowerCase() || ''] || null}
                initialCrtData={domainIntelligenceCache[currentDomain?.toLowerCase() || '']?.crtSubdomains || null}
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
