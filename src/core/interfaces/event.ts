// Requirements
import * as EVENT from '@/core/constants/event';
import * as EVENT_TARGET from '@/core/constants/event-target';

type EventType = 
  | typeof EVENT.CLICK 
  | typeof EVENT.MOUSEOVER
  | typeof EVENT.MOUSEOUT
  | typeof EVENT.MOUSEMOVE;

type EventTargetType = 
  | typeof EVENT_TARGET.CHART
  | typeof EVENT_TARGET.LEGEND

export type EventTargetInterface = `${EventType}:${EventTargetType}` | typeof EVENT.EXCEPTION;