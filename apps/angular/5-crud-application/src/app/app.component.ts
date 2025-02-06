import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.todos.update((todos) =>
        todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
      );
    });
  }
}
