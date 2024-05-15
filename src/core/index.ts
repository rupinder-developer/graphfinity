import { EventEmitter } from 'events';
import * as colors from '@/helpers/color-scheme';
import CONSTANTS from '@/core/constants';
import DataTable from '@/helpers/data-table';

/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
  // Event Emitter
  _emitter: EventEmitter =  new EventEmitter();

  // Chart Data 
  _data!: DataTable;

  // Width of the chart
  _width!: number;

  // Height of the chart
  _height!: number;

  // Selected Element (D3 Instance)
  _element: d3.Selection<HTMLElement, unknown, HTMLElement, any> | null = null;

  /**
   * Chart Wrapper (D3 Instance)
   * 
   * These are the <div> elements appended within the selected element (this._element), 
   * within which all the charts are drawn.
   */
   _outerWrapper: d3.Selection<HTMLElementTagNameMap['div'], unknown, HTMLElement, any> | null = null;
   _innerWrapper: d3.Selection<HTMLElementTagNameMap['div'], unknown, HTMLElement, any> | null = null;

  // Configuration for Chart, Legend & Tooltip

  _options: {
    chart: any,
    legend: any, 
    tooltip: any
  } = {
    chart: {
      // Default Color Scheme
      colorScheme: colors.get('material')
    },
    legend: {
      display: true, 
      toggle: true
    },
    tooltip: {}
  };

  _animation: { time: number } | null = null;

   /**
     * This variable stores the error thrown by the chart before
     * the final render that is before calling draw() method.
     */
   _preRenderError = null;
  

  constructor() {}


  /**
   * This method is used to emit an event for all the errors
   * occur in the library.
   * 
   * @param {*} exception 
   */
  _throw(exception: any) {
    setTimeout(() => {
      this._emitter.emit(CONSTANTS.EVENT.TYPE.ERROR, exception);
    }, 0);
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
  _chevron(element: any, width: any, height: any) {
    const chevron = element.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 16 16');

    chevron.append('path')
      .attr('fill-rule', 'evenodd')
      .attr('d', 'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z')

    return chevron;
  }

  /**
   * This method is employed to verify whether the chart can be rendered without 
   * errors or if there is any possibility of encountering an error.
   */
  _validate() {
    if (this._element == null) {
      return false;
    } else if (this._data == null) {
      return false;
    }

    return true;
  }

  _drawLegends(element: any, type = 'horizontal') {
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

