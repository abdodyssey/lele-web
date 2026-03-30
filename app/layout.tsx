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
  title: "Bibit Lele Unggul Palembang | Segar & Sehat Langsung dari Kolam",
  description:
    "Supplier bibit lele berkualitas di Palembang. Melayani petambak rumahan hingga skala industri. Ukuran lengkap, harga terjangkau, pengiriman aman & terpercaya.",
  keywords: ["bibit lele", "lele palembang", "benih ikan", "budidaya lele", "supplier lele"],
  authors: [{ name: "Bibit Lele Unggul" }],
  openGraph: {
    title: "Bibit Lele Unggul Palembang | Kualitas Juara",
    description: "Bibit lele sehat & segar langsung dari kolam. Siap tebar ke seluruh Sumatera.",
    url: "https://leleunggul.com", // Ganti dengan domain asli nanti
    siteName: "Bibit Lele Unggul",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bibit Lele Unggul Palembang",
    description: "Supplier bibit lele berkualitas dengan pengiriman aman.",
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