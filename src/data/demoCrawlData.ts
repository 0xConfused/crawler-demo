// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  CrawlConfig,
  CrawlStats,
  DirectoryRecord,
  FileRecord,
  PageRecord,
  ExternalLinkRecord,
  ApiEndpointRecord,
  DomainIntelligence
} from "../types";

export const DEMO_CONFIG: CrawlConfig = {
  startUrl: "https://owasp.org",
  maxDepth: 2,
  maxPages: 25,
  allowSubdomains: false,
  stripQueryParams: false,
  stripHash: false,
  concurrency: 3,
  requestDelayMs: 80,
  includeRobotsTxt: true,
  includeAiAssistance: true,
  captureApiCalls: true,
  autoQueryApis: true,
  queryCrtSubdomains: true,
  randomizeUserAgent: false,
};

export const DEMO_STATS: CrawlStats = {
  "pagesVisited": 25,
  "pagesQueued": 0,
  "uniqueDirectories": 75,
  "uniqueFiles": 90,
  "externalLinksCount": 106,
  "externalDomainsCount": 37,
  "apiEndpointsCount": 5,
  "totalLinksFound": 2084,
  "sameDomainLinksFound": 1747,
  "errorsCount": 0,
  "status2xx": 25,
  "status3xx": 0,
  "status4xx": 0,
  "status5xx": 0,
  "startTime": 1791309831485,
  "endTime": 1791309833930,
  "currentUrl": null
};

