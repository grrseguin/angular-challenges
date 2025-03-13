import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service';

describe('AppComponent', () => {
  // let appComponent: AppComponent;

  const todo = {
    userId: 0,
    id: 0,
    title: 'title',
    completed: true,
  };

  class MockTodoService {
    getTodos = () => of([todo]);
    updateTodo = () => of();
    deleteTodo = () => of();
  }

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   providers: [
    //     AppComponent,
    //     {
    //       provide: TodoService,
    //       useClass: MockTodoService,
    //     },
    //   ],
    // });
    // appComponent = TestBed.inject(AppComponent);
  });

  it('should load todos', async () => {
    // GIVEN
    // WHEN
    const appComponent = await render(AppComponent, {
      providers: [
        AppComponent,
        {
          provide: TodoService,
          useClass: MockTodoService,
        },
      ],
    });

    // THEN
    expect(appComponent.fixture.componentInstance.todos()).toEqual([todo]);
    await appComponent.findByText(todo.title);
  });
});
