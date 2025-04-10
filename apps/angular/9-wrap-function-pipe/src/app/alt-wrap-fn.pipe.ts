import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'altWrapFn',
  standalone: true,
})
export class AltWrapFnPipe implements PipeTransform {
  transform<R, F extends (...args: any[]) => R>(
    func: F,
    ...args: Parameters<F>
  ): R {
    return func(...args);
  }
}
