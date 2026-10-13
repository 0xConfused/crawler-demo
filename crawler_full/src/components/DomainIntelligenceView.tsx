// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useEffect } from 'react';
import { safeClampInput } from '../utils/urlUtils';
import { DomainIntelligence } from '../types';
import { CrtSubdomainsInspector } from './CrtSubdomainsInspector';
import {
  Globe,
  Shield,
  ShieldCheck,
  Server,
  Lock,
  Search,
  RefreshCw,
  Copy,
  Check,
  Download,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Network,
} from 'lucide-react';

interface DomainIntelligenceViewProps {
  targetDomain?: string | null;
  cachedData?: DomainIntelligence | null;
  domainCacheMap?: Record<string, DomainIntelligence>;
  refreshKey?: number;
  onCacheData?: (domain: string, data: DomainIntelligence) => void;
  onDomainChange?: (domain: string) => void;
  onCrawlHost?: (host: string) => void;
}

export const DomainIntelligenceView: React.FC<DomainIntelligenceViewProps> = ({
  targetDomain,
  cachedData,
  domainCacheMap,
  refreshKey: _refreshKey,
  onCacheData,
  onDomainChange,
  onCrawlHost,
}) => {
  const [domainInput, setDomainInput] = useState<string>(targetDomain || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCrt, setLoadingCrt] = useState<boolean>(false);
  const [data, setData] = useState<DomainIntelligence | null>(() => {
    if (cachedData) return cachedData;
    if (targetDomain && domainCacheMap) {
      const clean = targetDomain.toLowerCase().replace(/:\d+$/, '');
      if (domainCacheMap[clean]) return domainCacheMap[clean];
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [dnsTypeFilter, setDnsTypeFilter] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [showRawWhois, setShowRawWhois] = useState<boolean>(false);

  function formatDateSafely(dateStr?: string): string {
    if (!dateStr) return 'Unknown / Not Provided';
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toUTCString();
      }
    } catch {}
    return dateStr;
  }

  const cacheMapRef = React.useRef(domainCacheMap);
  cacheMapRef.current = domainCacheMap;

  useEffect(() => {
    if (targetDomain && targetDomain !== domainInput) {
      setDomainInput(targetDomain);
      const clean = targetDomain.toLowerCase().replace(/:\d+$/, '');
      if (cacheMapRef.current && cacheMapRef.current[clean]) {
        setData(cacheMapRef.current[clean]);
      } else {
        setData(null);
      }
    }
  }, [targetDomain]);

  useEffect(() => {
    if (domainInput && !data && !loading) {
      const clean = domainInput.toLowerCase().replace(/:\d+$/, '');
      if (cacheMapRef.current && cacheMapRef.current[clean]) {
        setData(cacheMapRef.current[clean]);
      }
    }
  }, []);

  const fetchDomainInfo = async (domainToQuery: string, forceRefresh = false) => {
    if (!domainToQuery.trim()) return;

    let clean = domainToQuery.trim();
    try {
      if (/^https?:\/\//i.test(clean)) {
        clean = new URL(clean).hostname;
      } else if (clean.includes('/')) {
        clean = clean.split('/')[0];
      }
    } catch {}

    clean = clean.toLowerCase().replace(/:\d+$/, '');

    if (!forceRefresh && cacheMapRef.current && cacheMapRef.current[clean]) {
      setData(cacheMapRef.current[clean]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/domain-info?domain=${encodeURIComponent(clean)}`);
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to fetch domain intelligence');
      }
      setData(result);
      onCacheData?.(clean, result);
    } catch (err: any) {
      setError(err.message || 'Error looking up domain intelligence');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshCrt = async () => {
    if (!data?.domain) return;
    setLoadingCrt(true);
    try {
      const res = await fetch(`/api/crt-subdomains?domain=${encodeURIComponent(data.domain)}`);
      if (res.ok) {
        const crtRes = await res.json();
        setData((prev) => {
          if (!prev) return prev;
          const updated = { ...prev, crtSubdomains: crtRes };
          onCacheData?.(data.domain, updated);
          return updated;
        });
      }
    } catch {
      // ignore
    } finally {
      setLoadingCrt(false);
    }
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    let clean = domainInput.trim();
    try {
      if (/^https?:\/\//i.test(clean)) {
        clean = new URL(clean).hostname;
      } else if (clean.includes('/')) {
        clean = clean.split('/')[0];
      }
    } catch {}

    clean = clean.toLowerCase().replace(/:\d+$/, '');
    onDomainChange?.(clean);
    fetchDomainInfo(clean, true);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyJson = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedKey('all_json');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExportZone = () => {
    if (!data || !data.dns) return;
    const lines = [
      `; DNS Records for ${data.domain}`,
      `; Generated at ${new Date(data.fetchedAt).toISOString()}`,
      '',
      ...data.dns.map((r) => `${r.name}.\t${r.ttl || 300}\tIN\t${r.type}\t${r.priority ? r.priority + ' ' : ''}${r.value}`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.domain}-dns-zone.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredDns = (data?.dns || []).filter((record) => {
    if (dnsTypeFilter === 'all') return true;
    return record.type.toUpperCase() === dnsTypeFilter.toUpperCase();
  });

  const availableDnsTypes = Array.from(new Set((data?.dns || []).map((r) => r.type.toUpperCase()))).sort();

  return (
    <div id="domain-intelligence-view" className="space-y-5">
      {/* Domain Lookup Card with Standardized Header */}
      <div id="domain-intelligence-card" className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden flex flex-col shadow-md relative">
        <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />

        {/* Section Header */}
        <div className="px-6 py-4 bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 border-b border-[#383838]">
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="w-2 h-2 bg-[#c30800] shrink-0" />
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#f0f0f0]">
              Domain Intelligence &amp; WHOIS Registry
            </h2>
            {data?.domain && (
              <span className="tag tag-sm tag-accent-outline font-bold">
                {data.domain}
              </span>
            )}
          </div>

          {data && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyJson}
                title="Copy Full Report as JSON"
                className="px-2.5 py-1 bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] rounded-none text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-[#383838]"
              >
                {copiedKey === 'all_json' ? (
                  <Check className="w-3.5 h-3.5 text-[#c30800]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#8c8c8c]" />
                )}
                <span>JSON</span>
              </button>

              <button
                type="button"
                onClick={handleExportZone}
                title="Export DNS Zone"
                className="px-2.5 py-1 bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] rounded-none text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-[#383838]"
              >
                <Download className="w-3.5 h-3.5 text-[#8c8c8c]" />
                <span>Zone</span>
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 bg-[#141414]">
          <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-3 min-w-0">
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8c8c8c]">
                <Globe className="w-4 h-4 text-[#c30800]" />
              </div>
              <input
                id="domain-search-input"
                type="text"
                maxLength={200}
                placeholder="Enter domain or hostname (e.g. wikipedia.org, ietf.org)..."
                value={domainInput}
                onChange={(e) => setDomainInput(safeClampInput(e.target.value, 200))}
                className="w-full pl-10 pr-4 py-2 bg-[#0d0d0d] border border-[#383838] rounded-none font-mono text-xs text-[#f0f0f0] placeholder-[#737373] focus:outline-none focus:border-[#c30800]"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="submit"
                disabled={loading || !domainInput.trim()}
                className="px-5 py-2 bg-gradient-to-r from-[#c30800] to-[#770500] hover:from-[#f60a00] hover:to-[#770500] text-[#f3f3f7] rounded-none text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 border border-[#c30800] shadow-sm"
              >
                {loading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>Query Intelligence</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-3 bg-[#141414] border border-[#383838] border-l-2 border-l-[#c3005a] rounded-none p-3 text-xs font-mono text-[#f0f0f0] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#c3005a] shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {loading && !data && (
        <div className="p-12 text-center bg-[#141414] border border-[#383838] rounded-none text-[#8c8c8c] font-mono text-xs shadow-md">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#c30800] mb-3" />
          <p>Querying DNS records, WHOIS registry, SSL certificate &amp; HTTP headers...</p>
        </div>
      )}

      {!loading && !data && !error && (
        <div className="p-12 text-center bg-[#141414] border border-[#383838] rounded-none text-[#8c8c8c] font-mono text-xs shadow-md space-y-3">
          <Shield className="w-10 h-10 mx-auto text-[#737373] mb-2" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#f0f0f0]">Domain Intelligence &amp; WHOIS Idle</h3>
          <p className="max-w-md mx-auto text-xs text-[#8c8c8c] font-mono leading-relaxed">
            DNS records, WHOIS registry data, and SSL certificate intelligence are queried on-demand.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                const target = domainInput || targetDomain;
                if (target) fetchDomainInfo(target, true);
              }}
              disabled={!(domainInput || targetDomain)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c30800] to-[#770500] hover:from-[#f60a00] hover:to-[#770500] text-[#f3f3f7] font-mono text-xs font-bold rounded-none uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 border border-[#c30800] shadow-md"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Query Domain Intelligence &amp; WHOIS</span>
            </button>
          </div>
        </div>
      )}

      {data && (
        <>
          {/* Quick Stat Headline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 font-mono">
            {/* IP & Host */}
            <div className="p-3.5 bg-[#141414] border border-[#383838] rounded-none">
              <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
                <span>Target Domain</span>
                <Globe className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-base font-bold text-[#f0f0f0] mt-1 truncate">{data.domain}</p>
              <div className="text-[11px] text-[#8c8c8c] mt-0.5 flex items-center gap-1.5">
                <span>Resolved IP:</span>
                <span className="text-[#f0f0f0] font-semibold">{data.resolvedIp || 'N/A'}</span>
              </div>
            </div>

            {/* Certificate Transparency Subdomains */}
            <div className="p-3.5 bg-[#141414] border border-[#383838] rounded-none">
              <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
                <span>crt.name Subdomains</span>
                <Network className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-base font-bold text-[#c30800] mt-1 truncate">
                {data.crtSubdomains?.subdomains
                  ? `${data.crtSubdomains.subdomains.length.toLocaleString()} Hosts`
                  : loadingCrt
                  ? 'Loading CT...'
                  : '0 Discovered'}
              </p>
              <div className="text-[11px] text-[#8c8c8c] mt-0.5 flex items-center gap-1">
                <span>Apex:</span>
                <span className="text-[#f0f0f0] font-semibold truncate">
                  {data.crtSubdomains?.apexDomain || data.domain}
                </span>
              </div>
            </div>

            {/* Registrar */}
            <div className="p-3.5 bg-[#141414] border border-[#383838] rounded-none">
              <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
                <span>Registrar</span>
                <div className="flex items-center gap-1">
                  {data.whois?.source && (
                    <span className="tag tag-sm tag-accent font-bold uppercase tracking-wider">
                      {data.whois.source}
                    </span>
                  )}
                  <Shield className="w-3.5 h-3.5 text-[#c30800]" />
                </div>
              </div>
              <p className="text-base font-bold text-[#f0f0f0] mt-1 truncate" title={data.whois?.registrar}>
                {data.whois?.registrar || 'Unknown / Privacy Protected'}
              </p>
              <div className="text-[11px] text-[#8c8c8c] mt-0.5 truncate">
                Expires: {data.whois?.expiresDate ? formatDateSafely(data.whois.expiresDate) : 'N/A'}
              </div>
            </div>

            {/* SSL / TLS Status */}
            <div className="p-3.5 bg-[#141414] border border-[#383838] rounded-none">
              <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
                <span>SSL / TLS Status</span>
                <Lock className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {data.ssl ? (
                  data.ssl.isExpired ? (
                    <span className="text-[#c3005a] font-bold flex items-center gap-1 text-sm">
                      <XCircle className="w-3.5 h-3.5" /> Expired
                    </span>
                  ) : (
                    <span className="text-[#f0f0f0] font-bold flex items-center gap-1 text-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c30800]" /> Active ({data.ssl.daysRemaining}d)
                    </span>
                  )
                ) : (
                  <span className="text-[#8c8c8c] text-sm font-semibold">No SSL Detected</span>
                )}
              </div>
              <div className="text-[11px] text-[#8c8c8c] mt-0.5 truncate">
                Issuer: {data.ssl?.issuer || 'Unknown'}
              </div>
            </div>

            {/* Web Server & Latency */}
            <div className="p-3.5 bg-[#141414] border border-[#383838] rounded-none">
              <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
                <span>Server & Latency</span>
                <Server className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-base font-bold text-[#f0f0f0] mt-1 truncate">
                {data.server?.server || 'HTTP Server'}
              </p>
              <div className="text-[11px] text-[#8c8c8c] mt-0.5 flex items-center gap-1.5">
                <span>Latency:</span>
                <span className="text-[#f0f0f0]">{data.server?.latencyMs ? `${data.server.latencyMs} ms` : 'N/A'}</span>
                {data.server?.statusCode ? (
                  <>
                    <span>•</span>
                    <span className={data.server.statusCode < 300 ? 'tag tag-sm tag-accent !text-[#f3f3f7] font-bold' : data.server.statusCode < 400 ? 'tag tag-sm tag-warning !text-[#0c0c0f] font-bold' : 'tag tag-sm tag-accent !text-[#0c0c0f] font-bold'}>
                      HTTP {data.server.statusCode}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* DNS Records Section */}
          <div className="bg-[#141414] border border-[#383838] rounded-none overflow-hidden shadow-sm relative">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />
            <div className="px-6 py-4 border-b border-[#383838] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#c30800] shrink-0" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#f0f0f0] font-bold">
                  DNS Resource Records ({data.dns?.length || 0})
                </h3>
              </div>

              {/* DNS Filter Type Chips */}
              <div className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setDnsTypeFilter('all')}
                  className={`px-2 py-0.5 rounded-none border transition-colors cursor-pointer uppercase ${
                    dnsTypeFilter === 'all'
                      ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d] font-bold'
                      : 'bg-[#1a1a1a] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626]'
                  }`}
                >
                  ALL ({data.dns.length})
                </button>
                {availableDnsTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDnsTypeFilter(t)}
                    className={`px-2 py-0.5 rounded-none border transition-colors cursor-pointer uppercase ${
                      dnsTypeFilter === t
                        ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d] font-bold'
                        : 'bg-[#1a1a1a] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626]'
                    }`}
                  >
                    {t} ({data.dns.filter((r) => r.type.toUpperCase() === t).length})
                  </button>
                ))}
              </div>
            </div>

            {filteredDns.length === 0 ? (
              <div className="p-6 text-center text-[#8c8c8c] font-mono text-xs">
                No DNS records found for filter "{dnsTypeFilter}".
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#383838] bg-[#141414] text-[10px] text-[#8c8c8c] uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-semibold w-24">Type</th>
                      <th className="py-2.5 px-4 font-semibold w-48">Host / Name</th>
                      <th className="py-2.5 px-4 font-semibold">Value / Target</th>
                      <th className="py-2.5 px-3 font-semibold w-20">TTL</th>
                      <th className="py-2.5 px-3 text-right font-semibold w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2e2e2e]">
                    {filteredDns.map((record, idx) => {
                      return (
                        <tr key={`${record.type}_${record.value}_${idx}`} className="hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-2.5 px-4">
                            <span className="tag tag-sm tag-accent font-bold uppercase">
                              {record.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-[#f0f0f0] font-medium truncate">
                            {record.name}
                          </td>
                          <td className="py-2.5 px-4 text-[#f0f0f0] break-all select-all font-mono">
                            {record.priority !== undefined && (
                              <span className="text-[#c30800] mr-2 font-semibold">[Priority: {record.priority}]</span>
                            )}
                            {record.value}
                          </td>
                          <td className="py-2.5 px-3 text-[#8c8c8c] text-[11px]">
                            {record.ttl ? `${record.ttl}s` : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleCopy(record.value, `dns_${idx}`)}
                              className="p-1 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
                            >
                              {copiedKey === `dns_${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-[#c30800]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Certificate Transparency (crt.name) Subdomains Discovery & Advanced Probe Toolkit */}
          <CrtSubdomainsInspector
            crtData={data.crtSubdomains}
            targetDomain={data.domain}
            onDomainChange={onDomainChange}
            onCrawlHost={onCrawlHost}
            onRefreshCrt={handleRefreshCrt}
            loadingCrt={loadingCrt}
          />

          {/* WHOIS / RDAP & SSL Details Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* WHOIS & Registration Info */}
            <div className="bg-[#141414] border border-[#383838] rounded-none p-4 space-y-3 font-mono text-xs shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#383838]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#c30800]" />
                  <h3 className="uppercase tracking-wider text-[#f0f0f0] font-bold text-xs">
                    WHOIS / RDAP Registration
                  </h3>
                </div>
                {data.whois && (
                  <div className="flex items-center gap-2">
                    {data.whois.source && (
                      <span className="tag tag-sm tag-accent font-bold uppercase tracking-wider">
                        Source: {data.whois.source}
                      </span>
                    )}
                    {data.whois.rawText && (
                      <button
                        type="button"
                        onClick={() => setShowRawWhois(!showRawWhois)}
                        className="px-2 py-0.5 rounded-none bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] border border-[#383838] text-[10px] font-mono transition-colors cursor-pointer"
                      >
                        {showRawWhois ? 'Hide Raw' : 'View Raw'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {data.whois ? (
                <div className="space-y-2 text-[#f0f0f0]">
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Domain Name:</span>
                    <span className="text-[#f0f0f0] font-semibold">{data.whois.domainName}</span>
                  </div>
                  {data.whois.rootDomain && data.whois.rootDomain !== data.domain && (
                    <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                      <span className="text-[#8c8c8c]">Apex Domain:</span>
                      <span className="text-[#c30800] font-semibold">{data.whois.rootDomain}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Registrar:</span>
                    <span className="text-[#f0f0f0] font-semibold truncate max-w-xs">{data.whois.registrar}</span>
                  </div>
                  {data.whois.ianaId && (
                    <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                      <span className="text-[#8c8c8c]">IANA Registrar ID:</span>
                      <span className="text-[#f0f0f0]">{data.whois.ianaId}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Registered On:</span>
                    <span className="text-[#f0f0f0]">
                      {formatDateSafely(data.whois.createdDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Expires On:</span>
                    <span className="text-[#f0f0f0] font-semibold">
                      {formatDateSafely(data.whois.expiresDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Last Updated:</span>
                    <span className="text-[#f0f0f0]">
                      {formatDateSafely(data.whois.updatedDate)}
                    </span>
                  </div>
                  {data.whois.abuseContact && (
                    <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                      <span className="text-[#8c8c8c]">Abuse Contact:</span>
                      <span className="text-[#f0f0f0] font-semibold truncate max-w-xs">{data.whois.abuseContact}</span>
                    </div>
                  )}
                  {data.whois.registrantCountry && (
                    <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                      <span className="text-[#8c8c8c]">Registrant Country:</span>
                      <span className="text-[#f0f0f0] uppercase">{data.whois.registrantCountry}</span>
                    </div>
                  )}

                  {data.whois.nameservers && data.whois.nameservers.length > 0 && (
                    <div className="py-1">
                      <span className="text-[#8c8c8c] block mb-1">Authoritative Nameservers:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {data.whois.nameservers.map((ns, idx) => (
                          <span
                            key={idx}
                            className="tag tag-sm tag-accent font-bold"
                          >
                            {ns}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.whois.status && data.whois.status.length > 0 && (
                    <div className="py-1">
                      <span className="text-[#8c8c8c] block mb-1">Domain Status Codes:</span>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                        {data.whois.status.map((st, idx) => (
                          <span
                            key={idx}
                            className="tag tag-sm tag-accent font-bold"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Raw WHOIS Output Drawer */}
                  {showRawWhois && data.whois.rawText && (
                    <div className="mt-3 pt-2 border-t border-[#383838]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider">
                          Authoritative Registry Raw Data:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(data.whois!.rawText!, 'raw_whois')}
                          className="px-2 py-0.5 rounded-none bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] text-[10px] flex items-center gap-1 border border-[#383838] cursor-pointer"
                        >
                          {copiedKey === 'raw_whois' ? (
                            <Check className="w-3 h-3 text-[#c30800]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy Raw</span>
                        </button>
                      </div>
                      <pre className="p-2.5 bg-[#141414] border border-[#383838] rounded-none text-[#f0f0f0] text-[10px] overflow-x-auto font-mono whitespace-pre-wrap max-h-56 custom-scrollbar select-all">
                        {data.whois.rawText}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[#8c8c8c] py-4 text-center">WHOIS / RDAP lookup data unavailable.</p>
              )}
            </div>

            {/* SSL / TLS Certificate Info */}
            <div className="bg-[#141414] border border-[#383838] rounded-none p-4 space-y-3 font-mono text-xs shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-[#383838]">
                <Lock className="w-4 h-4 text-[#c30800]" />
                <h3 className="uppercase tracking-wider text-[#f0f0f0] font-bold text-xs">
                  SSL / TLS Certificate Profile
                </h3>
              </div>

              {data.ssl ? (
                <div className="space-y-2 text-[#f0f0f0]">
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Issuer Authority:</span>
                    <span className="text-[#f0f0f0] font-semibold truncate max-w-xs">{data.ssl.issuer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Common Name (CN):</span>
                    <span className="text-[#f0f0f0] font-semibold">{data.ssl.subject}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Valid From:</span>
                    <span className="text-[#f0f0f0]">{data.ssl.validFrom || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Valid Until:</span>
                    <span className="text-[#f0f0f0] font-semibold">{data.ssl.validTo || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#2e2e2e]">
                    <span className="text-[#8c8c8c]">Days Remaining:</span>
                    <span className={`font-bold ${data.ssl.isExpired ? 'text-[#c3005a]' : 'text-[#f0f0f0]'}`}>
                      {data.ssl.daysRemaining} days {data.ssl.isExpired ? '(Expired)' : ''}
                    </span>
                  </div>

                  {data.ssl.san && data.ssl.san.length > 0 && (
                    <div className="py-1">
                      <span className="text-[#8c8c8c] block mb-1">
                        Subject Alternative Names ({data.ssl.san.length}):
                      </span>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto custom-scrollbar">
                        {data.ssl.san.map((name, idx) => (
                          <span
                            key={idx}
                            className="tag tag-sm tag-accent-outline font-bold"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.ssl.fingerprint && (
                    <div className="py-1 text-[10px] text-[#8c8c8c] break-all">
                      <span>Fingerprint: {data.ssl.fingerprint}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[#8c8c8c] py-4 text-center">No TLS certificate details returned.</p>
              )}
            </div>
          </div>

          {/* HTTP & Security Headers Card */}
          <div className="bg-[#141414] border border-[#383838] rounded-none p-4 space-y-3 font-mono text-xs shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-[#383838]">
              <Server className="w-4 h-4 text-[#c30800]" />
              <h3 className="uppercase tracking-wider text-[#f0f0f0] font-bold text-xs">
                Server Security Posture & Headers
              </h3>
            </div>

            {data.server ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">HSTS Strict Transport</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.hsts ? (
                      <span className="text-[#f0f0f0] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c30800]" /> Enabled
                      </span>
                    ) : (
                      <span className="text-[#8c8c8c] flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-[#8c8c8c]" /> Not Detected
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">Content Security Policy (CSP)</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.csp ? (
                      <span className="text-[#f0f0f0] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c30800]" /> Present
                      </span>
                    ) : (
                      <span className="text-[#8c8c8c] flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-[#8c8c8c]" /> Not Detected
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">X-Frame-Options</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.xFrameOptions ? (
                      <span className="text-[#f0f0f0] font-semibold truncate">
                        {data.server.xFrameOptions}
                      </span>
                    ) : (
                      <span className="text-[#8c8c8c] flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-[#8c8c8c]" /> Not Set
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">Robots.txt Presence</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.robotsTxtPresent ? (
                      <a
                        href={data.server.robotsTxtUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[#f0f0f0] font-semibold hover:underline flex items-center gap-1 hover:text-[#c30800]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c30800]" /> Available (/robots.txt)
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-[#8c8c8c]" />
                      </a>
                    ) : (
                      <span className="text-[#8c8c8c]">Not Found</span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">XML Sitemap Presence</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.sitemapPresent ? (
                      <a
                        href={data.server.sitemapUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[#f0f0f0] font-semibold hover:underline flex items-center gap-1 hover:text-[#c30800]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c30800]" /> Available (/sitemap.xml)
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-[#8c8c8c]" />
                      </a>
                    ) : (
                      <span className="text-[#8c8c8c]">Not Found</span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">X-Content-Type-Options</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.xContentTypeOptions ? (
                      <span className="text-[#f0f0f0] font-semibold">{data.server.xContentTypeOptions}</span>
                    ) : (
                      <span className="text-[#8c8c8c]">Not Set</span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none">
                  <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">AI Assistance Manifests</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {data.server.aiAssistancePresent ? (
                      <span className="text-[#bbc300] font-semibold flex items-center gap-1 font-mono text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#bbc300]" />
                        {data.server.aiAssistanceCount} Detected
                      </span>
                    ) : (
                      <span className="text-[#8c8c8c]">None Detected</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[#8c8c8c] py-3 text-center">Server headers not reached.</p>
            )}

            {/* AI Assistance Discovered Manifests List & Preview */}
            {data.server?.aiAssistanceFiles && data.server.aiAssistanceFiles.length > 0 && (
              <div className="pt-2 border-t border-[#383838] space-y-2">
                <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block">
                  Discovered AI Assistance Manifests ({data.server.aiAssistanceFiles.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.server.aiAssistanceFiles.map((aiFile) => (
                    <div
                      key={aiFile.filename}
                      className="p-2.5 bg-[#141414] border border-[#2e2e2e] rounded-none space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={aiFile.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[#f0f0f0] font-mono text-xs font-semibold hover:underline flex items-center gap-1 hover:text-[#bbc300]"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#bbc300]" />
                          /{aiFile.filename}
                          <ExternalLink className="w-2.5 h-2.5 text-[#8c8c8c]" />
                        </a>
                        {aiFile.size && (
                          <span className="text-[10px] font-mono text-[#737373]">
                            {aiFile.size} bytes
                          </span>
                        )}
                      </div>
                      {aiFile.preview && (
                        <pre className="p-1.5 bg-[#141414] border border-[#2e2e2e] text-[#8c8c8c] text-[10px] overflow-x-auto font-mono whitespace-pre-wrap max-h-24">
                          {aiFile.preview}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Robots.txt Preview Snippet */}
            {data.server?.robotsTxtContentPreview && (
              <div className="pt-2 border-t border-[#383838]">
                <span className="text-[10px] text-[#8c8c8c] uppercase tracking-wider block mb-1.5">
                  /robots.txt Content Preview:
                </span>
                <pre className="p-3 bg-[#141414] border border-[#2e2e2e] rounded-none text-[#f0f0f0] text-[11px] overflow-x-auto font-mono whitespace-pre-wrap max-h-40">
                  {data.server.robotsTxtContentPreview}
                </pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
