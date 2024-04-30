import colors from '@/data/colors/colors.json'

/**
 * This method allows users to retrieve the colors array from the "./src/data/colors" directory.
 * 
 * @param {string} name Color Scheme Name
 * @returns {string[]}
 */
export const get = (name = 'material') => {
  return colors[name] || [];
}
