import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ── FILL THESE IN ─────────────────────────────────────────────────────────────
const SITE_URL       = "https://www.vetrivel.in";
const SITE_NAME      = "Vetrivel Building Materials";
const PHONE          = "+91-9500007779";              // ← FILL THIS
const EMAIL          = "kandansuryamass@gmail.com";            // ← FILL THIS
const STREET         = "Pillaiyar Koil St, Ishwarya Nagar, Muvendar Nagar, Anna Nagar,r"; // ← FILL THIS
const POSTAL_CODE    = "600040";                      // ← FILL THIS
const LAT            = 13.0827;                       // ← FILL THIS (exact coords)
const LNG            = 80.2707;                       // ← FILL THIS (exact coords)
const GSC_CODE       = "YOUR_SEARCH_CONSOLE_CODE";    // ← FILL THIS (from Google Search Console)
const FB_URL         = "https://www.facebook.com/vetrivel";   // ← FILL THIS
const IG_URL         = "https://www.instagram.com/vetrivel";  // ← FILL THIS
const GBP_URL        = "https://g.page/vetrivel";             // ← FILL THIS

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. LocalBusiness — drives the Google Maps / local pack appearance
    {
      "@type": ["LocalBusiness", "Store"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: [
        "Vetrivel Sand Supplier",
        "Vetrivel M Sand Chennai",
        "Vetrivel Building Materials Chennai",
      ],
      description:
        "Chennai's trusted building material supplier since 1998. Premium M Sand, White M Sand, P Sand, Gravel, 20mm & 12mm Aggregates, Quarry Dust. Same-day delivery 5–50 tons across Chennai. PWD-certified, IS 383 compliant, certified weighbridge.",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer, UPI, Cheque",
      image: `${SITE_URL}/og-image.jpg`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 400,
        height: 400,
      },
      foundingDate: "1998",
      numberOfEmployees: { "@type": "QuantitativeValue", value: "20" },

      // All areas served — critical for local SEO
      areaServed: [
        { "@type": "City", name: "Chennai", sameAs: "https://www.wikidata.org/wiki/Q1352" },
        "Tambaram", "Velachery", "Porur", "Ambattur", "Avadi",
        "Sholinganallur", "Perambur", "Chromepet", "Pallavaram",
        "Anna Nagar", "T. Nagar", "Adyar", "Guindy", "Medavakkam",
        "Perungudi", "OMR", "ECR", "Nungambakkam", "Kodambakkam",
        "Chengalpattu", "Kanchipuram",
      ],

      address: {
        "@type": "PostalAddress",
        streetAddress: STREET,
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: POSTAL_CODE,
        addressCountry: "IN",
      },

      geo: {
        "@type": "GeoCoordinates",
        latitude: LAT,
        longitude: LNG,
      },

      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
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

      // Aggregate rating — update this once you have reviews on Google
      // aggregateRating: {
      //   "@type": "AggregateRating",
      //   ratingValue: "4.8",
      //   reviewCount: "47",
      //   bestRating: "5",
      // },

      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Building Materials & Construction Aggregates",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "M Sand (Manufactured Sand) Chennai",
              description:
                "IS 383-compliant manufactured sand for RCC and concrete work. Cubical particles, washed and graded. Available in 10T, 20T, and 50T lorry loads.",
              brand: { "@type": "Brand", name: SITE_NAME },
              material: "Crushed Granite",
              url: `${SITE_URL}/m-sand-chennai`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "White M Sand Chennai",
              description:
                "Premium white manufactured sand for fine plastering and wall finishing. Low fines content for superior workability.",
              url: `${SITE_URL}/white-m-sand-chennai`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "P Sand (Plastering Sand) Chennai",
              description:
                "Fine-graded 150 micron to 3.55mm plastering sand. Ideal for smooth wall finish, tile laying, and brickwork. Mix ratio 1:4 (internal), 1:6 (external).",
              url: `${SITE_URL}/p-sand-chennai`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "20mm Gravel / Blue Metal Chennai",
              description:
                "Graded 20mm coarse aggregate for RCC, foundation, and road base work.",
              url: `${SITE_URL}/gravel-aggregate-chennai`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Quarry Dust / Stone Dust Chennai",
              description:
                "Fine quarry dust for paving, sub-base compaction, and sand substitute applications.",
              url: `${SITE_URL}/quarry-dust-chennai`,
            },
          },
        ],
      },

      sameAs: [FB_URL, IG_URL, GBP_URL],
    },

    // 2. WebSite — enables Sitelinks search box
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "M Sand, P Sand, Gravel, and Aggregate supplier in Chennai. 26+ years of experience. Same-day delivery.",
      inLanguage: ["en-IN", "ta-IN"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    // 3. BreadcrumbList — helps Google show breadcrumbs in results
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "M Sand Chennai", item: `${SITE_URL}/m-sand-chennai` },
        { "@type": "ListItem", position: 3, name: "P Sand Chennai", item: `${SITE_URL}/p-sand-chennai` },
        { "@type": "ListItem", position: 4, name: "Price List", item: `${SITE_URL}/price` },
      ],
    },

    // 4. FAQPage — shows expandable Q&As directly in Google results
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the price of M Sand in Chennai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "M Sand price in Chennai ranges from ₹950 to ₹1,400 per tonne depending on lorry size, location, and quantity. Contact Vetrivel Building Materials for today's best price: call " + PHONE + " or visit our price page.",
          },
        },
        {
          "@type": "Question",
          name: "Do you deliver M Sand and P Sand same day in Chennai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Vetrivel Building Materials offers same-day delivery of M Sand, P Sand, and Gravel across Chennai and suburbs including Tambaram, Velachery, Porur, Ambattur, Anna Nagar, and more. Order before 12 PM for same-day dispatch.",
          },
        },
        {
          "@type": "Question",
          name: "Is your M Sand PWD certified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All our M Sand and P Sand meet Tamil Nadu PWD specifications and IS 383 standards. We provide test certificates on request.",
          },
        },
        {
          "@type": "Question",
          name: "What is the minimum order quantity for M Sand delivery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Minimum order is 5 tonnes (small lorry). We supply up to 50 tonnes per load. Both single and bulk orders are accepted.",
          },
        },
        {
          "@type": "Question",
          name: "What areas in Chennai do you supply M Sand to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We deliver M Sand and P Sand to all Chennai areas including Tambaram, Velachery, Porur, Anna Nagar, T. Nagar, Adyar, Guindy, Ambattur, Chromepet, Pallavaram, Sholinganallur, Medavakkam, Perambur, OMR, and ECR.",
          },
        },
      ],
    },
  ],
};

