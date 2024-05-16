// Dependencies
import * as d3 from 'd3';
// Requirements
import Core from '../core/index.js';
import DataTable from '../helpers/data-table.js';
// Constants
import * as EVENT from '../core/constants/event.js';
import * as ERROR_MESSAGE from '../core/constants/error-message.js';
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
        this._options.chart = Object.assign(Object.assign({}, this._options.chart), options);
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
        this._animation = Object.assign({ time: 750 }, options);
        return this;
    }
    /**
     * This method is used to set legend configuration.
     *
     * @param {object} options
     * @returns {this}
     */
    legend(options = {}) {
        this._options.legend = Object.assign(Object.assign({}, this._options.legend), options);
        return this;
    }
    /**
     * This method is used to set tooltip configuration
     *
     * @param {object} options
     * @returns {this}
     */
    tooltip(options = {}) {
        this._options.tooltip = Object.assign(Object.assign({}, this._options.tooltip), options);
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
            this._throw(ERROR_MESSAGE.ELEMENT_NOT_FOUND(element));
        }
        else {
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
        if (type == EVENT.ERROR) {
            this._emitter.on(EVENT.ERROR, cb);
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
        if (this._validate()) {
            // Final Render
            try {
                // return this._draw();
            }
            catch (e) {
                this._throw(e);
            }
        }
    }
}
//# sourceMappingURL=chart.js.map