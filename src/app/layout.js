import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ── BUSINESS DETAILS ──────────────────────────────────────────────────────────
// These must match your Google Business Profile and the text on your website
// exactly (name, address, phone, hours). Mismatches hurt local ranking.
const SITE_URL     = "https://www.vetrivel.in";
const SITE_NAME    = "Vetrivel Building Materials";
const PHONE        = "+91-9500007779";
const PHONE_SHOWN  = "9500 007 779";
const EMAIL        = "kandansuryamass@gmail.com";
const STREET       = "Pillaiyar Koil St, Ishwarya Nagar, Muvendar Nagar, Anna Nagar";
const POSTAL_CODE  = "600040";

// TODO: exact coordinates. Open your shop in Google Maps, right-click the pin,
// and click the numbers to copy them. Leave as null until you have them
// (the old values were the centre of Chennai, not your shop).
const LAT = null;
const LNG = null;

// TODO: only fill in real links. Empty ones are left out automatically.
const GSC_CODE = "";   // Google Search Console verification code (or verify by DNS and leave empty)
const FB_URL   = "";
const IG_URL   = "";
const GBP_URL  = "";   // your Google Maps / Google Business Profile link

// TODO: confirm these match the hours shown on your Contact section.
const OPENING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const OPENS  = "09:00";
const CLOSES = "20:00";

const AREAS = [
  "Chennai", "Anna Nagar", "T. Nagar", "Adyar", "Guindy", "Velachery", "Tambaram",
  "Porur", "Ambattur", "Avadi", "Perambur", "Chromepet", "Pallavaram",
  "Sholinganallur", "Medavakkam", "Perungudi", "OMR", "ECR", "Nungambakkam",
  "Kodambakkam", "Chengalpattu", "Kanchipuram",
];

// ── JSON-LD (site-wide business data) ─────────────────────────────────────────
// Only things true for the whole site live here. Page-specific schema
// (breadcrumbs, FAQs, products) belongs on those pages, once they exist.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Store"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: ["Vetrivel M Sand Chennai", "Vetrivel Sand Supplier Chennai"],
      description:
        "M Sand, P Sand, gravel and aggregate supplier in Chennai. Own fleet of trucks, 5 to 50 ton loads, delivery across Chennai.",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer, UPI, Cheque",
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/logo.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: STREET,
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: POSTAL_CODE,
        addressCountry: "IN",
      },
      ...(LAT && LNG
        ? { geo: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG } }
        : {}),
      ...(GBP_URL ? { hasMap: GBP_URL } : {}),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: OPENING_DAYS,
          opens: OPENS,
          closes: CLOSES,
        },
      ],
      areaServed: AREAS.map((name) => ({ "@type": "Place", name: `${name}, Chennai, Tamil Nadu` })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "M Sand, P Sand and construction aggregates in Chennai",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "M Sand (Manufactured Sand) in Chennai", description: "Manufactured sand for concrete, RCC and masonry work, delivered in 5 to 50 ton loads." } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "White M Sand in Chennai", description: "Fine white manufactured sand for plastering and wall finishing." } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "P Sand (Plastering Sand) in Chennai", description: "Fine sand for plastering, tile laying and brickwork." } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "20mm and 12mm Aggregates (Blue Metal) in Chennai", description: "Graded coarse aggregates for RCC, foundations and road base." } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gravel and Quarry Dust in Chennai", description: "Gravel and quarry dust for fill, paving and sub-base work." } },
        ],
      },
      // Add aggregateRating ONLY from real Google reviews. Fake or unmatched
      // ratings can get the site penalised.
      sameAs: [FB_URL, IG_URL, GBP_URL].filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

// ── Next.js metadata ──────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "M Sand, P Sand & Building Material Supplier in Chennai | Vetrivel",
    template: `%s | ${SITE_NAME}`,
  },

  description:
    `Buy M Sand, P Sand, gravel and aggregates in Chennai. Own trucks, 5 to 50 ton loads, delivery across Chennai. Call ${PHONE_SHOWN} for today's price.`,

  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Construction & Building Materials",

  // "./" makes each page point to ITSELF. (A fixed canonical in the layout
  // would tell Google every page is a copy of the home page.)
  alternates: { canonical: "./" },

  openGraph: {
    title: "M Sand, P Sand & Aggregates Supplier in Chennai | Vetrivel",
    description:
      "M Sand, P Sand, gravel and building material supply across Chennai with our own trucks. 5 to 50 ton loads.",
    url: "./",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    // TODO: put a 1200x630 image at /public/og-image.jpg
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vetrivel Building Materials, M Sand and P Sand supplier in Chennai",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "M Sand, P Sand & Building Material Supplier in Chennai | Vetrivel",
    description:
      "M Sand, P Sand and aggregates delivered across Chennai with our own trucks.",
    images: ["/og-image.jpg"],
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

  // Only added when you actually have a code, so no broken tag is published.
  ...(GSC_CODE ? { verification: { google: GSC_CODE } } : {}),

  formatDetection: { telephone: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}