export const DEMO_DIRECTORIES: DirectoryRecord[] = [
  {
    "path": "/",
    "domain": "owasp.org",
    "depth": 0,
    "parentPath": null,
    "directPageUrls": [
      "https://owasp.org/",
      "https://owasp.org/sitemap.xml"
    ],
    "allNestedUrlsCount": 156,
    "subDirectories": [
      "/admin/",
      "/api/",
      "/auth/",
      "/dashboard/",
      "/dev/",
      "/search/",
      "/projects/",
      "/chapters/",
      "/events/",
      "/meetings/",
      "/news/",
      "/about/",
      "/donate/",
      "/supporters/",
      "/awards/",
      "/community/",
      "/contact/",
      "/security/",
      "/staff/",
      "/board/",
      "/board-eu/",
      "/finance/",
      "/finance-governance/",
      "/policy/",
      "/docs/",
      "/slack/",
      "/_next/",
      "/images/",
      "/media/",
      "/www-community/"
    ],
    "firstDiscoveredAt": 1791309830591,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/robots.txt",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate"
    ],
    "directFiles": [
      {
        "path": "/robots.txt",
        "domain": "owasp.org",
        "filename": "robots.txt",
        "extension": "txt",
        "directory": "/",
        "depth": 0,
        "fileType": "document",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309830651,
        "url": "https://owasp.org/robots.txt"
      },
      {
        "path": "/sitemap.xml",
        "domain": "owasp.org",
        "filename": "sitemap.xml",
        "extension": "xml",
        "directory": "/",
        "depth": 0,
        "fileType": "data",
        "foundOnUrl": "https://owasp.org/robots.txt",
        "foundOnUrls": [
          "https://owasp.org/robots.txt"
        ],
        "firstDiscoveredAt": 1791309830651,
        "url": "https://owasp.org/sitemap.xml"
      }
    ]
  },
  {
    "path": "/_next/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [],
    "allNestedUrlsCount": 52,
    "subDirectories": [
      "/_next/static/",
      "/_next/image/"
    ],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/_next/image/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/_next/",
    "directPageUrls": [
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=3840&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=384&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=640&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=750&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=828&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=1080&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=1200&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=1920&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/_next/image?url=%2Fimages%2Fevents%2Fevent-1.png&w=2048&q=75&dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
    ],
    "allNestedUrlsCount": 9,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831572,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "directFiles": []
  },
  {
    "path": "/_next/static/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/_next/",
    "directPageUrls": [],
    "allNestedUrlsCount": 43,
    "subDirectories": [
      "/_next/static/immutable/"
    ],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/_next/static/immutable/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/_next/static/",
    "directPageUrls": [],
    "allNestedUrlsCount": 43,
    "subDirectories": [
      "/_next/static/immutable/media/",
      "/_next/static/immutable/chunks/"
    ],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/_next/static/immutable/chunks/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/_next/static/immutable/",
    "directPageUrls": [
      "https://owasp.org/_next/static/immutable/chunks/3uiqru8_otplb.css",
      "https://owasp.org/_next/static/immutable/chunks/07xx72afhoasn.css",
      "https://owasp.org/_next/static/immutable/chunks/0dsxtfei1cqit.js",
      "https://owasp.org/_next/static/immutable/chunks/0vn_c-qtmgve7.js",
      "https://owasp.org/_next/static/immutable/chunks/2rly4g9jlntqf.js",
      "https://owasp.org/_next/static/immutable/chunks/10lh7n9pq1ovy.js",
      "https://owasp.org/_next/static/immutable/chunks/turbopack-0ppj2y4n681b5.js",
      "https://owasp.org/_next/static/immutable/chunks/33rna6oi0iw3t.js",
      "https://owasp.org/_next/static/immutable/chunks/107_ofu64faf1.js",
      "https://owasp.org/_next/static/immutable/chunks/1um69cr59sqou.js",
      "https://owasp.org/_next/static/immutable/chunks/1qexsuqajd1vw.js",
      "https://owasp.org/_next/static/immutable/chunks/0hu0acat6exoy.js",
      "https://owasp.org/_next/static/immutable/chunks/00xyp-w6t07ca.js",
      "https://owasp.org/_next/static/immutable/chunks/2-cemjxercs4q.js",
      "https://owasp.org/_next/static/immutable/chunks/0prq8vkhgilib.js",
      "https://owasp.org/_next/static/immutable/chunks/0vdw78cgh7f-w.js",
      "https://owasp.org/_next/static/immutable/chunks/2n9ym2old4g19.js",
      "https://owasp.org/_next/static/immutable/chunks/0fa57oh8220ki.js",
      "https://owasp.org/_next/static/immutable/chunks/1dam2vhxgxy6y.js",
      "https://owasp.org/_next/static/immutable/chunks/2nbor3_yt_kfw.js",
      "https://owasp.org/_next/static/immutable/chunks/0c0hxoamwjsbw.js",
      "https://owasp.org/_next/static/immutable/chunks/27z62z_ecmod-.js",
      "https://owasp.org/_next/static/immutable/chunks/0z36y823ehlap.js",
      "https://owasp.org/_next/static/immutable/chunks/3hsb0ezotr4pq.js",
      "https://owasp.org/_next/static/immutable/chunks/0-q4zitbs1oq6.js",
      "https://owasp.org/_next/static/immutable/chunks/3sywjtc__t3sq.js",
      "https://owasp.org/_next/static/immutable/chunks/24iepyqhpc8ut.js",
      "https://owasp.org/_next/static/immutable/chunks/19ijn21bbslpj.js",
      "https://owasp.org/_next/static/immutable/chunks/121fpcw6a64t7.js",
      "https://owasp.org/_next/static/immutable/chunks/41qxy__mp1ckn.js",
      "https://owasp.org/_next/static/immutable/chunks/118k3em_8i7hl.js",
      "https://owasp.org/_next/static/immutable/chunks/32hwthtu_ybz0.js",
      "https://owasp.org/_next/static/immutable/chunks/3l06ij35lllwz.js",
      "https://owasp.org/_next/static/immutable/chunks/276yuit2zvrqc.js",
      "https://owasp.org/_next/static/immutable/chunks/1bo570ezded-f.js",
      "https://owasp.org/_next/static/immutable/chunks/3xy6x-knsak00.js",
      "https://owasp.org/_next/static/immutable/chunks/1e9saa91s5ecf.js",
      "https://owasp.org/_next/static/immutable/chunks/3qvo075m6tofw.js",
      "https://owasp.org/_next/static/immutable/chunks/1_s3kkydt26t2.js"
    ],
    "allNestedUrlsCount": 39,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": [
      {
        "path": "/_next/static/immutable/chunks/0-q4zitbs1oq6.js",
        "domain": "owasp.org",
        "filename": "0-q4zitbs1oq6.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/chapters",
        "foundOnUrls": [
          "https://owasp.org/chapters"
        ],
        "firstDiscoveredAt": 1791309831726,
        "url": "https://owasp.org/_next/static/immutable/chunks/0-q4zitbs1oq6.js"
      },
      {
        "path": "/_next/static/immutable/chunks/00xyp-w6t07ca.js",
        "domain": "owasp.org",
        "filename": "00xyp-w6t07ca.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/00xyp-w6t07ca.js"
      },
      {
        "path": "/_next/static/immutable/chunks/07xx72afhoasn.css",
        "domain": "owasp.org",
        "filename": "07xx72afhoasn.css",
        "extension": "css",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "stylesheet",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/07xx72afhoasn.css"
      },
      {
        "path": "/_next/static/immutable/chunks/0c0hxoamwjsbw.js",
        "domain": "owasp.org",
        "filename": "0c0hxoamwjsbw.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/_next/static/immutable/chunks/0c0hxoamwjsbw.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0dsxtfei1cqit.js",
        "domain": "owasp.org",
        "filename": "0dsxtfei1cqit.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/0dsxtfei1cqit.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0fa57oh8220ki.js",
        "domain": "owasp.org",
        "filename": "0fa57oh8220ki.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/_next/static/immutable/chunks/0fa57oh8220ki.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0hu0acat6exoy.js",
        "domain": "owasp.org",
        "filename": "0hu0acat6exoy.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/0hu0acat6exoy.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0prq8vkhgilib.js",
        "domain": "owasp.org",
        "filename": "0prq8vkhgilib.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/0prq8vkhgilib.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0vdw78cgh7f-w.js",
        "domain": "owasp.org",
        "filename": "0vdw78cgh7f-w.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/0vdw78cgh7f-w.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0vn_c-qtmgve7.js",
        "domain": "owasp.org",
        "filename": "0vn_c-qtmgve7.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/0vn_c-qtmgve7.js"
      },
      {
        "path": "/_next/static/immutable/chunks/0z36y823ehlap.js",
        "domain": "owasp.org",
        "filename": "0z36y823ehlap.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/projects",
        "foundOnUrls": [
          "https://owasp.org/projects"
        ],
        "firstDiscoveredAt": 1791309831717,
        "url": "https://owasp.org/_next/static/immutable/chunks/0z36y823ehlap.js"
      },
      {
        "path": "/_next/static/immutable/chunks/1_s3kkydt26t2.js",
        "domain": "owasp.org",
        "filename": "1_s3kkydt26t2.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833843,
        "url": "https://owasp.org/_next/static/immutable/chunks/1_s3kkydt26t2.js"
      },
      {
        "path": "/_next/static/immutable/chunks/107_ofu64faf1.js",
        "domain": "owasp.org",
        "filename": "107_ofu64faf1.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/107_ofu64faf1.js"
      },
      {
        "path": "/_next/static/immutable/chunks/10lh7n9pq1ovy.js",
        "domain": "owasp.org",
        "filename": "10lh7n9pq1ovy.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/10lh7n9pq1ovy.js"
      },
      {
        "path": "/_next/static/immutable/chunks/118k3em_8i7hl.js",
        "domain": "owasp.org",
        "filename": "118k3em_8i7hl.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/auth/sign-in",
        "foundOnUrls": [
          "https://owasp.org/auth/sign-in"
        ],
        "firstDiscoveredAt": 1791309832076,
        "url": "https://owasp.org/_next/static/immutable/chunks/118k3em_8i7hl.js"
      },
      {
        "path": "/_next/static/immutable/chunks/121fpcw6a64t7.js",
        "domain": "owasp.org",
        "filename": "121fpcw6a64t7.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/meetings",
        "foundOnUrls": [
          "https://owasp.org/meetings"
        ],
        "firstDiscoveredAt": 1791309831940,
        "url": "https://owasp.org/_next/static/immutable/chunks/121fpcw6a64t7.js"
      },
      {
        "path": "/_next/static/immutable/chunks/19ijn21bbslpj.js",
        "domain": "owasp.org",
        "filename": "19ijn21bbslpj.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/_next/static/immutable/chunks/19ijn21bbslpj.js"
      },
      {
        "path": "/_next/static/immutable/chunks/1bo570ezded-f.js",
        "domain": "owasp.org",
        "filename": "1bo570ezded-f.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/supporters/bios",
        "foundOnUrls": [
          "https://owasp.org/supporters/bios"
        ],
        "firstDiscoveredAt": 1791309833164,
        "url": "https://owasp.org/_next/static/immutable/chunks/1bo570ezded-f.js"
      },
      {
        "path": "/_next/static/immutable/chunks/1dam2vhxgxy6y.js",
        "domain": "owasp.org",
        "filename": "1dam2vhxgxy6y.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/_next/static/immutable/chunks/1dam2vhxgxy6y.js"
      },
      {
        "path": "/_next/static/immutable/chunks/1e9saa91s5ecf.js",
        "domain": "owasp.org",
        "filename": "1e9saa91s5ecf.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/supporters",
        "foundOnUrls": [
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309833222,
        "url": "https://owasp.org/_next/static/immutable/chunks/1e9saa91s5ecf.js"
      },
      {
        "path": "/_next/static/immutable/chunks/1qexsuqajd1vw.js",
        "domain": "owasp.org",
        "filename": "1qexsuqajd1vw.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/1qexsuqajd1vw.js"
      },
      {
        "path": "/_next/static/immutable/chunks/1um69cr59sqou.js",
        "domain": "owasp.org",
        "filename": "1um69cr59sqou.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/1um69cr59sqou.js"
      },
      {
        "path": "/_next/static/immutable/chunks/2-cemjxercs4q.js",
        "domain": "owasp.org",
        "filename": "2-cemjxercs4q.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/2-cemjxercs4q.js"
      },
      {
        "path": "/_next/static/immutable/chunks/24iepyqhpc8ut.js",
        "domain": "owasp.org",
        "filename": "24iepyqhpc8ut.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/news",
        "foundOnUrls": [
          "https://owasp.org/news"
        ],
        "firstDiscoveredAt": 1791309831887,
        "url": "https://owasp.org/_next/static/immutable/chunks/24iepyqhpc8ut.js"
      },
      {
        "path": "/_next/static/immutable/chunks/276yuit2zvrqc.js",
        "domain": "owasp.org",
        "filename": "276yuit2zvrqc.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/projects/juice-shop",
        "foundOnUrls": [
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf",
          "https://owasp.org/projects/blt",
          "https://owasp.org/projects/nest",
          "https://owasp.org/projects/pygoat",
          "https://owasp.org/projects/opencre"
        ],
        "firstDiscoveredAt": 1791309832215,
        "url": "https://owasp.org/_next/static/immutable/chunks/276yuit2zvrqc.js"
      },
      {
        "path": "/_next/static/immutable/chunks/27z62z_ecmod-.js",
        "domain": "owasp.org",
        "filename": "27z62z_ecmod-.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/projects",
        "foundOnUrls": [
          "https://owasp.org/projects"
        ],
        "firstDiscoveredAt": 1791309831717,
        "url": "https://owasp.org/_next/static/immutable/chunks/27z62z_ecmod-.js"
      },
      {
        "path": "/_next/static/immutable/chunks/2n9ym2old4g19.js",
        "domain": "owasp.org",
        "filename": "2n9ym2old4g19.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/events",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf",
          "https://owasp.org/projects/blt",
          "https://owasp.org/projects/nest",
          "https://owasp.org/projects/pygoat",
          "https://owasp.org/projects/opencre"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/_next/static/immutable/chunks/2n9ym2old4g19.js"
      },
      {
        "path": "/_next/static/immutable/chunks/2nbor3_yt_kfw.js",
        "domain": "owasp.org",
        "filename": "2nbor3_yt_kfw.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/_next/static/immutable/chunks/2nbor3_yt_kfw.js"
      },
      {
        "path": "/_next/static/immutable/chunks/2rly4g9jlntqf.js",
        "domain": "owasp.org",
        "filename": "2rly4g9jlntqf.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/2rly4g9jlntqf.js"
      },
      {
        "path": "/_next/static/immutable/chunks/32hwthtu_ybz0.js",
        "domain": "owasp.org",
        "filename": "32hwthtu_ybz0.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/donate",
        "foundOnUrls": [
          "https://owasp.org/donate"
        ],
        "firstDiscoveredAt": 1791309832095,
        "url": "https://owasp.org/_next/static/immutable/chunks/32hwthtu_ybz0.js"
      },
      {
        "path": "/_next/static/immutable/chunks/33rna6oi0iw3t.js",
        "domain": "owasp.org",
        "filename": "33rna6oi0iw3t.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/33rna6oi0iw3t.js"
      },
      {
        "path": "/_next/static/immutable/chunks/3hsb0ezotr4pq.js",
        "domain": "owasp.org",
        "filename": "3hsb0ezotr4pq.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/chapters",
        "foundOnUrls": [
          "https://owasp.org/chapters"
        ],
        "firstDiscoveredAt": 1791309831726,
        "url": "https://owasp.org/_next/static/immutable/chunks/3hsb0ezotr4pq.js"
      },
      {
        "path": "/_next/static/immutable/chunks/3l06ij35lllwz.js",
        "domain": "owasp.org",
        "filename": "3l06ij35lllwz.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/projects/juice-shop",
        "foundOnUrls": [
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf",
          "https://owasp.org/projects/blt",
          "https://owasp.org/projects/nest",
          "https://owasp.org/projects/pygoat",
          "https://owasp.org/projects/opencre"
        ],
        "firstDiscoveredAt": 1791309832215,
        "url": "https://owasp.org/_next/static/immutable/chunks/3l06ij35lllwz.js"
      },
      {
        "path": "/_next/static/immutable/chunks/3qvo075m6tofw.js",
        "domain": "owasp.org",
        "filename": "3qvo075m6tofw.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/contact",
        "foundOnUrls": [
          "https://owasp.org/contact",
          "https://owasp.org/awards",
          "https://owasp.org/community",
          "https://owasp.org/security",
          "https://owasp.org/board"
        ],
        "firstDiscoveredAt": 1791309833388,
        "url": "https://owasp.org/_next/static/immutable/chunks/3qvo075m6tofw.js"
      },
      {
        "path": "/_next/static/immutable/chunks/3sywjtc__t3sq.js",
        "domain": "owasp.org",
        "filename": "3sywjtc__t3sq.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/events",
        "foundOnUrls": [
          "https://owasp.org/events"
        ],
        "firstDiscoveredAt": 1791309831744,
        "url": "https://owasp.org/_next/static/immutable/chunks/3sywjtc__t3sq.js"
      },
      {
        "path": "/_next/static/immutable/chunks/3uiqru8_otplb.css",
        "domain": "owasp.org",
        "filename": "3uiqru8_otplb.css",
        "extension": "css",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "stylesheet",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/3uiqru8_otplb.css"
      },
      {
        "path": "/_next/static/immutable/chunks/3xy6x-knsak00.js",
        "domain": "owasp.org",
        "filename": "3xy6x-knsak00.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/supporters/jobs",
        "foundOnUrls": [
          "https://owasp.org/supporters/jobs"
        ],
        "firstDiscoveredAt": 1791309833196,
        "url": "https://owasp.org/_next/static/immutable/chunks/3xy6x-knsak00.js"
      },
      {
        "path": "/_next/static/immutable/chunks/41qxy__mp1ckn.js",
        "domain": "owasp.org",
        "filename": "41qxy__mp1ckn.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/meetings",
        "foundOnUrls": [
          "https://owasp.org/meetings"
        ],
        "firstDiscoveredAt": 1791309831941,
        "url": "https://owasp.org/_next/static/immutable/chunks/41qxy__mp1ckn.js"
      },
      {
        "path": "/_next/static/immutable/chunks/turbopack-0ppj2y4n681b5.js",
        "domain": "owasp.org",
        "filename": "turbopack-0ppj2y4n681b5.js",
        "extension": "js",
        "directory": "/_next/static/immutable/chunks/",
        "depth": 4,
        "fileType": "script",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/chunks/turbopack-0ppj2y4n681b5.js"
      }
    ]
  },
  {
    "path": "/_next/static/immutable/media/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/_next/static/immutable/",
    "directPageUrls": [
      "https://owasp.org/_next/static/immutable/media/8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2",
      "https://owasp.org/_next/static/immutable/media/a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2",
      "https://owasp.org/_next/static/immutable/media/a218039a3287bcfd-s.p.17e3l4txdrufi.woff2",
      "https://owasp.org/_next/static/immutable/media/e2334d715941921e-s.p.2g9xiodaln20i.woff2"
    ],
    "allNestedUrlsCount": 4,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/supporters/bios"
    ],
    "directFiles": [
      {
        "path": "/_next/static/immutable/media/8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2",
        "domain": "owasp.org",
        "filename": "8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2",
        "extension": "woff2",
        "directory": "/_next/static/immutable/media/",
        "depth": 4,
        "fileType": "other",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/supporters/bios"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/media/8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2"
      },
      {
        "path": "/_next/static/immutable/media/a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2",
        "domain": "owasp.org",
        "filename": "a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2",
        "extension": "woff2",
        "directory": "/_next/static/immutable/media/",
        "depth": 4,
        "fileType": "other",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/supporters/bios"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/media/a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2"
      },
      {
        "path": "/_next/static/immutable/media/a218039a3287bcfd-s.p.17e3l4txdrufi.woff2",
        "domain": "owasp.org",
        "filename": "a218039a3287bcfd-s.p.17e3l4txdrufi.woff2",
        "extension": "woff2",
        "directory": "/_next/static/immutable/media/",
        "depth": 4,
        "fileType": "other",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/supporters/bios"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/media/a218039a3287bcfd-s.p.17e3l4txdrufi.woff2"
      },
      {
        "path": "/_next/static/immutable/media/e2334d715941921e-s.p.2g9xiodaln20i.woff2",
        "domain": "owasp.org",
        "filename": "e2334d715941921e-s.p.2g9xiodaln20i.woff2",
        "extension": "woff2",
        "directory": "/_next/static/immutable/media/",
        "depth": 4,
        "fileType": "other",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/supporters/bios"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/_next/static/immutable/media/e2334d715941921e-s.p.2g9xiodaln20i.woff2"
      }
    ]
  },
  {
    "path": "/about/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/about"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/admin/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/admin"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309830651,
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt"
    ],
    "directFiles": []
  },
  {
    "path": "/api/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/api/"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309830651,
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt"
    ],
    "directFiles": []
  },
  {
    "path": "/auth/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/auth"
    ],
    "allNestedUrlsCount": 2,
    "subDirectories": [
      "/auth/sign-in/"
    ],
    "firstDiscoveredAt": 1791309830651,
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt",
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker"
    ],
    "directFiles": []
  },
  {
    "path": "/auth/sign-in/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/auth/",
    "directPageUrls": [
      "https://owasp.org/auth/sign-in"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/awards/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/awards"
    ],
    "allNestedUrlsCount": 3,
    "subDirectories": [
      "/awards/waspy-awards/",
      "/awards/distinguished-lifetime-members/"
    ],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/awards/distinguished-lifetime-members/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/awards/",
    "directPageUrls": [
      "https://owasp.org/awards/distinguished-lifetime-members"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833481,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "directFiles": []
  },
  {
    "path": "/awards/waspy-awards/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/awards/",
    "directPageUrls": [
      "https://owasp.org/awards/waspy-awards"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833481,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "directFiles": []
  },
  {
    "path": "/board-eu/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/board-eu"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/board/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/board"
    ],
    "allNestedUrlsCount": 9,
    "subDirectories": [
      "/board/members/",
      "/board/meetings/",
      "/board/voting-history/",
      "/board/attendance/",
      "/board/resources/",
      "/board/elections/"
    ],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/board/attendance/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/board/",
    "directPageUrls": [
      "https://owasp.org/board/attendance"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833820,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/elections/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/board/",
    "directPageUrls": [
      "https://owasp.org/board/elections"
    ],
    "allNestedUrlsCount": 2,
    "subDirectories": [
      "/board/elections/2026/"
    ],
    "firstDiscoveredAt": 1791309833820,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/elections/2026/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/board/elections/",
    "directPageUrls": [
      "https://owasp.org/board/elections/2026"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833820,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/meetings/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/board/",
    "directPageUrls": [
      "https://owasp.org/board/meetings"
    ],
    "allNestedUrlsCount": 2,
    "subDirectories": [
      "/board/meetings/past/"
    ],
    "firstDiscoveredAt": 1791309833819,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/meetings/past/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/board/meetings/",
    "directPageUrls": [
      "https://owasp.org/board/meetings/past"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833819,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/members/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/board/",
    "directPageUrls": [
      "https://owasp.org/board/members"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833819,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/resources/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/board/",
    "directPageUrls": [
      "https://owasp.org/board/resources"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833820,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/board/voting-history/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/board/",
    "directPageUrls": [
      "https://owasp.org/board/voting-history"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833819,
    "foundOnUrl": "https://owasp.org/board",
    "foundOnUrls": [
      "https://owasp.org/board"
    ],
    "directFiles": []
  },
  {
    "path": "/chapters/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/chapters"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker"
    ],
    "directFiles": []
  },
  {
    "path": "/community/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/community"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/contact/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/contact"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/dashboard/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/dashboard"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309830651,
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt"
    ],
    "directFiles": []
  },
  {
    "path": "/dev/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/dev"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309830651,
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt"
    ],
    "directFiles": []
  },
  {
    "path": "/docs/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/docs/OWASP-Impact-Report-2025.pdf",
      "https://owasp.org/docs/OWASP-Foundation-Strategic-Plan.pdf"
    ],
    "allNestedUrlsCount": 2,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": [
      {
        "path": "/docs/OWASP-Foundation-Strategic-Plan.pdf",
        "domain": "owasp.org",
        "filename": "OWASP-Foundation-Strategic-Plan.pdf",
        "extension": "pdf",
        "directory": "/docs/",
        "depth": 1,
        "fileType": "document",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf"
        ],
        "firstDiscoveredAt": 1791309831570,
        "url": "https://owasp.org/docs/OWASP-Foundation-Strategic-Plan.pdf"
      },
      {
        "path": "/docs/OWASP-Impact-Report-2025.pdf",
        "domain": "owasp.org",
        "filename": "OWASP-Impact-Report-2025.pdf",
        "extension": "pdf",
        "directory": "/docs/",
        "depth": 1,
        "fileType": "document",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf"
        ],
        "firstDiscoveredAt": 1791309831570,
        "url": "https://owasp.org/docs/OWASP-Impact-Report-2025.pdf"
      }
    ]
  },
  {
    "path": "/donate/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/donate",
      "https://owasp.org/donate?reponame=www-project-bug-logging-tool&title=OWASP+Bug+logging+tool"
    ],
    "allNestedUrlsCount": 2,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/events/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/events"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/finance-governance/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/finance-governance"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/finance/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/finance"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/images/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [],
    "allNestedUrlsCount": 26,
    "subDirectories": [
      "/images/events/",
      "/images/logos/",
      "/images/icons/",
      "/images/og/"
    ],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/images/events/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/images/",
    "directPageUrls": [
      "https://owasp.org/images/events/event-1.png"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "directFiles": [
      {
        "path": "/images/events/event-1.png",
        "domain": "owasp.org",
        "filename": "event-1.png",
        "extension": "png",
        "directory": "/images/events/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/images/events/event-1.png"
      }
    ]
  },
  {
    "path": "/images/icons/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/images/",
    "directPageUrls": [
      "https://owasp.org/images/icons/search.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/pulse.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/marker.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/megaphone.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/globe.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/users.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/code.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/chart-projector.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/book-open.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/check-shield.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/laptop.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/briefcase-figma.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/megaphone-contact.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/handshake.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/check.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/quote.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/icons/lock-file.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
    ],
    "allNestedUrlsCount": 17,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831572,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": [
      {
        "path": "/images/icons/book-open.svg",
        "domain": "owasp.org",
        "filename": "book-open.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/projects/owtf",
          "https://owasp.org/projects/nest",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/book-open.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/briefcase-figma.svg",
        "domain": "owasp.org",
        "filename": "briefcase-figma.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/supporters",
        "foundOnUrls": [
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309833222,
        "url": "https://owasp.org/images/icons/briefcase-figma.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/chart-projector.svg",
        "domain": "owasp.org",
        "filename": "chart-projector.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/chart-projector.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/check-shield.svg",
        "domain": "owasp.org",
        "filename": "check-shield.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/check-shield.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/check.svg",
        "domain": "owasp.org",
        "filename": "check.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/supporters",
        "foundOnUrls": [
          "https://owasp.org/supporters",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309833222,
        "url": "https://owasp.org/images/icons/check.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/code.svg",
        "domain": "owasp.org",
        "filename": "code.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/supporters",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/code.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/globe.svg",
        "domain": "owasp.org",
        "filename": "globe.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/supporters",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/globe.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/handshake.svg",
        "domain": "owasp.org",
        "filename": "handshake.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/supporters",
        "foundOnUrls": [
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309833222,
        "url": "https://owasp.org/images/icons/handshake.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/laptop.svg",
        "domain": "owasp.org",
        "filename": "laptop.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/laptop.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/lock-file.svg",
        "domain": "owasp.org",
        "filename": "lock-file.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/security",
        "foundOnUrls": [
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309833794,
        "url": "https://owasp.org/images/icons/lock-file.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/marker.svg",
        "domain": "owasp.org",
        "filename": "marker.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/icons/marker.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/megaphone-contact.svg",
        "domain": "owasp.org",
        "filename": "megaphone-contact.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/supporters",
        "foundOnUrls": [
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309833222,
        "url": "https://owasp.org/images/icons/megaphone-contact.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/megaphone.svg",
        "domain": "owasp.org",
        "filename": "megaphone.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects/owtf",
          "https://owasp.org/supporters",
          "https://owasp.org/security"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/icons/megaphone.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/pulse.svg",
        "domain": "owasp.org",
        "filename": "pulse.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/icons/pulse.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/quote.svg",
        "domain": "owasp.org",
        "filename": "quote.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/supporters",
        "foundOnUrls": [
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309833222,
        "url": "https://owasp.org/images/icons/quote.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/search.svg",
        "domain": "owasp.org",
        "filename": "search.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/icons/search.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/icons/users.svg",
        "domain": "owasp.org",
        "filename": "users.svg",
        "extension": "svg",
        "directory": "/images/icons/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/icons/users.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      }
    ]
  },
  {
    "path": "/images/logos/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/images/",
    "directPageUrls": [
      "https://owasp.org/images/logos/favicon-owasp.svg",
      "https://owasp.org/images/logos/owasp-logo-bg.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/logos/owasp-logo-small.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/logos/owasp-logo-footer.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/logos/slack-logo.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/logos/owasp-logo-large-bg.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/images/logos/owasp-logo-small-white.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
    ],
    "allNestedUrlsCount": 7,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831571,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": [
      {
        "path": "/images/logos/favicon-owasp.svg",
        "domain": "owasp.org",
        "filename": "favicon-owasp.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831571,
        "url": "https://owasp.org/images/logos/favicon-owasp.svg"
      },
      {
        "path": "/images/logos/owasp-logo-bg.svg",
        "domain": "owasp.org",
        "filename": "owasp-logo-bg.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/logos/owasp-logo-bg.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/logos/owasp-logo-footer.svg",
        "domain": "owasp.org",
        "filename": "owasp-logo-footer.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/logos/owasp-logo-footer.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/logos/owasp-logo-large-bg.svg",
        "domain": "owasp.org",
        "filename": "owasp-logo-large-bg.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about",
          "https://owasp.org/supporters"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/logos/owasp-logo-large-bg.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/logos/owasp-logo-small-white.svg",
        "domain": "owasp.org",
        "filename": "owasp-logo-small-white.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/about",
        "foundOnUrls": [
          "https://owasp.org/about"
        ],
        "firstDiscoveredAt": 1791309831917,
        "url": "https://owasp.org/images/logos/owasp-logo-small-white.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/logos/owasp-logo-small.svg",
        "domain": "owasp.org",
        "filename": "owasp-logo-small.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/logos/owasp-logo-small.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/images/logos/slack-logo.svg",
        "domain": "owasp.org",
        "filename": "slack-logo.svg",
        "extension": "svg",
        "directory": "/images/logos/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop",
          "https://owasp.org/projects/nettacker",
          "https://owasp.org/projects/owtf"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/logos/slack-logo.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      }
    ]
  },
  {
    "path": "/images/og/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/images/",
    "directPageUrls": [
      "https://owasp.org/images/og/owasp-default.png"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831572,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": [
      {
        "path": "/images/og/owasp-default.png",
        "domain": "owasp.org",
        "filename": "owasp-default.png",
        "extension": "png",
        "directory": "/images/og/",
        "depth": 2,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/",
        "foundOnUrls": [
          "https://owasp.org/",
          "https://owasp.org/projects",
          "https://owasp.org/chapters",
          "https://owasp.org/events",
          "https://owasp.org/news",
          "https://owasp.org/about",
          "https://owasp.org/meetings",
          "https://owasp.org/auth/sign-in",
          "https://owasp.org/donate",
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309831572,
        "url": "https://owasp.org/images/og/owasp-default.png"
      }
    ]
  },
  {
    "path": "/media/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [],
    "allNestedUrlsCount": 17,
    "subDirectories": [
      "/media/project-media/"
    ],
    "firstDiscoveredAt": 1791309832215,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/awards",
      "https://owasp.org/staff"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/media/",
    "directPageUrls": [],
    "allNestedUrlsCount": 17,
    "subDirectories": [
      "/media/project-media/projects/",
      "/media/project-media/awards/",
      "/media/project-media/staff/"
    ],
    "firstDiscoveredAt": 1791309832215,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/awards",
      "https://owasp.org/staff"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/awards/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/media/project-media/",
    "directPageUrls": [],
    "allNestedUrlsCount": 7,
    "subDirectories": [
      "/media/project-media/awards/awardees/"
    ],
    "firstDiscoveredAt": 1791309833482,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/awards/awardees/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/media/project-media/awards/",
    "directPageUrls": [
      "https://owasp.org/media/project-media/awards/awardees/1789352036695-u64cprxab6.jpg",
      "https://owasp.org/media/project-media/awards/awardees/1789351913086-c80gson3znd.jpeg",
      "https://owasp.org/media/project-media/awards/awardees/1789444000764-cjiqihuxdip.png",
      "https://owasp.org/media/project-media/awards/awardees/1789349982427-wg58u7on8nl.jpg",
      "https://owasp.org/media/project-media/awards/awardees/1789349910502-dycv9sfpuyi.jpeg",
      "https://owasp.org/media/project-media/awards/awardees/1789349954041-p6nqdn1wpmk.jpg",
      "https://owasp.org/media/project-media/awards/awardees/1789349829217-ylb9vbe0atk.png"
    ],
    "allNestedUrlsCount": 7,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833482,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "directFiles": [
      {
        "path": "/media/project-media/awards/awardees/1789349829217-ylb9vbe0atk.png",
        "domain": "owasp.org",
        "filename": "1789349829217-ylb9vbe0atk.png",
        "extension": "png",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789349829217-ylb9vbe0atk.png"
      },
      {
        "path": "/media/project-media/awards/awardees/1789349910502-dycv9sfpuyi.jpeg",
        "domain": "owasp.org",
        "filename": "1789349910502-dycv9sfpuyi.jpeg",
        "extension": "jpeg",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789349910502-dycv9sfpuyi.jpeg"
      },
      {
        "path": "/media/project-media/awards/awardees/1789349954041-p6nqdn1wpmk.jpg",
        "domain": "owasp.org",
        "filename": "1789349954041-p6nqdn1wpmk.jpg",
        "extension": "jpg",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789349954041-p6nqdn1wpmk.jpg"
      },
      {
        "path": "/media/project-media/awards/awardees/1789349982427-wg58u7on8nl.jpg",
        "domain": "owasp.org",
        "filename": "1789349982427-wg58u7on8nl.jpg",
        "extension": "jpg",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789349982427-wg58u7on8nl.jpg"
      },
      {
        "path": "/media/project-media/awards/awardees/1789351913086-c80gson3znd.jpeg",
        "domain": "owasp.org",
        "filename": "1789351913086-c80gson3znd.jpeg",
        "extension": "jpeg",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789351913086-c80gson3znd.jpeg"
      },
      {
        "path": "/media/project-media/awards/awardees/1789352036695-u64cprxab6.jpg",
        "domain": "owasp.org",
        "filename": "1789352036695-u64cprxab6.jpg",
        "extension": "jpg",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789352036695-u64cprxab6.jpg"
      },
      {
        "path": "/media/project-media/awards/awardees/1789444000764-cjiqihuxdip.png",
        "domain": "owasp.org",
        "filename": "1789444000764-cjiqihuxdip.png",
        "extension": "png",
        "directory": "/media/project-media/awards/awardees/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/awards",
        "foundOnUrls": [
          "https://owasp.org/awards"
        ],
        "firstDiscoveredAt": 1791309833482,
        "url": "https://owasp.org/media/project-media/awards/awardees/1789444000764-cjiqihuxdip.png"
      }
    ]
  },
  {
    "path": "/media/project-media/projects/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/media/project-media/",
    "directPageUrls": [],
    "allNestedUrlsCount": 3,
    "subDirectories": [
      "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/",
      "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/"
    ],
    "firstDiscoveredAt": 1791309832215,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/media/project-media/projects/",
    "directPageUrls": [],
    "allNestedUrlsCount": 1,
    "subDirectories": [
      "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/"
    ],
    "firstDiscoveredAt": 1791309832215,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/",
    "domain": "owasp.org",
    "depth": 5,
    "parentPath": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/",
    "directPageUrls": [
      "https://owasp.org/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/1790332589990-wygn15f0qr.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309832215,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": [
      {
        "path": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/1790332589990-wygn15f0qr.gif",
        "domain": "owasp.org",
        "filename": "1790332589990-wygn15f0qr.gif",
        "extension": "gif",
        "directory": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/",
        "depth": 5,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/projects/juice-shop",
        "foundOnUrls": [
          "https://owasp.org/projects/juice-shop"
        ],
        "firstDiscoveredAt": 1791309832215,
        "url": "https://owasp.org/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/1790332589990-wygn15f0qr.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      }
    ]
  },
  {
    "path": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/media/project-media/projects/",
    "directPageUrls": [],
    "allNestedUrlsCount": 2,
    "subDirectories": [
      "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/"
    ],
    "firstDiscoveredAt": 1791309832447,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/",
    "domain": "owasp.org",
    "depth": 5,
    "parentPath": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/",
    "directPageUrls": [
      "https://owasp.org/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
    ],
    "allNestedUrlsCount": 2,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309832447,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "directFiles": [
      {
        "path": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif",
        "domain": "owasp.org",
        "filename": "1789295060719-2xhrhb6y7tu.gif",
        "extension": "gif",
        "directory": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/",
        "depth": 5,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/projects/nettacker",
        "foundOnUrls": [
          "https://owasp.org/projects/nettacker"
        ],
        "firstDiscoveredAt": 1791309832447,
        "url": "https://owasp.org/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif",
        "domain": "owasp.org",
        "filename": "1789295113236-8c9ork6gyqw.gif",
        "extension": "gif",
        "directory": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/",
        "depth": 5,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/projects/nettacker",
        "foundOnUrls": [
          "https://owasp.org/projects/nettacker"
        ],
        "firstDiscoveredAt": 1791309832447,
        "url": "https://owasp.org/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      }
    ]
  },
  {
    "path": "/media/project-media/staff/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/media/project-media/",
    "directPageUrls": [],
    "allNestedUrlsCount": 7,
    "subDirectories": [
      "/media/project-media/staff/members/"
    ],
    "firstDiscoveredAt": 1791309833844,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "directFiles": []
  },
  {
    "path": "/media/project-media/staff/members/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/media/project-media/staff/",
    "directPageUrls": [
      "https://owasp.org/media/project-media/staff/members/1787569208583-5dtj4syrqxy.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/staff/members/1788501586402-1mktb8ts42t.png?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/staff/members/1787569720253-b81s3bwyjiv.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/staff/members/1787587124484-9o3xv54ruee.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/staff/members/1787589707261-0hjnyuhyrpiq.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/staff/members/1787569652238-qp0jwglgwkd.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s",
      "https://owasp.org/media/project-media/staff/members/1787569561868-lsdojx6r48q.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
    ],
    "allNestedUrlsCount": 7,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309833844,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "directFiles": [
      {
        "path": "/media/project-media/staff/members/1787569208583-5dtj4syrqxy.jpeg",
        "domain": "owasp.org",
        "filename": "1787569208583-5dtj4syrqxy.jpeg",
        "extension": "jpeg",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1787569208583-5dtj4syrqxy.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/staff/members/1787569561868-lsdojx6r48q.jpg",
        "domain": "owasp.org",
        "filename": "1787569561868-lsdojx6r48q.jpg",
        "extension": "jpg",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1787569561868-lsdojx6r48q.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/staff/members/1787569652238-qp0jwglgwkd.jpeg",
        "domain": "owasp.org",
        "filename": "1787569652238-qp0jwglgwkd.jpeg",
        "extension": "jpeg",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1787569652238-qp0jwglgwkd.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/staff/members/1787569720253-b81s3bwyjiv.jpg",
        "domain": "owasp.org",
        "filename": "1787569720253-b81s3bwyjiv.jpg",
        "extension": "jpg",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1787569720253-b81s3bwyjiv.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/staff/members/1787587124484-9o3xv54ruee.jpg",
        "domain": "owasp.org",
        "filename": "1787587124484-9o3xv54ruee.jpg",
        "extension": "jpg",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1787587124484-9o3xv54ruee.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/staff/members/1787589707261-0hjnyuhyrpiq.jpeg",
        "domain": "owasp.org",
        "filename": "1787589707261-0hjnyuhyrpiq.jpeg",
        "extension": "jpeg",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1787589707261-0hjnyuhyrpiq.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      },
      {
        "path": "/media/project-media/staff/members/1788501586402-1mktb8ts42t.png",
        "domain": "owasp.org",
        "filename": "1788501586402-1mktb8ts42t.png",
        "extension": "png",
        "directory": "/media/project-media/staff/members/",
        "depth": 4,
        "fileType": "image",
        "foundOnUrl": "https://owasp.org/staff",
        "foundOnUrls": [
          "https://owasp.org/staff"
        ],
        "firstDiscoveredAt": 1791309833844,
        "url": "https://owasp.org/media/project-media/staff/members/1788501586402-1mktb8ts42t.png?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
      }
    ]
  },
  {
    "path": "/meetings/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/meetings"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/news/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/news"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/policy/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/policy"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/projects"
    ],
    "allNestedUrlsCount": 18,
    "subDirectories": [
      "/projects/juice-shop/",
      "/projects/nettacker/",
      "/projects/owtf/",
      "/projects/blt/",
      "/projects/nest/",
      "/projects/pygoat/",
      "/projects/opencre/",
      "/projects/top-ten/"
    ],
    "firstDiscoveredAt": 1791309831569,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/blt/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/blt"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/blt"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/juice-shop/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/nest/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/nest",
      "https://owasp.org/projects/nest?tab=about-nest",
      "https://owasp.org/projects/nest?tab=leadership",
      "https://owasp.org/projects/nest?tab=contributing",
      "https://owasp.org/projects/nest?tab=evolution"
    ],
    "allNestedUrlsCount": 5,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/nest"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/nettacker/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/nettacker"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/opencre/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/opencre"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/opencre"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/owtf/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/owtf",
      "https://owasp.org/projects/owtf?tab=main",
      "https://owasp.org/projects/owtf?tab=contributing",
      "https://owasp.org/projects/owtf?tab=news",
      "https://owasp.org/projects/owtf?tab=sponsors",
      "https://owasp.org/projects/owtf?tab=talks"
    ],
    "allNestedUrlsCount": 6,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/pygoat/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/pygoat"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/pygoat"
    ],
    "directFiles": []
  },
  {
    "path": "/projects/top-ten/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/projects/",
    "directPageUrls": [
      "https://owasp.org/projects/top-ten"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309832214,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "directFiles": []
  },
  {
    "path": "/search/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/search"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309830651,
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt"
    ],
    "directFiles": []
  },
  {
    "path": "/security/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/security"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/slack/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [],
    "allNestedUrlsCount": 1,
    "subDirectories": [
      "/slack/invite/"
    ],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/slack/invite/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/slack/",
    "directPageUrls": [
      "https://owasp.org/slack/invite"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/staff/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/staff"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/supporters/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [
      "https://owasp.org/supporters"
    ],
    "allNestedUrlsCount": 3,
    "subDirectories": [
      "/supporters/bios/",
      "/supporters/jobs/"
    ],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/supporters/bios/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/supporters/",
    "directPageUrls": [
      "https://owasp.org/supporters/bios"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/supporters/jobs/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/supporters/",
    "directPageUrls": [
      "https://owasp.org/supporters/jobs"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309831570,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/www-community/",
    "domain": "owasp.org",
    "depth": 1,
    "parentPath": "/",
    "directPageUrls": [],
    "allNestedUrlsCount": 1,
    "subDirectories": [
      "/www-community/initiatives/"
    ],
    "firstDiscoveredAt": 1791309832535,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/www-community/initiatives/",
    "domain": "owasp.org",
    "depth": 2,
    "parentPath": "/www-community/",
    "directPageUrls": [],
    "allNestedUrlsCount": 1,
    "subDirectories": [
      "/www-community/initiatives/gsoc/"
    ],
    "firstDiscoveredAt": 1791309832535,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/www-community/initiatives/gsoc/",
    "domain": "owasp.org",
    "depth": 3,
    "parentPath": "/www-community/initiatives/",
    "directPageUrls": [],
    "allNestedUrlsCount": 1,
    "subDirectories": [
      "/www-community/initiatives/gsoc/gsoc2025ideas/"
    ],
    "firstDiscoveredAt": 1791309832535,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  },
  {
    "path": "/www-community/initiatives/gsoc/gsoc2025ideas/",
    "domain": "owasp.org",
    "depth": 4,
    "parentPath": "/www-community/initiatives/gsoc/",
    "directPageUrls": [
      "https://owasp.org/www-community/initiatives/gsoc/gsoc2025ideas"
    ],
    "allNestedUrlsCount": 1,
    "subDirectories": [],
    "firstDiscoveredAt": 1791309832535,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "directFiles": []
  }
];

export const DEMO_FILES: FileRecord[] = [
  {
    "path": "/_next/static/immutable/chunks/0-q4zitbs1oq6.js",
    "domain": "owasp.org",
    "filename": "0-q4zitbs1oq6.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/chapters",
    "foundOnUrls": [
      "https://owasp.org/chapters"
    ],
    "firstDiscoveredAt": 1791309831726,
    "url": "https://owasp.org/_next/static/immutable/chunks/0-q4zitbs1oq6.js"
  },
  {
    "path": "/_next/static/immutable/chunks/00xyp-w6t07ca.js",
    "domain": "owasp.org",
    "filename": "00xyp-w6t07ca.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/00xyp-w6t07ca.js"
  },
  {
    "path": "/_next/static/immutable/chunks/07xx72afhoasn.css",
    "domain": "owasp.org",
    "filename": "07xx72afhoasn.css",
    "extension": "css",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "stylesheet",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/07xx72afhoasn.css"
  },
  {
    "path": "/_next/static/immutable/chunks/0c0hxoamwjsbw.js",
    "domain": "owasp.org",
    "filename": "0c0hxoamwjsbw.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/_next/static/immutable/chunks/0c0hxoamwjsbw.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0dsxtfei1cqit.js",
    "domain": "owasp.org",
    "filename": "0dsxtfei1cqit.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/0dsxtfei1cqit.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0fa57oh8220ki.js",
    "domain": "owasp.org",
    "filename": "0fa57oh8220ki.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/_next/static/immutable/chunks/0fa57oh8220ki.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0hu0acat6exoy.js",
    "domain": "owasp.org",
    "filename": "0hu0acat6exoy.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/0hu0acat6exoy.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0prq8vkhgilib.js",
    "domain": "owasp.org",
    "filename": "0prq8vkhgilib.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/0prq8vkhgilib.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0vdw78cgh7f-w.js",
    "domain": "owasp.org",
    "filename": "0vdw78cgh7f-w.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/0vdw78cgh7f-w.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0vn_c-qtmgve7.js",
    "domain": "owasp.org",
    "filename": "0vn_c-qtmgve7.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/0vn_c-qtmgve7.js"
  },
  {
    "path": "/_next/static/immutable/chunks/0z36y823ehlap.js",
    "domain": "owasp.org",
    "filename": "0z36y823ehlap.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/projects",
    "foundOnUrls": [
      "https://owasp.org/projects"
    ],
    "firstDiscoveredAt": 1791309831717,
    "url": "https://owasp.org/_next/static/immutable/chunks/0z36y823ehlap.js"
  },
  {
    "path": "/_next/static/immutable/chunks/1_s3kkydt26t2.js",
    "domain": "owasp.org",
    "filename": "1_s3kkydt26t2.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833843,
    "url": "https://owasp.org/_next/static/immutable/chunks/1_s3kkydt26t2.js"
  },
  {
    "path": "/_next/static/immutable/chunks/107_ofu64faf1.js",
    "domain": "owasp.org",
    "filename": "107_ofu64faf1.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/107_ofu64faf1.js"
  },
  {
    "path": "/_next/static/immutable/chunks/10lh7n9pq1ovy.js",
    "domain": "owasp.org",
    "filename": "10lh7n9pq1ovy.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/10lh7n9pq1ovy.js"
  },
  {
    "path": "/_next/static/immutable/chunks/118k3em_8i7hl.js",
    "domain": "owasp.org",
    "filename": "118k3em_8i7hl.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/auth/sign-in",
    "foundOnUrls": [
      "https://owasp.org/auth/sign-in"
    ],
    "firstDiscoveredAt": 1791309832076,
    "url": "https://owasp.org/_next/static/immutable/chunks/118k3em_8i7hl.js"
  },
  {
    "path": "/_next/static/immutable/chunks/121fpcw6a64t7.js",
    "domain": "owasp.org",
    "filename": "121fpcw6a64t7.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/meetings",
    "foundOnUrls": [
      "https://owasp.org/meetings"
    ],
    "firstDiscoveredAt": 1791309831940,
    "url": "https://owasp.org/_next/static/immutable/chunks/121fpcw6a64t7.js"
  },
  {
    "path": "/_next/static/immutable/chunks/19ijn21bbslpj.js",
    "domain": "owasp.org",
    "filename": "19ijn21bbslpj.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/_next/static/immutable/chunks/19ijn21bbslpj.js"
  },
  {
    "path": "/_next/static/immutable/chunks/1bo570ezded-f.js",
    "domain": "owasp.org",
    "filename": "1bo570ezded-f.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/supporters/bios",
    "foundOnUrls": [
      "https://owasp.org/supporters/bios"
    ],
    "firstDiscoveredAt": 1791309833164,
    "url": "https://owasp.org/_next/static/immutable/chunks/1bo570ezded-f.js"
  },
  {
    "path": "/_next/static/immutable/chunks/1dam2vhxgxy6y.js",
    "domain": "owasp.org",
    "filename": "1dam2vhxgxy6y.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/_next/static/immutable/chunks/1dam2vhxgxy6y.js"
  },
  {
    "path": "/_next/static/immutable/chunks/1e9saa91s5ecf.js",
    "domain": "owasp.org",
    "filename": "1e9saa91s5ecf.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/supporters",
    "foundOnUrls": [
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309833222,
    "url": "https://owasp.org/_next/static/immutable/chunks/1e9saa91s5ecf.js"
  },
  {
    "path": "/_next/static/immutable/chunks/1qexsuqajd1vw.js",
    "domain": "owasp.org",
    "filename": "1qexsuqajd1vw.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/1qexsuqajd1vw.js"
  },
  {
    "path": "/_next/static/immutable/chunks/1um69cr59sqou.js",
    "domain": "owasp.org",
    "filename": "1um69cr59sqou.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/1um69cr59sqou.js"
  },
  {
    "path": "/_next/static/immutable/chunks/2-cemjxercs4q.js",
    "domain": "owasp.org",
    "filename": "2-cemjxercs4q.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/2-cemjxercs4q.js"
  },
  {
    "path": "/_next/static/immutable/chunks/24iepyqhpc8ut.js",
    "domain": "owasp.org",
    "filename": "24iepyqhpc8ut.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/news",
    "foundOnUrls": [
      "https://owasp.org/news"
    ],
    "firstDiscoveredAt": 1791309831887,
    "url": "https://owasp.org/_next/static/immutable/chunks/24iepyqhpc8ut.js"
  },
  {
    "path": "/_next/static/immutable/chunks/276yuit2zvrqc.js",
    "domain": "owasp.org",
    "filename": "276yuit2zvrqc.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf",
      "https://owasp.org/projects/blt",
      "https://owasp.org/projects/nest",
      "https://owasp.org/projects/pygoat",
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309832215,
    "url": "https://owasp.org/_next/static/immutable/chunks/276yuit2zvrqc.js"
  },
  {
    "path": "/_next/static/immutable/chunks/27z62z_ecmod-.js",
    "domain": "owasp.org",
    "filename": "27z62z_ecmod-.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/projects",
    "foundOnUrls": [
      "https://owasp.org/projects"
    ],
    "firstDiscoveredAt": 1791309831717,
    "url": "https://owasp.org/_next/static/immutable/chunks/27z62z_ecmod-.js"
  },
  {
    "path": "/_next/static/immutable/chunks/2n9ym2old4g19.js",
    "domain": "owasp.org",
    "filename": "2n9ym2old4g19.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf",
      "https://owasp.org/projects/blt",
      "https://owasp.org/projects/nest",
      "https://owasp.org/projects/pygoat",
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/_next/static/immutable/chunks/2n9ym2old4g19.js"
  },
  {
    "path": "/_next/static/immutable/chunks/2nbor3_yt_kfw.js",
    "domain": "owasp.org",
    "filename": "2nbor3_yt_kfw.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/_next/static/immutable/chunks/2nbor3_yt_kfw.js"
  },
  {
    "path": "/_next/static/immutable/chunks/2rly4g9jlntqf.js",
    "domain": "owasp.org",
    "filename": "2rly4g9jlntqf.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/2rly4g9jlntqf.js"
  },
  {
    "path": "/_next/static/immutable/chunks/32hwthtu_ybz0.js",
    "domain": "owasp.org",
    "filename": "32hwthtu_ybz0.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/donate",
    "foundOnUrls": [
      "https://owasp.org/donate"
    ],
    "firstDiscoveredAt": 1791309832095,
    "url": "https://owasp.org/_next/static/immutable/chunks/32hwthtu_ybz0.js"
  },
  {
    "path": "/_next/static/immutable/chunks/33rna6oi0iw3t.js",
    "domain": "owasp.org",
    "filename": "33rna6oi0iw3t.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/33rna6oi0iw3t.js"
  },
  {
    "path": "/_next/static/immutable/chunks/3hsb0ezotr4pq.js",
    "domain": "owasp.org",
    "filename": "3hsb0ezotr4pq.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/chapters",
    "foundOnUrls": [
      "https://owasp.org/chapters"
    ],
    "firstDiscoveredAt": 1791309831726,
    "url": "https://owasp.org/_next/static/immutable/chunks/3hsb0ezotr4pq.js"
  },
  {
    "path": "/_next/static/immutable/chunks/3l06ij35lllwz.js",
    "domain": "owasp.org",
    "filename": "3l06ij35lllwz.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf",
      "https://owasp.org/projects/blt",
      "https://owasp.org/projects/nest",
      "https://owasp.org/projects/pygoat",
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309832215,
    "url": "https://owasp.org/_next/static/immutable/chunks/3l06ij35lllwz.js"
  },
  {
    "path": "/_next/static/immutable/chunks/3qvo075m6tofw.js",
    "domain": "owasp.org",
    "filename": "3qvo075m6tofw.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/contact",
    "foundOnUrls": [
      "https://owasp.org/contact",
      "https://owasp.org/awards",
      "https://owasp.org/community",
      "https://owasp.org/security",
      "https://owasp.org/board"
    ],
    "firstDiscoveredAt": 1791309833388,
    "url": "https://owasp.org/_next/static/immutable/chunks/3qvo075m6tofw.js"
  },
  {
    "path": "/_next/static/immutable/chunks/3sywjtc__t3sq.js",
    "domain": "owasp.org",
    "filename": "3sywjtc__t3sq.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/events",
    "foundOnUrls": [
      "https://owasp.org/events"
    ],
    "firstDiscoveredAt": 1791309831744,
    "url": "https://owasp.org/_next/static/immutable/chunks/3sywjtc__t3sq.js"
  },
  {
    "path": "/_next/static/immutable/chunks/3uiqru8_otplb.css",
    "domain": "owasp.org",
    "filename": "3uiqru8_otplb.css",
    "extension": "css",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "stylesheet",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/3uiqru8_otplb.css"
  },
  {
    "path": "/_next/static/immutable/chunks/3xy6x-knsak00.js",
    "domain": "owasp.org",
    "filename": "3xy6x-knsak00.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/supporters/jobs",
    "foundOnUrls": [
      "https://owasp.org/supporters/jobs"
    ],
    "firstDiscoveredAt": 1791309833196,
    "url": "https://owasp.org/_next/static/immutable/chunks/3xy6x-knsak00.js"
  },
  {
    "path": "/_next/static/immutable/chunks/41qxy__mp1ckn.js",
    "domain": "owasp.org",
    "filename": "41qxy__mp1ckn.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/meetings",
    "foundOnUrls": [
      "https://owasp.org/meetings"
    ],
    "firstDiscoveredAt": 1791309831941,
    "url": "https://owasp.org/_next/static/immutable/chunks/41qxy__mp1ckn.js"
  },
  {
    "path": "/_next/static/immutable/chunks/turbopack-0ppj2y4n681b5.js",
    "domain": "owasp.org",
    "filename": "turbopack-0ppj2y4n681b5.js",
    "extension": "js",
    "directory": "/_next/static/immutable/chunks/",
    "depth": 4,
    "fileType": "script",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/chunks/turbopack-0ppj2y4n681b5.js"
  },
  {
    "path": "/_next/static/immutable/media/8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2",
    "domain": "owasp.org",
    "filename": "8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2",
    "extension": "woff2",
    "directory": "/_next/static/immutable/media/",
    "depth": 4,
    "fileType": "other",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/supporters/bios"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/media/8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2"
  },
  {
    "path": "/_next/static/immutable/media/a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2",
    "domain": "owasp.org",
    "filename": "a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2",
    "extension": "woff2",
    "directory": "/_next/static/immutable/media/",
    "depth": 4,
    "fileType": "other",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/supporters/bios"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/media/a083361d37caf3d1-s.p.00u70rl5ce7ry.woff2"
  },
  {
    "path": "/_next/static/immutable/media/a218039a3287bcfd-s.p.17e3l4txdrufi.woff2",
    "domain": "owasp.org",
    "filename": "a218039a3287bcfd-s.p.17e3l4txdrufi.woff2",
    "extension": "woff2",
    "directory": "/_next/static/immutable/media/",
    "depth": 4,
    "fileType": "other",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/supporters/bios"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/media/a218039a3287bcfd-s.p.17e3l4txdrufi.woff2"
  },
  {
    "path": "/_next/static/immutable/media/e2334d715941921e-s.p.2g9xiodaln20i.woff2",
    "domain": "owasp.org",
    "filename": "e2334d715941921e-s.p.2g9xiodaln20i.woff2",
    "extension": "woff2",
    "directory": "/_next/static/immutable/media/",
    "depth": 4,
    "fileType": "other",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/supporters/bios"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/_next/static/immutable/media/e2334d715941921e-s.p.2g9xiodaln20i.woff2"
  },
  {
    "path": "/docs/OWASP-Foundation-Strategic-Plan.pdf",
    "domain": "owasp.org",
    "filename": "OWASP-Foundation-Strategic-Plan.pdf",
    "extension": "pdf",
    "directory": "/docs/",
    "depth": 1,
    "fileType": "document",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "url": "https://owasp.org/docs/OWASP-Foundation-Strategic-Plan.pdf"
  },
  {
    "path": "/docs/OWASP-Impact-Report-2025.pdf",
    "domain": "owasp.org",
    "filename": "OWASP-Impact-Report-2025.pdf",
    "extension": "pdf",
    "directory": "/docs/",
    "depth": 1,
    "fileType": "document",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "url": "https://owasp.org/docs/OWASP-Impact-Report-2025.pdf"
  },
  {
    "path": "/images/events/event-1.png",
    "domain": "owasp.org",
    "filename": "event-1.png",
    "extension": "png",
    "directory": "/images/events/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/images/events/event-1.png"
  },
  {
    "path": "/images/icons/book-open.svg",
    "domain": "owasp.org",
    "filename": "book-open.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/projects/owtf",
      "https://owasp.org/projects/nest",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/book-open.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/briefcase-figma.svg",
    "domain": "owasp.org",
    "filename": "briefcase-figma.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/supporters",
    "foundOnUrls": [
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309833222,
    "url": "https://owasp.org/images/icons/briefcase-figma.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/chart-projector.svg",
    "domain": "owasp.org",
    "filename": "chart-projector.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/chart-projector.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/check-shield.svg",
    "domain": "owasp.org",
    "filename": "check-shield.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/check-shield.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/check.svg",
    "domain": "owasp.org",
    "filename": "check.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/supporters",
    "foundOnUrls": [
      "https://owasp.org/supporters",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309833222,
    "url": "https://owasp.org/images/icons/check.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/code.svg",
    "domain": "owasp.org",
    "filename": "code.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/supporters",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/code.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/globe.svg",
    "domain": "owasp.org",
    "filename": "globe.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/supporters",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/globe.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/handshake.svg",
    "domain": "owasp.org",
    "filename": "handshake.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/supporters",
    "foundOnUrls": [
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309833222,
    "url": "https://owasp.org/images/icons/handshake.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/laptop.svg",
    "domain": "owasp.org",
    "filename": "laptop.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/laptop.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/lock-file.svg",
    "domain": "owasp.org",
    "filename": "lock-file.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/security",
    "foundOnUrls": [
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309833794,
    "url": "https://owasp.org/images/icons/lock-file.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/marker.svg",
    "domain": "owasp.org",
    "filename": "marker.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/icons/marker.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/megaphone-contact.svg",
    "domain": "owasp.org",
    "filename": "megaphone-contact.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/supporters",
    "foundOnUrls": [
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309833222,
    "url": "https://owasp.org/images/icons/megaphone-contact.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/megaphone.svg",
    "domain": "owasp.org",
    "filename": "megaphone.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects/owtf",
      "https://owasp.org/supporters",
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/icons/megaphone.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/pulse.svg",
    "domain": "owasp.org",
    "filename": "pulse.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/icons/pulse.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/quote.svg",
    "domain": "owasp.org",
    "filename": "quote.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/supporters",
    "foundOnUrls": [
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309833222,
    "url": "https://owasp.org/images/icons/quote.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/search.svg",
    "domain": "owasp.org",
    "filename": "search.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/icons/search.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/icons/users.svg",
    "domain": "owasp.org",
    "filename": "users.svg",
    "extension": "svg",
    "directory": "/images/icons/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/icons/users.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/logos/favicon-owasp.svg",
    "domain": "owasp.org",
    "filename": "favicon-owasp.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831571,
    "url": "https://owasp.org/images/logos/favicon-owasp.svg"
  },
  {
    "path": "/images/logos/owasp-logo-bg.svg",
    "domain": "owasp.org",
    "filename": "owasp-logo-bg.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/logos/owasp-logo-bg.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/logos/owasp-logo-footer.svg",
    "domain": "owasp.org",
    "filename": "owasp-logo-footer.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/logos/owasp-logo-footer.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/logos/owasp-logo-large-bg.svg",
    "domain": "owasp.org",
    "filename": "owasp-logo-large-bg.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about",
      "https://owasp.org/supporters"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/logos/owasp-logo-large-bg.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/logos/owasp-logo-small-white.svg",
    "domain": "owasp.org",
    "filename": "owasp-logo-small-white.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/about",
    "foundOnUrls": [
      "https://owasp.org/about"
    ],
    "firstDiscoveredAt": 1791309831917,
    "url": "https://owasp.org/images/logos/owasp-logo-small-white.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/logos/owasp-logo-small.svg",
    "domain": "owasp.org",
    "filename": "owasp-logo-small.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/logos/owasp-logo-small.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/logos/slack-logo.svg",
    "domain": "owasp.org",
    "filename": "slack-logo.svg",
    "extension": "svg",
    "directory": "/images/logos/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/logos/slack-logo.svg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/images/og/owasp-default.png",
    "domain": "owasp.org",
    "filename": "owasp-default.png",
    "extension": "png",
    "directory": "/images/og/",
    "depth": 2,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/chapters",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/auth/sign-in",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309831572,
    "url": "https://owasp.org/images/og/owasp-default.png"
  },
  {
    "path": "/media/project-media/awards/awardees/1789349829217-ylb9vbe0atk.png",
    "domain": "owasp.org",
    "filename": "1789349829217-ylb9vbe0atk.png",
    "extension": "png",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789349829217-ylb9vbe0atk.png"
  },
  {
    "path": "/media/project-media/awards/awardees/1789349910502-dycv9sfpuyi.jpeg",
    "domain": "owasp.org",
    "filename": "1789349910502-dycv9sfpuyi.jpeg",
    "extension": "jpeg",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789349910502-dycv9sfpuyi.jpeg"
  },
  {
    "path": "/media/project-media/awards/awardees/1789349954041-p6nqdn1wpmk.jpg",
    "domain": "owasp.org",
    "filename": "1789349954041-p6nqdn1wpmk.jpg",
    "extension": "jpg",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789349954041-p6nqdn1wpmk.jpg"
  },
  {
    "path": "/media/project-media/awards/awardees/1789349982427-wg58u7on8nl.jpg",
    "domain": "owasp.org",
    "filename": "1789349982427-wg58u7on8nl.jpg",
    "extension": "jpg",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789349982427-wg58u7on8nl.jpg"
  },
  {
    "path": "/media/project-media/awards/awardees/1789351913086-c80gson3znd.jpeg",
    "domain": "owasp.org",
    "filename": "1789351913086-c80gson3znd.jpeg",
    "extension": "jpeg",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789351913086-c80gson3znd.jpeg"
  },
  {
    "path": "/media/project-media/awards/awardees/1789352036695-u64cprxab6.jpg",
    "domain": "owasp.org",
    "filename": "1789352036695-u64cprxab6.jpg",
    "extension": "jpg",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789352036695-u64cprxab6.jpg"
  },
  {
    "path": "/media/project-media/awards/awardees/1789444000764-cjiqihuxdip.png",
    "domain": "owasp.org",
    "filename": "1789444000764-cjiqihuxdip.png",
    "extension": "png",
    "directory": "/media/project-media/awards/awardees/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833482,
    "url": "https://owasp.org/media/project-media/awards/awardees/1789444000764-cjiqihuxdip.png"
  },
  {
    "path": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/1790332589990-wygn15f0qr.gif",
    "domain": "owasp.org",
    "filename": "1790332589990-wygn15f0qr.gif",
    "extension": "gif",
    "directory": "/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/",
    "depth": 5,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832215,
    "url": "https://owasp.org/media/project-media/projects/57500e0b-c439-4edf-b734-33ddc38c1863/gifs/1790332589990-wygn15f0qr.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif",
    "domain": "owasp.org",
    "filename": "1789295060719-2xhrhb6y7tu.gif",
    "extension": "gif",
    "directory": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/",
    "depth": 5,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832447,
    "url": "https://owasp.org/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif",
    "domain": "owasp.org",
    "filename": "1789295113236-8c9ork6gyqw.gif",
    "extension": "gif",
    "directory": "/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/",
    "depth": 5,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832447,
    "url": "https://owasp.org/media/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1787569208583-5dtj4syrqxy.jpeg",
    "domain": "owasp.org",
    "filename": "1787569208583-5dtj4syrqxy.jpeg",
    "extension": "jpeg",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1787569208583-5dtj4syrqxy.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1787569561868-lsdojx6r48q.jpg",
    "domain": "owasp.org",
    "filename": "1787569561868-lsdojx6r48q.jpg",
    "extension": "jpg",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1787569561868-lsdojx6r48q.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1787569652238-qp0jwglgwkd.jpeg",
    "domain": "owasp.org",
    "filename": "1787569652238-qp0jwglgwkd.jpeg",
    "extension": "jpeg",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1787569652238-qp0jwglgwkd.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1787569720253-b81s3bwyjiv.jpg",
    "domain": "owasp.org",
    "filename": "1787569720253-b81s3bwyjiv.jpg",
    "extension": "jpg",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1787569720253-b81s3bwyjiv.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1787587124484-9o3xv54ruee.jpg",
    "domain": "owasp.org",
    "filename": "1787587124484-9o3xv54ruee.jpg",
    "extension": "jpg",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1787587124484-9o3xv54ruee.jpg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1787589707261-0hjnyuhyrpiq.jpeg",
    "domain": "owasp.org",
    "filename": "1787589707261-0hjnyuhyrpiq.jpeg",
    "extension": "jpeg",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1787589707261-0hjnyuhyrpiq.jpeg?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/media/project-media/staff/members/1788501586402-1mktb8ts42t.png",
    "domain": "owasp.org",
    "filename": "1788501586402-1mktb8ts42t.png",
    "extension": "png",
    "directory": "/media/project-media/staff/members/",
    "depth": 4,
    "fileType": "image",
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833844,
    "url": "https://owasp.org/media/project-media/staff/members/1788501586402-1mktb8ts42t.png?dpl=dpl_8PCWjhqzwjnN1NgoLywp2ECCT67s"
  },
  {
    "path": "/robots.txt",
    "domain": "owasp.org",
    "filename": "robots.txt",
    "extension": "txt",
    "directory": "/",
    "depth": 0,
    "fileType": "document",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309830651,
    "url": "https://owasp.org/robots.txt"
  },
  {
    "path": "/sitemap.xml",
    "domain": "owasp.org",
    "filename": "sitemap.xml",
    "extension": "xml",
    "directory": "/",
    "depth": 0,
    "fileType": "data",
    "foundOnUrl": "https://owasp.org/robots.txt",
    "foundOnUrls": [
      "https://owasp.org/robots.txt"
    ],
    "firstDiscoveredAt": 1791309830651,
    "url": "https://owasp.org/sitemap.xml"
  }
];

export const DEMO_PAGES: PageRecord[] = [
  {
    "id": "p_1_1791309831572",
    "url": "https://owasp.org/",
    "normalizedUrl": "https://owasp.org/",
    "pathname": "/",
    "depth": 0,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Foundation - The Open Source Foundation for Application Security",
    "discoveredLinksCount": 107,
    "sameDomainLinksCount": 95,
    "externalLinksCount": 12,
    "durationMs": 87,
    "timestamp": 1791309831572
  },
  {
    "id": "p_4_1791309831717",
    "url": "https://owasp.org/projects",
    "normalizedUrl": "https://owasp.org/projects",
    "pathname": "/projects",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Projects | OWASP Foundation",
    "discoveredLinksCount": 78,
    "sameDomainLinksCount": 69,
    "externalLinksCount": 9,
    "durationMs": 63,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309831717
  },
  {
    "id": "p_4_1791309831726",
    "url": "https://owasp.org/chapters",
    "normalizedUrl": "https://owasp.org/chapters",
    "pathname": "/chapters",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Local Chapters | OWASP Foundation",
    "discoveredLinksCount": 30,
    "sameDomainLinksCount": 30,
    "externalLinksCount": 0,
    "durationMs": 71,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309831726
  },
  {
    "id": "p_4_1791309831744",
    "url": "https://owasp.org/events",
    "normalizedUrl": "https://owasp.org/events",
    "pathname": "/events",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Global and Regional Events | OWASP Foundation",
    "discoveredLinksCount": 77,
    "sameDomainLinksCount": 68,
    "externalLinksCount": 9,
    "durationMs": 88,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309831744
  },
  {
    "id": "p_7_1791309831887",
    "url": "https://owasp.org/news",
    "normalizedUrl": "https://owasp.org/news",
    "pathname": "/news",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP News | OWASP Foundation",
    "discoveredLinksCount": 76,
    "sameDomainLinksCount": 67,
    "externalLinksCount": 9,
    "durationMs": 61,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309831887
  },
  {
    "id": "p_7_1791309831917",
    "url": "https://owasp.org/about",
    "normalizedUrl": "https://owasp.org/about",
    "pathname": "/about",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "About OWASP | OWASP Foundation",
    "discoveredLinksCount": 97,
    "sameDomainLinksCount": 86,
    "externalLinksCount": 11,
    "durationMs": 91,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309831917
  },
  {
    "id": "p_7_1791309831941",
    "url": "https://owasp.org/meetings",
    "normalizedUrl": "https://owasp.org/meetings",
    "pathname": "/meetings",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Chapter Meetings | OWASP Foundation",
    "discoveredLinksCount": 77,
    "sameDomainLinksCount": 68,
    "externalLinksCount": 9,
    "durationMs": 116,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309831941
  },
  {
    "id": "p_10_1791309832076",
    "url": "https://owasp.org/auth/sign-in",
    "normalizedUrl": "https://owasp.org/auth/sign-in",
    "pathname": "/auth/sign-in",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Foundation - The Open Source Foundation for Application Security",
    "discoveredLinksCount": 27,
    "sameDomainLinksCount": 27,
    "externalLinksCount": 0,
    "durationMs": 53,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832076
  },
  {
    "id": "p_10_1791309832096",
    "url": "https://owasp.org/donate",
    "normalizedUrl": "https://owasp.org/donate",
    "pathname": "/donate",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Donate | OWASP Foundation",
    "discoveredLinksCount": 76,
    "sameDomainLinksCount": 67,
    "externalLinksCount": 9,
    "durationMs": 72,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832096
  },
  {
    "id": "p_10_1791309832215",
    "url": "https://owasp.org/projects/juice-shop",
    "normalizedUrl": "https://owasp.org/projects/juice-shop",
    "pathname": "/projects/juice-shop",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Juice Shop - Insecure Web Application for Security Training | OWASP Foundation",
    "discoveredLinksCount": 92,
    "sameDomainLinksCount": 67,
    "externalLinksCount": 25,
    "durationMs": 191,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832215
  },
  {
    "id": "p_13_1791309832448",
    "url": "https://owasp.org/projects/nettacker",
    "normalizedUrl": "https://owasp.org/projects/nettacker",
    "pathname": "/projects/nettacker",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Foundation",
    "discoveredLinksCount": 99,
    "sameDomainLinksCount": 67,
    "externalLinksCount": 32,
    "durationMs": 151,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832448
  },
  {
    "id": "p_13_1791309832536",
    "url": "https://owasp.org/projects/owtf",
    "normalizedUrl": "https://owasp.org/projects/owtf",
    "pathname": "/projects/owtf",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP OWTF | OWASP Foundation",
    "discoveredLinksCount": 105,
    "sameDomainLinksCount": 77,
    "externalLinksCount": 28,
    "durationMs": 238,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832536
  },
  {
    "id": "p_13_1791309832602",
    "url": "https://owasp.org/projects/blt",
    "normalizedUrl": "https://owasp.org/projects/blt",
    "pathname": "/projects/blt",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Foundation",
    "discoveredLinksCount": 98,
    "sameDomainLinksCount": 66,
    "externalLinksCount": 32,
    "durationMs": 304,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832602
  },
  {
    "id": "p_16_1791309832858",
    "url": "https://owasp.org/projects/nest",
    "normalizedUrl": "https://owasp.org/projects/nest",
    "pathname": "/projects/nest",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Nest | OWASP Foundation",
    "discoveredLinksCount": 98,
    "sameDomainLinksCount": 75,
    "externalLinksCount": 23,
    "durationMs": 171,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832858
  },
  {
    "id": "p_16_1791309832984",
    "url": "https://owasp.org/projects/pygoat",
    "normalizedUrl": "https://owasp.org/projects/pygoat",
    "pathname": "/projects/pygoat",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Foundation",
    "discoveredLinksCount": 76,
    "sameDomainLinksCount": 65,
    "externalLinksCount": 11,
    "durationMs": 297,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309832984
  },
  {
    "id": "p_16_1791309833006",
    "url": "https://owasp.org/projects/opencre",
    "normalizedUrl": "https://owasp.org/projects/opencre",
    "pathname": "/projects/opencre",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OpenCRE | OWASP Foundation",
    "discoveredLinksCount": 81,
    "sameDomainLinksCount": 65,
    "externalLinksCount": 16,
    "durationMs": 318,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833006
  },
  {
    "id": "p_19_1791309833165",
    "url": "https://owasp.org/supporters/bios",
    "normalizedUrl": "https://owasp.org/supporters/bios",
    "pathname": "/supporters/bios",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Our Corporate Supporters | OWASP Foundation",
    "discoveredLinksCount": 77,
    "sameDomainLinksCount": 68,
    "externalLinksCount": 9,
    "durationMs": 73,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833165
  },
  {
    "id": "p_19_1791309833197",
    "url": "https://owasp.org/supporters/jobs",
    "normalizedUrl": "https://owasp.org/supporters/jobs",
    "pathname": "/supporters/jobs",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Corporate Supporter Job Postings | OWASP Foundation",
    "discoveredLinksCount": 77,
    "sameDomainLinksCount": 68,
    "externalLinksCount": 9,
    "durationMs": 105,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833197
  },
  {
    "id": "p_19_1791309833222",
    "url": "https://owasp.org/supporters",
    "normalizedUrl": "https://owasp.org/supporters",
    "pathname": "/supporters",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Corporate Supporters | OWASP Foundation",
    "discoveredLinksCount": 116,
    "sameDomainLinksCount": 107,
    "externalLinksCount": 9,
    "durationMs": 131,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833222
  },
  {
    "id": "p_22_1791309833389",
    "url": "https://owasp.org/contact",
    "normalizedUrl": "https://owasp.org/contact",
    "pathname": "/contact",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Contact Us | OWASP Foundation",
    "discoveredLinksCount": 86,
    "sameDomainLinksCount": 73,
    "externalLinksCount": 13,
    "durationMs": 81,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833389
  },
  {
    "id": "p_22_1791309833482",
    "url": "https://owasp.org/awards",
    "normalizedUrl": "https://owasp.org/awards",
    "pathname": "/awards",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "OWASP Awards | OWASP Foundation",
    "discoveredLinksCount": 87,
    "sameDomainLinksCount": 72,
    "externalLinksCount": 15,
    "durationMs": 175,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833482
  },
  {
    "id": "p_22_1791309833605",
    "url": "https://owasp.org/community",
    "normalizedUrl": "https://owasp.org/community",
    "pathname": "/community",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Community | OWASP Foundation",
    "discoveredLinksCount": 72,
    "sameDomainLinksCount": 63,
    "externalLinksCount": 9,
    "durationMs": 298,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833605
  },
  {
    "id": "p_25_1791309833794",
    "url": "https://owasp.org/security",
    "normalizedUrl": "https://owasp.org/security",
    "pathname": "/security",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Report a Security Issue | OWASP Foundation",
    "discoveredLinksCount": 98,
    "sameDomainLinksCount": 85,
    "externalLinksCount": 13,
    "durationMs": 103,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833794
  },
  {
    "id": "p_25_1791309833821",
    "url": "https://owasp.org/board",
    "normalizedUrl": "https://owasp.org/board",
    "pathname": "/board",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "About the OWASP Board | OWASP Foundation",
    "discoveredLinksCount": 90,
    "sameDomainLinksCount": 81,
    "externalLinksCount": 9,
    "durationMs": 130,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833821
  },
  {
    "id": "p_25_1791309833844",
    "url": "https://owasp.org/staff",
    "normalizedUrl": "https://owasp.org/staff",
    "pathname": "/staff",
    "depth": 1,
    "statusCode": 200,
    "statusText": "OK",
    "contentType": "text/html; charset=utf-8",
    "title": "Staff | OWASP Foundation",
    "discoveredLinksCount": 87,
    "sameDomainLinksCount": 71,
    "externalLinksCount": 16,
    "durationMs": 153,
    "parentUrl": "https://owasp.org/",
    "timestamp": 1791309833844
  }
];

export const DEMO_EXTERNAL_LINKS: ExternalLinkRecord[] = [
  {
    "url": "http://blog.7-a.org/2014/09/owtf-10-lionheart-to-be-presented-brucon.html",
    "domain": "blog.7-a.org",
    "rootDomain": "7-a.org",
    "pathname": "/2014/09/owtf-10-lionheart-to-be-presented-brucon.html",
    "isAssetOrFile": true,
    "fileType": "code",
    "extension": "html",
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF 1.0 “Lionheart” presented at Brucon!",
    "htmlContext": "<a href=\"http://blog.7-a.org/2014/09/owtf-10-lionheart-to-be-presented-brucon.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF 1.0 “Lionheart” presented at Brucon!</a>"
  },
  {
    "url": "http://blog.7-a.org/2014/10/owtf-10-lionheart-released.html",
    "domain": "blog.7-a.org",
    "rootDomain": "7-a.org",
    "pathname": "/2014/10/owtf-10-lionheart-released.html",
    "isAssetOrFile": true,
    "fileType": "code",
    "extension": "html",
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF 1.0 “Lionheart” released!",
    "htmlContext": "<a href=\"http://blog.7-a.org/2014/10/owtf-10-lionheart-released.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF 1.0 “Lionheart” released!</a>"
  },
  {
    "url": "http://blog.7-a.org/2016/05/owtf-20a-tikka-masala-released-plz-rt.html",
    "domain": "blog.7-a.org",
    "rootDomain": "7-a.org",
    "pathname": "/2016/05/owtf-20a-tikka-masala-released-plz-rt.html",
    "isAssetOrFile": true,
    "fileType": "code",
    "extension": "html",
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF 2.0a “Tikka Masala” is here!",
    "htmlContext": "<a href=\"http://blog.7-a.org/2016/05/owtf-20a-tikka-masala-released-plz-rt.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF 2.0a “Tikka Masala” is here!</a>"
  },
  {
    "url": "http://blog.7-a.org/search?updated-max=2014-10-10T11:30:00%2B01:00&max-results=8",
    "domain": "blog.7-a.org",
    "rootDomain": "7-a.org",
    "pathname": "/search",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF is taking part in the OWASP Winter Code Sprint!",
    "htmlContext": "<a href=\"http://blog.7-a.org/search?updated-max=2014-10-10T11:30:00%2B01:00&max-results=8\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF is taking part in the OWASP Winter Code Sprint!</a>"
  },
  {
    "url": "https://blt.owasp.org/contribute/",
    "domain": "blt.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/contribute/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "https://blt.owasp.org/contribute/",
    "htmlContext": "<a href=\"https://blt.owasp.org/contribute/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] hover:text-[#0056b3] underline font-medium break-all\">https://blt.owasp.org/contribute/</a>"
  },
  {
    "url": "https://bsky.app/profile/bkimminich.bsky.social",
    "domain": "bsky.app",
    "rootDomain": "bsky.app",
    "pathname": "/profile/bkimminich.bsky.social",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "social",
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Bluesky",
    "htmlContext": "<a href=\"https://bsky.app/profile/bkimminich.bsky.social\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1 text-[#003594] hover:text-[#0056b3] underline\">Bluesky</a>"
  },
  {
    "url": "https://bsky.app/profile/jannik-hollenbach.bsky.social",
    "domain": "bsky.app",
    "rootDomain": "bsky.app",
    "pathname": "/profile/jannik-hollenbach.bsky.social",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "social",
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Bluesky",
    "htmlContext": "<a href=\"https://bsky.app/profile/jannik-hollenbach.bsky.social\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1 text-[#003594] hover:text-[#0056b3] underline\">Bluesky</a>"
  },
  {
    "url": "https://bsky.app/profile/nest.owasp.org",
    "domain": "bsky.app",
    "rootDomain": "bsky.app",
    "pathname": "/profile/nest.owasp.org",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "org",
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "OWASP Nest on BlueSky",
    "htmlContext": "<a href=\"https://bsky.app/profile/nest.owasp.org\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWASP Nest on BlueSky</a>"
  },
  {
    "url": "https://bsky.app/profile/owasp-juice.shop",
    "domain": "bsky.app",
    "rootDomain": "bsky.app",
    "pathname": "/profile/owasp-juice.shop",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "shop",
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Bluesky",
    "htmlContext": "<a href=\"https://bsky.app/profile/owasp-juice.shop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Bluesky</a>"
  },
  {
    "url": "https://bsky.app/profile/owasp.org",
    "domain": "bsky.app",
    "rootDomain": "bsky.app",
    "pathname": "/profile/owasp.org",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "org",
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "Bluesky",
    "htmlContext": "<a href=\"https://bsky.app/profile/owasp.org\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">Bluesky</a>"
  },
  {
    "url": "https://bugcrowd.com/engagements/owasp-vdp-pro",
    "domain": "bugcrowd.com",
    "rootDomain": "bugcrowd.com",
    "pathname": "/engagements/owasp-vdp-pro",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/security",
    "foundOnUrls": [
      "https://owasp.org/security"
    ],
    "firstDiscoveredAt": 1791309833793,
    "tagType": "a",
    "linkText": "Open the VDP on Bugcrowd",
    "htmlContext": "<a href=\"https://bugcrowd.com/engagements/owasp-vdp-pro\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#00A7E1] px-5 py-3 font-semibold text-white transition hover:bg-[#0096d1]\">Open the VDP on Bugcrowd</a>"
  },
  {
    "url": "https://community.owasp.org/",
    "domain": "community.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "OWASP Community",
    "htmlContext": "<a href=\"https://community.owasp.org\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">OWASP Community</a>"
  },
  {
    "url": "https://contact.owasp.org/",
    "domain": "contact.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/contact",
    "foundOnUrls": [
      "https://owasp.org/contact"
    ],
    "firstDiscoveredAt": 1791309833388,
    "tagType": "a",
    "linkText": "Support portalOpen a ticket in our Jira service desk so the right team can follo",
    "htmlContext": "<a href=\"https://contact.owasp.org\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"group flex h-full flex-col rounded-xl border border-gray-200 bg-[#F1F6FE] p-6 transition-colors hover:border-[#003594]\">Support portalOpen a ticket in our Jira service desk so the right team can follo...</a>"
  },
  {
    "url": "https://cybersecgames.com/pages/owasp-merchandise",
    "domain": "cybersecgames.com",
    "rootDomain": "cybersecgames.com",
    "pathname": "/pages/owasp-merchandise",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "OWASP Merch",
    "htmlContext": "<a href=\"https://cybersecgames.com/pages/owasp-merchandise\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">OWASP Merch</a>"
  },
  {
    "url": "http://docs.owtf.org/",
    "domain": "docs.owtf.org",
    "rootDomain": "owtf.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832534,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a href=\"http://docs.owtf.org\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm\">Documentation</a>"
  },
  {
    "url": "https://fosstodon.org/@owasp_juiceshop",
    "domain": "fosstodon.org",
    "rootDomain": "fosstodon.org",
    "pathname": "/@owasp_juiceshop",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Mastodon",
    "htmlContext": "<a href=\"https://fosstodon.org/@owasp_juiceshop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Mastodon</a>"
  },
  {
    "url": "https://github.com/adeyosemanputra/pygoat",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/adeyosemanputra/pygoat",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/pygoat",
    "foundOnUrls": [
      "https://owasp.org/projects/pygoat"
    ],
    "firstDiscoveredAt": 1791309832981,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://github.com/adeyosemanputra/pygoat\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://github.com/juice-shop/juice-shop",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/juice-shop/juice-shop",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://github.com/juice-shop/juice-shop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://github.com/orgs/OWASP-BLT/projects/2/views/5",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/orgs/OWASP-BLT/projects/2/views/5",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "https://github.com/orgs/OWASP-BLT/projects/2/views/5",
    "htmlContext": "<a href=\"https://github.com/orgs/OWASP-BLT/projects/2/views/5\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] hover:text-[#0056b3] underline font-medium break-all\">https://github.com/orgs/OWASP-BLT/projects/2/views/5</a>"
  },
  {
    "url": "https://github.com/OWASP",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "GitHub",
    "htmlContext": "<a href=\"https://github.com/OWASP\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">GitHub</a>"
  },
  {
    "url": "https://github.com/OWASP-BLT/BLT/graphs/contributors",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP-BLT/BLT/graphs/contributors",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "https://github.com/OWASP-BLT/BLT/graphs/contributors",
    "htmlContext": "<a href=\"https://github.com/OWASP-BLT/BLT/graphs/contributors\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] hover:text-[#0056b3] underline font-medium break-all\">https://github.com/OWASP-BLT/BLT/graphs/contributors</a>"
  },
  {
    "url": "https://github.com/OWASP-BLT/BLT/releases",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP-BLT/BLT/releases",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "• GitHub Releases",
    "htmlContext": "<a href=\"https://github.com/OWASP-BLT/BLT/releases\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] hover:text-[#0056b3] underline font-medium text-sm\">• GitHub Releases</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BLT-Core",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BLT-Core</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Action",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Action",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BLT-Action",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Action\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BLT-Action</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Action/blob/master/LICENSE",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Action/blob/master/LICENSE",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BSD 3",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Action/blob/master/LICENSE\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BSD 3</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Bacon",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Bacon",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BLT-Bacon",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Bacon\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BLT-Bacon</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Bacon/blob/master/LICENSE",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Bacon/blob/master/LICENSE",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "LGPL",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Bacon/blob/master/LICENSE\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">LGPL</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Extension",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Extension",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BLT-Extension",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Extension\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BLT-Extension</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Extension/blob/master/LICENSE",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Extension/blob/master/LICENSE",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BSD 3",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Extension/blob/master/LICENSE\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BSD 3</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Flutter",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Flutter",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BLT-Flutter",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Flutter\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BLT-Flutter</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT-Flutter/blob/master/LICENSE",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT-Flutter/blob/master/LICENSE",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "BSD 3",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT-Flutter/blob/master/LICENSE\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">BSD 3</a>"
  },
  {
    "url": "https://github.com/OWASP/BLT/blob/master/LICENSE.md",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/BLT/blob/master/LICENSE.md",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "md",
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "APGL - 3.0",
    "htmlContext": "<a href=\"https://github.com/OWASP/BLT/blob/master/LICENSE.md\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">APGL - 3.0</a>"
  },
  {
    "url": "https://github.com/OWASP/Nest",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nest",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832854,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nest\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://github.com/OWASP/Nest/blob/main/CODE_OF_CONDUCT.md",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nest/blob/main/CODE_OF_CONDUCT.md",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "md",
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "Code of Conduct",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nest/blob/main/CODE_OF_CONDUCT.md\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Code of Conduct</a>"
  },
  {
    "url": "https://github.com/OWASP/Nest/blob/main/CONTRIBUTING.md",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nest/blob/main/CONTRIBUTING.md",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "md",
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "Contributing Guidelines",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nest/blob/main/CONTRIBUTING.md\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Contributing Guidelines</a>"
  },
  {
    "url": "https://github.com/OWASP/Nest/graphs/contributors",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nest/graphs/contributors",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "community contributions",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nest/graphs/contributors\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">community contributions</a>"
  },
  {
    "url": "https://github.com/OWASP/Nettacker",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nettacker",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nettacker\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://github.com/OWASP/Nettacker/releases/tag/0.3.2",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nettacker/releases/tag/0.3.2",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "2",
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "v0.3.3",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nettacker/releases/tag/0.3.2\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">v0.3.3</a>"
  },
  {
    "url": "https://github.com/OWASP/Nettacker/releases/tag/0.4.1",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nettacker/releases/tag/0.4.1",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "1",
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "v0.4.1",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nettacker/releases/tag/0.4.1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">v0.4.1</a>"
  },
  {
    "url": "https://github.com/OWASP/Nettacker/releases/tag/0.40",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nettacker/releases/tag/0.40",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "40",
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "v0.4.0",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nettacker/releases/tag/0.40\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">v0.4.0</a>"
  },
  {
    "url": "https://github.com/OWASP/Nettacker/tarball/master",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nettacker/tarball/master",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": ".tgz file",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nettacker/tarball/master\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">.tgz file</a>"
  },
  {
    "url": "https://github.com/OWASP/Nettacker/zipball/master",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/Nettacker/zipball/master",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": ".ZIP file",
    "htmlContext": "<a href=\"https://github.com/OWASP/Nettacker/zipball/master\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">.ZIP file</a>"
  },
  {
    "url": "https://github.com/OWASP/OpenCRE/",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/OWASP/OpenCRE/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/opencre",
    "foundOnUrls": [
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309833004,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://github.com/OWASP/OpenCRE/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://github.com/owtf/owtf",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/owtf/owtf",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "https://github.com/owtf/owtf",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://github.com/owtf/owtf\">https://github.com/owtf/owtf</a>"
  },
  {
    "url": "https://github.com/owtf/owtf/",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/owtf/owtf/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832534,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://github.com/owtf/owtf/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://github.com/owtf/owtf/issues",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/owtf/owtf/issues",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "Give us feedback / suggestions / report bugs",
    "htmlContext": "<a href=\"https://github.com/owtf/owtf/issues\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Give us feedback / suggestions / report bugs</a>"
  },
  {
    "url": "https://github.com/owtf/owtf/pulls",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/owtf/owtf/pulls",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "Send us a pull request",
    "htmlContext": "<a href=\"https://github.com/owtf/owtf/pulls\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Send us a pull request</a>"
  },
  {
    "url": "https://github.com/owtf/owtf/releases/tag/v2.1a",
    "domain": "github.com",
    "rootDomain": "github.com",
    "pathname": "/owtf/owtf/releases/tag/v2.1a",
    "isAssetOrFile": true,
    "fileType": "other",
    "extension": "1a",
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF 2.1a “Chicken Korma”",
    "htmlContext": "<a href=\"https://github.com/owtf/owtf/releases/tag/v2.1a\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF 2.1a “Chicken Korma”</a>"
  },
  {
    "url": "https://gitlab.com/owasp-blt",
    "domain": "gitlab.com",
    "rootDomain": "gitlab.com",
    "pathname": "/owasp-blt",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "View on GitHub",
    "htmlContext": "<a href=\"https://gitlab.com/owasp-blt\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white border-white text-[#003594] hover:bg-gray-100\">View on GitHub</a>"
  },
  {
    "url": "https://hub.docker.com/r/owasp/nettacker",
    "domain": "hub.docker.com",
    "rootDomain": "docker.com",
    "pathname": "/r/owasp/nettacker",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "Docker Images on DockerHub",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://hub.docker.com/r/owasp/nettacker\">Docker Images on DockerHub</a>"
  },
  {
    "url": "https://hub.docker.com/r/owasp/nettacker/tags",
    "domain": "hub.docker.com",
    "rootDomain": "docker.com",
    "pathname": "/r/owasp/nettacker/tags",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "OWASP Nettacker Docker Images on DockerHub",
    "htmlContext": "<a href=\"https://hub.docker.com/r/owasp/nettacker/tags\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWASP Nettacker Docker Images on DockerHub</a>"
  },
  {
    "url": "https://infosec.exchange/@owasp",
    "domain": "infosec.exchange",
    "rootDomain": "infosec.exchange",
    "pathname": "/@owasp",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "Mastodon",
    "htmlContext": "<a href=\"https://infosec.exchange/@owasp\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">Mastodon</a>"
  },
  {
    "url": "https://linkedin.com/in/samstepanyan",
    "domain": "linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/samstepanyan",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://linkedin.com/in/samstepanyan\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1 text-[#003594] hover:text-[#0056b3] underline\">LinkedIn</a>"
  },
  {
    "url": "https://lists.owasp.org/mailman/listinfo/owasp_owtf",
    "domain": "lists.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/mailman/listinfo/owasp_owtf",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "Join the general OWTF mailing list",
    "htmlContext": "<a href=\"https://lists.owasp.org/mailman/listinfo/owasp_owtf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Join the general OWTF mailing list</a>"
  },
  {
    "url": "https://lists.owasp.org/mailman/listinfo/owasp_owtf_developers",
    "domain": "lists.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/mailman/listinfo/owasp_owtf_developers",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "Join our OWTF developers mailing list",
    "htmlContext": "<a href=\"https://lists.owasp.org/mailman/listinfo/owasp_owtf_developers\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Join our OWTF developers mailing list</a>"
  },
  {
    "url": "http://nest.owasp.org/",
    "domain": "nest.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "nest.owasp.org",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"http://nest.owasp.org\">nest.owasp.org</a>"
  },
  {
    "url": "https://nest.owasp.org/",
    "domain": "nest.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "nest.owasp.org",
    "htmlContext": "<a href=\"https://nest.owasp.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">nest.owasp.org</a>"
  },
  {
    "url": "https://nest.owasp.org/community/users",
    "domain": "nest.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/community/users",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "Community Contributors",
    "htmlContext": "<a href=\"https://nest.owasp.org/community/users\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Community Contributors</a>"
  },
  {
    "url": "https://nettacker.readthedocs.io/en/latest/Developers/",
    "domain": "nettacker.readthedocs.io",
    "rootDomain": "readthedocs.io",
    "pathname": "/en/latest/Developers/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "Developers Guide",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://nettacker.readthedocs.io/en/latest/Developers/\">Developers Guide</a>"
  },
  {
    "url": "https://nettacker.readthedocs.io/en/latest/Home/",
    "domain": "nettacker.readthedocs.io",
    "rootDomain": "readthedocs.io",
    "pathname": "/en/latest/Home/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://nettacker.readthedocs.io/en/latest/Home/\">Documentation</a>"
  },
  {
    "url": "https://nettacker.readthedocs.io/en/latest/Installation/",
    "domain": "nettacker.readthedocs.io",
    "rootDomain": "readthedocs.io",
    "pathname": "/en/latest/Installation/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a href=\"https://nettacker.readthedocs.io/en/latest/Installation/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm\">Documentation</a>"
  },
  {
    "url": "https://nettacker.readthedocs.io/en/latest/Usage/",
    "domain": "nettacker.readthedocs.io",
    "rootDomain": "readthedocs.io",
    "pathname": "/en/latest/Usage/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "Usage",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://nettacker.readthedocs.io/en/latest/Usage/\">Usage</a>"
  },
  {
    "url": "http://opencre.org/",
    "domain": "opencre.org",
    "rootDomain": "opencre.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/opencre",
    "foundOnUrls": [
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309833004,
    "tagType": "a",
    "linkText": "opencre.org",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"http://opencre.org\">opencre.org</a>"
  },
  {
    "url": "https://opencre.org/",
    "domain": "opencre.org",
    "rootDomain": "opencre.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/opencre",
    "foundOnUrls": [
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309833004,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a href=\"https://opencre.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm\">Documentation</a>"
  },
  {
    "url": "https://owasp-juice.shop/",
    "domain": "owasp-juice.shop",
    "rootDomain": "owasp-juice.shop",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Visit official Website",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Poppins'] font-semibold text-center transition-all duration-300 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden group min-h-14 px-6 sm:px-8 py-3 text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] bg-[#003594] text-[#ffffff] shadow-sm hover:shadow-md  h-14 w-full \" href=\"https://owasp-juice.shop\">Visit official Website</a>"
  },
  {
    "url": "https://owasp-nest.readthedocs.io/",
    "domain": "owasp-nest.readthedocs.io",
    "rootDomain": "readthedocs.io",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832854,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a href=\"https://owasp-nest.readthedocs.io/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm\">Documentation</a>"
  },
  {
    "url": "https://owasp.glueup.com/",
    "domain": "owasp.glueup.com",
    "rootDomain": "glueup.com",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/contact",
    "foundOnUrls": [
      "https://owasp.org/contact"
    ],
    "firstDiscoveredAt": 1791309833388,
    "tagType": "a",
    "linkText": "owasp.glueup.com",
    "htmlContext": "<a href=\"https://owasp.glueup.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] font-semibold hover:underline\">owasp.glueup.com</a>"
  },
  {
    "url": "https://owasp.glueup.com/event/176564/register/",
    "domain": "owasp.glueup.com",
    "rootDomain": "glueup.com",
    "pathname": "/event/176564/register/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "Register Now",
    "htmlContext": "<a class=\"font-['Poppins'] font-semibold text-center transition-all duration-300 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden group min-h-14 px-6 sm:px-8 py-3 text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] bg-[#003594] text-[#ffffff] shadow-sm hover:shadow-md  w-full sm:w-auto min-w-[160px] lg:min-w-[180px] shadow-lg \" href=\"https://owasp.glueup.com/event/176564/register/\">Register Now</a>"
  },
  {
    "url": "https://owasp.glueup.com/event/owasp-25th-anniversary-virtual-conference-176564/",
    "domain": "owasp.glueup.com",
    "rootDomain": "glueup.com",
    "pathname": "/event/owasp-25th-anniversary-virtual-conference-176564/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "More Info",
    "htmlContext": "<a class=\"font-['Poppins'] font-semibold text-center transition-all duration-300 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden group min-h-14 px-6 sm:px-8 py-3 text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] border-2 border-[#757575] text-[#ffffff] hover:border-white/60  w-full sm:w-auto min-w-[160px] lg:min-w-[180px] \" href=\"https://owasp.glueup.com/event/owasp-25th-anniversary-virtual-conference-176564/\">More Info</a>"
  },
  {
    "url": "https://owasp.glueup.com/organization/6727/memberships",
    "domain": "owasp.glueup.com",
    "rootDomain": "glueup.com",
    "pathname": "/organization/6727/memberships",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "Become a Member",
    "htmlContext": "<a class=\"font-['Poppins'] font-semibold text-center transition-all duration-300 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden group min-h-14 px-6 sm:px-8 py-3 text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] bg-[#003594] text-[#ffffff] shadow-sm hover:shadow-md  z-10 \" href=\"https://owasp.glueup.com/organization/6727/memberships\">Become a Member</a>"
  },
  {
    "url": "https://owasp.slack.com/",
    "domain": "owasp.slack.com",
    "rootDomain": "slack.com",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "Slack",
    "htmlContext": "<a href=\"https://owasp.slack.com/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Slack</a>"
  },
  {
    "url": "https://owasp.slack.com/archives/D07MJFC2HM2",
    "domain": "owasp.slack.com",
    "rootDomain": "slack.com",
    "pathname": "/archives/D07MJFC2HM2",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "Slack NestBot",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://owasp.slack.com/archives/D07MJFC2HM2\">Slack NestBot</a>"
  },
  {
    "url": "https://owasp.slack.com/messages/project-blt",
    "domain": "owasp.slack.com",
    "rootDomain": "slack.com",
    "pathname": "/messages/project-blt",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "Slack Channel",
    "htmlContext": "<a href=\"https://owasp.slack.com/messages/project-blt\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Slack Channel</a>"
  },
  {
    "url": "https://owasp.slack.com/messages/project-nest",
    "domain": "owasp.slack.com",
    "rootDomain": "slack.com",
    "pathname": "/messages/project-nest",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nest",
    "foundOnUrls": [
      "https://owasp.org/projects/nest"
    ],
    "firstDiscoveredAt": 1791309832855,
    "tagType": "a",
    "linkText": "#project-nest",
    "htmlContext": "<a href=\"https://owasp.slack.com/messages/project-nest\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">#project-nest</a>"
  },
  {
    "url": "https://owaspblt.org/",
    "domain": "owaspblt.org",
    "rootDomain": "owaspblt.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a href=\"https://owaspblt.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm\">Documentation</a>"
  },
  {
    "url": "https://owasporg.atlassian.net/servicedesk/customer/portal/7/group/19/create/83",
    "domain": "owasporg.atlassian.net",
    "rootDomain": "atlassian.net",
    "pathname": "/servicedesk/customer/portal/7/group/19/create/83",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/contact",
    "foundOnUrls": [
      "https://owasp.org/contact"
    ],
    "firstDiscoveredAt": 1791309833388,
    "tagType": "a",
    "linkText": "partnership request",
    "htmlContext": "<a href=\"https://owasporg.atlassian.net/servicedesk/customer/portal/7/group/19/create/83\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] font-semibold hover:underline\">partnership request</a>"
  },
  {
    "url": "https://pwning.owasp-juice.shop/",
    "domain": "pwning.owasp-juice.shop",
    "rootDomain": "owasp-juice.shop",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Documentation",
    "htmlContext": "<a href=\"https://pwning.owasp-juice.shop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex w-full items-center justify-center gap-2 h-14 px-6 sm:px-8 box-border border-2 rounded-lg font-['Poppins'] font-semibold text-[15px] sm:text-[16px] leading-snug tracking-[-0.32px] transition-colors bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm\">Documentation</a>"
  },
  {
    "url": "http://pymbook.readthedocs.io/en/latest/pep8.html",
    "domain": "pymbook.readthedocs.io",
    "rootDomain": "readthedocs.io",
    "pathname": "/en/latest/pep8.html",
    "isAssetOrFile": true,
    "fileType": "code",
    "extension": "html",
    "foundOnUrl": "https://owasp.org/projects/blt",
    "foundOnUrls": [
      "https://owasp.org/projects/blt"
    ],
    "firstDiscoveredAt": 1791309832601,
    "tagType": "a",
    "linkText": "Code Style Guide",
    "htmlContext": "<a href=\"http://pymbook.readthedocs.io/en/latest/pep8.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Code Style Guide</a>"
  },
  {
    "url": "https://summerofcode.withgoogle.com/organizations/",
    "domain": "summerofcode.withgoogle.com",
    "rootDomain": "withgoogle.com",
    "pathname": "/organizations/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWASP is selected for GSoC 2016 - OWTF is participating!",
    "htmlContext": "<a href=\"https://summerofcode.withgoogle.com/organizations/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWASP is selected for GSoC 2016 - OWTF is participating!</a>"
  },
  {
    "url": "https://twitter.com/owasp",
    "domain": "twitter.com",
    "rootDomain": "twitter.com",
    "pathname": "/owasp",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831571,
    "tagType": "a",
    "linkText": "X",
    "htmlContext": "<a href=\"https://twitter.com/owasp\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">X</a>"
  },
  {
    "url": "https://vwad.owasp.org/",
    "domain": "vwad.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "OWASP VWA Directory",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://vwad.owasp.org/\">OWASP VWA Directory</a>"
  },
  {
    "url": "https://www.blackhat.com/us-18/arsenal.html#owasp-offensive-web-testing-framework",
    "domain": "www.blackhat.com",
    "rootDomain": "blackhat.com",
    "pathname": "/us-18/arsenal.html",
    "isAssetOrFile": true,
    "fileType": "code",
    "extension": "html",
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "Blackhat Arsenal",
    "htmlContext": "<a href=\"https://www.blackhat.com/us-18/arsenal.html#owasp-offensive-web-testing-framework\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Blackhat Arsenal</a>"
  },
  {
    "url": "https://www.facebook.com/owasp.juiceshop",
    "domain": "www.facebook.com",
    "rootDomain": "facebook.com",
    "pathname": "/owasp.juiceshop",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Facebook",
    "htmlContext": "<a href=\"https://www.facebook.com/owasp.juiceshop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Facebook</a>"
  },
  {
    "url": "https://www.linkedin.com/company/opencre/posts/?feedView=all",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/company/opencre/posts/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/opencre",
    "foundOnUrls": [
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309833004,
    "tagType": "a",
    "linkText": "Linked In",
    "htmlContext": "<a href=\"https://www.linkedin.com/company/opencre/posts/?feedView=all\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Linked In</a>"
  },
  {
    "url": "https://www.linkedin.com/company/owasp/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/company/owasp/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831570,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/company/owasp/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/arkid15r/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/arkid15r/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/arkid15r/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1 text-[#003594] hover:text-[#0056b3] underline\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/christian-folini-588ba278/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/christian-folini-588ba278/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833481,
    "tagType": "a",
    "linkText": "linkedin.com",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/christian-folini-588ba278/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm text-[#003594] underline mt-auto pt-4\">linkedin.com</a>"
  },
  {
    "url": "https://www.linkedin.com/in/heather-kennedy-9a071552/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/heather-kennedy-9a071552/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833842,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/heather-kennedy-9a071552/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline text-sm\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/jmanico/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/jmanico/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833481,
    "tagType": "a",
    "linkText": "linkedin.com",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/jmanico/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm text-[#003594] underline mt-auto pt-4\">linkedin.com</a>"
  },
  {
    "url": "https://www.linkedin.com/in/john-dileo/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/john-dileo/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833481,
    "tagType": "a",
    "linkText": "linkedin.com",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/john-dileo/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm text-[#003594] underline mt-auto pt-4\">linkedin.com</a>"
  },
  {
    "url": "https://www.linkedin.com/in/joshcgrossman/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/joshcgrossman/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833481,
    "tagType": "a",
    "linkText": "linkedin.com",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/joshcgrossman/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm text-[#003594] underline mt-auto pt-4\">linkedin.com</a>"
  },
  {
    "url": "https://www.linkedin.com/in/lauren-thomas-5a36a3304/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/lauren-thomas-5a36a3304/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833842,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/lauren-thomas-5a36a3304/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline text-sm\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/lmeagher/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/lmeagher/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833842,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/lmeagher/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline text-sm\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/missie-lindsey-42224320/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/missie-lindsey-42224320/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833842,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/missie-lindsey-42224320/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline text-sm\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/razmjoo/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/razmjoo/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/nettacker",
    "foundOnUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "firstDiscoveredAt": 1791309832446,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/razmjoo/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1 text-[#003594] hover:text-[#0056b3] underline\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/sebadele/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/sebadele/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards"
    ],
    "firstDiscoveredAt": 1791309833481,
    "tagType": "a",
    "linkText": "linkedin.com",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/sebadele/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm text-[#003594] underline mt-auto pt-4\">linkedin.com</a>"
  },
  {
    "url": "https://www.linkedin.com/in/staceyebbs/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/staceyebbs/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833842,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/staceyebbs/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline text-sm\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/starr-brown-8837547/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/starr-brown-8837547/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/staff",
    "foundOnUrls": [
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833842,
    "tagType": "a",
    "linkText": "LinkedIn",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/starr-brown-8837547/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline text-sm\">LinkedIn</a>"
  },
  {
    "url": "https://www.linkedin.com/in/vanderaj/",
    "domain": "www.linkedin.com",
    "rootDomain": "linkedin.com",
    "pathname": "/in/vanderaj/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/awards",
    "foundOnUrls": [
      "https://owasp.org/awards",
      "https://owasp.org/staff"
    ],
    "firstDiscoveredAt": 1791309833481,
    "tagType": "a",
    "linkText": "linkedin.com",
    "htmlContext": "<a href=\"https://www.linkedin.com/in/vanderaj/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm text-[#003594] underline mt-auto pt-4\">linkedin.com</a>"
  },
  {
    "url": "https://www.opencre.org/",
    "domain": "www.opencre.org",
    "rootDomain": "opencre.org",
    "pathname": "/",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/opencre",
    "foundOnUrls": [
      "https://owasp.org/projects/opencre"
    ],
    "firstDiscoveredAt": 1791309833004,
    "tagType": "a",
    "linkText": "https://www.opencre.org",
    "htmlContext": "<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#003594] underline\" href=\"https://www.opencre.org\">https://www.opencre.org</a>"
  },
  {
    "url": "https://www.owasp.org/index.php/Summer_Code_Sprint2015",
    "domain": "www.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/index.php/Summer_Code_Sprint2015",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF is taking part in the OWASP Summer Code Sprint 2015",
    "htmlContext": "<a href=\"https://www.owasp.org/index.php/Summer_Code_Sprint2015\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF is taking part in the OWASP Summer Code Sprint 2015</a>"
  },
  {
    "url": "https://www.owasp.org/index.php/Summer_Code_Sprint2015_Progress_Reports#tab=Main",
    "domain": "www.owasp.org",
    "rootDomain": "owasp.org",
    "pathname": "/index.php/Summer_Code_Sprint2015_Progress_Reports",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/owtf",
    "foundOnUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309832535,
    "tagType": "a",
    "linkText": "OWTF got 3 slots in the OWASP Summer Code Sprint 2015!",
    "htmlContext": "<a href=\"https://www.owasp.org/index.php/Summer_Code_Sprint2015_Progress_Reports#tab=Main\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">OWTF got 3 slots in the OWASP Summer Code Sprint 2015!</a>"
  },
  {
    "url": "https://www.reddit.com/r/owasp_juiceshop",
    "domain": "www.reddit.com",
    "rootDomain": "reddit.com",
    "pathname": "/r/owasp_juiceshop",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "Reddit",
    "htmlContext": "<a href=\"https://www.reddit.com/r/owasp_juiceshop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">Reddit</a>"
  },
  {
    "url": "https://www.youtube.com/@OWASPGlobal",
    "domain": "www.youtube.com",
    "rootDomain": "youtube.com",
    "pathname": "/@OWASPGlobal",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/",
    "foundOnUrls": [
      "https://owasp.org/",
      "https://owasp.org/projects",
      "https://owasp.org/events",
      "https://owasp.org/news",
      "https://owasp.org/about",
      "https://owasp.org/meetings",
      "https://owasp.org/donate",
      "https://owasp.org/projects/juice-shop",
      "https://owasp.org/projects/nettacker",
      "https://owasp.org/projects/owtf"
    ],
    "firstDiscoveredAt": 1791309831571,
    "tagType": "a",
    "linkText": "YouTube",
    "htmlContext": "<a href=\"https://www.youtube.com/@OWASPGlobal\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors\">YouTube</a>"
  },
  {
    "url": "https://www.youtube.com/channel/UCjkQ1Y-bxYAqwwD1SyQpBvw/playlists",
    "domain": "www.youtube.com",
    "rootDomain": "youtube.com",
    "pathname": "/channel/UCjkQ1Y-bxYAqwwD1SyQpBvw/playlists",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "YouTube",
    "htmlContext": "<a href=\"https://www.youtube.com/channel/UCjkQ1Y-bxYAqwwD1SyQpBvw/playlists\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">YouTube</a>"
  },
  {
    "url": "https://x.com/owasp_juiceshop",
    "domain": "x.com",
    "rootDomain": "x.com",
    "pathname": "/owasp_juiceshop",
    "isAssetOrFile": false,
    "foundOnUrl": "https://owasp.org/projects/juice-shop",
    "foundOnUrls": [
      "https://owasp.org/projects/juice-shop"
    ],
    "firstDiscoveredAt": 1791309832214,
    "tagType": "a",
    "linkText": "X",
    "htmlContext": "<a href=\"https://x.com/owasp_juiceshop\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-2 text-[#003594] hover:text-[#0056b3] font-medium text-sm\">X</a>"
  }
];

export const DEMO_API_ENDPOINTS: ApiEndpointRecord[] = [
  {
    "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\",
    "pathname": "/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png",
    "domain": "remssssfmrgmyzqnpeas.supabase.co",
    "isSameDomain": false,
    "method": "GET",
    "category": "rest",
    "detectedIn": "script-inline",
    "sourceUrl": "https://owasp.org/projects/opencre",
    "queryParams": [
      "token"
    ],
    "possibleParameters": [
      {
        "name": "token",
        "in": "query",
        "type": "string",
        "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\",
        "description": "Known query parameter observed in URL",
        "required": false,
        "source": "observed"
      }
    ],
    "firstDiscoveredAt": 1791309833002,
    "possibleQueries": [
      {
        "title": "Standard Fetch Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\",
        "description": "Query using 1 known parameter from page source",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\\" -H \"Accept: application/json\""
      },
      {
        "title": "Parameterized Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE%5C",
        "description": "Executes query using known parameters: token",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE%5C\" -H \"Accept: application/json\""
      },
      {
        "title": "OPTIONS Capability Query",
        "method": "OPTIONS",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png",
        "description": "Discovers allowed HTTP methods, CORS permissions, and headers",
        "params": [],
        "curlExample": "curl -X OPTIONS \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png\" -i"
      }
    ],
    "sampleQueryUrl": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/0b8c72c2-9d85-435f-9eaa-cf9c62b354db/hero/1789252462091-jkphi21yo6.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzBiOGM3MmMyLTlkODUtNDM1Zi05ZWFhLWNmOWM2MmIzNTRkYi9oZXJvLzE3ODkyNTI0NjIwOTEtamtwaGkyMXlvNi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5MjUyNDY0LCJleHAiOjE3ODkyNTMwNjR9.qZHQH0fQS5aYEN0ViL5uOIxSRIfug9hgO6v906OereE\\",
    "queryCapabilitiesSummary": "1 known parameter • 3 queries mapped",
    "id": "api_5_3ky0u",
    "sourceUrls": [
      "https://owasp.org/projects/opencre"
    ]
  },
  {
    "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\",
    "pathname": "/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png",
    "domain": "remssssfmrgmyzqnpeas.supabase.co",
    "isSameDomain": false,
    "method": "GET",
    "category": "rest",
    "detectedIn": "script-inline",
    "sourceUrl": "https://owasp.org/projects/owtf",
    "queryParams": [
      "token"
    ],
    "possibleParameters": [
      {
        "name": "token",
        "in": "query",
        "type": "string",
        "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\",
        "description": "Known query parameter observed in URL",
        "required": false,
        "source": "observed"
      }
    ],
    "firstDiscoveredAt": 1791309832531,
    "possibleQueries": [
      {
        "title": "Standard Fetch Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\",
        "description": "Query using 1 known parameter from page source",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\\" -H \"Accept: application/json\""
      },
      {
        "title": "Parameterized Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE%5C",
        "description": "Executes query using known parameters: token",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE%5C\" -H \"Accept: application/json\""
      },
      {
        "title": "OPTIONS Capability Query",
        "method": "OPTIONS",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png",
        "description": "Discovers allowed HTTP methods, CORS permissions, and headers",
        "params": [],
        "curlExample": "curl -X OPTIONS \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png\" -i"
      }
    ],
    "sampleQueryUrl": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/3e342420-146d-4e97-b6fb-ac188d31f953/hero/1787640157555-z03hi9rmbcb.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzNlMzQyNDIwLTE0NmQtNGU5Ny1iNmZiLWFjMTg4ZDMxZjk1My9oZXJvLzE3ODc2NDAxNTc1NTUtejAzaGk5cm1iY2IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0MDE1OSwiZXhwIjoxNzg3NjQwNzU5fQ.Y1ZNQ-ahFiTXS5T-OsuHM_yU7_kw9_s5Js2DIgy_2FE\\",
    "queryCapabilitiesSummary": "Allowed: GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE • 1 params • 3 possible queries mapped",
    "id": "api_3_csgsi",
    "sourceUrls": [
      "https://owasp.org/projects/owtf"
    ],
    "statusCode": 400,
    "latencyMs": 162,
    "contentType": "application/json; charset=utf-8",
    "allowedMethods": [
      "GET",
      "HEAD",
      "POST",
      "OPTIONS",
      "PUT",
      "PATCH",
      "DELETE"
    ],
    "responsePreview": "{\"statusCode\":\"400\",\"error\":\"InvalidJWT\",\"message\":\"Failed to base64url decode the signature\",\"code\":\"InvalidJWT\"}",
    "lastQueriedAt": 1791309833339
  },
  {
    "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\",
    "pathname": "/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif",
    "domain": "remssssfmrgmyzqnpeas.supabase.co",
    "isSameDomain": false,
    "method": "GET",
    "category": "rest",
    "detectedIn": "script-inline",
    "sourceUrl": "https://owasp.org/projects/nettacker",
    "queryParams": [
      "token"
    ],
    "possibleParameters": [
      {
        "name": "token",
        "in": "query",
        "type": "string",
        "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\",
        "description": "Known query parameter observed in URL",
        "required": false,
        "source": "observed"
      }
    ],
    "firstDiscoveredAt": 1791309832443,
    "possibleQueries": [
      {
        "title": "Standard Fetch Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\",
        "description": "Query using 1 known parameter from page source",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\\" -H \"Accept: application/json\""
      },
      {
        "title": "Parameterized Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU%5C",
        "description": "Executes query using known parameters: token",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU%5C\" -H \"Accept: application/json\""
      },
      {
        "title": "OPTIONS Capability Query",
        "method": "OPTIONS",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif",
        "description": "Discovers allowed HTTP methods, CORS permissions, and headers",
        "params": [],
        "curlExample": "curl -X OPTIONS \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif\" -i"
      }
    ],
    "sampleQueryUrl": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295060719-2xhrhb6y7tu.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTA2MDcxOS0yeGhyaGI2eTd0dS5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MDczLCJleHAiOjE3ODkyOTU2NzN9.-ISKY2LxuHxSBY9NzJBAb4VA1-1IxFSL2UF-C06DAdU\\",
    "queryCapabilitiesSummary": "Allowed: GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE • 1 params • 3 possible queries mapped",
    "id": "api_2_wlims",
    "sourceUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "statusCode": 400,
    "latencyMs": 184,
    "contentType": "application/json; charset=utf-8",
    "allowedMethods": [
      "GET",
      "HEAD",
      "POST",
      "OPTIONS",
      "PUT",
      "PATCH",
      "DELETE"
    ],
    "responsePreview": "{\"statusCode\":\"400\",\"error\":\"InvalidJWT\",\"message\":\"Failed to base64url decode the signature\",\"code\":\"InvalidJWT\"}",
    "lastQueriedAt": 1791309833074
  },
  {
    "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\",
    "pathname": "/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif",
    "domain": "remssssfmrgmyzqnpeas.supabase.co",
    "isSameDomain": false,
    "method": "GET",
    "category": "rest",
    "detectedIn": "script-inline",
    "sourceUrl": "https://owasp.org/projects/nettacker",
    "queryParams": [
      "token"
    ],
    "possibleParameters": [
      {
        "name": "token",
        "in": "query",
        "type": "string",
        "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\",
        "description": "Known query parameter observed in URL",
        "required": false,
        "source": "observed"
      }
    ],
    "firstDiscoveredAt": 1791309832439,
    "possibleQueries": [
      {
        "title": "Standard Fetch Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\",
        "description": "Query using 1 known parameter from page source",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\\" -H \"Accept: application/json\""
      },
      {
        "title": "Parameterized Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4%5C",
        "description": "Executes query using known parameters: token",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4%5C\" -H \"Accept: application/json\""
      },
      {
        "title": "OPTIONS Capability Query",
        "method": "OPTIONS",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif",
        "description": "Discovers allowed HTTP methods, CORS permissions, and headers",
        "params": [],
        "curlExample": "curl -X OPTIONS \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif\" -i"
      }
    ],
    "sampleQueryUrl": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/6470d60a-fa6b-45df-8c87-028d8c9caa7f/images/1789295113236-8c9ork6gyqw.gif?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzY0NzBkNjBhLWZhNmItNDVkZi04Yzg3LTAyOGQ4YzljYWE3Zi9pbWFnZXMvMTc4OTI5NTExMzIzNi04Yzlvcms2Z3lxdy5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg5Mjk1MTE3LCJleHAiOjE3ODkyOTU3MTd9.evQyVW0YiIl0QrcRbHSHZtt0CRxoJQ1Fttfc7t4j7o4\\",
    "queryCapabilitiesSummary": "Allowed: GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE • 1 params • 3 possible queries mapped",
    "id": "api_1_mmdhr",
    "sourceUrls": [
      "https://owasp.org/projects/nettacker"
    ],
    "statusCode": 400,
    "latencyMs": 230,
    "contentType": "application/json; charset=utf-8",
    "allowedMethods": [
      "GET",
      "HEAD",
      "POST",
      "OPTIONS",
      "PUT",
      "PATCH",
      "DELETE"
    ],
    "responsePreview": "{\"statusCode\":\"400\",\"error\":\"InvalidJWT\",\"message\":\"Failed to base64url decode the signature\",\"code\":\"InvalidJWT\"}",
    "lastQueriedAt": 1791309832780
  },
  {
    "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\",
    "pathname": "/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png",
    "domain": "remssssfmrgmyzqnpeas.supabase.co",
    "isSameDomain": false,
    "method": "GET",
    "category": "rest",
    "detectedIn": "script-inline",
    "sourceUrl": "https://owasp.org/projects/nest",
    "queryParams": [
      "token"
    ],
    "possibleParameters": [
      {
        "name": "token",
        "in": "query",
        "type": "string",
        "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\",
        "description": "Known query parameter observed in URL",
        "required": false,
        "source": "observed"
      }
    ],
    "firstDiscoveredAt": 1791309832848,
    "possibleQueries": [
      {
        "title": "Standard Fetch Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\",
        "description": "Query using 1 known parameter from page source",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\\" -H \"Accept: application/json\""
      },
      {
        "title": "Parameterized Query",
        "method": "GET",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc%5C",
        "description": "Executes query using known parameters: token",
        "params": [
          {
            "name": "token",
            "in": "query",
            "type": "string",
            "sampleValue": "eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\",
            "description": "Known query parameter observed in URL",
            "required": false,
            "source": "observed"
          }
        ],
        "curlExample": "curl -X GET \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc%5C\" -H \"Accept: application/json\""
      },
      {
        "title": "OPTIONS Capability Query",
        "method": "OPTIONS",
        "url": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png",
        "description": "Discovers allowed HTTP methods, CORS permissions, and headers",
        "params": [],
        "curlExample": "curl -X OPTIONS \"https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png\" -i"
      }
    ],
    "sampleQueryUrl": "https://remssssfmrgmyzqnpeas.supabase.co/storage/v1/object/sign/project-media/projects/7bb93dd7-a5c5-48ab-a1d6-76fb2b72de54/hero/1787645515468-1xtti8c42an.png?token=eyJraWQiOiJiMGY5N2MxOS0wMzYwLTQ3MTMtYjliYS04Y2RhZjA0YjZjZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LW1lZGlhL3Byb2plY3RzLzdiYjkzZGQ3LWE1YzUtNDhhYi1hMWQ2LTc2ZmIyYjcyZGU1NC9oZXJvLzE3ODc2NDU1MTU0NjgtMXh0dGk4YzQyYW4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzY0NTUxNywiZXhwIjoxNzg3NjQ2MTE3fQ.vhNfCFP5aknB7uOd6HSxBQmx4RzLGVLuJQa1ZHdYGcc\\",
    "queryCapabilitiesSummary": "Allowed: GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE • 1 params • 3 possible queries mapped",
    "id": "api_4_jnn3t",
    "sourceUrls": [
      "https://owasp.org/projects/nest"
    ],
    "statusCode": 400,
    "latencyMs": 208,
    "contentType": "application/json; charset=utf-8",
    "allowedMethods": [
      "GET",
      "HEAD",
      "POST",
      "OPTIONS",
      "PUT",
      "PATCH",
      "DELETE"
    ],
    "responsePreview": "{\"statusCode\":\"400\",\"error\":\"InvalidJWT\",\"message\":\"Failed to base64url decode the signature\",\"code\":\"InvalidJWT\"}",
    "lastQueriedAt": 1791309833661
  }
];

export const DEMO_LOGS: Array<{ level: "info" | "warn" | "error" | "success"; message: string; timestamp: number }> = [
  {
    "level": "info",
    "message": "Starting crawl for domain owasp.org at https://owasp.org/ (Max Depth: 2, Max Pages: 25)",
    "timestamp": 1791309830591
  },
  {
    "level": "info",
    "message": "Fetching & inspecting robots.txt at https://owasp.org/robots.txt...",
    "timestamp": 1791309830591
  },
  {
    "level": "success",
    "message": "Parsed https://owasp.org/robots.txt: Discovered 6 path rules and 1 sitemap references",
    "timestamp": 1791309830651
  },
  {
    "level": "info",
    "message": "Probing target domain for 36 standardized AI assistance and context manifest endpoints...",
    "timestamp": 1791309830651
  },
  {
    "level": "info",
    "message": "AI assistance probe completed: No standard AI manifests located on owasp.org",
    "timestamp": 1791309831485
  },
  {
    "level": "info",
    "message": "Crawling [Depth 0]: https://owasp.org/",
    "timestamp": 1791309831485
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects",
    "timestamp": 1791309831655
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/chapters",
    "timestamp": 1791309831655
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/events",
    "timestamp": 1791309831656
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/meetings",
    "timestamp": 1791309831825
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/news",
    "timestamp": 1791309831826
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/about",
    "timestamp": 1791309831826
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/auth/sign-in",
    "timestamp": 1791309832023
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/donate",
    "timestamp": 1791309832024
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/juice-shop",
    "timestamp": 1791309832024
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/nettacker",
    "timestamp": 1791309832297
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/owtf",
    "timestamp": 1791309832298
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/blt",
    "timestamp": 1791309832298
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/nest",
    "timestamp": 1791309832687
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/pygoat",
    "timestamp": 1791309832687
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/projects/opencre",
    "timestamp": 1791309832688
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/supporters",
    "timestamp": 1791309833091
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/supporters/bios",
    "timestamp": 1791309833092
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/supporters/jobs",
    "timestamp": 1791309833092
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/awards",
    "timestamp": 1791309833307
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/community",
    "timestamp": 1791309833308
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/contact",
    "timestamp": 1791309833308
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/security",
    "timestamp": 1791309833691
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/staff",
    "timestamp": 1791309833691
  },
  {
    "level": "info",
    "message": "Crawling [Depth 1]: https://owasp.org/board",
    "timestamp": 1791309833692
  }
];

export const DEMO_DOMAIN_INTELLIGENCE: DomainIntelligence = {
  "domain": "owasp.org",
  "fetchedAt": 1791309848084,
  "dns": [
    {
      "type": "MX",
      "name": "owasp.org",
      "value": "aspmx.l.google.com",
      "priority": 1
    },
    {
      "type": "MX",
      "name": "owasp.org",
      "value": "alt4.aspmx.l.google.com",
      "priority": 10
    },
    {
      "type": "MX",
      "name": "owasp.org",
      "value": "alt1.aspmx.l.google.com",
      "priority": 5
    },
    {
      "type": "MX",
      "name": "owasp.org",
      "value": "alt3.aspmx.l.google.com",
      "priority": 10
    },
    {
      "type": "MX",
      "name": "owasp.org",
      "value": "alt2.aspmx.l.google.com",
      "priority": 5
    },
    {
      "type": "A",
      "name": "owasp.org",
      "value": "216.150.1.1",
      "ttl": 164
    },
    {
      "type": "A",
      "name": "owasp.org",
      "value": "216.150.16.1",
      "ttl": 164
    },
    {
      "type": "SOA",
      "name": "owasp.org",
      "value": "Primary NS: fay.ns.cloudflare.com, Hostmaster: dns.cloudflare.com, Serial: 2416003127"
    },
    {
      "type": "NS",
      "name": "owasp.org",
      "value": "west.ns.cloudflare.com"
    },
    {
      "type": "NS",
      "name": "owasp.org",
      "value": "fay.ns.cloudflare.com"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "MS=ms73859685"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "RrGYbfHtHhF55ld5k5Rw87iuBu7wAWOX4GR9zffrTh4="
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "atlassian-domain-verification=BhaFKFKoRcW20xvi6UJ3U0CKocKOCgLH6LSuiBYPQ5A53cSCUN6gcbzcKSOmlVGs"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "google-site-verification=1zT9Of9pBuTj1rgeGCxMbya3iQQMxFE9-DzUBhftUVQ"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "google-site-verification=I9qx_X9EKlR_rfceG25-iXHBXJvLrmeNbkEdy182iI"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "google-site-verification=_slXlbOCopK1Ss9VQEoxdsNxpScVKvXVB_JtPpyL3eQ"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "google-site-verification=hJ9eCIFoexfh1sb-WVBkVB5PEND3JiaojOVyaNpyWK8"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "google-site-verification=kmxuuCvLW4gII8YaV-3ilTOLUvjZa3uaipm0tmpVGpU"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "google-site-verification=ubHJGF1N2ylOhYxQnIzEIIFaqUodqsIdTLXF-rCX9ps"
    },
    {
      "type": "TXT",
      "name": "owasp.org",
      "value": "v=spf1 include:_spf.google.com include:servers.mcsv.net include:amazonses.com -all"
    }
  ],
  "whois": {
    "domainName": "owasp.org",
    "rootDomain": "owasp.org",
    "queryDomain": "owasp.org",
    "registrar": "GoDaddy.com, LLC",
    "ianaId": "146",
    "createdDate": "2001-09-21T17:00:36.719Z",
    "updatedDate": "2026-08-11T23:37:38.888Z",
    "expiresDate": "2031-09-21T17:00:36Z",
    "status": [
      "client delete prohibited",
      "client renew prohibited",
      "client transfer prohibited",
      "client update prohibited"
    ],
    "nameservers": [
      "fay.ns.cloudflare.com",
      "west.ns.cloudflare.com"
    ],
    "abuseContact": "abuse@godaddy.com",
    "source": "rdap",
    "rawText": "{\n  \"rdapConformance\": [\n    \"rdap_level_0\",\n    \"icann_rdap_response_profile_1\",\n    \"icann_rdap_technical_implementation_guide_1\",\n    \"redacted\"\n  ],\n  \"notices\": [\n    {\n      \"title\": \"Terms of Service\",\n      \"description\": [\n        \"Public Interest Registry provides this RDAP service for informational purposes only, and to assist persons in obtaining information about or related to a domain name registration record. Public Interest Registry does not guarantee its accuracy. Users accessing the Public Interest Registry RDAP service agree to use the data only for lawful purposes, and under no circumstances may this data be used to: a) allow, enable, or otherwise support the transmission by e-mail, telephone, or facsimile of mass unsolicited, commercial advertising or solicitations to entities other than the registrar's own existing customers and b) enable high volume, automated, electronic processes that send queries or data to the systems of Public Interest Registry or any ICANN-accredited registrar, except as reasonably necessary to register domain names or modify existing registrations. When using the Public Interest Registry RDAP service, please consider the following: the RDAP service is not a replacement for standard EPP commands to the SRS service. RDAP is not considered authoritative for registered domain objects. The RDAP service may be scheduled for downtime during production or OT&E maintenance periods. Queries to the RDAP services are throttled. If too many queries are received from a single IP address within a specified time, the service will begin to reject further queries for a period of time to prevent disruption of RDAP service access. Abuse of the RDAP system through data mining is mitigated by detecting and limiting bulk query access from single sources. Where applicable, the presence of a [Non-Public Data] tag indicates that such data is not made publicly available due to applicable data privacy laws or requirements. Should you wish to contact the registrant, please refer to the RDAP records available through the registrar URL listed above. Access to non-public data may be provided, upon request, where it can be reasonably confirmed that the requester holds a specific legitimate interest and a proper legal basis for accessing the withheld data. Access to this data can be requested by submitting a request to WHOISrequest@pir.org. Public Interest Registry Inc. reserves the right to modify these terms at any time. By submitting this q"
  },
  "ssl": {
    "subject": "owasp.org",
    "issuer": "Let's Encrypt",
    "validFrom": "Sep 10 05:03:11 2026 GMT",
    "validTo": "Dec  9 05:03:10 2026 GMT",
    "daysRemaining": 64,
    "isExpired": false,
    "san": [
      "owasp.org"
    ],
    "fingerprint": "8A:47:83:83:3C:8C:D8:F4:E6:95:40:18:CB:29:14:98:D9:E4:DA:FE:71:B4:A6:99:FF:5D:30:F6:DA:80:3C:4C",
    "serialNumber": "053DEB1789E74B163B1B241EC2FFEA379C8F",
    "protocol": "TLSv1.3"
  },
  "server": {
    "statusCode": 200,
    "statusText": "OK",
    "server": "Vercel",
    "hsts": "max-age=31536000; includeSubDomains; preload",
    "csp": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://remssssfmrgmyzqnpeas.supabase.co https://*.supabase.co https://owasp.org https://dependencytrack.org https://assets.ot.digital https://images.unsplash.com https://i.ytimg.com https://img.youtube.com https://*.googleusercontent.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://remssssfmrgmyzqnpeas.supabase.co wss://remssssfmrgmyzqnpeas.supabase.co; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://calendar.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com; frame-ancestors 'none'; upgrade-insecure-requests; report-uri /api/csp-report; report-to csp-endpoint",
    "xFrameOptions": "DENY",
    "xContentTypeOptions": "nosniff",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "contentType": "text/html; charset=utf-8",
    "latencyMs": 98,
    "rawHeaders": {
      "age": "37",
      "cache-control": "public, max-age=0, must-revalidate",
      "content-encoding": "br",
      "content-security-policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://remssssfmrgmyzqnpeas.supabase.co https://*.supabase.co https://owasp.org https://dependencytrack.org https://assets.ot.digital https://images.unsplash.com https://i.ytimg.com https://img.youtube.com https://*.googleusercontent.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://remssssfmrgmyzqnpeas.supabase.co wss://remssssfmrgmyzqnpeas.supabase.co; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://calendar.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com; frame-ancestors 'none'; upgrade-insecure-requests; report-uri /api/csp-report; report-to csp-endpoint",
      "content-security-policy-report-only": "default-src 'self'; script-src 'self' 'strict-dynamic' 'nonce-4RSYwapSPAmnbGyx6Q+PHw=='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://remssssfmrgmyzqnpeas.supabase.co https://*.supabase.co https://owasp.org https://dependencytrack.org https://assets.ot.digital https://images.unsplash.com https://i.ytimg.com https://img.youtube.com https://*.googleusercontent.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://remssssfmrgmyzqnpeas.supabase.co wss://remssssfmrgmyzqnpeas.supabase.co; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://calendar.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com; frame-ancestors 'none'; report-uri /api/csp-report; report-to csp-endpoint",
      "content-type": "text/html; charset=utf-8",
      "cross-origin-opener-policy": "same-origin",
      "cross-origin-resource-policy": "same-origin",
      "date": "Mon, 05 Oct 2026 13:37:43 GMT",
      "etag": "W/\"782imnxh9126ar\"",
      "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(self), interest-cohort=(), publickey-credentials-get=(self), publickey-credentials-create=(self)",
      "referrer-policy": "strict-origin-when-cross-origin",
      "report-to": "{\"group\":\"csp-endpoint\",\"max_age\":10886400,\"endpoints\":[{\"url\":\"https://owasp.org/api/csp-report\"}]}",
      "reporting-endpoints": "csp-endpoint=\"https://owasp.org/api/csp-report\"",
      "server": "Vercel",
      "set-cookie": "owasp-locale=en; Path=/; Expires=Wed, 06 Oct 2027 18:04:08 GMT; Max-Age=31536000; SameSite=lax",
      "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
      "transfer-encoding": "chunked",
      "vary": "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "x-matched-path": "/",
      "x-nextjs-prerender": "1",
      "x-nextjs-stale-time": "300",
      "x-powered-by": "Next.js",
      "x-vercel-cache": "HIT",
      "x-vercel-id": "iad1::iad1::qfq5t-1791309848365-fe8c4f45000a",
      "x-xss-protection": "1; mode=block"
    },
    "robotsTxtPresent": true,
    "robotsTxtUrl": "https://owasp.org/robots.txt",
    "robotsTxtContentPreview": "User-Agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /auth\nDisallow: /dashboard\nDisallow: /dev\nDisallow: /search\n\nSitemap: https://owasp.org/sitemap.xml\n",
    "sitemapPresent": true,
    "sitemapUrl": "https://owasp.org/sitemap.xml",
    "aiAssistancePresent": false,
    "aiAssistanceCount": 0,
    "aiAssistanceFiles": []
  },
  "resolvedIp": "216.150.1.1",
  "crtSubdomains": {
    "apexDomain": "owasp.org",
    "count": 95,
    "subdomains": [
      "owasp.org",
      "1447613570034715761.owasp.org",
      "1890632338654740279.owasp.org",
      "20thanniversary.owasp.org",
      "899366190850356553.owasp.org",
      "admin.owasp.org",
      "aghast.owasp.org",
      "aivss.owasp.org",
      "aos.owasp.org",
      "api-security.owasp.org",
      "asvs.owasp.org",
      "austin.owasp.org",
      "auth.owasp.org",
      "b.owasp.org",
      "blogs.owasp.org",
      "blt.owasp.org",
      "board.owasp.org",
      "brainbreak.owasp.org",
      "calltobattle.owasp.org",
      "cheatsheetseries.owasp.org",
      "cloud.owasp.org",
      "community.owasp.org",
      "contact.owasp.org",
      "copi.owasp.org",
      "cornucopia.owasp.org",
      "ctf.owasp.org",
      "dev.owasp.org",
      "devguide.owasp.org",
      "devsecops.owasp.org",
      "discourse.owasp.org",
      "docs.owasp.org",
      "dsandbox.owasp.org",
      "dsomm.owasp.org",
      "gapps.owasp.org",
      "genai.owasp.org",
      "giving.owasp.org",
      "haroldtest.owasp.org",
      "kerala.owasp.org",
      "kubernetes-top10.owasp.org",
      "lightning.owasp.org",
      "lists.owasp.org",
      "llm.owasp.org",
      "mail.owasp.org",
      "mas.owasp.org",
      "members.owasp.org",
      "mu.owasp.org",
      "my.owasp.org",
      "name-virt-host.owasp.org",
      "nest.owasp.org",
      "new-wiki.owasp.org",
      "ocms.owasp.org",
      "ot.owasp.org",
      "owasp4.owasp.org",
      "owaspforce.owasp.org",
      "owaspla.owasp.org",
      "phpsec.owasp.org",
      "policy.owasp.org",
      "prodsec.owasp.org",
      "projectsummit.owasp.org",
      "scs.owasp.org",
      "scvs.owasp.org",
      "securecodingdojo.owasp.org",
      "secureflag.owasp.org",
      "securitychampions.owasp.org",
      "sl.owasp.org",
      "support.owasp.org",
      "talk.owasp.org",
      "tempcali.owasp.org",
      "top10.owasp.org",
      "top10proactive.owasp.org",
      "training.owasp.org",
      "tsd.owasp.org",
      "u003e1447613570034715761.owasp.org",
      "u003echeatsheetseries.owasp.org",
      "u003elists.owasp.org",
      "update-wiki.owasp.org",
      "videos.owasp.org",
      "vwad.owasp.org",
      "wiki.owasp.org",
      "www.owasp.org",
      "www2.owasp.org",
      "app.genai.owasp.org",
      "chat.cheatsheetseries.owasp.org",
      "dev.cheatsheetseries.owasp.org",
      "images.cheatsheetseries.owasp.org",
      "images.genai.owasp.org",
      "img.genai.owasp.org",
      "pce.dev.owasp.org",
      "private.genai.owasp.org",
      "storage.genai.owasp.org",
      "store.genai.owasp.org",
      "support.docs.owasp.org",
      "track.genai.owasp.org",
      "www.lists.owasp.org",
      "www.projectsummit.owasp.org"
    ],
    "fetchedAt": 1791309800632,
    "sourceUrl": "https://crt.name/v1/search?apex=owasp.org"
  }
};
