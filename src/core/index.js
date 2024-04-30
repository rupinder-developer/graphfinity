import { EventEmitter } from 'events';
import * as colors from '@/helpers/color-scheme';

/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
  constructor() {
    // Event Emitter
    this._emitter = new EventEmitter(); 

    // Chart Data (Instance of DataTable Class)
    this._data = null;

    // Width of the chart
    this._width = null;

    // Height of the chart
    this._height = null;

    // Selected Element (D3 Instance)
    this._element = null;

    /**
     * Chart Wrapper (D3 Instance)
     * 
     * These are the <div> elements appended within the selected element (this._element), 
     * within which all the charts are drawn.
     */
    this._outerWrapper = null;
    this._innerWrapper = null;

    // Configuration for Chart, Legend & Tooltip
    this._options = {
      chart: {
        // Default Color Scheme
        colorScheme: colors.get('material')
      },
      legend: {},
      tooltip: {}
    };

    // Chart Animation Configuration
    this._animation = {}
  }

  /**
   * Used to draw chevron icon.
   * 
   * @param {object} element Parent Element (D3 Instance)
   * @param {number} width 
   * @param {number} height 
   * 
   * @return {object} D3 Instance
   */
  _chevron(element, width, height) {
    const chevron = element.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 16 16');

    chevron.append('path')
      .attr('fill-rule', 'evenodd')
      .attr('d', 'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z')

    return chevron;
  }

  _drawLegends(element, type = 'horizontal') {
    if (type == 'horizontal') {
      /**
       * ***********************
       * DRAW HORIZONTAL LEGENDS
       * ***********************
       */
      


      return;
    }

    /**
     * *********************
     * DRAW VERTICAL LEGENDS
     * *********************
     */
  }
}

