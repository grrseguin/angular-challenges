import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AltWrapFnPipe } from './alt-wrap-fn.pipe';
import { Person } from './Person';
import { WrapFnPipe } from './wrap-fn.pipe';

@Component({
  imports: [NgFor, WrapFnPipe, AltWrapFnPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person | wrapFn: showName(index) }}
      {{ person | wrapFn: isAllowed(isFirst) }}

      {{ altShowName | altWrapFn: person.name : index }}
    </div>
  `,
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  altShowName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
  altIsAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }

  showName(index: number) {
    // very heavy computation
    return (person: Person) => `${person.name} - ${index}`;
  }

  isAllowed(isFirst: boolean) {
    return (person: Person) => {
      if (isFirst) {
        return 'always allowed';
      } else {
        return person.age > 25 ? 'allowed' : 'declined';
      }
    };
  }
}
