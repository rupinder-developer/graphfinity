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
  private _labels: {
    value: string;
    fill: string;
    dispatch: (() => void) | null;
  }[] = [];

  constructor(
    // Legend options/configuration
    private _options: LegendInterface,

    // Event Emitter
    private _emitter: EventEmitter,

    // Chart Theme
    private _theme: Theme
  ) {}

  /**
   * This method is used to draw legend for the chart.
   *
   * @param element
   */
  draw(element: HTMLElement) {
    if (!this._options.display || this._labels.length == 0) {
      return;
    }
  }

  /**
   * This method is used to set labels for legend.
   *
   * @param labels
   */
  _setLabels(labels: string[]) {
    this._labels = labels.map((label, index) => ({
      value: label,
      fill: this._theme.getColor(index),
      dispatch: null,
    }));
  }
}
