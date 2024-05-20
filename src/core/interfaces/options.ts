export interface ChartInterface {
  theme: string[]
}

export interface LegendInterface {
  display: boolean, 
  toggle: boolean
}

export interface TooltipInterface {

}

export interface AnimationInterface {
  time: number
}

export default interface OptionsInterface {
  chart: ChartInterface,
  legend: LegendInterface,
  tooltip: TooltipInterface
}