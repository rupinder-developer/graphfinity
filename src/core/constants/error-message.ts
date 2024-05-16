/**
 * This file contains the error messages
 */

export const ELEMENT_NOT_FOUND = (element: string) => ({
  errorCode: 1, 
  errorMessage: `Failed to bind DOM element \`${element}\` with chart.`
});