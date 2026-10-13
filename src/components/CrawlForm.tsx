// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useEffect } from 'react';
import { Play, Sliders, Globe, AlertCircle, ChevronDown, ChevronUp, Square, Crosshair, Cpu, Layers, Terminal, Gauge, Shuffle, Compass, Code } from 'lucide-react';
import { CrawlConfig, CrawlStatus } from '../types';
import { safeClampInput } from '../utils/urlUtils';
import { StoredReconProfile } from '../data/storedReconData';

interface CrawlFormProps {
  config: CrawlConfig;
  status: CrawlStatus;
  onUpdateConfig: (newConfig: Partial<CrawlConfig>) => void;
  onStartCrawl: () => void;
  onStopCrawl: () => void;
  storedProfiles?: StoredReconProfile[];
  activeProfileId?: string;
  onSelectProfile?: (profile: StoredReconProfile) => void;
}

export const CrawlForm: React.FC<CrawlFormProps> = ({
  config,
  status,
  onUpdateConfig,
  onStartCrawl,
  onStopCrawl,
  storedProfiles,
  activeProfileId,
  onSelectProfile,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [paramTab, setParamTab] = useState<'standard' | 'advanced'>('standard');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [delayInputVal, setDelayInputVal] = useState<string>(String(config.requestDelayMs || 50));
  const [isDelayFocused, setIsDelayFocused] = useState<boolean>(false);

  useEffect(() => {
    if (!isDelayFocused) {
      setDelayInputVal(String(config.requestDelayMs || 50));
    }
  }, [config.requestDelayMs, isDelayFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.startUrl.trim()) {
      setUrlError('Please enter a target domain or URL to initiate recon.');
      return;
    }
    setUrlError(null);

    const parsedDelay = parseInt(delayInputVal, 10);
    const safeDelay = isNaN(parsedDelay) || parsedDelay < 50 ? 50 : Math.min(9999, parsedDelay);
    setDelayInputVal(String(safeDelay));
    onUpdateConfig({ requestDelayMs: safeDelay });

    onStartCrawl();
  };

  const handleUrlChange = (value: string) => {
    setUrlError(null);
    onUpdateConfig({ startUrl: safeClampInput(value, 200) });
  };

  const isRunning = status === 'running';

  return (
    <div id="crawl-form-card" className="bg-[#141414] border border-[#383838] rounded-none p-5 sm:p-6 shadow-md relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Source Configuration Header */}
        <div>
          <label htmlFor="target-url-input" className="block text-[10px] uppercase tracking-widest text-[#8c8c8c] mb-2 font-mono font-bold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-[#c30800]" />
              Target Domain
            </span>
            <span className="text-[9px] text-[#737373] tracking-wider">PORT 80/443 ONLY</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3 min-w-0">
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8c8c8c]">
                <Globe className="w-4 h-4 text-[#737373]" />
              </div>
              <input
                id="target-url-input"
                type="text"
                maxLength={200}
                placeholder="e.g. example.com or enter URL to recon..."
                value={config.startUrl}
                onChange={(e) => handleUrlChange(safeClampInput(e.target.value, 200))}
                disabled={isRunning}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                name="targetDomainUrl"
                className={`w-full pl-10 pr-4 py-2.5 bg-[#0d0d0d] border rounded-none font-mono text-xs text-[#f0f0f0] placeholder-[#737373] transition-colors focus:outline-none ${
                  urlError
                    ? 'border-[#c3005a] focus:border-[#c3005a]'
                    : 'border-[#383838] focus:border-[#c30800]'
                } ${isRunning ? 'opacity-70 cursor-not-allowed' : ''}`}
              />
            </div>

            {/* Action Button: Start or Stop */}
            {isRunning ? (
              <button
                type="button"
                id="form-stop-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onStopCrawl();
                }}
                className="px-6 py-2.5 rounded-none bg-[#c3005a]/20 hover:bg-[#c3005a]/30 text-[#f3f3f7] text-xs sm:text-sm font-mono font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-[#c3005a]"
              >
                <Square className="w-3.5 h-3.5 fill-current text-[#c3005a]" />
                ABORT CRAWL
              </button>
            ) : (
              <button
                type="submit"
                id="form-start-button"
                className="px-6 py-2.5 rounded-none bg-gradient-to-r from-[#c30800] to-[#770500] hover:from-[#f60a00] hover:to-[#770500] text-[#f3f3f7] text-xs sm:text-sm font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-[#c30800] shadow-md hover:shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                INITIATE RECON
              </button>
            )}
          </div>

          {urlError && (
            <p className="mt-2 text-xs text-[#c3005a] flex items-center gap-1.5 font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {urlError}
            </p>
          )}
        </div>

        {/* Quick Config Parameter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#1a1a1a] p-3 rounded-none border border-[#383838] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#8c8c8c] uppercase tracking-wider font-mono font-semibold">Max Depth</div>
              <div className="text-base sm:text-lg font-mono font-bold text-[#f0f0f0] mt-0.5">
                {config.maxDepth} <span className="text-[10px] text-[#8c8c8c] font-mono">levels</span>
              </div>
            </div>
            <Layers className="w-4 h-4 text-[#c30800]" />
          </div>

          <div className="bg-[#1a1a1a] p-3 rounded-none border border-[#383838] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#8c8c8c] uppercase tracking-wider font-mono font-semibold">Page Limit</div>
              <div className="text-base sm:text-lg font-mono font-bold text-[#f0f0f0] mt-0.5">
                {config.maxPages} <span className="text-[10px] text-[#8c8c8c] font-mono">pages</span>
              </div>
            </div>
            <Globe className="w-4 h-4 text-[#c30800]" />
          </div>

          <div className="bg-[#1a1a1a] p-3 rounded-none border border-[#383838] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#8c8c8c] uppercase tracking-wider font-mono font-semibold">Worker Threads</div>
              <div className="text-base sm:text-lg font-mono font-bold text-[#f0f0f0] mt-0.5">
                {config.concurrency} <span className="text-[10px] text-[#8c8c8c] font-mono">threads</span>
              </div>
            </div>
            <Cpu className="w-4 h-4 text-[#c30800]" />
          </div>
        </div>

        {/* Advanced Settings Drawer */}
        <div className="pt-2 border-t border-[#383838]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              id="toggle-advanced-settings-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#8c8c8c] hover:text-[#f0f0f0] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-[#c30800]" />
              <span>{showAdvanced ? 'Collapse Parameters' : 'Adjust Recon Parameters'}</span>
              {showAdvanced ? <ChevronUp className="w-3 h-3 text-[#c30800]" /> : <ChevronDown className="w-3 h-3 text-[#c30800]" />}
            </button>

            {showAdvanced && (
              <div className="flex items-center gap-1 bg-[#0d0d0d] p-1 rounded-none border border-[#383838]">
                <button
                  type="button"
                  id="tab-standard-params-btn"
                  onClick={() => setParamTab('standard')}
                  className={`px-3 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    paramTab === 'standard'
                      ? 'bg-[#262626] text-[#f0f0f0] border border-[#383838] shadow-sm'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0]'
                  }`}
                >
                  <Gauge className="w-3 h-3 text-[#c30800]" />
                  Standard
                </button>
                <button
                  type="button"
                  id="tab-advanced-params-btn"
                  onClick={() => setParamTab('advanced')}
                  className={`px-3 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    paramTab === 'advanced'
                      ? 'bg-[#262626] text-[#f0f0f0] border border-[#c30800] shadow-sm'
                      : 'text-[#8c8c8c] hover:text-[#f0f0f0]'
                  }`}
                >
                  <Terminal className={`w-3 h-3 ${paramTab === 'advanced' ? 'text-[#c30800]' : 'text-[#8c8c8c]'}`} />
                  Advanced Users
                </button>
              </div>
            )}
          </div>

          {/* Settings Panel */}
          {showAdvanced && (
            <div id="advanced-settings-panel" className="mt-4 p-4 rounded-none bg-[#1a1a1a] border border-[#383838] space-y-4 text-xs">
              {paramTab === 'standard' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Max Depth */}
                  <div className="space-y-1.5" title="Link hops traversal ceiling">
                    <div className="flex justify-between items-center text-[#8c8c8c]">
                      <label htmlFor="max-depth-input" className="text-[10px] font-mono uppercase tracking-wider text-[#8c8c8c] font-bold">Max Depth</label>
                      <span className="font-mono text-[#c30800] font-bold">{config.maxDepth} levels</span>
                    </div>
                    <input
                      id="max-depth-input"
                      type="range"
                      min="1"
                      max="10"
                      value={Math.min(config.maxDepth, 10)}
                      onChange={(e) => onUpdateConfig({ maxDepth: parseInt(e.target.value, 10) })}
                      disabled={isRunning}
                      className="w-full cursor-pointer"
                    />
                    <p className="text-[10px] text-[#737373] font-mono">Link hops traversal ceiling</p>
                  </div>

                  {/* Max Pages Limit */}
                  <div className="space-y-1.5" title="Max fetch quota per run">
                    <div className="flex justify-between items-center text-[#8c8c8c]">
                      <label htmlFor="max-pages-input" className="text-[10px] font-mono uppercase tracking-wider text-[#8c8c8c] font-bold">Max Pages</label>
                      <span className="font-mono text-[#c30800] font-bold">{config.maxPages} pages</span>
                    </div>
                    <input
                      id="max-pages-input"
                      type="range"
                      min="5"
                      max="200"
                      step="5"
                      value={Math.min(config.maxPages, 200)}
                      onChange={(e) => onUpdateConfig({ maxPages: parseInt(e.target.value, 10) })}
                      disabled={isRunning}
                      className="w-full cursor-pointer"
                    />
                    <p className="text-[10px] text-[#737373] font-mono">Max fetch quota per run</p>
                  </div>

                  {/* Concurrency */}
                  <div className="space-y-1.5" title="Simultaneous worker pool">
                    <div className="flex justify-between items-center text-[#8c8c8c]">
                      <label htmlFor="concurrency-input" className="text-[10px] font-mono uppercase tracking-wider text-[#8c8c8c] font-bold">Concurrency</label>
                      <span className="font-mono text-[#c30800] font-bold">{config.concurrency} threads</span>
                    </div>
                    <input
                      id="concurrency-input"
                      type="range"
                      min="1"
                      max="10"
                      value={Math.min(config.concurrency, 10)}
                      onChange={(e) => onUpdateConfig({ concurrency: parseInt(e.target.value, 10) })}
                      disabled={isRunning}
                      className="w-full cursor-pointer"
                    />
                    <p className="text-[10px] text-[#737373] font-mono">Parallel connection pool</p>
                  </div>

                  {/* Request Delay */}
                  <div className="space-y-1.5" title="Delay between requests">
                    <div className="flex justify-between items-center text-[#8c8c8c]">
                      <label htmlFor="request-delay-input" className="text-[10px] font-mono uppercase tracking-wider text-[#8c8c8c] font-bold">Delay (ms)</label>
                      <span className="font-mono text-[#c30800] font-bold">{config.requestDelayMs || 50} ms</span>
                    </div>
                    <input
                      id="request-delay-input"
                      type="number"
                      min="50"
                      max="9999"
                      value={delayInputVal}
                      onFocus={() => setIsDelayFocused(true)}
                      onBlur={() => {
                        setIsDelayFocused(false);
                        const val = parseInt(delayInputVal, 10);
                        const safeVal = isNaN(val) || val < 50 ? 50 : Math.min(9999, val);
                        setDelayInputVal(String(safeVal));
                        onUpdateConfig({ requestDelayMs: safeVal });
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDelayInputVal(val);
                        const parsed = parseInt(val, 10);
                        if (!isNaN(parsed) && parsed >= 50 && parsed <= 9999) {
                          onUpdateConfig({ requestDelayMs: parsed });
                        }
                      }}
                      disabled={isRunning}
                      className="w-full px-2.5 py-1.5 bg-[#0d0d0d] border border-[#383838] rounded-none font-mono text-xs text-[#f0f0f0] focus:border-[#c30800] focus:outline-none"
                    />
                    <p className="text-[10px] text-[#737373] font-mono">Politeness rate pacing</p>
                  </div>
                </div>
              ) : (
                /* Advanced Tab */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.allowSubdomains}
                        onChange={(e) => onUpdateConfig({ allowSubdomains: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Traverse Subdomains</span>
                        <span className="text-[10px] text-[#737373] font-mono">Follow links across subdomains</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.queryCrtSubdomains === true}
                        onChange={(e) => onUpdateConfig({ queryCrtSubdomains: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Query CRT Certificates</span>
                        <span className="text-[10px] text-[#737373] font-mono">Lookup Certificate Transparency logs</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.includeRobotsTxt !== false}
                        onChange={(e) => onUpdateConfig({ includeRobotsTxt: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Parse robots.txt &amp; Sitemaps</span>
                        <span className="text-[10px] text-[#737373] font-mono">Extract seeds from robots.txt</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.includeAiAssistance === true}
                        onChange={(e) => onUpdateConfig({ includeAiAssistance: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Check AI &amp; LLM Context</span>
                        <span className="text-[10px] text-[#737373] font-mono">Probe /llms.txt and AI docs</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.captureApiCalls !== false}
                        onChange={(e) => onUpdateConfig({ captureApiCalls: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Capture API Endpoints</span>
                        <span className="text-[10px] text-[#737373] font-mono">Extract fetch &amp; REST paths</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.autoQueryApis !== false}
                        onChange={(e) => onUpdateConfig({ autoQueryApis: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Map API Capabilities</span>
                        <span className="text-[10px] text-[#737373] font-mono">Infer params &amp; queries</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.stripQueryParams}
                        onChange={(e) => onUpdateConfig({ stripQueryParams: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Strip Query Parameters</span>
                        <span className="text-[10px] text-[#737373] font-mono">Deduplicate query strings</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.stripHash}
                        onChange={(e) => onUpdateConfig({ stripHash: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Strip Fragment Hash</span>
                        <span className="text-[10px] text-[#737373] font-mono">Ignore #section anchors</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-[#0d0d0d] border border-[#2e2e2e] cursor-pointer hover:border-[#383838] transition-colors">
                      <input
                        type="checkbox"
                        checked={config.randomizeUserAgent === true}
                        onChange={(e) => onUpdateConfig({ randomizeUserAgent: e.target.checked })}
                        disabled={isRunning}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#f0f0f0] block">Randomize User Agent</span>
                        <span className="text-[10px] text-[#737373] font-mono">Cycle browser signatures</span>
                      </div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#2e2e2e]">
                    <div className="space-y-1">
                      <label htmlFor="path-include-filter" className="block text-[10px] font-mono uppercase tracking-wider text-[#8c8c8c] font-bold">
                        Path Whitelist Filter
                      </label>
                      <input
                        id="path-include-filter"
                        type="text"
                        maxLength={100}
                        placeholder="e.g. /api or /docs"
                        value={config.pathFilter || ''}
                        onChange={(e) => onUpdateConfig({ pathFilter: safeClampInput(e.target.value, 100) })}
                        disabled={isRunning}
                        className="w-full px-2.5 py-1.5 bg-[#0d0d0d] border border-[#383838] rounded-none font-mono text-xs text-[#f0f0f0] focus:border-[#c30800] focus:outline-none"
                      />
                      <span className="text-[10px] text-[#737373] font-mono">Only visit paths matching substring</span>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="path-exclude-filter" className="block text-[10px] font-mono uppercase tracking-wider text-[#8c8c8c] font-bold">
                        Path Exclude Filter
                      </label>
                      <input
                        id="path-exclude-filter"
                        type="text"
                        maxLength={100}
                        placeholder="e.g. /logout or /delete"
                        value={config.excludeFilter || ''}
                        onChange={(e) => onUpdateConfig({ excludeFilter: safeClampInput(e.target.value, 100) })}
                        disabled={isRunning}
                        className="w-full px-2.5 py-1.5 bg-[#0d0d0d] border border-[#383838] rounded-none font-mono text-xs text-[#f0f0f0] focus:border-[#c30800] focus:outline-none"
                      />
                      <span className="text-[10px] text-[#737373] font-mono">Skip matching URLs</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
