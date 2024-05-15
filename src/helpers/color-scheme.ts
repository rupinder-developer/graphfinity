import colors from '@/data/colors/colors';

/**
 * This method allows users to retrieve the colors array from the "./src/data/colors" directory.
 * 
 * @param {string} name Color Scheme Name
 * @returns
 */
export const get = (name: 'material' | 'vivid' = 'material'): string[] => {
  return colors[name] || [];
}
