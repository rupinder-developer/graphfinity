// Requirements
import ExceptionInterface from '@/core/interfaces/exception';

declare global {
  class Exception {
    exception: ExceptionInterface;

    constructor(exception: ExceptionInterface);
  }
}

export {};
