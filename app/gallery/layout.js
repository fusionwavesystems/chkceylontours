export const metadata = {
  title: "Travel Gallery & Memories | CHK Ceylon Tours",
  description: "Browse our gallery of amazing travel moments in Sri Lanka. See the smiling faces of our guests and the stunning landscapes they explored with CHK Ceylon Tours.",
  keywords: "Sri Lanka Travel Gallery, CHK Ceylon Tours Photos, Sri Lanka Tourist Memories",
  openGraph: {
    title: "Travel Gallery & Memories | CHK Ceylon Tours",
    description: "Browse our gallery of amazing travel moments in Sri Lanka.",
    url: "https://chkceylontours.com/gallery",
    images: [{ url: "https://chkceylontours.com/gallery_hero_bg.png", width: 1200, height: 630 }],
  },
};

export default function GalleryLayout({ children }) {
  return <>{children}</>;
}
