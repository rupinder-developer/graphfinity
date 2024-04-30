import Chart from '@/core/chart';
import * as d3 from 'd3';

export default class Pie extends Chart {
  constructor() {
    super();
  }

  draw() {
    const render = () => {
      // Color Scheme (Ordinal Scale) 
      const color = d3.scaleOrdinal(this._options.chart.colorScheme); 
      
      
    };

    render();

    return render;
  }
}