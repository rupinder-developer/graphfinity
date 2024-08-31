// Dependencies
import EventEmitter from 'events';

// Requirements
import DataTable from '@/helpers/data-table';
import Theme from '@/core/theme';
import Legend from '@/core/legend';

// Interfaces
import OptionsInterface, {
  AnimationInterface,
} from '@/core/interfaces/options';
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
  protected _data!: DataTable;

  // Width of the chart
  protected _width!: number;

  // Height of the chart
  protected _height!: number;

  // Selected Element
  protected _element: d3.Selection<
    HTMLElement,
    unknown,
    HTMLElement,
    any
  > | null = null;

  /**
   * Chart Wrapper
   *
   * <div> element appended within the selected element (this._element),
   */
  protected _wrapper!: d3.Selection<
    HTMLElementTagNameMap['div'],
    unknown,
    HTMLElement,
    any
  >;

  /**
   * Chart Container (where the chart will be drawn)
   *
   * <div> element appended within the Chart Wrapper,
   */
  protected _graph!: d3.Selection<
    HTMLElementTagNameMap['div'],
    unknown,
    HTMLElement,
    any
  >;

  // Configuration for Chart, Legend & Tooltip
  protected _options: OptionsInterface = {
    chart: {
      // Default Theme
      theme: new Theme('material'),
    },
    legend: {
      display: true,
      toggle: true,
      behaviour: 'controllers',
      layout: 'horizontal',
      position: 'bottom',
      alignment: 'center',
      gap: 5,
      font: {
        size: 16,
        color: '#000',
      },
      shape: {
        type: 'square',
        size: 15,
      },
      controllers: {
        size: 15,
        color: {
          active: '#000',
          disable: '#ccc',
        },
      },
    },
    tooltip: {},
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
    legend: Legend | null;
  } = {
    legend: null,
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
   * This method is employed to verify whether the chart can be rendered without
   * errors or if there is any possibility of encountering an error.
   */
  protected _validate() {
    if (this._preRenderException != null) {
      throw new Exception(this._preRenderException);
    } else if (this._element == null) {
      throw new Exception(EXCEPTION.FAILED_ELEMENT_BIND);
    } else if (!this._data) {
      throw new Exception(EXCEPTION.FAILED_DATA_BIND);
    }
  }
}
