// Dependencies
import EventEmitter from 'events';

// Requirements
import DataTable from '@/helpers/data-table';
import Theme from '@/core/theme';
import Legend from '@/core/legend';

// Interfaces
import OptionsInterface, { AnimationInterface } from '@/core/interfaces/options';
import { ExceptionInterface } from '@/core/interfaces/exception';

// Constants
import * as EVENT from '@/core/constants/event';
import * as EXCEPTION from '@/core/constants/exception';

/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
  // Event Emitter
  protected _emitter = new EventEmitter();

  // Chart Data 
  protected _data: DataTable | null = null;

  // Width of the chart
  protected _width!: number;

  // Height of the chart
  protected _height!: number;

  // Selected Element
  protected _element: d3.Selection<HTMLElement, unknown, HTMLElement, any> | null = null;

  /**
   * Chart Wrapper
   * 
   * These are the <div> elements appended within the selected element (this._element), 
   * within which all the charts are drawn.
   */
  protected _outerWrapper: d3.Selection<HTMLElementTagNameMap['div'], unknown, HTMLElement, any> | null = null;
  protected _innerWrapper: d3.Selection<HTMLElementTagNameMap['div'], unknown, HTMLElement, any> | null = null;

  // Configuration for Chart, Legend & Tooltip
  protected _options: OptionsInterface = {
    chart: {
      // Default Theme
      theme: new Theme('material')
    },
    legend: {
      display: true,
      toggle: true,
      behaviour: 'controllers',
      layout: 'vertical',
      position: 'right'
    },
    tooltip: {}
  };

  protected _animation: AnimationInterface | null = null;

  /**
   * This variable stores the error/exception thrown by the chart before
   * the final render that is before calling draw() method.
   */
  protected _preRenderException: ExceptionInterface | null = null;

  /**
   * The `_singleton` variable holds instances of the core classes from Graphifinity 
   * and ensures that these instances maintain singleton behavior.
   */
  protected _singleton: {
    legend: Legend | null 
  } = {
    legend: null
  };

  /**
   * This method is used to emit an event for all the errors/exceptions
   * occur in the library.
   * 
   * @param exception 
   */
  protected _emitException(exception: ExceptionInterface) {
    setTimeout(() => {
      this._emitter.emit(EVENT.EXCEPTION, exception);
    }, 0);
  }

  /**
   * Used to draw chevron icon.
   * 
   * @param element Parent Element
   * @param width 
   * @param height 
   */
  protected _chevron(element: d3.Selection<HTMLElement | SVGElement, unknown, HTMLElement, any>, width: number, height: number) {
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
  protected _validate() {
    if (this._preRenderException != null) {
      throw new Exception(this._preRenderException);
    } else if (this._element == null) {
      throw new Exception(EXCEPTION.FAILED_ELEMENT_BIND);
    } else if (this._data == null) {
      throw new Exception(EXCEPTION.FAILED_DATA_BIND);
    }
  }
}

