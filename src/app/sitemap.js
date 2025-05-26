import { apiService } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/vinhos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vinicolas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/regioes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/paises`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uvas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    // Dynamic pages - wines
    const winesData = await apiService.getWines({ limit: 1000 });
    const wines = winesData.results || winesData;
    const winePages = wines.map((wine) => ({
      url: `${baseUrl}/vinhos/${wine.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Dynamic pages - wineries
    const wineriesData = await apiService.getWineries({ limit: 1000 });
    const wineries = wineriesData.results || wineriesData;
    const wineryPages = wineries.map((winery) => ({
      url: `${baseUrl}/vinicolas/${winery.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Dynamic pages - regions
    const regionsData = await apiService.getRegions({ limit: 1000 });
    const regions = regionsData.results || regionsData;
    const regionPages = regions.map((region) => ({
      url: `${baseUrl}/regioes/${region.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Dynamic pages - countries
    const countriesData = await apiService.getCountries({ limit: 1000 });
    const countries = countriesData.results || countriesData;
    const countryPages = countries.map((country) => ({
      url: `${baseUrl}/paises/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Dynamic pages - grapes
    const grapesData = await apiService.getGrapes({ limit: 1000 });
    const grapes = grapesData.results || grapesData;
    const grapePages = grapes.map((grape) => ({
      url: `${baseUrl}/uvas/${grape.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    return [
      ...staticPages,
      ...winePages,
      ...wineryPages,
      ...regionPages,
      ...countryPages,
      ...grapePages,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages only if API fails
    return staticPages;
  }
} 