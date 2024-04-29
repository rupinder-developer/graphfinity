import { EventEmitter } from 'events';

/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
  constructor() {
    // Event Emitter
    this._emitter = new EventEmitter();

    // Event Types (ENUM)
    this._event = Object.freeze({
      ERROR: 'error',
      CLICK: 'click',
      MOUSEOVER: 'mouseover',
      MOUSEOUT: 'mouseout',
      MOUSEMOVE: 'mousemove'
    });

    // Event Targets (ENUM)
    this._eventTarget = Object.freeze({
      CHART: 'chart',
      LEGEND_TEXT: 'legend-text',
      LEGEND_SHAPE: 'legend-shape'
    });

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
      chart: {},
      legend: {},
      tooltip: {}
    };

    // Chart Animation Configuration
    this._animation = {}
  }
}

