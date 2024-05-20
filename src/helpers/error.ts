// Requirements
import ErrorInterface from "@/core/interfaces/error";

// Constants
import * as EVENT from '@/core/constants/event';

/**
 * Class Name: Error
 * Description: This class used to handle error
 */
export default class Error {
  // Error Object
  error: ErrorInterface;

  constructor(error: ErrorInterface) {
    this.error = error;
  }
}