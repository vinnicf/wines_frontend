import VinicolasClient from './VinicolasClient';

export const metadata = {
  title: "Vinícolas do Mundo",
  description: "Conheça as melhores vinícolas e suas tradições vinícolas. Explore vinícolas de renome mundial e descubra seus vinhos excepcionais.",
  keywords: ["vinícolas", "winery", "wineries", "tradições vinícolas", "vinificação", "produtores de vinho"],
  alternates: {
    canonical: '/vinicolas',
  },
  openGraph: {
    title: "Vinícolas do Mundo | VinhoApp",
    description: "Conheça as melhores vinícolas e suas tradições vinícolas. Explore vinícolas de renome mundial e descubra seus vinhos excepcionais.",
    type: "website",
    url: "/vinicolas",
    images: [
      {
        url: '/wineries-collection.jpg',
        width: 1200,
        height: 630,
        alt: 'Vinícolas do Mundo - VinhoApp',
      }
    ],
  },
  twitter: {
    title: "Vinícolas do Mundo | VinhoApp",
    description: "Conheça as melhores vinícolas e suas tradições vinícolas. Explore vinícolas de renome mundial e descubra seus vinhos excepcionais.",
    images: ['/wineries-collection.jpg'],
  },
};

export default function VinicolasPage() {
  return <VinicolasClient />;
} 