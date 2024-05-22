// Requirements
import ExceptionInterface from "@/core/interfaces/exception";

/**
 * Class Name: Error
 * Description: This class used to handle error
 */
export default class Exception {
  // Exception Object
  exception: ExceptionInterface;

  constructor(exception: ExceptionInterface) {
    this.exception = exception;
  }
}