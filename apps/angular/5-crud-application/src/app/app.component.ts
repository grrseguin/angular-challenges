import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from './loading.service';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  imports: [CommonModule, MatProgressSpinner],
  selector: 'app-root',
  template: `
    @if (loadingService.loadingStatus) {
      <mat-progress-spinner
        [mode]="'indeterminate'"
        color="warn"></mat-progress-spinner>
    }
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="deleteTodo(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);

  constructor(
    private todoService: TodoService,
    protected loadingService: LoadingService,
  ) {}

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

  deleteTodo(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(() =>
        this.todos.update((todos) => todos.filter((t) => t.id !== todo.id)),
      );
  }
}
