// Requirements
import { ExceptionInterface } from '@/core/interfaces/exception';

/**
 * Class Name: Exception
 * Description: This class used to handle error/exception
 */
export default class Exception {
  // Exception Object
  exception: ExceptionInterface;

  constructor(exception: ExceptionInterface) {
    this.exception = exception;
  }
}

(global as any).Exception = Exception;
