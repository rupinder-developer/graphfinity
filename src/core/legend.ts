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

  // Lagend Container Node
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
   *                   occupied by the chart container, ranging from 0.5 to 0.8.
   *
   * @return Chart Container
   */
  _setup(labels: string[], areaOffset: number = 0.8) {
    areaOffset = Math.min(0.8, Math.max(0.5, areaOffset)) * 100;
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

    // Create legend container based on its position
    switch (this._options.position) {
      case 'left':
      case 'right':
        if (!legend.node()) {
          legend = this._graph.append('div');
        }
        legend
          .style('width', `${100 - areaOffset}%`)
          .style('height', '100%')
          .style('float', this._options.position);
        graph
          .style('width', `${areaOffset}%`)
          .style('height', '100%')
          .style(
            'float',
            this._options.position === 'right' ? 'left' : 'right'
          );

        const clear = this._graph.select('div._g_clear_float');
        if (!clear.node()) {
          this._graph
            .append('div')
            .attr('class', '_g_clear_float')
            .style('clear', 'both');
        }
        break;

      case 'top':
        if (!legend.node()) {
          legend = this._graph.insert('div', ':first-child');
        }
        legend
          .style('width', '100%')
          .style('max-height', `${100 - areaOffset}%`);
        graph.style('width', '100%');
        break;

      case 'bottom':
        if (!legend.node()) {
          legend = this._graph.append('div');
        }
        legend
          .style('width', '100%')
          .style('max-height', `${100 - areaOffset}%`);
        graph.style('width', '100%');
        break;
    }

    legend.attr('class', '_g_legend_');

    this._node = legend.node();

    return graph;
  }
}
