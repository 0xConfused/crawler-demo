// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useMemo, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { PageRecord } from '../types';
import { safeClampInput } from '../utils/urlUtils';
import {
  Terminal,
  Search,
  ExternalLink,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDown,
  ArrowUpDown,
  Lock,
  Unlock,
  Layers,
  X,
  Maximize2,
} from 'lucide-react';

interface PagesLogViewProps {
  pages: PageRecord[];
  logs: Array<{ level: 'info' | 'warn' | 'error' | 'success'; message: string; timestamp: number }>;
  isRunning?: boolean;
}

export const PagesLogView: React.FC<PagesLogViewProps> = ({ pages, logs, isRunning = false }) => {
  const [activeSubTab, setActiveSubTab] = useState<'pages' | 'console'>('pages');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | '2xx' | '3xx' | '4xx' | '5xx' | 'errors'>('all');
  const [sortOrder, setSortOrder] = useState<'chronological' | 'reverse'>('chronological');
  const [inspectPage, setInspectPage] = useState<PageRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const [pagesAutoscroll, setPagesAutoscroll] = useState<boolean>(true);
  const pagesAutoscrollRef = useRef<boolean>(true);
  pagesAutoscrollRef.current = pagesAutoscroll;

  const [consoleAutoscroll, setConsoleAutoscroll] = useState<boolean>(true);
  const consoleAutoscrollRef = useRef<boolean>(true);
  consoleAutoscrollRef.current = consoleAutoscroll;

  const pagesScrollRef = useRef<HTMLDivElement | null>(null);
  const pagesBottomSentinelRef = useRef<HTMLDivElement | null>(null);

  const consoleScrollRef = useRef<HTMLDivElement | null>(null);
  const consoleBottomSentinelRef = useRef<HTMLDivElement | null>(null);

  const isProgrammaticPagesScrollRef = useRef<boolean>(false);
  const isProgrammaticConsoleScrollRef = useRef<boolean>(false);

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      if (statusFilter === '2xx' && (page.statusCode < 200 || page.statusCode >= 300)) return false;
      if (statusFilter === '3xx' && (page.statusCode < 300 || page.statusCode >= 400)) return false;
      if (statusFilter === '4xx' && (page.statusCode < 400 || page.statusCode >= 500)) return false;
      if (statusFilter === '5xx' && (page.statusCode < 500 || page.statusCode >= 600)) return false;
      if (statusFilter === 'errors' && page.statusCode < 400 && !page.error) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          page.url.toLowerCase().includes(q) ||
          page.title.toLowerCase().includes(q) ||
          (page.statusText && page.statusText.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [pages, search, statusFilter]);

  const displayPages = useMemo(() => {
    const list = [...filteredPages];
    if (sortOrder === 'reverse') {
      return list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }
    return list.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  }, [filteredPages, sortOrder]);

  const displayLogs = useMemo(() => {
    const list = [...logs];
    if (sortOrder === 'reverse') {
      return list.sort((a, b) => b.timestamp - a.timestamp);
    }
    return list.sort((a, b) => a.timestamp - b.timestamp);
  }, [logs, sortOrder]);

  const isNearBottom = (el: HTMLElement, threshold = 60) => {
    return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
  };

  const executeScrollToBottom = useCallback((container: HTMLElement | null, isConsole = false) => {
    if (!container) return;
    if (isConsole) {
      isProgrammaticConsoleScrollRef.current = true;
    } else {
      isProgrammaticPagesScrollRef.current = true;
    }

    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      if (isConsole) {
        isProgrammaticConsoleScrollRef.current = false;
      } else {
        isProgrammaticPagesScrollRef.current = false;
      }
    }, 50);
  }, []);

  const handlePagesScroll = () => {
    if (isProgrammaticPagesScrollRef.current) return;
    const el = pagesScrollRef.current;
    if (!el) return;

    const atBottom = isNearBottom(el);
    if (atBottom && !pagesAutoscrollRef.current) {
      setPagesAutoscroll(true);
    } else if (!atBottom && pagesAutoscrollRef.current) {
      setPagesAutoscroll(false);
    }
  };

  const handleConsoleScroll = () => {
    if (isProgrammaticConsoleScrollRef.current) return;
    const el = consoleScrollRef.current;
    if (!el) return;

    const atBottom = isNearBottom(el);
    if (atBottom && !consoleAutoscrollRef.current) {
      setConsoleAutoscroll(true);
    } else if (!atBottom && consoleAutoscrollRef.current) {
      setConsoleAutoscroll(false);
    }
  };

  useLayoutEffect(() => {
    if (sortOrder === 'chronological' && pagesAutoscrollRef.current && pagesScrollRef.current) {
      executeScrollToBottom(pagesScrollRef.current, false);
    }
  }, [displayPages.length, sortOrder, executeScrollToBottom]);

  useLayoutEffect(() => {
    if (sortOrder === 'chronological' && consoleAutoscrollRef.current && consoleScrollRef.current) {
      executeScrollToBottom(consoleScrollRef.current, true);
    }
  }, [displayLogs.length, sortOrder, executeScrollToBottom]);

  useEffect(() => {
    if (activeSubTab === 'pages' && pagesAutoscrollRef.current && pagesScrollRef.current) {
      executeScrollToBottom(pagesScrollRef.current, false);
    } else if (activeSubTab === 'console' && consoleAutoscrollRef.current && consoleScrollRef.current) {
      executeScrollToBottom(consoleScrollRef.current, true);
    }
  }, [activeSubTab, executeScrollToBottom]);

  useEffect(() => {
    if (isRunning) {
      setPagesAutoscroll(true);
      setConsoleAutoscroll(true);
    }
  }, [isRunning]);

  const togglePagesAutoscroll = () => {
    if (!pagesAutoscroll) {
      setPagesAutoscroll(true);
      executeScrollToBottom(pagesScrollRef.current, false);
    } else {
      setPagesAutoscroll(false);
    }
  };

  const toggleConsoleAutoscroll = () => {
    if (!consoleAutoscroll) {
      setConsoleAutoscroll(true);
      executeScrollToBottom(consoleScrollRef.current, true);
    } else {
      setConsoleAutoscroll(false);
    }
  };

  const getStatusBadge = (page: PageRecord) => {
    const code = page.statusCode || 200;
    if (code >= 200 && code < 300) {
      return (
        <span className="tag tag-sm tag-accent !text-[#f3f3f7] font-bold inline-flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-[#f3f3f7]" />
          <span>HTTP {code}</span>
        </span>
      );
    }
    if (code >= 300 && code < 400) {
      return (
        <span className="tag tag-sm tag-warning !text-[#0c0c0f] font-bold inline-flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3 text-[#0c0c0f]" />
          <span>HTTP {code}</span>
        </span>
      );
    }
    return (
      <span className="tag tag-sm tag-accent !text-[#0c0c0f] font-bold inline-flex items-center gap-1">
        <XCircle className="w-3 h-3 text-[#0c0c0f]" />
        <span>HTTP {code}</span>
      </span>
    );
  };

  const isCurrentAutoscrollActive = activeSubTab === 'pages' ? pagesAutoscroll : consoleAutoscroll;

  return (
    <div id="pages-log-view" className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden flex flex-col shadow-md relative">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />
      {/* Sub tabs & Controls */}
      <div className="px-6 py-4 bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#383838]">
        <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-none border border-[#383838] self-start">
          <button
            type="button"
            onClick={() => setActiveSubTab('pages')}
            className={`px-3 py-1 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'pages'
                ? 'bg-[#c30800] text-[#0d0d0d] font-bold'
                : 'text-[#8c8c8c] hover:text-[#f0f0f0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Crawled Pages ({pages.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('console')}
            className={`px-3 py-1 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'console'
                ? 'bg-[#c30800] text-[#0d0d0d] font-bold'
                : 'text-[#8c8c8c] hover:text-[#f0f0f0]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Live Recon Logs ({logs.length})</span>
          </button>
        </div>

        {/* Status indicator & order controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Interactive Autoscroll Lock Button */}
          <button
            type="button"
            onClick={activeSubTab === 'pages' ? togglePagesAutoscroll : toggleConsoleAutoscroll}
            title={
              isCurrentAutoscrollActive
                ? 'Autoscroll is locked to bottom (Click to unlock)'
                : 'Autoscroll is unlocked (Click to lock to bottom)'
            }
            className={`flex items-center gap-1.5 px-3 py-1 rounded-none border text-[11px] font-mono transition-all cursor-pointer shadow-sm ${
              isCurrentAutoscrollActive
                ? 'bg-[#1a1a1a] border-[#383838] text-[#8c8c8c] hover:bg-[#262626] hover:text-[#f0f0f0]'
                : 'bg-[#c30800]/20 border-[#c30800] text-[#c30800] hover:bg-[#c30800]/30 hover:text-[#f60a00]'
            }`}
          >
            {isCurrentAutoscrollActive ? (
              <>
                <Lock className="w-3 h-3 text-[#8c8c8c]" />
                <span className="font-semibold">Autoscroll: Locked</span>
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3 text-[#c30800]" />
                <span className="font-semibold">Autoscroll: Unlocked</span>
              </>
            )}
          </button>

          {/* Sort order toggle */}
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === 'chronological' ? 'reverse' : 'chronological'))}
            title={sortOrder === 'chronological' ? 'Chronological (New at bottom)' : 'Reverse (New at top)'}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#141414] hover:bg-[#262626] border border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] rounded-none text-[10px] font-mono transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3 h-3 text-[#8c8c8c]" />
            <span>{sortOrder === 'chronological' ? 'Live Stream ↓' : 'Newest First ↑'}</span>
          </button>

          {activeSubTab === 'pages' && (
            <>
              <div className="relative flex-1 sm:w-52 min-w-0">
                <Search className="w-3.5 h-3.5 text-[#8c8c8c] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  id="pages-search-input"
                  type="text"
                  maxLength={200}
                  placeholder="Search crawled targets..."
                  value={search}
                  onChange={(e) => setSearch(safeClampInput(e.target.value, 200))}
                  className="w-full pl-8 pr-3 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-xs text-[#f0f0f0] placeholder-[#737373] font-mono focus:outline-none focus:border-[#c30800]"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-none border border-[#383838] text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 py-0.5 rounded-none cursor-pointer uppercase text-[10px] transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-[#c30800] text-[#0c0c0f] font-bold'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('2xx')}
                  className={`px-2 py-0.5 rounded-none cursor-pointer uppercase text-[10px] transition-colors ${
                    statusFilter === '2xx'
                      ? 'bg-[#bbc300] text-[#0c0c0f] font-bold'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  }`}
                >
                  2xx
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('3xx')}
                  className={`px-2 py-0.5 rounded-none cursor-pointer uppercase text-[10px] transition-colors ${
                    statusFilter === '3xx'
                      ? 'bg-[#c36a00] text-[#0c0c0f] font-bold'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  }`}
                >
                  3xx
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('4xx')}
                  className={`px-2 py-0.5 rounded-none cursor-pointer uppercase text-[10px] transition-colors ${
                    statusFilter === '4xx'
                      ? 'bg-[#c30800] text-[#0c0c0f] font-bold'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  }`}
                >
                  4xx
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('5xx')}
                  className={`px-2 py-0.5 rounded-none cursor-pointer uppercase text-[10px] transition-colors ${
                    statusFilter === '5xx'
                      ? 'bg-[#c3005a] text-[#f3f3f7] font-bold'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  }`}
                >
                  5xx
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('errors')}
                  className={`px-2 py-0.5 rounded-none cursor-pointer uppercase text-[10px] transition-colors ${
                    statusFilter === 'errors'
                      ? 'bg-[#c3005a] text-[#f3f3f7] font-bold'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                  }`}
                >
                  Errors
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tab 1: Crawled Pages Table */}
      {activeSubTab === 'pages' && (
        <div className="bg-[#141414] overflow-hidden flex flex-col relative">
          <div className="grid grid-cols-[60px_100px_60px_1fr_110px_80px_70px] gap-3 px-6 py-3 bg-[#141414] text-[10px] uppercase tracking-widest text-[#8c8c8c] font-mono font-bold border-b border-[#383838]">
            <div>Method</div>
            <div>Status</div>
            <div>Depth</div>
            <div>URL &amp; Page Title</div>
            <div className="text-center">Links Found</div>
            <div className="text-right">Latency</div>
            <div className="text-right">Popout</div>
          </div>
          <div
            ref={pagesScrollRef}
            onScroll={handlePagesScroll}
            className="overflow-y-auto max-h-[500px] font-mono text-xs divide-y divide-[#2e2e2e] custom-scrollbar"
          >
            {displayPages.length === 0 ? (
              <div className="py-12 text-center text-[#8c8c8c] font-mono text-xs">
                {pages.length === 0 ? 'No targets crawled yet. Engage recon above.' : 'No pages match the search criteria.'}
              </div>
            ) : (
              displayPages.map((page) => (
                <div key={page.id} className="grid grid-cols-[60px_100px_60px_1fr_110px_80px_70px] gap-3 px-6 py-2.5 hover:bg-[#1a1a1a] transition-colors items-center">
                  {/* Method */}
                  <div>
                    <span className="tag tag-sm tag-accent !text-[#0c0c0f] font-bold shrink-0">
                      {page.method || 'GET'}
                    </span>
                  </div>

                  {/* Status */}
                  <div>{getStatusBadge(page)}</div>

                  {/* Depth */}
                  <div className="text-[#8c8c8c]">L{page.depth}</div>

                  {/* URL & Title */}
                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-1.5 text-[#f0f0f0]">
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline hover:text-[#c30800] flex items-center gap-1 truncate font-medium"
                      >
                        <span className="truncate">{page.url}</span>
                        <ExternalLink className="w-3 h-3 text-[#737373] shrink-0" />
                      </a>
                    </div>
                    {page.title && (
                      <p className="text-[10px] text-[#8c8c8c] truncate mt-0.5">{page.title}</p>
                    )}
                    {page.error && <p className="text-[10px] text-[#770500] mt-0.5 font-bold">{page.error}</p>}
                  </div>

                  {/* Links */}
                  <div className="text-center">
                    <span className="text-[#f0f0f0] font-bold">{page.sameDomainLinksCount}</span>
                    <span className="text-[#8c8c8c] text-[10px]"> / {page.discoveredLinksCount}</span>
                  </div>

                  {/* Response Time */}
                  <div className="text-right text-[#8c8c8c] text-[10px]">
                    {page.durationMs}ms
                  </div>

                  {/* Popout Inspection */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setInspectPage(page)}
                      className="p-1 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
                      title="Open Pop Out Window"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#c30800]" />
                    </button>
                  </div>
                </div>
              ))
            )}
            <div ref={pagesBottomSentinelRef} className="h-0 w-full" />
          </div>

          {/* Jump to bottom / Resume autoscroll pill */}
          {!pagesAutoscroll && displayPages.length > 0 && (
            <button
              type="button"
              onClick={togglePagesAutoscroll}
              className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-[#141414] border border-[#c30800]/60 text-[#f0f0f0] text-[11px] font-mono shadow-2xl hover:bg-[#2e2e2e] hover:border-[#c30800] transition-all cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#c30800] animate-bounce" />
              <span>Autoscroll paused • Click to lock bottom</span>
            </button>
          )}
        </div>
      )}

      {/* Tab 2: Terminal Console Logs */}
      {activeSubTab === 'console' && (
        <div className="relative bg-[#141414] border-t border-[#383838]">
          <div
            ref={consoleScrollRef}
            onScroll={handleConsoleScroll}
            className="p-6 font-mono text-xs max-h-[500px] overflow-y-auto space-y-2 custom-scrollbar"
          >
            {displayLogs.length === 0 ? (
              <p className="text-[#8c8c8c]">Recon telemetry logs will stream here during execution...</p>
            ) : (
              displayLogs.map((log, i) => {
                const timeStr = new Date(log.timestamp).toLocaleTimeString();
                let color = 'text-[#f0f0f0]';
                if (log.level === 'warn') color = 'text-[#c30800] font-semibold';
                if (log.level === 'error') color = 'text-[#770500] font-bold';
                if (log.level === 'success') color = 'text-[#bbc300] font-bold';

                return (
                  <div key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#737373] shrink-0 text-[10px]">[{timeStr}]</span>
                    <span
                      className={
                        log.level === 'success'
                          ? 'tag tag-sm tag-accent !text-[#0c0c0f] font-bold uppercase shrink-0'
                          : log.level === 'warn'
                          ? 'tag tag-sm tag-warning !text-[#0c0c0f] font-bold uppercase shrink-0'
                          : log.level === 'error'
                          ? 'tag tag-sm tag-accent !text-[#0c0c0f] font-bold uppercase shrink-0'
                          : 'tag tag-sm tag-accent-outline font-bold uppercase shrink-0'
                      }
                    >
                      {log.level}
                    </span>
                    <span className={`${color} break-all`}>{log.message}</span>
                  </div>
                );
              })
            )}
            <div ref={consoleBottomSentinelRef} className="h-0 w-full" />
          </div>

          {/* Jump to bottom / Resume autoscroll pill */}
          {!consoleAutoscroll && displayLogs.length > 0 && (
            <button
              type="button"
              onClick={toggleConsoleAutoscroll}
              className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-[#141414] border border-[#c30800]/60 text-[#f0f0f0] text-[11px] font-mono shadow-2xl hover:bg-[#2e2e2e] hover:border-[#c30800] transition-all cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#c30800] animate-bounce" />
              <span>Autoscroll paused • Click to lock bottom</span>
            </button>
          )}
        </div>
      )}

      {/* Pop Out Window for Crawled Page Inspection */}
      {inspectPage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs font-mono text-xs"
          onClick={() => setInspectPage(null)}
        >
          <div
            className="bg-[#141414] border border-[#383838] rounded-none w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#383838] flex items-center justify-between bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="tag tag-sm tag-accent !text-[#0c0c0f] font-bold">
                  {inspectPage.method || 'GET'}
                </span>
                {getStatusBadge(inspectPage)}
                <span className="font-bold text-sm text-[#f0f0f0] truncate max-w-sm">
                  {inspectPage.pathname || inspectPage.url}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectPage(null)}
                className="p-1.5 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar bg-[#141414]">
              {/* Full URL & Copy */}
              <div className="p-3 bg-[#0d0d0d] border border-[#383838] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-[#8c8c8c] uppercase tracking-wider font-bold">
                  <span>Canonical Target Address</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopy(inspectPage.url, 'inspect_page_url', e)}
                      className="text-[#c30800] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'inspect_page_url' ? <span>COPIED</span> : <span>COPY URL</span>}
                    </button>
                    <a
                      href={inspectPage.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8c8c8c] hover:text-[#f0f0f0] flex items-center gap-1"
                    >
                      <span>OPEN</span>
                      <ExternalLink className="w-3 h-3 text-[#c30800]" />
                    </a>
                  </div>
                </div>
                <div className="text-xs text-[#f0f0f0] break-all select-all font-semibold">
                  {inspectPage.url}
                </div>
                {inspectPage.title && (
                  <div className="text-[11px] text-[#8c8c8c] pt-1 border-t border-[#2e2e2e]">
                    Title: <span className="text-[#f0f0f0] font-medium">{inspectPage.title}</span>
                  </div>
                )}
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-[#141414] border border-[#383838]">
                  <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider block">Hierarchy Depth</span>
                  <span className="text-lg font-bold text-[#f0f0f0]">Level {inspectPage.depth}</span>
                </div>
                <div className="p-3 bg-[#141414] border border-[#383838]">
                  <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider block">Fetch Duration</span>
                  <span className="text-lg font-bold text-[#f0f0f0]">{inspectPage.durationMs}ms</span>
                </div>
                <div className="p-3 bg-[#141414] border border-[#383838]">
                  <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider block">Same-Domain Links</span>
                  <span className="text-lg font-bold text-[#c30800]">{inspectPage.sameDomainLinksCount}</span>
                </div>
                <div className="p-3 bg-[#141414] border border-[#383838]">
                  <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider block">Total Discovered</span>
                  <span className="text-lg font-bold text-[#f0f0f0]">{inspectPage.discoveredLinksCount}</span>
                </div>
              </div>

              {/* Parent Referrer & Content Type */}
              <div className="p-3 bg-[#141414] border border-[#383838] space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c] uppercase">Content-Type:</span>
                  <span className="text-[#f0f0f0] font-bold">{inspectPage.contentType || 'text/html'}</span>
                </div>
                {inspectPage.parentUrl && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-[#2e2e2e]">
                    <span className="text-[#8c8c8c] uppercase">Referred By Parent Page:</span>
                    <span className="text-[#8c8c8c] truncate select-all">{inspectPage.parentUrl}</span>
                  </div>
                )}
                {inspectPage.error && (
                  <div className="p-2 bg-[#770500]/20 border border-[#770500]/60 text-[#f3f3f7] font-bold">
                    Error: {inspectPage.error}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#383838] bg-[#141414] flex justify-end">
              <button
                type="button"
                onClick={() => setInspectPage(null)}
                className="px-3 py-1.5 bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] border border-[#383838] text-xs uppercase tracking-wider transition-colors cursor-pointer font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

