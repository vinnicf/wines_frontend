import VinhosClient from './VinhosClient';

export const metadata = {
  title: "Explore Nossos Vinhos",
  description: "Descubra uma seleção cuidadosa de vinhos de todo o mundo. Encontre vinhos tintos, brancos, rosés, espumantes e muito mais das melhores vinícolas.",
  keywords: ["vinhos", "vinho tinto", "vinho branco", "vinho rosé", "champagne", "espumante", "wine", "wine collection"],
  alternates: {
    canonical: '/vinhos',
  },
  openGraph: {
    title: "Explore Nossos Vinhos | VinhoApp",
    description: "Descubra uma seleção cuidadosa de vinhos de todo o mundo. Encontre vinhos tintos, brancos, rosés, espumantes e muito mais das melhores vinícolas.",
    type: "website",
    url: "/vinhos",
    images: [
      {
        url: '/wines-collection.jpg',
        width: 1200,
        height: 630,
        alt: 'Coleção de Vinhos - VinhoApp',
      }
    ],
  },
  twitter: {
    title: "Explore Nossos Vinhos | VinhoApp",
    description: "Descubra uma seleção cuidadosa de vinhos de todo o mundo. Encontre vinhos tintos, brancos, rosés, espumantes e muito mais das melhores vinícolas.",
    images: ['/wines-collection.jpg'],
  },
};

export default function VinhosPage() {
  return <VinhosClient />;
} 