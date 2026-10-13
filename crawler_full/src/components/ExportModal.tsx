// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useMemo } from 'react';
import { X, Download, Copy, Check, FileCode, FileSpreadsheet, FileText, Code2, Layers } from 'lucide-react';
import { DirectoryRecord, FileRecord, ApiEndpointRecord } from '../types';
import {
  exportDirectoriesAsTxt,
  exportDirectoriesAsCsv,
  exportDirectoriesAsSitemapXml,
  buildDirectoryTree,
} from '../utils/urlUtils';

interface ExportModalProps {
  directories: DirectoryRecord[];
  files?: FileRecord[];
  apiEndpoints?: ApiEndpointRecord[];
  targetOrigin: string;
  onClose: () => void;
}

type ExportScope = 'all' | 'directories' | 'files';
type ExportFormat = 'txt-paths' | 'txt-full' | 'json' | 'csv' | 'sitemap-xml' | 'markdown';

export const ExportModal: React.FC<ExportModalProps> = ({
  directories,
  files = [],
  apiEndpoints = [],
  targetOrigin,
  onClose,
}) => {
  const [scope, setScope] = useState<ExportScope>('all');
  const [format, setFormat] = useState<ExportFormat>('txt-paths');
  const [copied, setCopied] = useState(false);

  const exportData = useMemo(() => {
    const origin = targetOrigin ? targetOrigin.replace(/\/+$/, '') : '';
    const activeDirs = scope === 'files' ? [] : directories;
    const activeFiles = scope === 'directories' ? [] : files;

    switch (format) {
      case 'txt-paths':
        return exportDirectoriesAsTxt(activeDirs, '', activeFiles);
      case 'txt-full':
        return exportDirectoriesAsTxt(activeDirs, targetOrigin, activeFiles);
      case 'json':
        return JSON.stringify(
          {
            targetOrigin,
            generatedAt: new Date().toISOString(),
            totalUniqueDirectories: activeDirs.length,
            totalDiscoveredFiles: activeFiles.length,
            totalCapturedApiEndpoints: apiEndpoints.length,
            directories: activeDirs.map((d) => ({
              path: d.path,
              depth: d.depth,
              directPagesCount: d.directPageUrls.length,
              nestedPagesCount: d.allNestedUrlsCount,
              foundOnUrl: d.foundOnUrl,
              foundOnUrls: d.foundOnUrls,
              directUrls: d.directPageUrls,
            })),
            files: activeFiles.map((f) => ({
              path: f.path,
              filename: f.filename,
              extension: f.extension,
              fileType: f.fileType,
              directory: f.directory,
              depth: f.depth,
              foundOnUrl: f.foundOnUrl,
              foundOnUrls: f.foundOnUrls,
              fullUrl: origin ? `${origin}${f.path}` : f.url,
            })),
            apiEndpoints: apiEndpoints.map((ep) => ({
              method: ep.method,
              url: ep.url,
              pathname: ep.pathname,
              domain: ep.domain,
              category: ep.category,
              isSameDomain: ep.isSameDomain,
              allowedMethods: ep.allowedMethods || [ep.method],
              statusCode: ep.statusCode,
              latencyMs: ep.latencyMs,
              detectedIn: ep.detectedIn,
              sourceUrl: ep.sourceUrl,
              queryParams: ep.queryParams,
              possibleParameters: ep.possibleParameters,
              possibleQueries: ep.possibleQueries,
              queryCapabilitiesSummary: ep.queryCapabilitiesSummary,
              authHint: ep.authHint,
            })),
            tree: buildDirectoryTree(activeDirs, activeFiles),
          },
          null,
          2
        );
      case 'csv':
        return exportDirectoriesAsCsv(activeDirs, targetOrigin, activeFiles);
      case 'sitemap-xml':
        return exportDirectoriesAsSitemapXml(activeDirs, targetOrigin || 'https://example.com', activeFiles);
      case 'markdown': {
        let md = `# Recon Site Inventory for ${targetOrigin || 'Target Site'}\n\n`;
        md += `Generated: ${new Date().toUTCString()}\n`;
        md += `- **Total Directories:** ${activeDirs.length}\n`;
        md += `- **Total Discovered Files:** ${activeFiles.length}\n`;
        md += `- **Total Captured API Endpoints:** ${apiEndpoints.length}\n\n`;

        if (activeDirs.length > 0) {
          md += `## Directories\n\n`;
          const sortedDirs = [...activeDirs].sort((a, b) => a.path.localeCompare(b.path));
          for (const d of sortedDirs) {
            const indent = '  '.repeat(d.depth);
            const source = d.foundOnUrl ? ` *(source: ${d.foundOnUrl})*` : '';
            md += `${indent}- \`${d.path}\` (${d.directPageUrls.length} direct pages)${source}\n`;
          }
          md += `\n`;
        }

        if (activeFiles.length > 0) {
          md += `## Discovered Files\n\n`;
          const sortedFiles = [...activeFiles].sort((a, b) => a.path.localeCompare(b.path));
          for (const f of sortedFiles) {
            const source = f.foundOnUrl ? ` *(found on: ${f.foundOnUrl})*` : '';
            md += `- \`${f.path}\` [${f.fileType.toUpperCase()}]${source}\n`;
          }
          md += `\n`;
        }

        if (apiEndpoints.length > 0) {
          md += `## Captured API Endpoints & Mapped Queries\n\n`;
          for (const ep of apiEndpoints) {
            const auth = ep.authHint ? ` [Auth: ${ep.authHint}]` : '';
            const status = ep.statusCode ? ` [HTTP ${ep.statusCode}]` : '';
            md += `- \`[${ep.method}]\` **${ep.pathname}** (${ep.category.toUpperCase()}${auth}${status}) - \`${ep.url}\`\n`;
            if (ep.queryCapabilitiesSummary) {
              md += `  - *Capabilities:* ${ep.queryCapabilitiesSummary}\n`;
            }
            if (ep.possibleQueries && ep.possibleQueries.length > 0) {
              md += `  - *Possible Queries (${ep.possibleQueries.length}):*\n`;
              for (const q of ep.possibleQueries) {
                md += `    - \`[${q.method}]\` ${q.title}: \`${q.url}\`\n`;
              }
            }
          }
          md += `\n`;
        }

        return md;
      }
      default:
        return '';
    }
  }, [directories, files, apiEndpoints, targetOrigin, format, scope]);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = 'site-inventory.txt';
    let mimeType = 'text/plain';

    if (format === 'json') {
      filename = 'site-inventory.json';
      mimeType = 'application/json';
    } else if (format === 'csv') {
      filename = 'site-inventory.csv';
      mimeType = 'text/csv';
    } else if (format === 'sitemap-xml') {
      filename = 'sitemap.xml';
      mimeType = 'application/xml';
    } else if (format === 'markdown') {
      filename = 'site-inventory.md';
      mimeType = 'text/markdown';
    }

    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalSelectedCount =
    scope === 'all'
      ? directories.length + files.length
      : scope === 'directories'
      ? directories.length
      : files.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-[#141414] border border-[#383838] rounded-none w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#383838] flex items-center justify-between bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-none bg-[#1a1a1a] text-[#c30800] border border-[#383838]">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-[#f0f0f0]">
                Export Deduplicated Inventory
              </h3>
              <p className="text-[10px] font-mono text-[#8c8c8c]">
                {directories.length} directories • {files.length} discovered files ready to serialize
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 text-xs bg-[#141414]">
          {/* Scope Selector */}
          <div>
            <label className="block text-[10px] font-semibold text-[#8c8c8c] uppercase tracking-widest mb-2 font-mono">
              Export Dataset Scope
            </label>
            <div className="flex gap-2 font-mono">
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`px-3 py-1.5 rounded-none text-xs border uppercase tracking-wider cursor-pointer transition-colors ${
                  scope === 'all'
                    ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d] font-bold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                All (Dirs + Files) ({directories.length + files.length})
              </button>
              <button
                type="button"
                onClick={() => setScope('directories')}
                className={`px-3 py-1.5 rounded-none text-xs border uppercase tracking-wider cursor-pointer transition-colors ${
                  scope === 'directories'
                    ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d] font-bold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                Directories Only ({directories.length})
              </button>
              <button
                type="button"
                onClick={() => setScope('files')}
                className={`px-3 py-1.5 rounded-none text-xs border uppercase tracking-wider cursor-pointer transition-colors ${
                  scope === 'files'
                    ? 'bg-[#c30800] border-[#c30800] text-[#0d0d0d] font-bold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                Files Only ({files.length})
              </button>
            </div>
          </div>

          {/* Format Selector Tabs */}
          <div>
            <label className="block text-[10px] font-semibold text-[#8c8c8c] uppercase tracking-widest mb-2 font-mono">
              Output Encoding Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono">
              <button
                type="button"
                onClick={() => setFormat('txt-paths')}
                className={`p-2.5 rounded-none border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  format === 'txt-paths'
                    ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#c30800] shrink-0" />
                <div>
                  <div className="text-xs">Plain Text Paths</div>
                  <div className="text-[10px] text-[#8c8c8c]">1 line per entry</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('txt-full')}
                className={`p-2.5 rounded-none border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  format === 'txt-full'
                    ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#c30800] shrink-0" />
                <div>
                  <div className="text-xs">Absolute URLs</div>
                  <div className="text-[10px] text-[#8c8c8c]">Includes domain prefix</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-2.5 rounded-none border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  format === 'csv'
                    ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-[#c30800] shrink-0" />
                <div>
                  <div className="text-xs">CSV Spreadsheet</div>
                  <div className="text-[10px] text-[#8c8c8c]">Type, Path, Where Found</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`p-2.5 rounded-none border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  format === 'json'
                    ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <Code2 className="w-4 h-4 text-[#c30800] shrink-0" />
                <div>
                  <div className="text-xs">JSON Tree Schema</div>
                  <div className="text-[10px] text-[#8c8c8c]">Structured graph payload</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('sitemap-xml')}
                className={`p-2.5 rounded-none border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  format === 'sitemap-xml'
                    ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <FileCode className="w-4 h-4 text-[#c30800] shrink-0" />
                <div>
                  <div className="text-xs">XML Sitemap</div>
                  <div className="text-[10px] text-[#8c8c8c]">Standard &lt;urlset&gt; schema</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('markdown')}
                className={`p-2.5 rounded-none border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  format === 'markdown'
                    ? 'bg-[#1a1a1a] border-[#c30800] text-[#f0f0f0] font-semibold'
                    : 'bg-[#141414] border-[#383838] text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]'
                }`}
              >
                <Layers className="w-4 h-4 text-[#c30800] shrink-0" />
                <div>
                  <div className="text-xs">Markdown Summary</div>
                  <div className="text-[10px] text-[#8c8c8c]">Document formatted</div>
                </div>
              </button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-[10px] uppercase text-[#8c8c8c]">
              <span>Preview Serialization Output</span>
              <span>{totalSelectedCount} records serialized</span>
            </div>
            <textarea
              id="export-preview-textarea"
              readOnly
              value={exportData}
              rows={10}
              className="w-full p-3 bg-[#0d0d0d] border border-[#383838] rounded-none font-mono text-[11px] text-[#f0f0f0] overflow-x-auto max-h-60 overflow-y-auto custom-scrollbar select-all resize-none focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#383838] bg-[#141414] flex items-center justify-between font-mono">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-none bg-[#141414] hover:bg-[#262626] text-[#8c8c8c] hover:text-[#f0f0f0] border border-[#383838] text-xs uppercase tracking-wider transition-colors cursor-pointer font-bold"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-none bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border border-[#383838] font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#c30800]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-none bg-gradient-to-r from-[#c30800] to-[#770500] hover:from-[#f60a00] hover:to-[#770500] text-[#f3f3f7] border border-[#c30800] text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
