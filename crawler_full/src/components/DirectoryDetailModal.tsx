// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { DirectoryRecord, PageRecord, FileRecord, FileCategory } from '../types';
import { getFileCategoryColor } from '../utils/urlUtils';
import {
  X,
  Folder,
  ExternalLink,
  Copy,
  Check,
  FileText,
  FolderTree,
  File,
  Image,
  Code,
  Music,
  Database,
  Archive,
  FileCode,
  Layers,
  Network,
} from 'lucide-react';

interface DirectoryDetailModalProps {
  directory: DirectoryRecord | null;
  files?: FileRecord[];
  pages: PageRecord[];
  targetOrigin: string;
  onClose: () => void;
  onSelectSubdir: (dirPath: string) => void;
}

function getFileIcon(category?: FileCategory) {
  switch (category) {
    case 'document':
      return <FileText className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    case 'image':
      return <Image className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    case 'code':
    case 'script':
      return <Code className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    case 'stylesheet':
      return <FileCode className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    case 'media':
      return <Music className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    case 'data':
      return <Database className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    case 'archive':
      return <Archive className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
    default:
      return <File className="w-3.5 h-3.5 text-[#c30800] shrink-0" />;
  }
}

export const DirectoryDetailModal: React.FC<DirectoryDetailModalProps> = ({
  directory,
  files = [],
  pages,
  targetOrigin,
  onClose,
  onSelectSubdir,
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  if (!directory) return null;

  const dirOrigin = directory.domain ? `https://${directory.domain}` : targetOrigin ? targetOrigin.replace(/\/+$/, '') : '';
  const fullDirUrl = dirOrigin ? `${dirOrigin}${directory.path}` : directory.path;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const directPagesInfo = directory.directPageUrls.map((url) => {
    const rec = pages.find((p) => p.url === url);
    return {
      url,
      title: rec?.title || '',
      statusCode: rec?.statusCode || 200,
      durationMs: rec?.durationMs || 0,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-[#141414] border border-[#383838] rounded-none w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="h-[2px] w-full bg-gradient-to-r from-[#c30800] via-[#c300bb] to-[#bbc300]" />
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#383838] flex items-center justify-between bg-[#141414] backdrop-blur-sm bg-gradient-to-r from-[#c30800]/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-none bg-[#1a1a1a] text-[#c30800] border border-[#383838]">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-[#f0f0f0]">{directory.path}</h3>
              <p className="text-[10px] font-mono text-[#8c8c8c]">HIERARCHY TIER LEVEL {directory.depth}</p>
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

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar text-xs bg-[#141414]">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2.5 font-mono">
            <div className="p-3 rounded-none bg-[#141414] border border-[#383838]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider">Page Hits</span>
                <Layers className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{directory.directPageUrls.length}</p>
            </div>
            <div className="p-3 rounded-none bg-[#141414] border border-[#383838]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider">Files</span>
                <FileCode className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{files.length}</p>
            </div>
            <div className="p-3 rounded-none bg-[#141414] border border-[#383838]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider">Subtree</span>
                <Network className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-xl font-bold text-[#f0f0f0] mt-0.5">{directory.allNestedUrlsCount}</p>
            </div>
            <div className="p-3 rounded-none bg-[#141414] border border-[#383838]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase text-[#8c8c8c] tracking-wider">Sub-Dirs</span>
                <FolderTree className="w-3.5 h-3.5 text-[#c30800]" />
              </div>
              <p className="text-xl font-bold text-[#8c8c8c] mt-0.5">{directory.subDirectories.length}</p>
            </div>
          </div>

          {/* Full URL & Copy */}
          <div className="p-3 rounded-none bg-[#141414] border border-[#383838] space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
              <span>Canonical Directory Address</span>
              <button
                type="button"
                onClick={() => handleCopy(fullDirUrl, 'fullUrl')}
                className="flex items-center gap-1 text-[#c30800] hover:text-[#f60a00] transition-colors cursor-pointer font-bold"
              >
                {copied === 'fullUrl' ? <Check className="w-3 h-3 text-[#c30800]" /> : <Copy className="w-3 h-3" />}
                <span>{copied === 'fullUrl' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <p className="font-mono text-[#f0f0f0] break-all select-all text-xs">{fullDirUrl}</p>
          </div>

          {/* Where Path Was Discovered */}
          {directory.foundOnUrl && (
            <div className="p-3 rounded-none bg-[#141414] border border-[#383838] space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[#8c8c8c] text-[10px] uppercase tracking-wider">
                <span>Where Path Was Discovered</span>
                <a
                  href={directory.foundOnUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#c30800] hover:text-[#f60a00] transition-colors text-[10px] font-bold"
                >
                  <span>OPEN LINK</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="font-mono text-[#f0f0f0] break-all text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-none bg-[#c30800] shrink-0"></span>
                {directory.foundOnUrl}
              </p>
              {directory.foundOnUrls && directory.foundOnUrls.length > 1 && (
                <div className="mt-2 pt-2 border-t border-[#383838] text-[10px] text-[#8c8c8c]">
                  <span className="text-[#8c8c8c] uppercase tracking-wider">Also linked from {directory.foundOnUrls.length - 1} other source(s):</span>
                  <div className="mt-1 max-h-24 overflow-y-auto space-y-0.5 custom-scrollbar">
                    {directory.foundOnUrls.slice(1).map((u, i) => (
                      <div key={i} className="truncate text-[#8c8c8c] hover:text-[#f0f0f0]">
                        • {u}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Discovered Files at this directory level */}
          {files.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono">
                <h4 className="font-semibold text-[#f0f0f0] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <File className="w-3.5 h-3.5 text-[#c30800]" />
                  Files Discovered in Directory ({files.length})
                </h4>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {files.map((file, idx) => {
                  const fullFileUrl = targetOrigin ? `${targetOrigin.replace(/\/+$/, '')}${file.path}` : file.url;

                  return (
                    <div
                      key={`file_${file.path}_${idx}`}
                      className="p-2.5 rounded-none bg-[#141414] border border-[#383838] flex flex-col gap-1.5 font-mono"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {getFileIcon(file.fileType)}
                          <a
                            href={fullFileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#f0f0f0] hover:text-[#c30800] truncate font-semibold hover:underline"
                          >
                            {file.filename}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={getFileCategoryColor(file.fileType).className}
                          >
                            {file.fileType}
                          </span>
                          <button
                            type="button"
                            title="Copy File URL"
                            onClick={() => handleCopy(fullFileUrl, `file_${idx}`)}
                            className="p-1 rounded-none text-[#8c8c8c] hover:text-[#f0f0f0] hover:bg-[#262626] transition-colors cursor-pointer"
                          >
                            {copied === `file_${idx}` ? (
                              <Check className="w-3 h-3 text-[#c30800]" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {file.foundOnUrl && (
                        <div className="text-[10px] text-[#8c8c8c] flex items-center gap-1 truncate pt-1 border-t border-[#383838]">
                          <span className="text-[#8c8c8c] uppercase tracking-widest shrink-0">Found on:</span>
                          <a
                            href={file.foundOnUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#8c8c8c] hover:text-[#f0f0f0] truncate hover:underline flex items-center gap-1"
                          >
                            <span className="truncate">{file.foundOnUrl}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0 text-[#737373]" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Immediate Subdirectories */}
          {directory.subDirectories.length > 0 && (
            <div className="space-y-2 font-mono">
              <h4 className="font-semibold text-[#f0f0f0] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <FolderTree className="w-3.5 h-3.5 text-[#c30800]" />
                Sub-Directories ({directory.subDirectories.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {directory.subDirectories.map((subdir) => (
                  <button
                    key={subdir}
                    type="button"
                    onClick={() => onSelectSubdir(subdir)}
                    className="px-2.5 py-1 rounded-none bg-[#141414] hover:bg-[#1a1a1a] text-[#f0f0f0] text-xs border border-[#383838] transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
                  >
                    <Folder className="w-3 h-3 text-[#c30800]" />
                    {subdir}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Direct Pages Discovered */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-[#f0f0f0] flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono">
                <FileText className="w-3.5 h-3.5 text-[#c30800]" />
                Direct Pages at Path ({directory.directPageUrls.length})
              </h4>
              {directory.directPageUrls.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleCopy(directory.directPageUrls.join('\n'), 'allUrls')}
                  className="text-[10px] font-mono uppercase text-[#8c8c8c] hover:text-[#f0f0f0] flex items-center gap-1 cursor-pointer font-bold"
                >
                  {copied === 'allUrls' ? <Check className="w-3 h-3 text-[#c30800]" /> : <Copy className="w-3 h-3" />}
                  <span>Copy List</span>
                </button>
              )}
            </div>

            {directPagesInfo.length === 0 ? (
              <p className="text-[#8c8c8c] font-mono text-xs py-2">No direct HTML targets situated strictly at this directory root level.</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {directPagesInfo.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-none bg-[#141414] border border-[#383838] flex items-center justify-between gap-3 font-mono"
                  >
                    <div className="min-w-0 flex-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#f0f0f0] hover:text-[#c30800] truncate block hover:underline font-medium"
                      >
                        {item.url}
                      </a>
                      {item.title && <p className="text-[10px] text-[#8c8c8c] truncate mt-0.5">{item.title}</p>}
                    </div>
                    <span
                      className={
                        item.statusCode >= 200 && item.statusCode < 300
                          ? 'tag tag-sm tag-accent !text-[#f3f3f7] shrink-0 font-bold'
                          : item.statusCode >= 300 && item.statusCode < 400
                          ? 'tag tag-sm tag-warning !text-[#0c0c0f] shrink-0 font-bold'
                          : 'tag tag-sm tag-accent !text-[#0c0c0f] shrink-0 font-bold'
                      }
                    >
                      HTTP {item.statusCode}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#383838] bg-[#141414] flex justify-end font-mono">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-none bg-[#141414] hover:bg-[#262626] text-[#f0f0f0] border border-[#383838] text-xs uppercase tracking-wider transition-colors cursor-pointer font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

