import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "VinhoApp - Descubra o Mundo dos Vinhos",
    template: "%s | VinhoApp"
  },
  description: "Explore uma vasta coleção de vinhos de todo o mundo, das melhores vinícolas e regiões mais prestigiadas. Descubra vinhos, vinícolas, regiões e países produtores.",
  keywords: ["vinho", "wine", "vinícola", "winery", "região vinícola", "wine region", "país produtor", "grape varieties", "uvas"],
  authors: [{ name: "VinhoApp" }],
  creator: "VinhoApp",
  publisher: "VinhoApp",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'VinhoApp - Descubra o Mundo dos Vinhos',
    description: 'Explore uma vasta coleção de vinhos de todo o mundo, das melhores vinícolas e regiões mais prestigiadas.',
    siteName: 'VinhoApp',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VinhoApp - Descubra o Mundo dos Vinhos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VinhoApp - Descubra o Mundo dos Vinhos',
    description: 'Explore uma vasta coleção de vinhos de todo o mundo, das melhores vinícolas e regiões mais prestigiadas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
