// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { safeClampInput } from '../utils/urlUtils';
import { CrtSubdomainsData, CrtSubdomainItem } from '../types';
import {
  Search,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  Play,
  Square,
  Activity,
  CheckCircle2,
  XCircle,
  Terminal,
  Radio,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

interface CrtSubdomainsInspectorProps {
  crtData?: CrtSubdomainsData | null;
  targetDomain: string;
  onDomainChange?: (domain: string) => void;
  onCrawlHost?: (host: string) => void;
  onRefreshCrt?: () => void;
  loadingCrt?: boolean;
}

export const CrtSubdomainsInspector: React.FC<CrtSubdomainsInspectorProps> = ({
  crtData,
  targetDomain,
  onDomainChange,
  onCrawlHost,
  onRefreshCrt,
  loadingCrt = false,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'unresolved' | 'wildcards'>('all');
  const [probedMap, setProbedMap] = useState<Record<string, CrtSubdomainItem>>({});
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [probeProgress, setProbeProgress] = useState<{ current: number; total: number; live: number }>({
    current: 0,
    total: 0,
    live: 0,
  });
  const [showAdvancedPanel, setShowAdvancedPanel] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const abortProbeRef = useRef<boolean>(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const allSubdomains = useMemo(() => {
    return crtData?.subdomains || [];
  }, [crtData]);

  const filteredSubdomains = useMemo(() => {
    let list = allSubdomains;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((sub) => sub.toLowerCase().includes(q));
    }

    if (statusFilter === 'wildcards') {
      list = list.filter((sub) => sub.startsWith('*.') || sub.includes('*'));
    } else if (statusFilter === 'live') {
      list = list.filter((sub) => {
        const probed = probedMap[sub.toLowerCase()];
        return probed && probed.isLive;
      });
    } else if (statusFilter === 'unresolved') {
      list = list.filter((sub) => {
        const probed = probedMap[sub.toLowerCase()];
        return probed && probed.probed && !probed.isLive;
      });
    }

    return list;
  }, [allSubdomains, searchQuery, statusFilter, probedMap]);

  const totalPages = Math.max(1, Math.ceil(filteredSubdomains.length / pageSize));
  const paginatedSubdomains = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSubdomains.slice(start, start + pageSize);
  }, [filteredSubdomains, currentPage, pageSize]);

  const probedList = Object.values(probedMap) as CrtSubdomainItem[];
  const probedCount = probedList.length;
  const liveCount = probedList.filter((p) => p.isLive).length;
  const unresolvedCount = probedList.filter((p) => p.probed && !p.isLive).length;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAll = () => {
    const text = filteredSubdomains.join('\n');
    handleCopy(text, 'copy_all_subs');
  };

  const handleCopyLiveOnly = () => {
    const liveSubs = allSubdomains.filter((sub) => {
      const p = probedMap[sub.toLowerCase()];
      return p && p.isLive;
    });
    handleCopy(liveSubs.join('\n'), 'copy_live_subs');
  };

  const handleExportTxt = () => {
    const text = filteredSubdomains.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${crtData?.apexDomain || targetDomain}-crt-subdomains.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const exportData = {
      apexDomain: crtData?.apexDomain || targetDomain,
      sourceUrl: crtData?.sourceUrl,
      totalCount: allSubdomains.length,
      filteredCount: filteredSubdomains.length,
      fetchedAt: crtData?.fetchedAt ? new Date(crtData.fetchedAt).toISOString() : new Date().toISOString(),
      subdomains: filteredSubdomains.map((sub) => {
        const probed = probedMap[sub.toLowerCase()];
        return {
          subdomain: sub,
          isWildcard: sub.startsWith('*.'),
          ...(probed || { probed: false }),
        };
      }),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${crtData?.apexDomain || targetDomain}-crt-subdomains.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const headers = ['Subdomain', 'Is Wildcard', 'Probed', 'Is Live', 'Resolved IP', 'CNAME', 'HTTP Status', 'Latency (ms)'];
    const rows = filteredSubdomains.map((sub) => {
      const p = probedMap[sub.toLowerCase()];
      return [
        `"${sub}"`,
        sub.startsWith('*.') ? 'Yes' : 'No',
        p?.probed ? 'Yes' : 'No',
        p?.isLive ? 'Live' : p?.probed ? 'Unresolved' : 'Unprobed',
        `"${p?.ip || ''}"`,
        `"${p?.cname || ''}"`,
        p?.statusCode ? String(p.statusCode) : '',
        p?.latencyMs ? String(p.latencyMs) : '',
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${crtData?.apexDomain || targetDomain}-crt-subdomains.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const probeSingleSubdomain = async (subdomain: string) => {
    try {
      const res = await fetch('/api/crt-probe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomains: [subdomain] }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const item = data.results[0];
        setProbedMap((prev) => ({
          ...prev,
          [subdomain.toLowerCase()]: item,
        }));
      }
    } catch {}
  };

  const handleStartProbeAll = async (targetList = filteredSubdomains) => {
    if (targetList.length === 0 || isProbing) return;

    abortProbeRef.current = false;
    setIsProbing(true);

    const cleanTargets = targetList.filter((s) => !s.startsWith('*.'));
    const totalToProbe = cleanTargets.length;
    let currentCompleted = 0;
    let liveFound = (Object.values(probedMap) as CrtSubdomainItem[]).filter((p) => p.isLive).length;

    setProbeProgress({
      current: 0,
      total: totalToProbe,
      live: liveFound,
    });

    const batchSize = 30;
    for (let i = 0; i < cleanTargets.length; i += batchSize) {
      if (abortProbeRef.current) break;

      const batch = cleanTargets.slice(i, i + batchSize);
      try {
        const res = await fetch('/api/crt-probe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subdomains: batch }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.results && Array.isArray(data.results)) {
            const updates: Record<string, CrtSubdomainItem> = {};
            data.results.forEach((item: CrtSubdomainItem) => {
              updates[item.subdomain.toLowerCase()] = item;
              if (item.isLive) liveFound++;
            });

            setProbedMap((prev) => ({ ...prev, ...updates }));
          }
        }
      } catch {}

      currentCompleted = Math.min(totalToProbe, i + batch.length);
      setProbeProgress({
        current: currentCompleted,
        total: totalToProbe,
        live: liveFound,
      });

      await new Promise((r) => setTimeout(r, 100));
    }

    setIsProbing(false);
  };

  const handleStopProbe = () => {
    abortProbeRef.current = true;
    setIsProbing(false);
  };

  const apexDomain = crtData?.apexDomain || targetDomain;
  const sourceUrl = crtData?.sourceUrl || `https://crt.name/v1/search?apex=${encodeURIComponent(apexDomain)}`;

  return (
    <div className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden shadow-sm space-y-0 font-mono text-xs relative">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-[#383838] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="w-2 h-2 bg-[#c30800] shrink-0" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#f0f0f0] flex items-center gap-2">
            <span>Certificate Transparency (crt.name) Subdomains</span>
            <span className="tag tag-sm tag-accent-outline font-bold">
              {allSubdomains.length.toLocaleString()} discovered
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="px-2.5 py-1 rounded-none bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] border border-[#383838] text-[10px] flex items-center gap-1 transition-colors uppercase tracking-wider font-mono"
            title="View raw source at crt.name"
          >
            <span>Source: crt.name</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          {onRefreshCrt && (
            <button
              type="button"
              onClick={onRefreshCrt}
              disabled={loadingCrt}
              className="px-2.5 py-1 rounded-none bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] border border-[#383838] text-[10px] flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50 uppercase tracking-wider font-mono"
              title="Re-query crt.name Certificate Transparency Logs"
            >
              <RefreshCw className={`w-3 h-3 text-[#c30800] ${loadingCrt ? 'animate-spin' : ''}`} />
              <span>Refresh CT</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
            className={`px-2.5 py-1 rounded-none border text-[10px] flex items-center gap-1 transition-colors cursor-pointer uppercase tracking-wider font-mono ${
              showAdvancedPanel
                ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                : 'bg-[#141414] hover:bg-[#262626] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0]'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3 text-[#c30800]" />
            <span>Advanced Toolkit</span>
          </button>
        </div>
      </div>

      {/* Advanced Users Option & Probe Toolkit Panel */}
      {showAdvancedPanel && (
        <div className="p-4 bg-[#141414] border-b border-[#383838] space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#f0f0f0] flex items-center gap-1.5 uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-[#c30800]" />
                Advanced User Recon: Search & Probe Subdomains
              </span>
              <p className="text-[11px] text-[#8c8c8c] mt-0.5">
                Concurrently resolve DNS (A / CNAME) and test live HTTP/HTTPS status for all Certificate Transparency hosts discovered for{' '}
                <span className="text-[#c30800] font-semibold">{apexDomain}</span>.
              </p>
            </div>

            {/* Probe Controls */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {isProbing ? (
                <button
                  type="button"
                  onClick={handleStopProbe}
                  className="px-3 py-1.5 bg-[#770500] hover:bg-[#c3005a] text-[#f3f3f7] border border-[#770500] rounded-none text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Square className="w-3 h-3" />
                  <span>Stop Probe</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStartProbeAll(filteredSubdomains)}
                  disabled={filteredSubdomains.length === 0}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#c30800] to-[#770500] hover:from-[#f60a00] hover:to-[#770500] text-[#f3f3f7] border border-[#c30800] rounded-none text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  title={`Probe live DNS & HTTP for ${filteredSubdomains.length} subdomains`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>
                    Probe {filteredSubdomains.length === allSubdomains.length ? 'All Subdomains' : `Filtered (${filteredSubdomains.length})`}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyAll}
                className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] rounded-none text-xs font-mono flex items-center gap-1.5 border border-[#383838] transition-colors cursor-pointer"
                title="Copy all filtered subdomains as newline-separated list"
              >
                {copiedKey === 'copy_all_subs' ? (
                  <Check className="w-3 h-3 text-[#c30800]" />
                ) : (
                  <Copy className="w-3 h-3 text-[#8c8c8c]" />
                )}
                <span>Copy List</span>
              </button>

              {liveCount > 0 && (
                <button
                  type="button"
                  onClick={handleCopyLiveOnly}
                  className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] rounded-none text-xs font-mono flex items-center gap-1.5 border border-[#383838] transition-colors cursor-pointer"
                  title="Copy only verified live subdomains"
                >
                  {copiedKey === 'copy_live_subs' ? (
                    <Check className="w-3 h-3 text-[#c30800]" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-[#c30800]" />
                  )}
                  <span>Copy Live ({liveCount})</span>
                </button>
              )}

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="px-2 py-1.5 bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] rounded-none text-[11px] font-mono border border-[#383838] transition-colors cursor-pointer uppercase tracking-wider"
                  title="Download Wordlist as .txt"
                >
                  TXT
                </button>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="px-2 py-1.5 bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] rounded-none text-[11px] font-mono border border-[#383838] transition-colors cursor-pointer uppercase tracking-wider"
                  title="Download as CSV spreadsheet"
                >
                  CSV
                </button>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-2 py-1.5 bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] rounded-none text-[11px] font-mono border border-[#383838] transition-colors cursor-pointer uppercase tracking-wider"
                  title="Download as JSON"
                >
                  JSON
                </button>
              </div>
            </div>
          </div>

          {/* Active Probe Progress Bar */}
          {isProbing && (
            <div className="p-3 bg-[#141414] border border-[#383838] rounded-none space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-[#f0f0f0]">
                  <Activity className="w-3.5 h-3.5 text-[#c30800] animate-pulse" />
                  <span>
                    Probing Certificate Transparency hosts: {probeProgress.current} / {probeProgress.total} (
                    {Math.round((probeProgress.current / Math.max(1, probeProgress.total)) * 100)}%)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#8c8c8c]">
                  <span>
                    Live Hosts:{' '}
                    <strong className="text-[#c30800]">{probeProgress.live}</strong>
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#1a1a1a] rounded-none h-1.5 overflow-hidden">
                <div
                  className="bg-[#c30800] h-1.5 rounded-none transition-all duration-200"
                  style={{
                    width: `${Math.min(100, (probeProgress.current / Math.max(1, probeProgress.total)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Probe Summary Badges */}
          {probedCount > 0 && !isProbing && (
            <div className="flex items-center gap-2 flex-wrap text-[11px]">
              <span className="text-[#8c8c8c]">Probe Results:</span>
              <span className="px-2 py-0.5 rounded-none bg-[#1a1a1a] text-[#c30800] border border-[#383838] font-semibold">
                {liveCount} Live / Resolved
              </span>
              <span className="px-2 py-0.5 rounded-none bg-[#141414] text-[#8c8c8c] border border-[#383838]">
                {unresolvedCount} Unresolved
              </span>
              <span className="px-2 py-0.5 rounded-none bg-[#141414] text-[#8c8c8c] border border-[#383838]">
                {probedCount} Total Probed
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-3 border-b border-[#383838] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#141414] min-w-0">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8c8c8c]">
            <Search className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <input
            id="crt-search-input"
            type="text"
            maxLength={200}
            placeholder={`Search across ${allSubdomains.length.toLocaleString()} crt.name subdomains (e.g. api, dev, admin, mail)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(safeClampInput(e.target.value, 200))}
            className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0d] border border-[#383838] rounded-none text-xs text-[#f0f0f0] placeholder-[#737373] focus:outline-none focus:border-[#c30800] font-mono"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0 text-[10px]">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-2 py-1 rounded-none border transition-colors cursor-pointer uppercase tracking-wider font-bold ${
              statusFilter === 'all'
                ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d]'
                : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
            }`}
          >
            ALL ({allSubdomains.length})
          </button>

          {probedCount > 0 && (
            <>
              <button
                type="button"
                onClick={() => setStatusFilter('live')}
                className={`px-2 py-1 rounded-none border transition-colors cursor-pointer uppercase tracking-wider font-bold ${
                  statusFilter === 'live'
                    ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d]'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                LIVE ({liveCount})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('unresolved')}
                className={`px-2 py-1 rounded-none border transition-colors cursor-pointer uppercase tracking-wider font-bold ${
                  statusFilter === 'unresolved'
                    ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d]'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                UNRESOLVED ({unresolvedCount})
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setStatusFilter('wildcards')}
            className={`px-2 py-1 rounded-none border transition-colors cursor-pointer uppercase tracking-wider font-bold ${
              statusFilter === 'wildcards'
                ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d]'
                : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
            }`}
          >
            WILDCARDS (*.)
          </button>
        </div>
      </div>

      {/* Main Subdomains Table / List */}
      {filteredSubdomains.length === 0 ? (
        <div className="p-8 text-center text-[#8c8c8c] space-y-1">
          {allSubdomains.length === 0 ? (
            loadingCrt ? (
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-[#c30800]" />
                <p>Loading Certificate Transparency subdomains from crt.name...</p>
              </div>
            ) : (
              <p>No Certificate Transparency records found on crt.name for {apexDomain}.</p>
            )
          ) : (
            <p>No subdomains matched search query "{searchQuery}".</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#383838] bg-[#141414] text-[10px] text-[#8c8c8c] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Subdomain / Host</th>
                <th className="py-2.5 px-3 font-semibold w-28">Live Status</th>
                <th className="py-2.5 px-3 font-semibold">DNS / Target</th>
                <th className="py-2.5 px-3 font-semibold w-24">HTTP / Latency</th>
                <th className="py-2.5 px-3 text-right font-semibold w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              {paginatedSubdomains.map((sub, idx) => {
                const subKey = sub.toLowerCase();
                const probed = probedMap[subKey];
                const isWildcard = sub.startsWith('*.') || sub.includes('*');

                return (
                  <tr key={`${sub}_${idx}`} className="hover:bg-[#1a1a1a] transition-colors">
                    {/* Subdomain Name */}
                    <td className="py-2.5 px-4 text-[#f0f0f0] font-medium font-mono break-all select-all">
                      <div className="flex items-center gap-2">
                        {isWildcard && (
                          <span className="tag tag-sm tag-accent-outline font-bold">
                            WILDCARD
                          </span>
                        )}
                        <span className={isWildcard ? 'text-[#8c8c8c]' : 'text-[#f0f0f0]'}>{sub}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-3">
                      {probed ? (
                        probed.isLive ? (
                          <span className="tag tag-sm tag-accent !text-[#0c0c0f] font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#0c0c0f]" /> LIVE
                          </span>
                        ) : (
                          <span className="tag tag-sm tag-accent-outline font-bold inline-flex items-center gap-1">
                            <XCircle className="w-3 h-3 text-[#c30800]" /> UNRESOLVED
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] text-[#8c8c8c] italic">Unprobed</span>
                      )}
                    </td>

                    {/* DNS / Target */}
                    <td className="py-2.5 px-3 text-[#8c8c8c] font-mono text-[11px]">
                      {probed?.ip ? (
                        <span className="text-[#f0f0f0] font-semibold">{probed.ip}</span>
                      ) : probed?.cname ? (
                        <span className="text-[#8c8c8c] truncate max-w-xs block" title={probed.cname}>
                          CNAME: {probed.cname}
                        </span>
                      ) : (
                        <span>—</span>
                      )}
                    </td>

                    {/* HTTP Status & Latency */}
                    <td className="py-2.5 px-3 text-[11px] font-mono">
                      {probed?.statusCode ? (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={
                              probed.statusCode >= 200 && probed.statusCode < 300
                                ? 'tag tag-sm tag-accent !text-[#f3f3f7] font-bold'
                                : probed.statusCode >= 300 && probed.statusCode < 400
                                ? 'tag tag-sm tag-warning !text-[#0c0c0f] font-bold'
                                : 'tag tag-sm tag-accent !text-[#0c0c0f] font-bold'
                            }
                          >
                            HTTP {probed.statusCode}
                          </span>
                          {probed.latencyMs !== undefined && (
                            <span className="text-[#8c8c8c] text-[10px]">({probed.latencyMs}ms)</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#8c8c8c]">—</span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Probe Button */}
                        {!isWildcard && (
                          <button
                            type="button"
                            onClick={() => probeSingleSubdomain(sub)}
                            className="p-1 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
                            title="Probe live DNS & HTTP"
                          >
                            <Radio className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Inspect Subdomain WHOIS/DNS */}
                        {onDomainChange && !isWildcard && (
                          <button
                            type="button"
                            onClick={() => onDomainChange(sub)}
                            className="p-1 rounded-none text-[#8c8c8c] hover:text-[#c30800] hover:bg-[#262626] transition-colors cursor-pointer"
                            title="Switch WHOIS / DNS Intelligence target to this subdomain"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Crawl Host */}
                        {onCrawlHost && !isWildcard && (
                          <button
                            type="button"
                            onClick={() => onCrawlHost(sub)}
                            className="p-1 rounded-none text-[#8c8c8c] hover:text-[#c30800] hover:bg-[#262626] transition-colors cursor-pointer"
                            title="Launch Recon & Crawler on this host"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Copy Host */}
                        <button
                          type="button"
                          onClick={() => handleCopy(sub, `copy_${idx}`)}
                          className="p-1 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
                          title="Copy hostname"
                        >
                          {copiedKey === `copy_${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-[#c30800]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* External Link */}
                        {!isWildcard && (
                          <a
                            href={`https://${sub}`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="p-1 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors"
                            title="Open in new tab"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {filteredSubdomains.length > 0 && (
        <div className="p-3 border-t border-[#383838] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#141414] text-[11px] text-[#8c8c8c]">
          <div className="flex items-center gap-2">
            <span>
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filteredSubdomains.length)} of {filteredSubdomains.length.toLocaleString()}{' '}
              subdomains
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#0d0d0d] border border-[#383838] rounded-none px-2 py-0.5 text-xs text-[#f0f0f0] focus:outline-none focus:border-[#c30800] font-mono cursor-pointer"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option>
              </select>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded-none bg-[#141414] border border-[#383838] text-[#f0f0f0] hover:bg-[#262626] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1 rounded-none bg-[#141414] border border-[#383838] text-[#f0f0f0] hover:bg-[#262626] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
