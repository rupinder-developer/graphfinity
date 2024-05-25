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
    const render = () => {};

    render();

    return render;
  }
}