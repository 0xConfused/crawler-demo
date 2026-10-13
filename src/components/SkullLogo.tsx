// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';

interface SkullLogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const SkullLogo: React.FC<SkullLogoProps> = ({
  className = '',
  size = 60,
  alt = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  // Compute robust relative asset path that works on root and GitHub Pages subpaths
  const base = import.meta.env.BASE_URL || './';
  const logoSrc = `${base.replace(/\/+$/, '')}/skull-logo.png`.replace(/^\/\//, '/');

  if (imgFailed) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 select-none drop-shadow-md ${className}`}
        aria-label="0xCONFUSED Logo"
      >
        {/* Skull Cranium */}
        <path
          d="M16 24C16 14.0589 23.1634 6 32 6C40.8366 6 48 14.0589 48 24C48 30.2 45.4 35.6 41.5 39V48H22.5V39C18.6 35.6 16 30.2 16 24Z"
          fill="#141414"
          stroke="#c30800"
          strokeWidth="2"
        />
        {/* Eye Sockets */}
        <rect x="22" y="24" width="7" height="9" fill="#0d0d0d" stroke="#c30800" strokeWidth="1.5" />
        <rect x="35" y="24" width="7" height="9" fill="#0d0d0d" stroke="#c30800" strokeWidth="1.5" />
        {/* Glowing Pupils */}
        <rect x="25" y="27" width="2" height="3" fill="#f60a00" />
        <rect x="37" y="27" width="2" height="3" fill="#f60a00" />
        {/* Nasal Cavity */}
        <path d="M32 35L29.5 40H34.5L32 35Z" fill="#c30800" />
        {/* Teeth / Jaw Grid */}
        <line x1="22.5" y1="44" x2="41.5" y2="44" stroke="#383838" strokeWidth="1.5" />
        <line x1="26" y1="44" x2="26" y2="48" stroke="#383838" strokeWidth="1.5" />
        <line x1="30" y1="44" x2="30" y2="48" stroke="#383838" strokeWidth="1.5" />
        <line x1="34" y1="44" x2="34" y2="48" stroke="#383838" strokeWidth="1.5" />
        <line x1="38" y1="44" x2="38" y2="48" stroke="#383838" strokeWidth="1.5" />
        {/* Forehead Sutures */}
        <path d="M28 10L32 14L36 10" stroke="#770500" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <img
      src={logoSrc}
      alt={alt}
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      referrerPolicy="no-referrer"
      className={`shrink-0 object-contain drop-shadow-md select-none ${className}`}
      loading="eager"
      onError={() => setImgFailed(true)}
    />
  );
};
