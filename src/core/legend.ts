// Dependencies
import * as d3 from 'd3';
import EventEmitter from 'events';

// Requirements
import { LegendInterface } from '@/core/interfaces/options';
import Theme from '@/core/theme';

// Constants
import * as EXCEPTION from '@/core/constants/exception';

// Local Interfaces
interface Label {
  value: string;
  fill: string;
  dispatch: (() => void) | null;
}

/**
 * Class Name: Legend
 * Description: This class helps to generate legend for the chart.
 */
export default class Legend {
  // Legend Labels
  private _labels: Label[] = [];

  // Legend Container Node
  private _node: HTMLElement | null = null;

  // Legend Container Styling
  private _nodeStyling = {
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
    },
  };

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

    if (this._options.layout === 'vertical') {
      this._drawVerticalLegends(element);
    } else if (this._options.layout === 'horizontal') {
      this._drawHorizontalLegends(element);
    }
  }

  /**
   * This method is used to draw legends with vertical layout
   *
   * @param element
   */
  private _drawVerticalLegends(element: HTMLElement) {
    // Adding styles to legend container
    const container = d3
      .select(element)
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('justify-content', this._options.alignment)
      .style('gap', `${this._options.gap}px`)
      .style('overflow', 'hidden');

    // Function used to render legends
    const render = (
      labels: Label[],
      config: {
        visibility: boolean;
        pagination?: {
          legendsPerPage: number;
          currentPage: number;
          totalPages: number;
          legendHeight: number;
        };
      } = { visibility: true }
    ) => {
      // Select all legends within the container
      let legends,
        startIndex = 0,
        endIndex = labels.length;
      if (config.pagination && config.pagination.totalPages > 1) {
        startIndex =
          (config.pagination.currentPage - 1) *
          config.pagination.legendsPerPage;
        endIndex = Math.min(
          config.pagination.currentPage * config.pagination.legendsPerPage,
          labels.length
        );

        legends = container
          .selectAll('._g_legend')
          .data(labels.slice(startIndex, endIndex));
      } else {
        legends = container.selectAll('._g_legend').data(labels);
      }

      // Render each legend
      const legend = legends
        .join('div')
        .attr('class', '_g_legend')
        .style('visibility', config.visibility ? 'visible' : 'hidden')
        .style('display', 'flex')
        .style('flex-direction', 'row')
        .style('justify-content', 'start')
        .style('align-items', 'center')
        .style('padding-left', `${this._nodeStyling.padding.left}px`)
        .style('gap', '5px');

      // Add legend shape
      this._renderLegendShape(legend);

      // Add legend text
      this._renderLegendText(legend);

      // Only for `controllers` behaviour
      if (config.pagination && config.pagination.totalPages > 1) {
        // Appending empty element
        const totalLegendsDrawn = endIndex - startIndex;
        container
          .selectAll('._g_empty_legend')
          .data(
            new Array(
              Math.max(config.pagination.legendsPerPage - totalLegendsDrawn, 0)
            )
          )
          .join('div')
          .attr('class', '_g_empty_legend')
          .style('height', `${legendHeight}px`);

        // Removing Controllers if already in DOM
        container.select('._g_legend_controllers').remove();

        // Render Controllers
        let controllerWrapper = container
          .select<HTMLDivElement>('._g_legend_controllers')
          .raise();

        controllerWrapper = container
          .append('div')
          .attr('class', '_g_legend_controllers')
          .style('display', 'flex')
          .style('flex-direction', 'row')
          .style('align-items', 'center')
          .style('padding-left', `${this._nodeStyling.padding.left}px`);

        // Previous Controller
        this._chevron(
          controllerWrapper,
          this._options.controllers.size,
          this._options.controllers.size
        )
          .attr(
            'fill',
            config.pagination.currentPage === 1
              ? this._options.controllers.color.disable
              : this._options.controllers.color.active
          )
          .attr('transform', 'rotate(-90)')
          .style('cursor', 'pointer')
          .style('margin-right', '4px')
          .on('click', () => {
            if (config?.pagination && config.pagination.currentPage != 1) {
              render(this._labels, {
                ...config,
                pagination: {
                  ...config.pagination,
                  currentPage: config.pagination.currentPage - 1,
                },
              });
            }
          });

        // Next Controller
        this._chevron(
          controllerWrapper,
          this._options.controllers.size,
          this._options.controllers.size
        )
          .attr(
            'fill',
            config.pagination.currentPage === config.pagination.totalPages
              ? this._options.controllers.color.disable
              : this._options.controllers.color.active
          )
          .attr('transform', 'rotate(90)')
          .style('cursor', 'pointer')
          .on('click', () => {
            if (
              config?.pagination &&
              config.pagination.currentPage != config.pagination.totalPages
            ) {
              render(this._labels, {
                ...config,
                pagination: {
                  ...config.pagination,
                  currentPage: config.pagination.currentPage + 1,
                },
              });
            }
          });
      } else if (config.visibility) {
        // Remove controllers if not needed
        container.select('._g_legend_controllers').remove();
      }

      return legend;
    };

    /**
     * **********************
     * For `scroll` behaviour
     * **********************
     */
    if (this._options.behaviour === 'scroll') {
      // Render Legends
      render(this._labels);

      // Check overflow
      const node = container.node();
      if (node && node.scrollHeight > node.clientHeight) {
        container.style('overflow', null);
        container.style('overflow-y', 'auto');
        container.style('justify-content', 'flex-start');
      }

      return;
    }

    /**
     * ***************************
     * For `controllers` behaviour
     * ***************************
     */

    // Function to calculate legend height
    const calculateLegendHeight = () => {
      // Render dummy legend
      const dummyLegend = render(
        [{ value: 'Dummy Legend', fill: '#000', dispatch: null }],
        { visibility: false }
      );

      // Calculating height of legend
      const legendHeight = (
        dummyLegend.node() as HTMLElement | null
      )?.getBoundingClientRect().height;

      // Remove dummy legend from the DOM.
      dummyLegend.remove();

      return legendHeight;
    };

    const legendHeight = calculateLegendHeight();
    const containerHeight = container.node()?.getBoundingClientRect().height;

    if (!legendHeight || !containerHeight) {
      throw new Exception(EXCEPTION.FAILED_TO_RENDER_LEGEND);
    }

    // Available space in legend container
    const spaceAvailable =
      containerHeight -
      this._nodeStyling.padding.top -
      this._nodeStyling.padding.bottom -
      this._options.controllers.size;

    // Create configuration of legends
    const currentPage = 1;
    const legendsPerPage = Math.max(
      Math.floor(spaceAvailable / (legendHeight + this._options.gap)),
      1
    );
    const totalPages = Math.ceil(this._labels.length / legendsPerPage);

    // Render Legends
    render(this._labels, {
      visibility: true,
      pagination: {
        legendsPerPage,
        currentPage,
        totalPages,
        legendHeight,
      },
    });
  }

  /**
   * This method is used to draw legends with horizontal layout
   *
   * @param element
   */
  private _drawHorizontalLegends(element: HTMLElement) {
    if (this._options.behaviour === 'controllers') {
    } else if (this._options.behaviour === 'scroll') {
    }
  }

  /**
   * This method is used to add/render legend shape to each legend item
   *
   * @param legend
   */
  private _renderLegendShape(
    legend: d3.Selection<
      HTMLDivElement | d3.BaseType,
      Label,
      HTMLElement,
      unknown
    >
  ) {
    const shape = legend
      .selectAll('._g_legend_shape')
      .data((d) => [d])
      .join('div')
      .attr('class', '_g_legend_shape')
      .style('cursor', 'pointer')
      .style('width', `${this._options.shape.size}px`)
      .style('height', `${this._options.shape.size}px`)
      .style('background-color', (d) => d.fill);

    if (this._options.shape.type === 'circle') {
      shape.style('border-radius', '50%');
    } else {
      // Default Shape (Sqaure)
      shape.style('border-radius', '5px');
    }
  }

  /**
   * This method is used to add/render legend text to each legend item
   *
   * @param legend
   */
  private _renderLegendText(
    legend: d3.Selection<
      HTMLDivElement | d3.BaseType,
      Label,
      HTMLElement,
      unknown
    >
  ) {
    legend
      .selectAll('._g_legend_text')
      .data((d) => [d])
      .join('div')
      .attr('class', '_g_legend_text')
      .style('cursor', 'pointer')
      .style('color', this._options.font.color)
      .style('font-size', `${this._options.font.size}px`)
      .style('overflow', 'hidden')
      .style('text-overflow', 'ellipsis')
      .style('white-space', 'nowrap')
      .attr('title', (d) => d.value)
      .text((d) => d.value);
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
    > = this._graph.select('div._g_legends_');

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
        legend = this._graph
          .append('div')
          .attr('class', '_g_legends_')
          .style('padding-top', `${this._nodeStyling.padding.top}px`)
          .style('padding-bottom', `${this._nodeStyling.padding.bottom}px`);
      }
      legend
        .style('width', `${areaOffset}%`)
        .style(
          'height',
          `calc(100% - ${
            this._nodeStyling.padding.top + this._nodeStyling.padding.bottom
          }px)`
        )
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

    this._node = legend.node();

    return graph;
  }

  /**
   * Used to draw chevron icon.
   *
   * @param element Parent Element
   * @param width
   * @param height
   */
  private _chevron(
    element: d3.Selection<HTMLDivElement, unknown, null, undefined>,
    width: number,
    height: number
  ) {
    const chevron = element
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 16 16');

    chevron
      .append('path')
      .attr('fill-rule', 'evenodd')
      .attr(
        'd',
        'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
      );

    return chevron;
  }
}
