/**
 * This file contains the error messages
 */

import ErrorInterface from "@/core/interfaces/error";

export const ELEMENT_NOT_FOUND = (selector: string): ErrorInterface => ({
  errorCode: 1, 
  errorMessage: `Failed to bind DOM element. Unable to find the element within the document that matches \`${selector}\`.`
});

export const FAILED_ELEMENT_BIND: ErrorInterface = {
  errorCode: 2,
  errorMessage: 'Failed to bind the DOM element. Use the element() method to bind the DOM element on which you want to draw the chart.'
}

export const FAILED_DATA_BIND_INVALID: ErrorInterface  = {
  errorCode: 3,
  errorMessage: 'Failed to bind data with the chart. Make sure to use the DataTable class for data binding.'
};

export const FAILED_DATA_BIND: ErrorInterface ={
  errorCode: 4,
  errorMessage: 'Failed to bind data with the chart. Use the bind() method to bind the data.'
};