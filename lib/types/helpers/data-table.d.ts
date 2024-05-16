/**
 * Class Name: DataTable
 * Description: The class stores all the data for the chart and includes methods
 *              for evaluating values that assist in generating charts.
 */
export default class DataTable {
    _columns: any[];
    _rows: any[];
    constructor(columns?: any[], rows?: any[]);
    set rows(rows: any[]);
    get rows(): any[];
    set columns(columns: any[]);
    get columns(): any[];
}
