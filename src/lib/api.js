const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://127.0.0.1:8000/media';

class ApiService {
  async fetchData(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('Fetching from:', url); // Debug log
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Debug log
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Helper function to get wine image URL
  getWineImageUrl(vivinoId) {
    if (!vivinoId) return null;
    return `${MEDIA_BASE_URL}/${vivinoId}.png`;
  }

  // Countries endpoints
  async getCountries(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.fetchData(`/countries/?${searchParams}`);
  }

  async getCountry(slug) {
    return this.fetchData(`/countries/${slug}/`);
  }

  // Regions endpoints
  async getRegions(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.fetchData(`/regions/?${searchParams}`);
  }

  async getRegion(slug) {
    return this.fetchData(`/regions/${slug}/`);
  }

  // Wineries endpoints
  async getWineries(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.fetchData(`/wineries/?${searchParams}`);
  }

  async getWinery(slug) {
    return this.fetchData(`/wineries/${slug}/`);
  }

  // Wines endpoints
  async getWines(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.fetchData(`/wines/?${searchParams}`);
  }

  async getWine(slug) {
    return this.fetchData(`/wines/${slug}/`);
  }

  // Grapes endpoints
  async getGrapes(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.fetchData(`/grapes/?${searchParams}`);
  }

  async getGrape(slug) {
    return this.fetchData(`/grapes/${slug}/`);
  }

  // Search functionality
  async searchWines(query, filters = {}) {
    const params = {
      search: query,
      ...filters,
    };
    return this.getWines(params);
  }

  // Get wines by category - using the winery detail endpoint since it includes wines
  async getWinesByGrape(grapeSlug, params = {}) {
    return this.getWines({
      grapes__slug: grapeSlug,
      ...params,
    });
  }

  async getWinesByType(wineType, params = {}) {
    return this.getWines({
      wine_type: wineType,
      ...params,
    });
  }

  // For winery wines, we get them from the winery detail endpoint
  async getWinesByWinery(winerySlug, params = {}) {
    try {
      const wineryData = await this.getWinery(winerySlug);
      // The winery detail endpoint includes wines array directly
      return { results: wineryData.wines || [] };
    } catch (error) {
      console.error('Error fetching winery wines:', error);
      return { results: [] };
    }
  }

  async getWinesByRegion(regionSlug, params = {}) {
    return this.getWines({
      winery__region__slug: regionSlug,
      ...params,
    });
  }

  async getWinesByCountry(countrySlug, params = {}) {
    return this.getWines({
      winery__region__country__slug: countrySlug,
      ...params,
    });
  }

  // Get top rated wines
  async getTopRatedWines(limit = 10) {
    return this.getWines({
      ordering: '-rating',
      limit,
    });
  }
}

export const apiService = new ApiService();
export { MEDIA_BASE_URL, API_BASE_URL }; 