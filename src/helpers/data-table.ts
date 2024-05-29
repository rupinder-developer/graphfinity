// Types for DataTable Class
type ColumnsType = string[];
type RowsType = [string | number | Date, ...number[]][];

/**
 * Class Name: DataTable
 * Description: This class stores all the data for the chart and includes methods
 *              for evaluating values that assist in generating charts.
 */
export default class DataTable {
  columns: ColumnsType = [];
  rows: RowsType = [];

  constructor(data: [ColumnsType, ...RowsType] = [[]]) {
    this.columns = data[0];
    this.rows = data.slice(1) as RowsType;
  }
}
