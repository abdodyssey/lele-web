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
  title: "Bibit Lele Unggul | Segar Langsung dari Kolam",
  description:
    "Supplier bibit lele berkualitas. Ukuran lengkap, harga terjangkau, pengiriman terpercaya. Order langsung via WhatsApp.",
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