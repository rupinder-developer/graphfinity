// Dependencies
import EventEmitter from 'events';

// Requirements
import { LegendInterface } from '@/core/interfaces/options';
import Theme from '@/core/theme';

/**
 * Class Name: Legend
 * Description: This class helps to generate legend for the chart.
 */
export default class Legend {
  // Legend Labels
  private _labels: {
    value: string;
    fill: string;
    dispatch: (() => void) | null;
  }[] = [];

  // Legend Container Node
  private _node: HTMLElement | null = null;

  constructor(
    // Event Emitter
    private _emitter: EventEmitter,

    // Chart Container
    private _graph: d3.Selection<
      HTMLElementTagNameMap['div'],
      unknown,
      HTMLElement,
      any
    >,

    // Legend Options/Configuration
    private _options: LegendInterface,

    // Chart Theme
    private _theme: Theme
  ) {
    // Validating Legend Options
    if (this._options.display) {
      switch (this._options.position) {
        case 'right':
        case 'left':
          this._options.layout = 'vertical';
          break;
        case 'top':
        case 'bottom':
          this._options.layout = 'horizontal';
          break;

        default:
          (this._options as LegendInterface).position = 'top';
          (this._options as LegendInterface).layout = 'horizontal';
      }
    }
  }

  /**
   * This method is used to draw legend for the chart.
   *
   * @param element
   */
  draw(element: HTMLElement | null = this._node) {
    if (!this._options.display || !element || this._labels.length === 0) {
      return;
    }
  }

  /**
   * This method initializes the labels for the legend and creates container elements for
   * the legend (where the legend will be drawn) and the chart (where the chart will be drawn).
   *
   * @param labels
   * @param areaOffset It is used to indicate how much area is
   *                   occupied by the legend container, ranging from 0.2 to 0.5.
   *
   * @return Chart Container
   */
  _setup(labels: string[], areaOffset: number = 0.2) {
    areaOffset = Math.min(0.5, Math.max(0.2, areaOffset)) * 100;
    this._labels = labels.map((label, index) => ({
      value: label,
      fill: this._theme.getColor(index),
      dispatch: null,
    }));

    if (!this._options.display) {
      return this._graph;
    }

    let graph: d3.Selection<
      HTMLElementTagNameMap['div'],
      unknown,
      HTMLElement,
      any
    > = this._graph.select('div._g_graph_');

    if (!graph.node()) {
      graph = this._graph.append('div').attr('class', '_g_graph_');
    }

    let legend: d3.Selection<
      HTMLElementTagNameMap['div'],
      unknown,
      HTMLElement,
      any
    > = this._graph.select('div._g_legend_');

    /**
     * ***********************
     * Create Legend Container
     * ***********************
     */
    if (
      this._options.position === 'left' ||
      this._options.position === 'right'
    ) {
      if (!legend.node()) {
        legend = this._graph.append('div');
      }
      legend
        .style('width', `${areaOffset}%`)
        .style('height', '100%')
        .style('float', this._options.position);
      graph
        .style('width', `${100 - areaOffset}%`)
        .style('height', '100%')
        .style('float', this._options.position === 'right' ? 'left' : 'right');

      if (!this._graph.select('div._g_clear_float').node()) {
        this._graph
          .append('div')
          .attr('class', '_g_clear_float')
          .style('clear', 'both');
      }
    } else if (
      this._options.position === 'top' ||
      this._options.position === 'bottom'
    ) {
      if (!legend.node()) {
        legend =
          this._options.position === 'top'
            ? this._graph.insert('div', ':first-child')
            : this._graph.append('div');
      }
      legend.style('width', '100%').style('max-height', `${areaOffset}%`);
      graph.style('width', '100%');
    }

    legend.attr('class', '_g_legend_');

    this._node = legend.node();

    return graph;
  }
}
