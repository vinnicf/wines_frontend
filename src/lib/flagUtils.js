/**
 * Maps country names to their corresponding flag emojis
 * @param {string} countryName - The name of the country
 * @returns {string} - The flag emoji for the country
 */
export function getCountryFlag(countryName) {
  if (!countryName) return '🌍'; // fallback to globe if no country
  
  const countryFlags = {
    // Major wine-producing countries
    'França': '🇫🇷',
    'France': '🇫🇷',
    'Itália': '🇮🇹',
    'Italy': '🇮🇹',
    'Espanha': '🇪🇸',
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'Estados Unidos': '🇺🇸',
    'United States': '🇺🇸',
    'EUA': '🇺🇸',
    'USA': '🇺🇸',
    'Argentina': '🇦🇷',
    'Chile': '🇨🇱',
    'Brasil': '🇧🇷',
    'Brazil': '🇧🇷',
    'Alemanha': '🇩🇪',
    'Germany': '🇩🇪',
    'Áustria': '🇦🇹',
    'Austria': '🇦🇹',
    'Austrália': '🇦🇺',
    'Australia': '🇦🇺',
    'Nova Zelândia': '🇳🇿',
    'New Zealand': '🇳🇿',
    'África do Sul': '🇿🇦',
    'South Africa': '🇿🇦',
    'Grécia': '🇬🇷',
    'Greece': '🇬🇷',
    'Hungria': '🇭🇺',
    'Hungary': '🇭🇺',
    'Romênia': '🇷🇴',
    'Romania': '🇷🇴',
    'Bulgária': '🇧🇬',
    'Bulgaria': '🇧🇬',
    'Croácia': '🇭🇷',
    'Croatia': '🇭🇷',
    'Eslovênia': '🇸🇮',
    'Slovenia': '🇸🇮',
    'Geórgia': '🇬🇪',
    'Georgia': '🇬🇪',
    'Moldávia': '🇲🇩',
    'Moldova': '🇲🇩',
    'Ucrânia': '🇺🇦',
    'Ukraine': '🇺🇦',
    'Suíça': '🇨🇭',
    'Switzerland': '🇨🇭',
    'Líbano': '🇱🇧',
    'Lebanon': '🇱🇧',
    'Israel': '🇮🇱',
    'Turquia': '🇹🇷',
    'Turkey': '🇹🇷',
    'Marrocos': '🇲🇦',
    'Morocco': '🇲🇦',
    'Tunísia': '🇹🇳',
    'Tunisia': '🇹🇳',
    'Argélia': '🇩🇿',
    'Algeria': '🇩🇿',
    'China': '🇨🇳',
    'Japão': '🇯🇵',
    'Japan': '🇯🇵',
    'Coreia do Sul': '🇰🇷',
    'South Korea': '🇰🇷',
    'Índia': '🇮🇳',
    'India': '🇮🇳',
    'Tailândia': '🇹🇭',
    'Thailand': '🇹🇭',
    'México': '🇲🇽',
    'Mexico': '🇲🇽',
    'Peru': '🇵🇪',
    'Uruguai': '🇺🇾',
    'Uruguay': '🇺🇾',
    'Canadá': '🇨🇦',
    'Canada': '🇨🇦',
    'Reino Unido': '🇬🇧',
    'United Kingdom': '🇬🇧',
    'Inglaterra': '🇬🇧',
    'England': '🇬🇧',
    'Escócia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    'País de Gales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    'Irlanda': '🇮🇪',
    'Ireland': '🇮🇪',
    'Holanda': '🇳🇱',
    'Netherlands': '🇳🇱',
    'Países Baixos': '🇳🇱',
    'Bélgica': '🇧🇪',
    'Belgium': '🇧🇪',
    'Luxemburgo': '🇱🇺',
    'Luxembourg': '🇱🇺',
    'Dinamarca': '🇩🇰',
    'Denmark': '🇩🇰',
    'Suécia': '🇸🇪',
    'Sweden': '🇸🇪',
    'Noruega': '🇳🇴',
    'Norway': '🇳🇴',
    'Finlândia': '🇫🇮',
    'Finland': '🇫🇮',
    'Rússia': '🇷🇺',
    'Russia': '🇷🇺',
    'Polônia': '🇵🇱',
    'Poland': '🇵🇱',
    'República Tcheca': '🇨🇿',
    'Czech Republic': '🇨🇿',
    'Eslováquia': '🇸🇰',
    'Slovakia': '🇸🇰',
  };

  // Try exact match first
  if (countryFlags[countryName]) {
    return countryFlags[countryName];
  }

  // Try case-insensitive match
  const lowerCaseName = countryName.toLowerCase();
  const matchedKey = Object.keys(countryFlags).find(
    key => key.toLowerCase() === lowerCaseName
  );
  
  if (matchedKey) {
    return countryFlags[matchedKey];
  }

  // Try partial match for compound names
  const partialMatchKey = Object.keys(countryFlags).find(
    key => key.toLowerCase().includes(lowerCaseName) || lowerCaseName.includes(key.toLowerCase())
  );
  
  if (partialMatchKey) {
    return countryFlags[partialMatchKey];
  }

  // Fallback to globe emoji if country not found
  return '🌍';
}

/**
 * Gets flag emoji with country name
 * @param {string} countryName - The name of the country
 * @returns {string} - Flag emoji followed by country name
 */
export function getCountryWithFlag(countryName) {
  if (!countryName) return '';
  return `${getCountryFlag(countryName)} ${countryName}`;
} 