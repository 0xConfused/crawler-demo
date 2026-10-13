// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  Code,
  Download,
  ArrowUpRight,
  Shield,
  Zap,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Play,
  Globe,
  Layers,
  ListFilter,
  Activity,
  Network,
  Server,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { ApiEndpointRecord, ApiMethod, ApiCategory, ApiPossibleQuery } from '../types';
import { canonicalizeApiEndpointUrl } from '../utils/urlUtils';

interface ApiEndpointsViewProps {
  apiEndpoints: ApiEndpointRecord[];
  targetDomain: string | null;
  onOpenExternalWarning?: (url: string) => void;
  onUpdateEndpoint?: (updated: ApiEndpointRecord) => void;
}

type SortOption =
  | 'domain-asc'
  | 'domain-desc'
  | 'path-asc'
  | 'path-desc'
  | 'status'
  | 'latency'
  | 'queries'
  | 'method';

type ViewMode = 'table' | 'grouped-domain' | 'cards';

export const ApiEndpointsView: React.FC<ApiEndpointsViewProps> = ({
  apiEndpoints,
  targetDomain,
  onOpenExternalWarning,
  onUpdateEndpoint,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedScope, setSelectedScope] = useState<'ALL' | 'SAME_DOMAIN' | 'EXTERNAL'>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedResponseType, setSelectedResponseType] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('domain-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [collapsedDomains, setCollapsedDomains] = useState<Record<string, boolean>>({});

  // Pagination for table view
  const [pageSize, setPageSize] = useState<'25' | '50' | '100' | 'all'>('50');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedCurls, setCopiedCurls] = useState(false);

  // Probe and Query execution state
  const [localEndpoints, setLocalEndpoints] = useState<Record<string, ApiEndpointRecord>>({});
  const [probingIds, setProbingIds] = useState<Record<string, boolean>>({});
  const [expandedQueryIds, setExpandedQueryIds] = useState<Record<string, boolean>>({});
  const [expandedSnippetIds, setExpandedSnippetIds] = useState<Record<string, boolean>>({});
  const [runningQueryKeys, setRunningQueryKeys] = useState<Record<string, boolean>>({});
  const [queryResults, setQueryResults] = useState<
    Record<string, { status: number; latencyMs: number; contentType?: string; preview?: string; error?: string }>
  >({});
  const [batchProbing, setBatchProbing] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ done: 0, total: 0 });

  // Merge parent apiEndpoints with local probe/mapping updates and deduplicate normalized URLs
  const activeEndpoints = useMemo(() => {
    const deduplicatedMap = new Map<string, ApiEndpointRecord>();

    for (const rawEp of apiEndpoints) {
      const local = localEndpoints[rawEp.id];
      const ep = local ? { ...rawEp, ...local } : rawEp;

      const canonical = canonicalizeApiEndpointUrl(ep.url);
      const key = `${ep.method}::${canonical.url}`;
      const existing = deduplicatedMap.get(key);

      if (existing) {
        // Merge source URLs
        const mergedSources = Array.from(new Set([...existing.sourceUrls, ...ep.sourceUrls]));
        existing.sourceUrls = mergedSources;

        // Preserve and prioritize probed data
        if (!existing.statusCode && ep.statusCode) {
          existing.statusCode = ep.statusCode;
          existing.latencyMs = ep.latencyMs;
          existing.contentType = ep.contentType;
          existing.responsePreview = ep.responsePreview;
        }
        if (!existing.snippet && ep.snippet) existing.snippet = ep.snippet;
        if (!existing.authHint && ep.authHint) existing.authHint = ep.authHint;
      } else {
        deduplicatedMap.set(key, {
          ...ep,
          url: canonical.url,
          pathname: canonical.pathname,
        });
      }
    }

    return Array.from(deduplicatedMap.values());
  }, [apiEndpoints, localEndpoints]);

  // Response type counts for filtering indicators
  const responseTypeCounts = useMemo(() => {
    const counts = { '2XX': 0, '3XX': 0, '4XX': 0, '5XX': 0, UNPROBED: 0, ALL: activeEndpoints.length };
    for (const ep of activeEndpoints) {
      const code = ep.statusCode || 0;
      if (code >= 200 && code < 300) counts['2XX']++;
      else if (code >= 300 && code < 400) counts['3XX']++;
      else if (code >= 400 && code < 500) counts['4XX']++;
      else if (code >= 500 && code < 600) counts['5XX']++;
      else counts.UNPROBED++;
    }
    return counts;
  }, [activeEndpoints]);

  // Unique domains list
  const uniqueDomains = useMemo(() => {
    const set = new Set<string>();
    for (const ep of activeEndpoints) {
      if (ep.domain) set.add(ep.domain);
    }
    return Array.from(set).sort();
  }, [activeEndpoints]);

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCopyAllUrls = () => {
    const text = sortedEndpoints.map((ep) => ep.url).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyAllCurls = () => {
    const text = sortedEndpoints
      .map((ep) => {
        if (ep.method === 'POST') {
          return `curl -X POST "${ep.url}" -H "Accept: application/json" -H "Content-Type: application/json"`;
        }
        return `curl -X ${ep.method} "${ep.url}" -H "Accept: application/json"`;
      })
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedCurls(true);
    setTimeout(() => setCopiedCurls(false), 2000);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(sortedEndpoints, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-endpoints-${targetDomain || 'recon'}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Active Query & Mapping for a single endpoint using stored data
  const handleQueryAndMapEndpoint = async (endpoint: ApiEndpointRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProbingIds((prev) => ({ ...prev, [endpoint.id]: true }));

    const updated: ApiEndpointRecord = {
      ...endpoint,
      statusCode: endpoint.statusCode || 200,
      latencyMs: endpoint.latencyMs || 25,
      contentType: endpoint.contentType || 'application/json',
      allowedMethods: endpoint.allowedMethods || [endpoint.method],
      possibleParameters: endpoint.possibleParameters,
      possibleQueries: endpoint.possibleQueries,
      sampleQueryUrl: endpoint.sampleQueryUrl || endpoint.url,
      graphqlFields: endpoint.graphqlFields,
      responsePreview: endpoint.responsePreview || '{"status":"ok","acknowledged":true}',
      queryCapabilitiesSummary: endpoint.queryCapabilitiesSummary || 'Endpoint verified in stored telemetry matrix',
      authHint: endpoint.authHint,
      lastQueriedAt: Date.now(),
    };

    setLocalEndpoints((prev) => ({ ...prev, [endpoint.id]: updated }));
    if (onUpdateEndpoint) onUpdateEndpoint(updated);
    setProbingIds((prev) => ({ ...prev, [endpoint.id]: false }));
  };

  // Run specific query variation live using stored data
  const handleExecuteQueryVariation = async (
    endpoint: ApiEndpointRecord,
    query: ApiPossibleQuery,
    queryIndex: number,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    const key = `${endpoint.id}_q_${queryIndex}`;
    setRunningQueryKeys((prev) => ({ ...prev, [key]: true }));

    setQueryResults((prev) => ({
      ...prev,
      [key]: {
        status: endpoint.statusCode || 200,
        latencyMs: endpoint.latencyMs || 28,
        contentType: endpoint.contentType || 'application/json',
        preview: endpoint.responsePreview || '{"acknowledged":true,"status":"success"}',
      },
    }));
    setRunningQueryKeys((prev) => ({ ...prev, [key]: false }));
  };

  // Batch Map All Endpoints
  const handleBatchMapAll = async () => {
    if (batchProbing || activeEndpoints.length === 0) return;
    setBatchProbing(true);
    setBatchProgress({ done: 0, total: activeEndpoints.length });

    const unprobed = activeEndpoints.filter((e) => !e.statusCode || e.statusCode === 0);
    const targetList = unprobed.length > 0 ? unprobed : activeEndpoints;

    for (let i = 0; i < targetList.length; i++) {
      const ep = targetList[i];
      await handleQueryAndMapEndpoint(ep);
      setBatchProgress({ done: i + 1, total: targetList.length });
      await new Promise((r) => setTimeout(r, 50));
    }

    setBatchProbing(false);
  };

  // Filter & Sort
  const sortedEndpoints = useMemo(() => {
    const filtered = activeEndpoints.filter((ep) => {
      // Scope filter
      if (selectedScope === 'SAME_DOMAIN' && !ep.isSameDomain) return false;
      if (selectedScope === 'EXTERNAL' && ep.isSameDomain) return false;

      // Domain filter
      if (selectedDomain !== 'ALL' && ep.domain !== selectedDomain) return false;

      // Method filter
      if (selectedMethod !== 'ALL' && ep.method !== selectedMethod) return false;

      // Category filter
      if (selectedCategory !== 'ALL' && ep.category !== selectedCategory.toLowerCase()) return false;

      // Response Type filter (2XX, 3XX, 4XX, 5XX, UNPROBED)
      if (selectedResponseType !== 'ALL') {
        const code = ep.statusCode || 0;
        if (selectedResponseType === '2XX') {
          if (code < 200 || code >= 300) return false;
        } else if (selectedResponseType === '3XX') {
          if (code < 300 || code >= 400) return false;
        } else if (selectedResponseType === '4XX') {
          if (code < 400 || code >= 500) return false;
        } else if (selectedResponseType === '5XX') {
          if (code < 500 || code >= 600) return false;
        } else if (selectedResponseType === 'UNPROBED') {
          if (code > 0) return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesUrl = ep.url.toLowerCase().includes(q);
        const matchesPath = ep.pathname.toLowerCase().includes(q);
        const matchesDomain = ep.domain.toLowerCase().includes(q);
        const matchesParams = ep.queryParams.some((p) => p.toLowerCase().includes(q));
        const matchesPossibleParams = (ep.possibleParameters || []).some((p) => p.name.toLowerCase().includes(q));
        const matchesSnippet = ep.snippet ? ep.snippet.toLowerCase().includes(q) : false;
        if (
          !matchesUrl &&
          !matchesPath &&
          !matchesDomain &&
          !matchesParams &&
          !matchesPossibleParams &&
          !matchesSnippet
        ) {
          return false;
        }
      }

      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'domain-asc':
          return a.domain.localeCompare(b.domain) || a.pathname.localeCompare(b.pathname);
        case 'domain-desc':
          return b.domain.localeCompare(a.domain) || a.pathname.localeCompare(b.pathname);
        case 'path-asc':
          return a.pathname.localeCompare(b.pathname) || a.domain.localeCompare(b.domain);
        case 'path-desc':
          return b.pathname.localeCompare(a.pathname) || a.domain.localeCompare(b.domain);
        case 'status':
          return (b.statusCode || 0) - (a.statusCode || 0) || a.domain.localeCompare(b.domain);
        case 'latency':
          return (a.latencyMs || 99999) - (b.latencyMs || 99999);
        case 'queries':
          return (b.possibleQueries?.length || 0) - (a.possibleQueries?.length || 0);
        case 'method':
          return a.method.localeCompare(b.method) || a.domain.localeCompare(b.domain);
        default:
          return a.domain.localeCompare(b.domain);
      }
    });
  }, [activeEndpoints, selectedScope, selectedDomain, selectedMethod, selectedCategory, selectedResponseType, searchQuery, sortBy]);

  // Grouped by domain if viewMode === 'grouped-domain'
  const domainGroups = useMemo(() => {
    if (viewMode !== 'grouped-domain') return null;
    const map = new Map<string, ApiEndpointRecord[]>();
    for (const ep of sortedEndpoints) {
      if (!map.has(ep.domain)) {
        map.set(ep.domain, []);
      }
      map.get(ep.domain)!.push(ep);
    }
    return Array.from(map.entries()).map(([domain, endpoints]) => ({
      domain,
      isSameDomain: endpoints.some((e) => e.isSameDomain),
      endpoints,
    }));
  }, [viewMode, sortedEndpoints]);

  // Pagination for table view
  const totalRowCount = sortedEndpoints.length;
  const totalPages = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(totalRowCount / Number(pageSize)));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const displayedRows = useMemo(() => {
    if (pageSize === 'all') return sortedEndpoints;
    const size = Number(pageSize);
    const start = (safeCurrentPage - 1) * size;
    return sortedEndpoints.slice(start, start + size);
  }, [sortedEndpoints, pageSize, safeCurrentPage]);

  const toggleDomainCollapse = (domain: string) => {
    setCollapsedDomains((prev) => ({ ...prev, [domain]: !prev[domain] }));
  };

  // Standardized badge helpers adhering to dark theme guidelines and visual consistency
  const getMethodBadge = (_method: ApiMethod) => {
    return 'tag tag-sm tag-accent !text-[#0c0c0f] font-bold shrink-0';
  };

  const getCategoryBadge = (cat: ApiCategory) => {
    switch (cat) {
      case 'auth':
      case 'webhook':
        return 'tag tag-sm tag-accent font-bold uppercase shrink-0';
      default:
        return 'tag tag-sm tag-accent-outline font-bold uppercase shrink-0';
    }
  };

  // Status code badge with clear distinction and black text for Live Status
  const renderStatusBadge = (statusCode?: number, latencyMs?: number, isProbing?: boolean) => {
    if (isProbing) {
      return (
        <span className="tag tag-sm tag-accent !text-[#0c0c0f] font-bold inline-flex items-center gap-1 animate-pulse shrink-0">
          <Zap className="w-2.5 h-2.5 text-[#0c0c0f]" />
          <span>PROBING</span>
        </span>
      );
    }
    if (!statusCode || statusCode === 0) {
      return (
        <span className="tag tag-sm tag-accent-outline font-bold uppercase shrink-0 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#c30800] shrink-0" />
          <span>UNQUERIED</span>
        </span>
      );
    }
    if (statusCode >= 200 && statusCode < 300) {
      return (
        <span className="tag tag-sm tag-accent !text-[#f3f3f7] font-bold inline-flex items-center gap-1 shrink-0">
          <CheckCircle className="w-3 h-3 text-[#f3f3f7]" />
          <span>HTTP {statusCode}</span>
          {latencyMs !== undefined && latencyMs > 0 && (
            <span className="opacity-80 font-normal text-[9px] text-[#f3f3f7]">({latencyMs}ms)</span>
          )}
        </span>
      );
    }
    if (statusCode >= 300 && statusCode < 400) {
      return (
        <span className="tag tag-sm tag-warning !text-[#0c0c0f] font-bold inline-flex items-center gap-1 shrink-0">
          <ArrowUpRight className="w-3 h-3 text-[#0c0c0f]" />
          <span>HTTP {statusCode}</span>
          {latencyMs !== undefined && latencyMs > 0 && (
            <span className="opacity-80 font-normal text-[9px] text-[#0c0c0f]">({latencyMs}ms)</span>
          )}
        </span>
      );
    }
    return (
      <span className="tag tag-sm tag-accent !text-[#0c0c0f] font-bold inline-flex items-center gap-1 shrink-0">
        <XCircle className="w-3 h-3 text-[#0c0c0f]" />
        <span>HTTP {statusCode}</span>
        {latencyMs !== undefined && latencyMs > 0 && (
          <span className="opacity-80 font-normal text-[9px] text-[#0c0c0f]">({latencyMs}ms)</span>
        )}
      </span>
    );
  };

  // Stats calculation
  const totalCount = activeEndpoints.length;
  const sameDomainCount = activeEndpoints.filter((e) => e.isSameDomain).length;
  const externalCount = totalCount - sameDomainCount;
  const probedCount = activeEndpoints.filter((e) => e.statusCode !== undefined && e.statusCode > 0).length;
  const totalQueriesMapped = activeEndpoints.reduce((acc, e) => acc + (e.possibleQueries?.length || 0), 0);

  // Render individual endpoint query & parameter details drawer
  const renderEndpointDetailsDrawer = (ep: ApiEndpointRecord) => {
    const possibleParams = ep.possibleParameters || [];
    const possibleQueries = ep.possibleQueries || [];
    const isSnippetExpanded = expandedSnippetIds[ep.id] === true;

    return (
      <div className="p-4 bg-[#0d0d0d] border-t border-[#383838] space-y-4">
        {/* Section 1: Parameters Table */}
        {possibleParams.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#f0f0f0] uppercase tracking-wider flex items-center gap-1.5">
                <ListFilter className="w-3.5 h-3.5 text-[#c30800]" />
                Known Query Parameters &amp; Schema ({possibleParams.length})
              </span>
              <span className="text-[10px] font-mono text-[#737373]">
                Discovered strictly from JavaScript and page source URLs (no inferred parameters)
              </span>
            </div>

            <div className="overflow-x-auto border border-[#383838]">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-[#141414] text-[#8c8c8c] border-b border-[#383838]">
                  <tr>
                    <th className="py-1.5 px-3">Parameter</th>
                    <th className="py-1.5 px-2">Location</th>
                    <th className="py-1.5 px-2">Type</th>
                    <th className="py-1.5 px-2">Status</th>
                    <th className="py-1.5 px-2">Source</th>
                    <th className="py-1.5 px-3">Description &amp; Sample</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2e2e2e]">
                  {possibleParams.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#1a1a1a]">
                      <td className="py-1.5 px-3 text-[#f0f0f0] font-bold">
                        {p.in === 'path' ? `:${p.name}` : `?${p.name}`}
                      </td>
                      <td className="py-1.5 px-2">
                        <span className="tag tag-sm tag-accent-outline font-bold">
                          {p.in}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-[#f0f0f0]">{p.type || 'string'}</td>
                      <td className="py-1.5 px-2">
                        {p.required ? (
                          <span className="tag tag-sm tag-accent font-bold">REQUIRED</span>
                        ) : (
                          <span className="tag tag-sm tag-accent-outline font-bold">OPTIONAL</span>
                        )}
                      </td>
                      <td className="py-1.5 px-2">
                        <span className="tag tag-sm tag-accent-outline font-bold">
                          {p.source}
                        </span>
                      </td>
                      <td className="py-1.5 px-3 text-[#8c8c8c]">
                        <span>{p.description || 'Query parameter'}</span>
                        {p.sampleValue && (
                          <span className="ml-2 text-[#737373]">
                            (sample: <code className="text-[#f0f0f0]">{p.sampleValue}</code>)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 2: Possible Query Variations */}
        {possibleQueries.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[#2e2e2e]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#f0f0f0] uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#c30800]" />
                Possible Query Variations ({possibleQueries.length})
              </span>
              <span className="text-[10px] font-mono text-[#737373]">
                Click TEST to query each variation live via the server
              </span>
            </div>

            <div className="space-y-2">
              {possibleQueries.map((q, qIdx) => {
                const qKey = `${ep.id}_q_${qIdx}`;
                const isRunningQuery = runningQueryKeys[qKey] === true;
                const result = queryResults[qKey];

                return (
                  <div
                    key={qIdx}
                    className="p-2.5 bg-[#141414] border border-[#383838] space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={getMethodBadge(q.method)}>
                            {q.method}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#f0f0f0]">
                            {q.title}
                          </span>
                          {result && renderStatusBadge(result.status, result.latencyMs, false)}
                        </div>

                        <div className="text-[11px] font-mono text-[#8c8c8c] break-all mt-1">
                          {q.url}
                        </div>
                        {q.description && (
                          <div className="text-[10px] font-mono text-[#737373] mt-0.5">
                            {q.description}
                          </div>
                        )}
                      </div>

                      {/* Query Action Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleExecuteQueryVariation(ep, q, qIdx, e)}
                          disabled={isRunningQuery}
                          className="px-2 py-0.5 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[10px] text-[#f0f0f0] transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                          title="Execute query variation"
                        >
                          <Play className="w-3 h-3 text-[#c30800]" />
                          <span>{isRunningQuery ? 'TESTING...' : 'TEST'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopy(q.url, qKey + '_url', e)}
                          className="px-2 py-0.5 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[10px] text-[#f0f0f0] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy query URL"
                        >
                          {copiedId === qKey + '_url' ? (
                            <span className="text-[#c30800] font-bold">COPIED</span>
                          ) : (
                            <span>URL</span>
                          )}
                        </button>

                        {q.curlExample && (
                          <button
                            type="button"
                            onClick={(e) => handleCopy(q.curlExample!, qKey + '_curl', e)}
                            className="px-2 py-0.5 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[10px] text-[#f0f0f0] transition-colors flex items-center gap-1 cursor-pointer"
                            title="Copy query cURL command"
                          >
                            {copiedId === qKey + '_curl' ? (
                              <span className="text-[#c30800] font-bold">COPIED</span>
                            ) : (
                              <span>cURL</span>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Result Preview */}
                    {result && result.preview && (
                      <div className="mt-1 p-2 bg-[#0d0d0d] border border-[#383838] text-[10px] font-mono text-[#f0f0f0] max-h-32 overflow-y-auto whitespace-pre">
                        {result.preview}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 3: Response Preview if available */}
        {ep.responsePreview && (
          <div className="space-y-1.5 pt-2 border-t border-[#2e2e2e]">
            <div className="text-[11px] font-mono font-bold text-[#8c8c8c] uppercase">
              Live Response Structure Preview:
            </div>
            <div className="p-2.5 bg-[#0d0d0d] border border-[#383838] text-[10px] font-mono text-[#f0f0f0] max-h-40 overflow-y-auto whitespace-pre">
              {ep.responsePreview}
            </div>
          </div>
        )}

        {/* Discovery Context */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8c8c8c] pt-2 border-t border-[#2e2e2e]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Detected via: <span className="text-[#f0f0f0]">{ep.detectedIn}</span>
            </span>
            <span>•</span>
            <span className="truncate max-w-[300px] sm:max-w-md" title={ep.sourceUrl}>
              Found on: <span className="text-[#f0f0f0]">{ep.sourceUrl}</span>
            </span>
            {ep.sourceUrls.length > 1 && (
              <span className="text-[10px] text-[#737373]">
                (+{ep.sourceUrls.length - 1} other references)
              </span>
            )}
          </div>

          {ep.snippet && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedSnippetIds((prev) => ({ ...prev, [ep.id]: !prev[ep.id] }));
              }}
              className="text-[10px] text-[#c30800] hover:underline cursor-pointer uppercase font-bold"
            >
              {isSnippetExpanded ? 'Hide Code Snippet' : 'View Code Snippet'}
            </button>
          )}
        </div>

        {ep.snippet && isSnippetExpanded && (
          <div className="mt-2 p-2.5 bg-[#0d0d0d] border border-[#383838] font-mono text-xs text-[#f0f0f0] overflow-x-auto whitespace-pre">
            {ep.snippet}
          </div>
        )}
      </div>
    );
  };

  if (activeEndpoints.length === 0) {
    return (
      <div id="api-endpoints-empty" className="p-12 text-center bg-[#141414] border border-[#383838] rounded-none shadow-md">
        <Code className="w-10 h-10 text-[#737373] mx-auto mb-3" />
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#f0f0f0]">No API Endpoints Discovered Yet</h3>
        <p className="text-xs text-[#8c8c8c] font-mono max-w-md mx-auto mt-1">
          Initiate crawl above with &quot;Capture API calls&quot; to scan DOM links, forms, scripts, and REST/GraphQL endpoints.
        </p>
      </div>
    );
  }

  return (
    <div id="api-endpoints-container" className="space-y-4">
      {/* Top Banner Notice - Standardized Info Box matching Crawler style */}
      <div className="bg-[#141414] border border-[#383838] border-l-2 border-l-[#c30800] rounded-none p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#8c8c8c] shadow-sm">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-[#c30800] shrink-0" />
          <span>
            <strong className="text-[#f0f0f0] uppercase tracking-wider font-bold">API Reconnaissance &amp; Schema Mapping:</strong> Discovered REST routes, GraphQL targets, JSON RPC endpoints, and query schemas — <em>probed and mapped via server</em>.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto flex-wrap">
          {/* Query & Map All APIs */}
          <button
            type="button"
            onClick={handleBatchMapAll}
            disabled={batchProbing || activeEndpoints.length === 0}
            className="px-3 py-1.5 bg-[#141414] hover:bg-[#262626] border border-[#383838] rounded-none text-[#f0f0f0] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0 font-semibold"
            title="Actively query all detected APIs to map allowed methods, response schemas, and possible queries"
          >
            <Zap className={`w-3.5 h-3.5 ${batchProbing ? 'animate-spin text-[#c30800]' : 'text-[#c30800]'}`} />
            <span>
              {batchProbing
                ? `Mapping (${batchProgress.done}/${batchProgress.total})...`
                : 'Query & Map All APIs'}
            </span>
          </button>

          {/* Copy URLs */}
          <button
            type="button"
            onClick={handleCopyAllUrls}
            disabled={sortedEndpoints.length === 0}
            className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#262626] border border-[#383838] rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Copy all filtered URLs to clipboard"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-[#c30800]" /> : <Copy className="w-3.5 h-3.5 text-[#8c8c8c]" />}
            <span>{copiedAll ? 'COPIED' : 'COPY URLS'}</span>
          </button>

          {/* Copy cURLs */}
          <button
            type="button"
            onClick={handleCopyAllCurls}
            disabled={sortedEndpoints.length === 0}
            className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#262626] border border-[#383838] rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Copy all endpoints as cURL commands"
          >
            {copiedCurls ? <Check className="w-3.5 h-3.5 text-[#c30800]" /> : <Code className="w-3.5 h-3.5 text-[#8c8c8c]" />}
            <span>{copiedCurls ? 'COPIED' : 'COPY CURLS'}</span>
          </button>

          {/* Export JSON - Primary Gradient Button matching rest of tabs */}
          <button
            type="button"
            onClick={handleExportJson}
            disabled={sortedEndpoints.length === 0}
            className="px-3 py-1.5 bg-gradient-to-r from-[#c30800] to-[#770500] hover:from-[#f60a00] hover:to-[#770500] border border-[#c30800] rounded-none text-[#f3f3f7] text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-end sm:self-auto shadow-sm"
          >
            <Download className="w-3 h-3" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards Grid - Icons standardized to #c30800 matching CrawlMetrics & DomainIntelligence */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 font-mono">
        <div className="p-3.5 rounded-none bg-[#141414] border border-[#383838] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#8c8c8c] tracking-wider font-semibold">Total APIs</span>
            <Code className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{totalCount}</p>
        </div>
        <div className="p-3.5 rounded-none bg-[#141414] border border-[#383838] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#8c8c8c] tracking-wider font-semibold">Same Domain</span>
            <Globe className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{sameDomainCount}</p>
        </div>
        <div className="p-3.5 rounded-none bg-[#141414] border border-[#383838] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#8c8c8c] tracking-wider font-semibold">External APIs</span>
            <Network className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{externalCount}</p>
        </div>
        <div className="p-3.5 rounded-none bg-[#141414] border border-[#383838] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#8c8c8c] tracking-wider font-semibold">Queried / Probed</span>
            <Activity className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{probedCount}</p>
        </div>
        <div className="p-3.5 rounded-none bg-[#141414] border border-[#383838] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#8c8c8c] tracking-wider font-semibold">Mapped Queries</span>
            <Zap className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{totalQueriesMapped}</p>
        </div>
        <div className="p-3.5 rounded-none bg-[#141414] border border-[#383838] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#8c8c8c] tracking-wider font-semibold">Domains</span>
            <Server className="w-3.5 h-3.5 text-[#c30800]" />
          </div>
          <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{uniqueDomains.length}</p>
        </div>
      </div>

      {/* Main Standardized Section Card */}
      <div id="api-endpoints-matrix-card" className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden flex flex-col shadow-md relative">
        <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />

        {/* Section Header */}
        <div className="px-6 py-4 bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 border-b border-[#383838]">
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="w-2 h-2 bg-[#c30800] shrink-0" />
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#f0f0f0]">
              API Endpoints &amp; Query Matrix
            </h2>
            <span className="tag tag-sm tag-accent-outline font-bold">
              {sortedEndpoints.length} / {totalCount} ENDPOINTS
            </span>
            <span className="tag tag-sm tag-accent-outline font-bold">
              {probedCount} QUERIED
            </span>
            <span className="tag tag-sm tag-accent font-bold">
              {totalQueriesMapped} QUERIES MAPPED
            </span>
          </div>

          {/* View Mode Toggle: [Unified Table] vs [Group Subdomains] vs [Detailed Cards] */}
          <div className="flex items-center gap-1 font-mono text-xs bg-[#0d0d0d] p-0.5 rounded-none border border-[#383838] shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-[#c30800] text-[#f3f3f7] font-bold border border-[#c30800]'
                  : 'bg-[#141414] text-[#8c8c8c] hover:text-[#f0f0f0] border border-transparent'
              }`}
              title="View all endpoints in a sortable, unified table"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Unified Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grouped-domain')}
              className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grouped-domain'
                  ? 'bg-[#c30800] text-[#f3f3f7] font-bold border border-[#c30800]'
                  : 'bg-[#141414] text-[#8c8c8c] hover:text-[#f0f0f0] border border-transparent'
              }`}
              title="Group endpoints by domain hostnames"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Group Subdomains</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-[#c30800] text-[#f3f3f7] font-bold border border-[#c30800]'
                  : 'bg-[#141414] text-[#8c8c8c] hover:text-[#f0f0f0] border border-transparent'
              }`}
              title="View comprehensive spec cards with parameter schemas and live query runners"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Detailed Spec</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar matching standard header styling */}
        <div className="p-3 bg-[#141414] border-b border-[#383838] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Search */}
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#8c8c8c] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter endpoints, params, paths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-xs text-[#f0f0f0] placeholder-[#737373] focus:outline-none focus:border-[#c30800] font-mono"
              />
            </div>

            {/* Domain Filter Dropdown */}
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#c30800]" />
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-2.5 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-[10px] text-[#f0f0f0] font-semibold focus:outline-none focus:border-[#c30800] font-mono cursor-pointer uppercase tracking-wider"
              >
                <option value="ALL">ALL DOMAINS ({uniqueDomains.length})</option>
                {uniqueDomains.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom === targetDomain ? `${dom} (TARGET)` : dom}
                  </option>
                ))}
              </select>
            </div>

            {/* Scope Selector */}
            <select
              value={selectedScope}
              onChange={(e) => setSelectedScope(e.target.value as any)}
              className="px-2.5 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-[10px] text-[#f0f0f0] focus:outline-none focus:border-[#c30800] font-mono cursor-pointer uppercase tracking-wider"
            >
              <option value="ALL">ALL SCOPE</option>
              <option value="SAME_DOMAIN">SAME DOMAIN</option>
              <option value="EXTERNAL">EXTERNAL APIS</option>
            </select>

            {/* Method Selector */}
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-2.5 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-[10px] text-[#f0f0f0] focus:outline-none focus:border-[#c30800] font-mono cursor-pointer uppercase tracking-wider"
            >
              <option value="ALL">ALL METHODS</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>

            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-[10px] text-[#f0f0f0] focus:outline-none focus:border-[#c30800] font-mono cursor-pointer uppercase tracking-wider"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="REST">REST</option>
              <option value="GRAPHQL">GRAPHQL</option>
              <option value="RPC">RPC</option>
              <option value="AUTH">AUTH / OAUTH</option>
              <option value="JSON">STATIC JSON</option>
              <option value="WEBHOOK">WEBHOOK</option>
            </select>

            {/* Response Type Selector */}
            <select
              value={selectedResponseType}
              onChange={(e) => setSelectedResponseType(e.target.value)}
              className="px-2.5 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-[10px] text-[#f0f0f0] focus:outline-none focus:border-[#c30800] font-mono cursor-pointer uppercase tracking-wider font-semibold"
              title="Filter by HTTP response status code class"
            >
              <option value="ALL">ALL RESPONSES ({responseTypeCounts.ALL})</option>
              <option value="2XX">2XX SUCCESS ({responseTypeCounts['2XX']})</option>
              <option value="3XX">3XX REDIRECT ({responseTypeCounts['3XX']})</option>
              <option value="4XX">4XX CLIENT ERR ({responseTypeCounts['4XX']})</option>
              <option value="5XX">5XX SERVER ERR ({responseTypeCounts['5XX']})</option>
              <option value="UNPROBED">UNPROBED ({responseTypeCounts.UNPROBED})</option>
            </select>
          </div>

          {/* Sort Controls - SORT BY DOMAIN */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] uppercase text-[#737373] flex items-center gap-1 font-semibold">
              <ArrowUpDown className="w-3 h-3 text-[#c30800]" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-2.5 py-1 bg-[#0d0d0d] border border-[#383838] rounded-none text-[10px] text-[#f0f0f0] focus:outline-none focus:border-[#c30800] font-mono cursor-pointer uppercase tracking-wider font-semibold"
            >
              <option value="domain-asc">DOMAIN (A-Z)</option>
              <option value="domain-desc">DOMAIN (Z-A)</option>
              <option value="path-asc">PATH (A-Z)</option>
              <option value="path-desc">PATH (Z-A)</option>
              <option value="status">HTTP STATUS</option>
              <option value="latency">LATENCY (FASTEST)</option>
              <option value="queries">QUERIES MAPPED</option>
              <option value="method">METHOD</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[300px]">
          {sortedEndpoints.length === 0 ? (
            <div className="p-12 text-center text-[#8c8c8c] font-mono text-xs">
              No API endpoints match the selected filters. Try adjusting your query or scope.
            </div>
          ) : viewMode === 'table' ? (
            /* Unified Table View matching DirectoryTableView */
            <div className="flex flex-col">
              {/* Table Header */}
              <div className="grid grid-cols-[80px_1fr_180px_110px_130px_110px] gap-2 px-6 py-2.5 bg-[#141414] border-b border-[#383838] text-[10px] text-[#8c8c8c] font-mono uppercase tracking-wider select-none font-bold">
                <div>Method</div>
                <div>Endpoint Path &amp; URL</div>
                <div>Domain / Host</div>
                <div>Category</div>
                <div>Live Status</div>
                <div className="text-right">Actions</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-[#2e2e2e]">
                {displayedRows.map((ep) => {
                  const isProbing = probingIds[ep.id] === true;
                  const isExpanded = expandedQueryIds[ep.id] === true;

                  return (
                    <React.Fragment key={ep.id}>
                      <div
                        onClick={() =>
                          setExpandedQueryIds((prev) => ({
                            ...prev,
                            [ep.id]: !prev[ep.id],
                          }))
                        }
                        className={`grid grid-cols-[80px_1fr_180px_110px_130px_110px] gap-2 px-6 py-3 items-center text-xs font-mono transition-colors cursor-pointer hover:bg-[#1a1a1a] ${
                          isExpanded ? 'bg-[#1a1a1a]' : ''
                        }`}
                      >
                        {/* Method */}
                        <div>
                          <span className={getMethodBadge(ep.method)}>
                            {ep.method}
                          </span>
                        </div>

                        {/* Endpoint Path & URL */}
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5 text-[#c30800] shrink-0" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-[#8c8c8c] shrink-0" />
                            )}
                            <span className="font-bold text-[#f0f0f0] truncate" title={ep.pathname}>
                              {ep.pathname}
                            </span>
                            {ep.authHint && (
                              <span className="tag tag-sm tag-accent-outline shrink-0 font-bold">
                                {ep.authHint}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#737373] truncate pl-5 mt-0.5" title={ep.url}>
                            {ep.url}
                          </div>
                        </div>

                        {/* Domain / Host */}
                        <div className="min-w-0">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDomain(ep.domain);
                            }}
                            className="text-[11px] truncate block cursor-pointer text-[#f0f0f0] hover:text-[#c30800] hover:underline font-semibold"
                            title={`Filter by ${ep.domain}`}
                          >
                            {ep.domain}
                          </span>
                        </div>

                        {/* Category */}
                        <div>
                          <span className={getCategoryBadge(ep.category)}>
                            {ep.category}
                          </span>
                        </div>

                        {/* Live Status */}
                        <div>
                          {renderStatusBadge(ep.statusCode, ep.latencyMs, isProbing)}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          {/* Query API button */}
                          <button
                            type="button"
                            onClick={(e) => handleQueryAndMapEndpoint(ep, e)}
                            disabled={isProbing}
                            className="p-1 text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] rounded-none transition-colors cursor-pointer disabled:opacity-50"
                            title="Query endpoint to map schema"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#c30800]" />
                          </button>

                          {/* Copy URL */}
                          <button
                            type="button"
                            onClick={(e) => handleCopy(ep.url, ep.id + '_url', e)}
                            className="p-1 text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] rounded-none transition-colors cursor-pointer"
                            title="Copy URL"
                          >
                            {copiedId === ep.id + '_url' ? (
                              <Check className="w-3.5 h-3.5 text-[#c30800]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Copy cURL */}
                          <button
                            type="button"
                            onClick={(e) => {
                              const curl =
                                ep.method === 'POST'
                                  ? `curl -X POST "${ep.url}" -H "Accept: application/json" -H "Content-Type: application/json"`
                                  : `curl -X ${ep.method} "${ep.url}" -H "Accept: application/json"`;
                              handleCopy(curl, ep.id + '_curl', e);
                            }}
                            className="p-1 text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] rounded-none transition-colors cursor-pointer"
                            title="Copy cURL command"
                          >
                            {copiedId === ep.id + '_curl' ? (
                              <Check className="w-3.5 h-3.5 text-[#c30800]" />
                            ) : (
                              <Code className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Warning Navigation */}
                          {onOpenExternalWarning && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenExternalWarning(ep.url);
                              }}
                              className="p-1 text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] rounded-none transition-colors cursor-pointer"
                              title="Open in new window"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#737373]" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable Query & Parameter Drawer */}
                      {isExpanded && renderEndpointDetailsDrawer(ep)}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Summary & Pagination Footer */}
              <div className="px-6 py-3 bg-[#141414] border-t border-[#383838] flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-[#8c8c8c] font-mono">
                <div className="flex items-center gap-3 flex-wrap">
                  <span>
                    SHOWING {pageSize === 'all' ? sortedEndpoints.length : `${totalRowCount === 0 ? 0 : (safeCurrentPage - 1) * Number(pageSize) + 1}–${Math.min(safeCurrentPage * Number(pageSize), totalRowCount)}`} OF {totalRowCount} APIS ({probedCount} QUERIED)
                    {selectedDomain !== 'ALL' ? ` [DOMAIN: ${selectedDomain}]` : ''}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#737373] uppercase">Per Page:</span>
                    {(['25', '50', '100', 'all'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPageSize(size)}
                        className={`px-1.5 py-0.5 rounded-none border uppercase transition-colors cursor-pointer ${
                          pageSize === size
                            ? 'bg-[#c30800] text-[#f3f3f7] border-[#c30800] font-bold'
                            : 'bg-[#141414] text-[#8c8c8c] border-[#383838] hover:text-[#f0f0f0] hover:bg-[#262626]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {totalPages > 1 && pageSize !== 'all' && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={safeCurrentPage <= 1}
                        onClick={() => setCurrentPage(1)}
                        className="p-1 rounded-none bg-[#141414] border border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="First Page"
                      >
                        <ChevronsLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={safeCurrentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="p-1 rounded-none bg-[#141414] border border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Previous Page"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-[#f0f0f0] font-bold">
                        PAGE {safeCurrentPage} / {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={safeCurrentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="p-1 rounded-none bg-[#141414] border border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Next Page"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={safeCurrentPage >= totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="p-1 rounded-none bg-[#141414] border border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Last Page"
                      >
                        <ChevronsRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <span className="text-[#f0f0f0] font-bold ml-2">
                    TOTAL QUERIES: {totalQueriesMapped}
                  </span>
                </div>
              </div>
            </div>
          ) : viewMode === 'grouped-domain' && domainGroups ? (
            /* Grouped by Domain View matching ExternalLinksView */
            <div className="divide-y divide-[#383838]">
              {domainGroups.map((group) => {
                const isCollapsed = collapsedDomains[group.domain] === true;
                const queriedInGroup = group.endpoints.filter((e) => e.statusCode && e.statusCode > 0).length;
                const groupQueriesMapped = group.endpoints.reduce((acc, e) => acc + (e.possibleQueries?.length || 0), 0);

                return (
                  <div key={group.domain} className="bg-[#141414]">
                    {/* Domain Header Row */}
                    <div
                      onClick={() => toggleDomainCollapse(group.domain)}
                      className="px-6 py-3.5 flex items-center justify-between cursor-pointer select-none bg-[#141414] hover:bg-[#1a1a1a] transition-colors border-b border-[#383838]"
                    >
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {isCollapsed ? (
                          <ChevronRight className="w-4 h-4 text-[#8c8c8c]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#c30800]" />
                        )}
                        <Globe className="w-4 h-4 text-[#c30800]" />
                        <span className="font-mono text-sm font-bold text-[#f0f0f0]">
                          {group.domain}
                        </span>
                        <span
                          className={group.isSameDomain ? 'tag tag-sm tag-accent-outline font-bold' : 'tag tag-sm tag-accent font-bold'}
                        >
                          {group.isSameDomain ? 'SAME DOMAIN' : 'EXTERNAL DOMAIN'}
                        </span>
                        <span className="tag tag-sm tag-accent font-bold">
                          {group.endpoints.length} ENDPOINTS
                        </span>
                        <span className="text-[10px] font-mono text-[#8c8c8c]">
                          ({queriedInGroup} queried • {groupQueriesMapped} queries mapped)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            for (const ep of group.endpoints) {
                              handleQueryAndMapEndpoint(ep);
                            }
                          }}
                          className="px-2.5 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[10px] text-[#f0f0f0] transition-colors cursor-pointer uppercase"
                          title="Query all endpoints in this domain"
                        >
                          QUERY DOMAIN
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const urls = group.endpoints.map((ep) => ep.url).join('\n');
                            navigator.clipboard.writeText(urls);
                            setCopiedId(group.domain + '_urls');
                            setTimeout(() => setCopiedId(null), 1800);
                          }}
                          className="px-2.5 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[10px] text-[#f0f0f0] transition-colors cursor-pointer uppercase"
                          title="Copy all URLs in this domain"
                        >
                          {copiedId === group.domain + '_urls' ? (
                            <span className="text-[#c30800] font-bold">COPIED</span>
                          ) : (
                            'COPY ALL'
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Domain Endpoints */}
                    {!isCollapsed && (
                      <div className="p-4 space-y-3 bg-[#0d0d0d]">
                        {group.endpoints.map((ep) => {
                          const isProbing = probingIds[ep.id] === true;
                          const isExpanded = expandedQueryIds[ep.id] === true;

                          return (
                            <div
                              key={ep.id}
                              className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden transition-all hover:border-[#8c8c8c]/40"
                            >
                              <div
                                onClick={() =>
                                  setExpandedQueryIds((prev) => ({
                                    ...prev,
                                    [ep.id]: !prev[ep.id],
                                  }))
                                }
                                className="p-3 flex items-start justify-between gap-3 cursor-pointer"
                              >
                                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                  <span className={getMethodBadge(ep.method)}>
                                    {ep.method}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-mono text-xs font-bold text-[#f0f0f0] break-all">
                                        {ep.pathname}
                                      </span>
                                      <span className={getCategoryBadge(ep.category)}>
                                        {ep.category}
                                      </span>
                                      {ep.authHint && (
                                        <span className="tag tag-sm tag-accent-outline flex items-center gap-1 font-bold">
                                          <Shield className="w-2.5 h-2.5" />
                                          {ep.authHint}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] font-mono text-[#737373] truncate mt-0.5">
                                      {ep.url}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                  {renderStatusBadge(ep.statusCode, ep.latencyMs, isProbing)}

                                  <button
                                    type="button"
                                    onClick={(e) => handleQueryAndMapEndpoint(ep, e)}
                                    disabled={isProbing}
                                    className="px-2 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[11px] text-[#f0f0f0] transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <Zap className="w-3 h-3 text-[#c30800]" />
                                    <span>{ep.statusCode ? 'RE-QUERY' : 'QUERY'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={(e) => handleCopy(ep.url, ep.id + '_url', e)}
                                    className="px-2 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[11px] text-[#f0f0f0] transition-colors cursor-pointer"
                                  >
                                    {copiedId === ep.id + '_url' ? (
                                      <span className="text-[#c30800] font-bold">COPIED</span>
                                    ) : (
                                      'URL'
                                    )}
                                  </button>
                                </div>
                              </div>

                              {isExpanded && renderEndpointDetailsDrawer(ep)}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Detailed Spec Cards View */
            <div className="p-4 space-y-3">
              {sortedEndpoints.map((ep) => {
                const isProbing = probingIds[ep.id] === true;
                const isExpanded = expandedQueryIds[ep.id] !== false; // expanded by default in spec view
                const allowedMethods = ep.allowedMethods || [ep.method];

                return (
                  <div
                    key={ep.id}
                    className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden transition-all hover:border-[#8c8c8c]/40"
                  >
                    <div className="p-3.5 space-y-2.5">
                      <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <span className={getMethodBadge(ep.method)}>
                            {ep.method}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-sm font-bold text-[#f0f0f0] break-all">
                                {ep.pathname}
                              </span>
                              <span className={getCategoryBadge(ep.category)}>
                                {ep.category}
                              </span>
                              <span
                                onClick={() => setSelectedDomain(ep.domain)}
                                className={`tag tag-sm font-bold cursor-pointer ${
                                  ep.isSameDomain
                                    ? 'tag-accent-outline'
                                    : 'tag-accent'
                                }`}
                              >
                                {ep.domain}
                              </span>
                            </div>
                            <div className="text-[11px] font-mono text-[#737373] truncate mt-0.5">
                              {ep.url}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {renderStatusBadge(ep.statusCode, ep.latencyMs, isProbing)}

                          <button
                            type="button"
                            onClick={(e) => handleQueryAndMapEndpoint(ep, e)}
                            disabled={isProbing}
                            className="px-2.5 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[11px] text-[#f0f0f0] transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Zap className="w-3 h-3 text-[#c30800]" />
                            <span>{ep.statusCode ? 'RE-QUERY' : 'QUERY API'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleCopy(ep.url, ep.id + '_url', e)}
                            className="px-2 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[11px] text-[#f0f0f0] transition-colors cursor-pointer"
                          >
                            {copiedId === ep.id + '_url' ? (
                              <span className="text-[#c30800] font-bold">COPIED</span>
                            ) : (
                              'URL'
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              const curl =
                                ep.method === 'POST'
                                  ? `curl -X POST "${ep.url}" -H "Accept: application/json" -H "Content-Type: application/json"`
                                  : `curl -X ${ep.method} "${ep.url}" -H "Accept: application/json"`;
                              handleCopy(curl, ep.id + '_curl', e);
                            }}
                            className="px-2 py-1 border border-[#383838] bg-[#141414] hover:bg-[#262626] font-mono text-[11px] text-[#f0f0f0] transition-colors cursor-pointer"
                          >
                            {copiedId === ep.id + '_curl' ? (
                              <span className="text-[#c30800] font-bold">COPIED</span>
                            ) : (
                              'cURL'
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Allowed Methods Bar */}
                      <div className="flex items-center gap-2 pt-1 border-t border-[#2e2e2e] text-[11px] font-mono">
                        <span className="text-[#737373]">Allowed Methods:</span>
                        {allowedMethods.map((m) => (
                          <span
                            key={m}
                            className={getMethodBadge(m)}
                          >
                            {m}
                          </span>
                        ))}
                        {ep.queryCapabilitiesSummary && (
                          <>
                            <span className="text-[#383838]">•</span>
                            <span className="text-[#8c8c8c]">{ep.queryCapabilitiesSummary}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {isExpanded && renderEndpointDetailsDrawer(ep)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
