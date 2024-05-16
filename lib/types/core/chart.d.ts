import Core from '../../core/index.js';
import DataTable from '../../helpers/data-table.js';
/**
 * Class Name: Chart
 * Description: All chart types should extend or inherit from this class because
 *              it encompasses shared methods and properties.
 */
export default class Chart extends Core {
    constructor();
    /**
     * This method is used to set chart configuration.
     *
     * @param {object} options
     * @returns {this}
     */
    options(options: any): this;
    /**
     * This method is used to set configuration related to chart animation.
     *
     * @param {object} options
     * @returns {this}
     */
    animate(options?: {}): this;
    /**
     * This method is used to set legend configuration.
     *
     * @param {object} options
     * @returns {this}
     */
    legend(options?: {}): this;
    /**
     * This method is used to set tooltip configuration
     *
     * @param {object} options
     * @returns {this}
     */
    tooltip(options?: {}): this;
    /**
     *
     * @param {object} data Instance of DataTable Class
     * @returns {this}
     */
    bind(data: DataTable): this;
    /**
     * Bind DOM Element with chart
     *
     * @param {*} element DOM Element/Element ID/Element Class
     */
    element(element: string): this;
    /**
     * This method is used to listen on the events or the errors thrown
     * by the chart.
     *
     * Supported Targets: `chart`, `legend-text`, `legend-shape`
     *
     * @param {string} type enum(error, click:target, mouseout:target, mouseover:target, mousemove:target)
     * @param {function} cb
     */
    on(type: string, cb: any): void;
    /**
     * This method helps to draw chart and also validate before the final render.
     */
    draw(): void;
}
