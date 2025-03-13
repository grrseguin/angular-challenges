import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

export const TodosStore = signalStore(
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    initialize: rxMethod<void>(
      pipe(
        switchMap(() =>
          todoService.getTodos().pipe(
            tapResponse({
              next: (todos) => patchState(store, { todos }),
              error: (error) => {
                console.error(error);
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
