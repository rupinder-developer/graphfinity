// Theme Dataset
import themes from '@/data/themes.json';

export default class Theme {
  // Chart Theme
  public theme: string[];

  /**
   * It is used to set the theme for a chart.
   *
   * @param theme `Graphifinity Theme Name` or `Array of Colors (hex, rgba, rgb)`
   */
  constructor(theme: keyof typeof themes | string[]) {
    // Set chart theme
    if (Array.isArray(theme)) {
      this.theme = theme;
    } else {
      this.theme = themes[theme] || [];
    }

    // Set fallback theme
    if (this.theme.length == 0) {
      this.theme = themes['material'];
    }
  }

  /**
   * It is used to retrieve a color from the `this.theme` array based on the given index.
   *
   * @param {number} index
   */
  getColor(index: number) {
    if (index >= this.theme.length) {
      index = index % this.theme.length;
    }

    return this.theme[index];
  }
}
