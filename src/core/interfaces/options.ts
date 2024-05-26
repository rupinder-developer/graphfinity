/**
 * *******************
 * Chart Configuration
 * *******************
 */
export interface ChartInterface {
  theme: string[]
}


/**
 * ********************
 * Legend Configuration
 * ********************
 */
interface LegendBase {
  display: boolean;
  toggle: boolean;
  behaviour: 'controllers' | 'scroll';
}

interface HorizonalLegend extends LegendBase {
  layout: 'horizontal'
  position: 'top' | 'bottom';
}

interface VerticalLegend extends LegendBase {
  layout: 'vertical';
  position: 'left' | 'right';
}

export type LegendInterface = HorizonalLegend | VerticalLegend;

/**
 * *********************
 * Tooltip Configuration
 * *********************
 */
export interface TooltipInterface {

}

/**
 * ***********************
 * Animation Configuration
 * ***********************
 */
export interface AnimationInterface {
  time: number;
}


/**
 * **********************
 * Combined Configuration
 * **********************
 */
export default interface OptionsInterface {
  chart: ChartInterface;
  legend: LegendInterface;
  tooltip: TooltipInterface;
}