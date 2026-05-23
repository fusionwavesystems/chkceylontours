import './globals.css';
import Preloader from '../components/Preloader';
import ReviewFloatingButton from '../components/ReviewFloatingButton';
import WhatsAppButton from '../components/WhatsAppButton';

export const metadata = {
  title: {
    default: 'CHK Ceylon Tours | #1 Best Travel Agency & Tour Operator in Sri Lanka',
    template: '%s | CHK Ceylon Tours',
  },
  description: 'Experience the ultimate Sri Lanka holiday with CHK Ceylon Tours, the number one travel agency and top-rated tour operator. We provide bespoke private tours, luxury travel packages, and expert English-speaking guides for foreign travelers.',
  keywords: [
    // Brand
    'CHK Ceylon Tours', 'CHK Ceylon', 'CHK tours Sri Lanka',
    // Core service
    'Sri Lanka tours', 'Sri Lanka tour packages', 'Sri Lanka travel agency',
    'Sri Lanka tour operator', 'best tour guide Sri Lanka', 'private tours Sri Lanka',
    // Target Markets (High Priority)
    'Sri Lanka tour packages from India', 'Sri Lanka holidays from India',
    'Sri Lanka travel packages from Netherlands', 'Sri Lanka tours from Netherlands',
    'Sri Lanka tours from France', 'voyage Sri Lanka', 'circuit Sri Lanka',
    'Sri Lanka holidays for Spanish tourists', 'viajes a Sri Lanka',
    'Sri Lanka vacation from Australia', 'Sri Lanka tour operator Australia',
    'Sri Lanka holidays from Romania', 'vacante in Sri Lanka',
    'Sri Lanka packages from Maldives', 'Sri Lanka tours from Maldives',
    'Sri Lanka travel from China', 'Sri Lanka tours from Japan',
    'Sri Lanka holidays from UAE', 'Sri Lanka tours from United Arab Emirates', 'Dubai to Sri Lanka packages',
    'Sri Lanka vacations from Switzerland', 'Sri Lanka tour guide for Switzerland',
    'Sri Lanka tour operator New Zealand', 'Sri Lanka packages from New Zealand',
    'Sri Lanka travel from Iraq', 'Sri Lanka holidays from Iraq',
    // Destinations & Types
    'Sigiriya tours', 'Kandy tours', 'Ella train tour', 'Yala safari tour',
    'luxury tours Sri Lanka', 'honeymoon packages Sri Lanka', 'cultural tours Sri Lanka'
  ].join(', '),
  authors: [{ name: 'CHK Ceylon Tours', url: 'https://www.chkceylontours.com' }],
  creator: 'CHK Ceylon Tours',
  publisher: 'CHK Ceylon Tours',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://chkceylontours.com',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'CHK Ceylon Tours | #1 Best Travel Agency in Sri Lanka',
    description: 'Book with the number one travel agency in Sri Lanka. Expert local guides, bespoke tour packages, and 5-star luxury experiences for international tourists.',
    url: 'https://chkceylontours.com',
    siteName: 'CHK Ceylon Tours',
    images: [
      {
        url: 'https://chkceylontours.com/logo.png',
        width: 800,
        height: 800,
        alt: 'CHK Ceylon Tours Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHK Ceylon Tours | Top Rated Sri Lanka Travel Agency',
    description: 'Book with the number one travel agency in Sri Lanka. Expert local guides, bespoke tour packages, and 5-star luxury experiences for international tourists.',
    images: ['https://chkceylontours.com/logo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TouristInformationCenter',
      '@id': 'https://www.chkceylontours.com/#business',
      name: 'CHK Ceylon Tours (PVT) LTD',
      alternateName: 'CHK Ceylon Tours',
      description: 'Sri Lanka\'s most trusted private tour operator with 15 years of experience. Expert English-speaking driver guides offering personalised luxury and budget tour packages.',
      url: 'https://www.chkceylontours.com',
      logo: 'https://www.chkceylontours.com/logo.png',
      image: 'https://www.chkceylontours.com/home_hero_bg.png',
      telephone: '+94776981971',
      email: 'shashi198524@gmail.com',
      foundingDate: '2010',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 4/6, Malwathuhiripitiya, Buthpitiya',
        addressLocality: 'Gampaha',
        postalCode: '11054',
        addressCountry: 'LK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 7.0556776,
        longitude: 80.0682114,
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:30', closes: '23:30' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday'], opens: '08:30', closes: '17:30' },
      ],
      sameAs: [
        'https://www.facebook.com/profile.php?id=61567698557599',
        'https://www.instagram.com/chkceylon',
        'https://www.youtube.com/channel/UCFlor_kOoJYITY9bUN0EYpw',
        'https://www.google.com/maps/place/C+H+K+Ceylon+Tours/@7.0556776,80.0682114,17z',
      ],
      areaServed: { '@type': 'Country', name: 'Sri Lanka' },
      priceRange: '$$',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.chkceylontours.com/#website',
      url: 'https://www.chkceylontours.com',
      name: 'CHK Ceylon Tours',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.chkceylontours.com/packages?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Preconnect for fast font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />

        {/* Google Fonts — display=swap prevents invisible text during load */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Outfit:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* JSON-LD Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Preloader />
        <div id="root">{children}</div>
        <ReviewFloatingButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
