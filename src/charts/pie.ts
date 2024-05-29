// Requirements
import Chart from '@/core/chart';

export default class Pie extends Chart {
  constructor() {
    super();
  }

  /**
   * @override
   *
   * @returns This method returns a function that is used to re-render the chart.
   */
  protected _draw() {
    // Init Legend
    const legend = this.init().legend();

    const render = () => {
      // Set labels for the legend
      legend._setLabels(this._data.rows.map((row) => `${row[0]}`) || []);
    };

    render();

    return render;
  }
}
