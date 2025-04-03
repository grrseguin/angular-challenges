import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({
  name: 'personUtils',
  standalone: true,
})
export class PersonUtilsPipe implements PipeTransform {
  transform<
    R extends ReturnType<(typeof PersonUtils)[M]>,
    M extends keyof typeof PersonUtils,
  >(method: M, ...args: Parameters<(typeof PersonUtils)[M]>): R {
    return (PersonUtils[method] as Function)(...args);
  }
}
