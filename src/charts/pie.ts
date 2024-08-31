// Requirements
import Chart from '@/core/chart';

export default class Pie extends Chart {
  constructor() {
    super();

    // Default options for Chart
    this._options.legend.position = 'right';
    this._options.legend.layout = 'vertical';
    this._options.legend.shape.type = 'circle';
  }

  protected _draw() {
    // Init Legend Class
    const legend = this.init().legend();

    // Setup legend & update chart container
    this._graph = legend._setup(
      this._data.rows.map((row) => `${row[0]}`) || [],
      0.4
    );

    // Draw Legends
    legend.draw();
  }
}
