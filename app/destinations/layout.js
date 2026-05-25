export const metadata = {
  title: "Top Destinations in Sri Lanka | CHK Ceylon Tours",
  description: "Discover the most beautiful places to visit in Sri Lanka. From the ancient rock fortress of Sigiriya to the stunning beaches of Mirissa, let CHK Ceylon Tours guide your journey.",
  keywords: "Sri Lanka Destinations, Places to Visit Sri Lanka, Sigiriya, Kandy, Ella, Yala National Park, Mirissa",
  openGraph: {
    title: "Top Destinations in Sri Lanka | CHK Ceylon Tours",
    description: "Discover the most beautiful places to visit in Sri Lanka with CHK Ceylon Tours.",
    url: "https://chkceylontours.com/destinations",
    images: [{ url: "https://chkceylontours.com/dest_hero_bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Destinations in Sri Lanka | CHK Ceylon Tours",
    images: ["https://chkceylontours.com/dest_hero_bg.png"],
  },
};

export default function DestinationsLayout({ children }) {
  return <>{children}</>;
}
