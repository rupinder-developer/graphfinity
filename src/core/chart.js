import * as d3 from 'd3';
import Core from '@/core';
import CONSTANTS from '@/core/constants';
import DataTable from '@/helpers/data-table';

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
   * @param {object} options 
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

  /**
   * Bind DOM Element with chart
   * 
   * @param {*} element DOM Element/Element ID/Element Class
   */
  element(element) {
    // Selecting DOM Element (D3 Instance)
    this._element = d3.select(element);

    // HTML Element
    const node = this._element.node();

    if (!node) {
      // If element not exists in DOM 
      this._element = null;

      setTimeout(() => {
        this._throw(CONSTANTS.ERROR_MESSAGES.ELEMENT_NOT_FOUND(element));
      }, 0);
    } else {
      // If element exists in DOM

      // Remove all content of element
      this._element.selectAll('*').remove();

      // Real Dimension of selected element
      const dimensions = node.getBoundingClientRect();

      // Set Width & Height
      this._width = dimensions.width;
      this._height = dimensions.height;

      // Append div with position:relative
      this._outerWrapper = this._element.append('div')
        .style('position', 'relative');

      // Append div inside the outer wrapper
      this._innerWrapper = this._outerWrapper.append('div')
        .style('width', this._width + 'px')
        .style('height', this._height + 'px')
        .style('overflow', 'hidden');
    }

    return this;
  }

  /**
   * This method is used to listen on the events or the errors thrown 
   * by the chart.
   * 
   * Supported Targets: `chart`, `legend-text`, `legend-shape`
   * 
   * @param {string} type enum(error, click:target, mouseout:target, mouseover:target, mousemove:target)
   * @param {function} cb 
   */
  on(type, cb) {
    type = `${type}`.trim();

    if (type == CONSTANTS.EVENT.TYPE.ERROR) {
      this._emitter.on(CONSTANTS.EVENT.TYPE.ERROR, cb);
      return;
    }

    const [event, target] = type.split(':');
    if (target) {
      this._emitter.on(event, (e) => {
        if (e.target === target) {
          cb(e.event, e.data);
        }
      });
    }
  }
}