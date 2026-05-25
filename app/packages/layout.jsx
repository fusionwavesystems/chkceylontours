export const metadata = {
  title: "Sri Lanka Tour Packages | CHK Ceylon Tours",
  description: "Explore our exclusive Sri Lanka tour packages. From 5-day cultural tours to 14-day comprehensive holidays. We offer fully customizable private tours with expert drivers and guides.",
  keywords: "Sri Lanka Tour Packages, Custom Tours Sri Lanka, Holiday Packages Sri Lanka, Sri Lanka Travel Itinerary",
  openGraph: {
    title: "Sri Lanka Tour Packages | CHK Ceylon Tours",
    description: "Explore our exclusive Sri Lanka tour packages. Fully customizable private tours with expert drivers and guides.",
    url: "https://chkceylontours.com/packages",
    images: [{ url: "https://chkceylontours.com/tour_bg.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Tour Packages | CHK Ceylon Tours",
    description: "Explore our exclusive Sri Lanka tour packages. Fully customizable private tours with expert drivers and guides.",
    images: ["https://chkceylontours.com/tour_bg.png"],
  },
};

export default function PackagesLayout({ children }) {
  return <>{children}</>;
}
