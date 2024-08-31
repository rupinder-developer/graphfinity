import Theme from '@/core/theme';

/**
 * *******************
 * Chart Configuration
 * *******************
 */
export interface ChartInterface {
  theme: Theme;
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
  alignment: 'center' | 'start';
  gap: number;
  font: {
    size: number;
    color: string;
  };
  shape: {
    type: 'circle' | 'square';
    size: number;
  };
  controllers: {
    size: number;
    color: {
      active: string;
      disable: string;
    };
  };
}

interface HorizonalLegend extends LegendBase {
  layout: 'horizontal';
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
export interface TooltipInterface {}

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
