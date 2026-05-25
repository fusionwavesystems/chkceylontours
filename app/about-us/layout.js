export const metadata = {
  title: "About Us | CHK Ceylon Tours - Your Sri Lanka Travel Experts",
  description: "Learn about the passionate team behind CHK Ceylon Tours. With 15 years of experience, our CEO Dilan Lekamarachchi and our expert team are dedicated to providing the ultimate Sri Lanka travel experience.",
  keywords: "About CHK Ceylon Tours, Sri Lanka Travel Experts, Dilan Lekamarachchi, Sri Lanka Tour Guides, Best Travel Agency Team",
  openGraph: {
    title: "About Us | CHK Ceylon Tours",
    description: "Learn about the passionate team behind CHK Ceylon Tours. With 15 years of experience, we provide the ultimate Sri Lanka travel experience.",
    url: "https://chkceylontours.com/about-us",
    images: [
      {
        url: "https://chkceylontours.com/tea_hills.png",
        width: 1200,
        height: 630,
        alt: "CHK Ceylon Tours Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | CHK Ceylon Tours",
    description: "Learn about the passionate team behind CHK Ceylon Tours. With 15 years of experience, we provide the ultimate Sri Lanka travel experience.",
    images: ["https://chkceylontours.com/tea_hills.png"],
  },
};

export default function AboutUsLayout({ children }) {
  return <>{children}</>;
}
