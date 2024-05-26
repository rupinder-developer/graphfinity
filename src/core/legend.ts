// Dependencies
import EventEmitter from 'events';

// Requirements
import { LegendInterface } from "@/core/interfaces/options";

/**
 * Class Name: Legend
 * Description: This class helps to generate legend for the chart.
 */
export default class Legend {

  constructor(
    // Legend options/configuration
    protected _options: LegendInterface,

    // Event Emitter
    protected _emitter: EventEmitter,

    // Chart Theme
    protected _theme: string[]
  ) { }


  draw(element: HTMLElement) {
    if (!this._options.display) {
      return;
    }

  }


}