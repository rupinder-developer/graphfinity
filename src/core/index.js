/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
  constructor() {
    // Chart Data (Instance of DataTable Class)
    this._data = null;

    // Width of the chart
    this._width = null;

    // Height of the chart
    this._height = null;

    // SVG Element
    this._svg = null;

    // Configuration for Chart, Legend & Tooltip
    this._options = {
      chart: {},
      legend: {},
      tooltip: {}
    };

    // Chart Animation Configuration
    this._animation = {}
  }
}

