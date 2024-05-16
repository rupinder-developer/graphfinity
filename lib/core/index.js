// Dependencies
import { EventEmitter } from 'events';
import Theme from '../core/theme.js';
// Constants
import * as EVENT from '../core/constants/event.js';
/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
    constructor() {
        // Event Emitter
        this._emitter = new EventEmitter();
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
                colorScheme: Theme.material
            },
            legend: {
                display: true,
                toggle: true
            },
            tooltip: {}
        };
        this._animation = null;
        /**
         * This variable stores the error thrown by the chart before
         * the final render that is before calling draw() method.
         */
        this._preRenderError = null;
    }
    /**
     * This method is used to emit an event for all the errors
     * occur in the library.
     *
     * @param {*} exception
     */
    _throw(exception) {
        setTimeout(() => {
            this._emitter.emit(EVENT.ERROR, exception);
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
    _chevron(element, width, height) {
        const chevron = element.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', '0 0 16 16');
        chevron.append('path')
            .attr('fill-rule', 'evenodd')
            .attr('d', 'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z');
        return chevron;
    }
    /**
     * This method is employed to verify whether the chart can be rendered without
     * errors or if there is any possibility of encountering an error.
     */
    _validate() {
        if (this._element == null) {
            return false;
        }
        else if (this._data == null) {
            return false;
        }
        return true;
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
//# sourceMappingURL=index.js.map