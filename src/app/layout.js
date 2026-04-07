import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Replace with your actual domain ──────────────────────────────────────────
const SITE_URL = "https://www.vetrivel.in";
const SITE_NAME = "Vetrivel Building Materials";

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
// Helps Google show rich results (name, address, hours, ratings, services)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Local Business — shows in Google Maps / local pack
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: ["Vetrivel Sand Supplier", "Vetrivel M Sand Chennai"],
      description:
        "Chennai's trusted supplier of M Sand, White M Sand, P Sand, Gravel, 20mm Stone, and construction aggregates. 26+ years experience, certified weighing, same-day delivery across Chennai.",
      url: SITE_URL,
      telephone: "+91-XXXXXXXXXX", // ← replace with real number
      email: "info@vetrivelbuildingmaterials.com", // ← replace
      priceRange: "₹₹",
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/logo.png`,
      foundingDate: "1998",
      areaServed: [
        "Chennai",
        "Tambaram",
        "Velachery",
        "Porur",
        "Ambattur",
        "Avadi",
        "Sholinganallur",
        "Perambur",
        "Chromepet",
        "Pallavaram",
        "Anna Nagar",
        "T. Nagar",
        "Adyar",
        "Guindy",
        "Medavakkam",
        "Perungudi",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Your Street Address", // ← replace
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600001", // ← replace
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.0827, // ← replace with exact coords
        longitude: 80.2707,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "07:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "08:00",
          closes: "14:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Building Materials",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "M Sand (Manufactured Sand)",
              description:
                "High-quality manufactured sand ideal for concrete and plastering works. Meets IS 383 standards.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "White M Sand",
              description:
                "Premium white manufactured sand for fine plastering and wall finishing.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "P Sand (Plastering Sand)",
              description:
                "Fine-graded plastering sand for smooth wall finishes and tile work.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Gravel & Aggregates",
              description:
                "20mm, 12mm gravel and coarse aggregates for RCC and foundation work.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Stone Dust / Quarry Dust",
              description:
                "Fine quarry dust used as a sand substitute and for paving applications.",
            },
          },
        ],
      },
      sameAs: [
        "https://www.facebook.com/vetrivel", // ← replace with real URLs
        "https://www.instagram.com/vetrivel",
        "https://g.page/vetrivel", // Google Business Profile
      ],
    },

    // 2. WebSite — enables Google Sitelinks Search Box
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "M Sand, P Sand, Gravel and Aggregate supplier in Chennai with 26 years of experience.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ── Next.js Metadata Export ───────────────────────────────────────────────────
export const metadata = {
  // ── Titles ─────────────────────────────────────────────────────────────────
  title: {
    // Shown on homepage
    default: "Vetrivel Building Materials Chennai | M Sand, P Sand, Gravel Supplier",
    // Other pages use: "Page Name | Vetrivel Building Materials"
    template: "%s | Vetrivel Building Materials Chennai",
  },

  // ── Description (keep 150-160 chars) ───────────────────────────────────────
  description:
    "Vetrivel – Chennai's trusted building material supplier since 1998. Buy M Sand, White M Sand, P Sand, Gravel & Aggregates. Same-day delivery 5–50 tons. Certified weighing. Call now.",

  // ── Canonical URL ──────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "ta-IN": `${SITE_URL}/ta`, // if you have a Tamil version
    },
  },

  // ── Keywords (secondary signal, still helps) ───────────────────────────────
  keywords: [
    // Brand
    "Vetrivel",
    "Vetrivel building materials",
    "Vetrivel sand supplier Chennai",
    "Vetrivel M sand Chennai",
    // Core products
    "M Sand Chennai",
    "manufactured sand Chennai",
    "white M sand Chennai",
    "P Sand Chennai",
    "plastering sand Chennai",
    "gravel supplier Chennai",
    "aggregates Chennai",
    "20mm aggregate Chennai",
    "12mm aggregate Chennai",
    "quarry dust Chennai",
    "stone dust Chennai",
    "river sand substitute Chennai",
    // Intent-based
    "buy M sand Chennai",
    "M sand price Chennai",
    "P sand price Chennai",
    "sand delivery Chennai",
    "building materials delivery Chennai",
    "bulk sand supplier Chennai",
    "construction material supplier Chennai",
    "RCC aggregate supplier Chennai",
    // Area-based (long tail)
    "M sand Tambaram",
    "M sand Velachery",
    "M sand Porur",
    "M sand Anna Nagar",
    "sand supplier Ambattur",
    "gravel Chromepet",
    "building materials Sholinganallur",
    // Tamil language keywords (helps Tamil searches)
    "கட்டுமான பொருட்கள் சென்னை",
    "மணல் சப்ளையர் சென்னை",
  ],

  // ── Authors / Publisher ────────────────────────────────────────────────────
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ── Open Graph (Facebook, WhatsApp, LinkedIn previews) ────────────────────
  openGraph: {
    title: "Vetrivel Building Materials | M Sand, P Sand & Gravel – Chennai",
    description:
      "26+ years supplying M Sand, P Sand, Gravel & Aggregates across Chennai. Same-day delivery, certified weighing, transparent pricing. Order 5–50 tons today.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`, // ← create a 1200×630 image
        width: 1200,
        height: 630,
        alt: "Vetrivel Building Materials – M Sand and Gravel Supplier Chennai",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Vetrivel Building Materials | Chennai's #1 Sand & Gravel Supplier",
    description:
      "Premium M Sand, P Sand, Gravel delivered across Chennai. 26 years experience, own fleet, same-day dispatch.",
    images: [`${SITE_URL}/og-image.jpg`],
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add your codes from Search Console / Bing) ──────────────
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE", // ← replace
    // bing: "YOUR_BING_CODE",
  },

  // ── App / Icon Metadata ────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ── App metadata ───────────────────────────────────────────────────────────
  applicationName: SITE_NAME,
  category: "Construction & Building Materials",
  classification: "Building Material Supplier",

  // ── Geo meta (used by some local search engines) ──────────────────────────
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
    "geo.position": "13.0827;80.2707", // ← update with your coords
    ICBM: "13.0827, 80.2707",
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data — injected directly for reliability */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to speed up Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}