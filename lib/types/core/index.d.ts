/// <reference types="node" />
import { EventEmitter } from 'events';
import DataTable from '../../helpers/data-table.js';
/**
 * Class Name: Core
 * Description: This class contains all the internal methods for Graphfinity.
 */
export default class Core {
    protected _emitter: EventEmitter;
    protected _data: DataTable;
    protected _width: number;
    protected _height: number;
    protected _element: d3.Selection<HTMLElement, unknown, HTMLElement, any> | null;
    /**
     * Chart Wrapper (D3 Instance)
     *
     * These are the <div> elements appended within the selected element (this._element),
     * within which all the charts are drawn.
     */
    protected _outerWrapper: d3.Selection<HTMLElementTagNameMap['div'], unknown, HTMLElement, any> | null;
    protected _innerWrapper: d3.Selection<HTMLElementTagNameMap['div'], unknown, HTMLElement, any> | null;
    protected _options: {
        chart: any;
        legend: any;
        tooltip: any;
    };
    protected _animation: {
        time: number;
    } | null;
    /**
     * This variable stores the error thrown by the chart before
     * the final render that is before calling draw() method.
     */
    protected _preRenderError: null;
    /**
     * This method is used to emit an event for all the errors
     * occur in the library.
     *
     * @param {*} exception
     */
    protected _throw(exception: any): void;
    /**
     * Used to draw chevron icon.
     *
     * @param {object} element Parent Element (D3 Instance)
     * @param {number} width
     * @param {number} height
     *
     * @return {object} D3 Instance
     */
    protected _chevron(element: any, width: any, height: any): any;
    /**
     * This method is employed to verify whether the chart can be rendered without
     * errors or if there is any possibility of encountering an error.
     */
    protected _validate(): boolean;
    protected _drawLegends(element: any, type?: string): void;
}
