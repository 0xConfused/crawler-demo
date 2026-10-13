// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useEffect, useRef } from 'react';
import { Square, Download, RotateCcw } from 'lucide-react';
import { CrawlStatus, CrawlStats } from '../types';
import { SkullLogo } from './SkullLogo';

interface CrawlerHeaderProps {
  status: CrawlStatus;
  stats: CrawlStats;
  currentDomain: string | null;
  onOpenExport?: () => void;
  onDownloadComplete?: () => void;
  onReset: () => void;
  onStop: () => void;
}

const BRAND_NAME = '0xCONFUSED';
const SCRAMBLE_CHARS = '!@#$%^&*<>[]_01';

export const CrawlerHeader: React.FC<CrawlerHeaderProps> = ({
  status,
  stats,
  currentDomain,
  onOpenExport,
  onDownloadComplete,
  onReset,
  onStop,
}) => {
  const [scrambleText, setScrambleText] = useState<string>(BRAND_NAME);
  const [isDownloading, setIsDownloading] = useState(false);
  const lastHoverScrambleRef = useRef<number>(0);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleDownloadComplete = () => {
    if (onDownloadComplete) {
      onDownloadComplete();
      return;
    }
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = './crawler_full.zip';
    link.download = 'crawler_full.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const runScramble = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }
    let iteration = 0;
    scrambleIntervalRef.current = setInterval(() => {
      setScrambleText(
        BRAND_NAME.split('')
          .map((_char, index) => {
            if (index < iteration) {
              return BRAND_NAME[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      if (iteration >= BRAND_NAME.length) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
          scrambleIntervalRef.current = null;
        }
        setScrambleText(BRAND_NAME);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseEnter = () => {
    const now = Date.now();
    if (now - lastHoverScrambleRef.current < 2000) {
      return;
    }
    lastHoverScrambleRef.current = now;
    runScramble();
  };

  useEffect(() => {
    runScramble();
    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  return (
    <header id="crawler-header" className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-logo-slot">
            <div className="brand-logo-inner" aria-hidden="true">
              <SkullLogo
                size={64}
                className="w-16 h-16 object-contain opacity-100"
              />
            </div>
          </div>

          <div className="brand-text-wrap">
            <div className="brand-title-row">
              <h1
                className="brand-glitch-text font-glitch"
                id="brandGlitchText"
                data-text="0xCONFUSED"
                onMouseEnter={handleMouseEnter}
              >
                <span className="brand-title">{scrambleText}</span>
              </h1>
              <span className="brand-mod font-mono">./crawler-demo</span>
            </div>
            <p className="brand-tagline">
              {currentDomain ? (
                <span className="flex items-center gap-1.5 text-[#f0f0f0] min-w-0">
                  <span className="w-1.5 h-1.5 bg-[#c30800] shrink-0" />
                  <span className="text-[#8c8c8c]">TARGET:</span>
                  <span className="text-[#f0f0f0] font-bold underline decoration-[#c30800] truncate max-w-[200px] sm:max-w-xs md:max-w-md" title={currentDomain}>
                    {currentDomain}
                  </span>
                </span>
              ) : (
                'Web Directory Reconnaissance & Domain Intelligence Engine'
              )}
            </p>
          </div>
        </div>

        <div className="topbar-actions">
          {/* Engine Status */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[10px] uppercase tracking-widest text-[#8c8c8c] font-mono font-semibold">Engine Status</span>
            <span
              id="crawler-status-badge"
              className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
                status === 'running'
                  ? 'text-[#c30800]'
                  : status === 'completed'
                  ? 'text-[#bbc300]'
                  : status === 'stopped'
                  ? 'text-[#8c8c8c]'
                  : status === 'error'
                  ? 'text-[#c3005a]'
                  : 'text-[#8c8c8c]'
              }`}
            >
              <span
                className={`w-2 h-2 ${
                  status === 'running'
                    ? 'bg-[#c30800] animate-pulse'
                    : status === 'completed'
                    ? 'bg-[#bbc300]'
                    : status === 'stopped'
                    ? 'bg-[#8c8c8c]'
                    : status === 'error'
                    ? 'bg-[#c3005a]'
                    : 'bg-[#383838]'
                }`}
              />
              {status === 'running'
                ? 'ACTIVE RECON'
                : status === 'completed'
                ? 'RECON COMPLETED'
                : status === 'stopped'
                ? 'RECON HALTED'
                : status === 'error'
                ? 'SYSTEM FAULT'
                : 'STANDBY READY'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {status === 'running' && (
              <button
                type="button"
                id="stop-crawler-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onStop();
                }}
                className="btn flex items-center gap-1.5 px-3 py-1.5 bg-[#c3005a]/20 hover:bg-[#c3005a]/30 text-[#f3f3f7] border border-[#c3005a] text-xs font-mono font-bold transition-colors uppercase tracking-wider cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current text-[#c3005a]" />
                <span>ABORT</span>
              </button>
            )}

            <button
              type="button"
              id="download-complete-btn"
              onClick={handleDownloadComplete}
              title="Download complete version (crawler_full.zip)"
              className="btn btn-secondary flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'PREPARING...' : 'DOWNLOAD FULL'}</span>
            </button>

            <button
              id="reset-crawler-btn"
              onClick={onReset}
              title="Reset All Recon Data"
              className="btn btn-secondary icon-btn text-[#8c8c8c] hover:text-[#f0f0f0] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
