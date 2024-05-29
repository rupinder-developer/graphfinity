/**
 * This file contains the error/exception messages
 */

import { ExceptionInterface } from '@/core/interfaces/exception';

export const UNKNOWN_EXCEPTION: ExceptionInterface = {
  code: -1,
  message: 'Unknow exception thrown by the chart.',
};

export const ELEMENT_NOT_FOUND = (selector: string): ExceptionInterface => ({
  code: 1,
  message: `Failed to bind DOM element. Unable to find the element within the document that matches \`${selector}\`.`,
});

export const FAILED_ELEMENT_BIND: ExceptionInterface = {
  code: 2,
  message:
    'Failed to bind the DOM element. Use the element() method to bind the DOM element on which you want to draw the chart.',
};

export const FAILED_DATA_BIND_INVALID: ExceptionInterface = {
  code: 3,
  message:
    'Failed to bind data with the chart. Make sure to use the DataTable class for data binding.',
};

export const FAILED_DATA_BIND: ExceptionInterface = {
  code: 4,
  message:
    'Failed to bind data with the chart. Use the bind() method to bind the data.',
};
