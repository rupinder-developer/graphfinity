/**
 * Class Name: DataTable
 * Description: The class stores all the data for the chart and includes methods 
 *              for evaluating values that assist in generating charts.
 */
export default class DataTable {
    _columns: any[];
    _rows: any[];

    constructor(columns: any[] = [], rows: any[] = []) {
        this._columns = columns;
        this._rows = rows;
    }

    set rows(rows) {
        this._rows = rows;
    }

    get rows() {
        return this._rows;
    }

    set columns(columns) {
        this._columns = columns;
    }

    get columns() {
        return this._columns;
    }
}