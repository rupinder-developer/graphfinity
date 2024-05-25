// Dependencies
import * as d3 from 'd3';

// Requirements
import Core from '@/core';
import DataTable from '@/helpers/data-table';

// Interfaces
import { 
  AnimationInterface,
  ChartInterface,
  LegendInterface,
  TooltipInterface
} from '@/core/interfaces/options';

// Constants
import * as EVENT from '@/core/constants/event';
import * as EXCEPTION from '@/core/constants/exception';

/**
 * Class Name: Chart
 * Description: All chart types should extend or inherit from this class because 
 *              it encompasses shared methods and properties.
 */
export default abstract class Chart extends Core {
  constructor() {
    super();
  }

  /**
   * This method is used to draw the chart and needs to be overridden by the child class,
   * where all the implementation of the chart will be done.
   * 
   * 
   * @throws {Exception} - Throws if an error/exception condition is met.
   */
  protected abstract _draw(): () => void;

  /** 
   * This method is used to set chart configuration.
   * 
   * @param options 
   */
  options(options: Partial<ChartInterface>) {
    this._options.chart = { ...this._options.chart, ...options };

    return this;
  }

  /**
   * This method is used to set configuration related to chart animation.
   * 
   * @param options 
   */
  animate(options: Partial<AnimationInterface> = {}) {
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
   * @param options 
   */
  legend(options: Partial<LegendInterface> = {}) {
    this._options.legend = {
      ...this._options.legend,
      ...options
    }
    return this;
  }

  /**
   * This method is used to set tooltip configuration
   * 
   * @param options
   */
  tooltip(options: Partial<TooltipInterface> = {}) {
    this._options.tooltip = {
      ...this._options.tooltip,
      ...options
    }
    return this;
  }

  /**
   * This method is used to bind data for the chart.
   * 
   * @param data Instance of DataTable Class 
   */
  bind(data: DataTable) {
    if (data instanceof DataTable) {
      this._data = data;
    } else {
      this._preRenderException = EXCEPTION.FAILED_DATA_BIND_INVALID;
    }

    return this;
  }

  /**
   * Bind DOM Element with chart
   * 
   * @param selector Query Selector
   */
  element(selector: string) {
    // Selecting DOM Element (D3 Instance)
    this._element = d3.select<HTMLElement, unknown>(selector);

    // HTML Element
    const node = this._element.node();

    if (!node) {
      // If element not exists in DOM 
      this._element = null;

      this._preRenderException = EXCEPTION.ELEMENT_NOT_FOUND(selector);
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
   * This method is used to listen on the events or the errors/exceptions thrown 
   * by the chart.
   * 
   * Supported Targets: `chart`, `legend-text`, `legend-shape`
   * 
   * @param type enum(exception, click:target, mouseout:target, mouseover:target, mousemove:target)
   * @param cb 
   */
  on(type: string, cb: (event: any, data: any) => void ) {
    type = `${type}`.trim();

    if (type == EVENT.EXCEPTION) {
      this._emitter.on(EVENT.EXCEPTION, cb);
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

  /**
   * This method helps to draw chart and also validate before the final render.
   */
  draw() {
    try {
      this._validate();
      return this._draw();
    } catch (e) {
      if (e instanceof Exception) {
        this._emitException(e.exception);
      }

      return null;
    }
  }
}