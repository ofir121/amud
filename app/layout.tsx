import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "B'nai Israel Congregation — Historic Downtown Baltimore Synagogue",
    template: "%s · B'nai Israel Congregation",
  },
  description:
    "Downtown Baltimore's historic Orthodox synagogue, davening in the same landmark 1876 sanctuary on Lloyd Street for 150 years. Services, events, and community.",
  openGraph: {
    siteName: "B'nai Israel Congregation",
    type: "website",
    locale: "en_US",
  },
};

const synagogueSchema = {
  "@context": "https://schema.org",
  "@type": "Synagogue",
  name: "B'nai Israel Congregation",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27 Lloyd Street",
    addressLocality: "Baltimore",
    addressRegion: "MD",
    postalCode: "21202",
    addressCountry: "US",
  },
  telephone: "(410) 732-5454",
  url: "https://www.jewishdowntown.org",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${frankRuhl.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(synagogueSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