// ── Next.js Metadata ──────────────────────────────────────────────────────────
export const metadata = {
  title: {
    default: "Vetrivel Building Materials Chennai | M Sand, P Sand & Gravel Supplier Since 1998",
    template: "%s | Vetrivel Building Materials Chennai",
  },

  description:
    "Chennai's trusted M Sand, P Sand & Gravel supplier since 1998. PWD-certified, IS 383 compliant. Same-day delivery 5–50 tons across all Chennai suburbs. Competitive prices, certified weighing. Call now.",

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "ta-IN": `${SITE_URL}/ta`,
    },
  },

  keywords: [
    // Brand
    "Vetrivel", "Vetrivel building materials", "Vetrivel sand supplier Chennai",
    // Core products + intent
    "M Sand Chennai", "M Sand price Chennai", "buy M Sand Chennai",
    "manufactured sand Chennai", "white M sand Chennai",
    "P Sand Chennai", "plastering sand Chennai", "P sand price Chennai",
    "gravel supplier Chennai", "blue metal Chennai",
    "20mm aggregate Chennai", "12mm aggregate Chennai",
    "quarry dust Chennai", "stone dust Chennai",
    // Delivery / action
    "M sand delivery Chennai", "same day sand delivery Chennai",
    "bulk sand supplier Chennai", "sand lorry Chennai",
    "construction material supplier Chennai",
    // Area long-tail (separate pages will target these)
    "M sand Tambaram", "M sand Velachery", "M sand Porur",
    "M sand Anna Nagar", "M sand Ambattur", "M sand Chromepet",
    "M sand Sholinganallur", "M sand OMR", "M sand Adyar",
    // Tamil
    "கட்டுமான பொருட்கள் சென்னை", "மணல் சப்ளையர் சென்னை", "எம் சாண்ட் சென்னை",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  openGraph: {
    title: "Vetrivel Building Materials | M Sand, P Sand & Gravel – Chennai Since 1998",
    description:
      "26+ years supplying M Sand, P Sand, Gravel & Aggregates across all Chennai suburbs. Same-day delivery, PWD-certified, competitive pricing. Order 5–50 tons today.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Vetrivel Building Materials – M Sand and P Sand Supplier in Chennai",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vetrivel Building Materials | Chennai's Trusted Sand & Gravel Supplier",
    description:
      "Premium M Sand, P Sand, Gravel delivered across Chennai. 26 years experience, own fleet, same-day dispatch. PWD certified.",
    images: [`${SITE_URL}/og-image.jpg`],
  },

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

  verification: {
    google: GSC_CODE,
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
  applicationName: SITE_NAME,
  category: "Construction & Building Materials",

  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai, Tamil Nadu",
    "geo.position": `${LAT};${LNG}`,
    ICBM: `${LAT}, ${LNG}`,
    // WhatsApp / Click-to-call
    "format-detection": "telephone=yes",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
