import Core from '@/core';

/**
 * Class Name: Chart
 * Description: All chart types should extend or inherit from this class because 
 *              it encompasses shared methods and properties.
 */
export default class Chart extends Core {
  constructor() {
    super();
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
   * @param {object} options 
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
   * @param {object} options 
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
   * @param {object} options
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
   * @param {object} data Instance of DataTable Class 
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