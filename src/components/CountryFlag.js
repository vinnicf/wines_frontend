import 'flag-icons/css/flag-icons.min.css';

/**
 * Maps country names to their ISO 3166-1 alpha-2 country codes for flag-icons
 * @param {string} countryName - The name of the country
 * @returns {string} - The ISO country code (lowercase)
 */
function getCountryCode(countryName) {
  if (!countryName) return '';
  
  const countryCodeMap = {
    // Major wine-producing countries
    'França': 'fr',
    'France': 'fr',
    'Itália': 'it',
    'Italy': 'it',
    'Espanha': 'es',
    'Spain': 'es',
    'Portugal': 'pt',
    'Estados Unidos': 'us',
    'United States': 'us',
    'EUA': 'us',
    'USA': 'us',
    'Argentina': 'ar',
    'Chile': 'cl',
    'Brasil': 'br',
    'Brazil': 'br',
    'Alemanha': 'de',
    'Germany': 'de',
    'Áustria': 'at',
    'Austria': 'at',
    'Austrália': 'au',
    'Australia': 'au',
    'Nova Zelândia': 'nz',
    'New Zealand': 'nz',
    'África do Sul': 'za',
    'South Africa': 'za',
    'Grécia': 'gr',
    'Greece': 'gr',
    'Hungria': 'hu',
    'Hungary': 'hu',
    'Romênia': 'ro',
    'Romania': 'ro',
    'Bulgária': 'bg',
    'Bulgaria': 'bg',
    'Croácia': 'hr',
    'Croatia': 'hr',
    'Eslovênia': 'si',
    'Slovenia': 'si',
    'Geórgia': 'ge',
    'Georgia': 'ge',
    'Moldávia': 'md',
    'Moldova': 'md',
    'Ucrânia': 'ua',
    'Ukraine': 'ua',
    'Suíça': 'ch',
    'Switzerland': 'ch',
    'Líbano': 'lb',
    'Lebanon': 'lb',
    'Israel': 'il',
    'Turquia': 'tr',
    'Turkey': 'tr',
    'Marrocos': 'ma',
    'Morocco': 'ma',
    'Tunísia': 'tn',
    'Tunisia': 'tn',
    'Argélia': 'dz',
    'Algeria': 'dz',
    'China': 'cn',
    'Japão': 'jp',
    'Japan': 'jp',
    'Coreia do Sul': 'kr',
    'South Korea': 'kr',
    'Índia': 'in',
    'India': 'in',
    'Tailândia': 'th',
    'Thailand': 'th',
    'México': 'mx',
    'Mexico': 'mx',
    'Peru': 'pe',
    'Uruguai': 'uy',
    'Uruguay': 'uy',
    'Canadá': 'ca',
    'Canada': 'ca',
    'Reino Unido': 'gb',
    'United Kingdom': 'gb',
    'Inglaterra': 'gb',
    'England': 'gb',
    'Escócia': 'gb', // flag-icons doesn't have separate Scottish flag
    'Scotland': 'gb',
    'País de Gales': 'gb', // flag-icons doesn't have separate Welsh flag
    'Wales': 'gb',
    'Irlanda': 'ie',
    'Ireland': 'ie',
    'Holanda': 'nl',
    'Netherlands': 'nl',
    'Países Baixos': 'nl',
    'Bélgica': 'be',
    'Belgium': 'be',
    'Luxemburgo': 'lu',
    'Luxembourg': 'lu',
    'Dinamarca': 'dk',
    'Denmark': 'dk',
    'Suécia': 'se',
    'Sweden': 'se',
    'Noruega': 'no',
    'Norway': 'no',
    'Finlândia': 'fi',
    'Finland': 'fi',
    'Rússia': 'ru',
    'Russia': 'ru',
    'Polônia': 'pl',
    'Poland': 'pl',
    'República Tcheca': 'cz',
    'Czech Republic': 'cz',
    'Eslováquia': 'sk',
    'Slovakia': 'sk',
  };

  // Try exact match first
  if (countryCodeMap[countryName]) {
    return countryCodeMap[countryName];
  }

  // Try case-insensitive match
  const lowerCaseName = countryName.toLowerCase();
  const matchedKey = Object.keys(countryCodeMap).find(
    key => key.toLowerCase() === lowerCaseName
  );
  
  if (matchedKey) {
    return countryCodeMap[matchedKey];
  }

  // Try partial match for compound names
  const partialMatchKey = Object.keys(countryCodeMap).find(
    key => key.toLowerCase().includes(lowerCaseName) || lowerCaseName.includes(key.toLowerCase())
  );
  
  if (partialMatchKey) {
    return countryCodeMap[partialMatchKey];
  }

  // No match found
  return '';
}

/**
 * CountryFlag component that displays a flag icon for a given country
 * @param {Object} props
 * @param {string} props.countryName - The name of the country
 * @param {string} props.size - Size class (e.g., 'w-4 h-4', 'w-6 h-6', 'w-8 h-8')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Flag icon element
 */
export default function CountryFlag({ countryName, size = 'w-4 h-4', className = '' }) {
  const countryCode = getCountryCode(countryName);
  
  if (!countryCode) {
    // Fallback to globe icon if country not found
    return (
      <span className={`inline-flex items-center justify-center ${size} ${className}`}>
        🌍
      </span>
    );
  }

  return (
    <span 
      className={`fi fi-${countryCode} inline-block ${size} ${className}`}
      title={countryName}
    />
  );
}

/**
 * CountryFlagWithName component that displays a flag icon with country name
 * @param {Object} props
 * @param {string} props.countryName - The name of the country
 * @param {string} props.size - Size class for the flag
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Flag icon with country name
 */
export function CountryFlagWithName({ countryName, size = 'w-4 h-4', className = '' }) {
  if (!countryName) return null;
  
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <CountryFlag countryName={countryName} size={size} />
      <span>{countryName}</span>
    </span>
  );
}

/**
 * Utility function to get country flag component (for compatibility)
 * @param {string} countryName - The name of the country
 * @param {string} size - Size class for the flag
 * @returns {JSX.Element} - Flag component
 */
export function getCountryFlagComponent(countryName, size = 'w-4 h-4') {
  return <CountryFlag countryName={countryName} size={size} />;
} 