/**
 * Class Name: Chart
 * Description: All chart types should extend or inherit from this class because 
 *              it encompasses shared methods and properties.
 */
class Chart {
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

  /** 
   * This method is used to set chart configuration.
   * 
   * @param {Object} options 
   * @returns {this}
   */
  options(options) {
    this._options.chart = { ...this.options.chart, ...options };

    return this;
  }

  /**
   * This method is used to set configuration related to chart animation.
   * 
   * @param {Object} options 
   * @returns {this}
   */
  animate(options = {}) {
    // Default Animation Options
    this._animation = {
      time: 750,
      ...options
    };

    return this;
  }

  /**
   * This method is used to set legend configuration.
   * 
   * @param {Object} options 
   * @returns {this}
   */
  legend(options = {}) {
    this._options.legend = {
      ...this._options.legend,
      ...options
    }
    return this;
  }

  /**
   * This method is used to set tooltip configuration
   * 
   * @param {Object} options
   * @returns {this}
   */
  tooltip(options = {}) {
    this._options.tooltip = {
      ...this._options.tooltip,
      ...options
    }
    return this;
  }
  
  /**
   * 
   * @param {Object} data Instance of DataTable Class 
   * @returns {this}
   */
  bind(data) {
    if (data instanceof DataTable) {
      this._data = data;
    } else {
      const rows = data.slice(1);
      this._data = new DataTable(data[0], rows);
    }

    return this;
  }
}