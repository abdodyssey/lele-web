import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bibit Ikan Ari Palembang | Segar & Sehat Langsung dari Kolam",
  description:
    "Supplier bibit ikan berkualitas di Palembang. Melayani petambak rumahan hingga skala industri. Ukuran lengkap, harga terjangkau, pengiriman aman & terpercaya.",
  keywords: ["bibit ikan", "ikan palembang", "lele palembang", "benih ikan", "budidaya ikan"],
  authors: [{ name: "Bibit Ikan Ari" }],
  openGraph: {
    title: "Bibit Ikan Ari Palembang | Kualitas Juara",
    description: "Bibit ikan sehat & segar langsung dari kolam. Siap tebar ke seluruh Sumatera.",
    url: "https://bibitikandari.com", // Ganti dengan domain asli nanti
    siteName: "Bibit Ikan Ari",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bibit Ikan Ari Palembang",
    description: "Supplier bibit ikan berkualitas dengan pengiriman aman.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}