import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../todos/services/todos.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../todos/types/filter.enum';
import { TodoComponent } from '../../todos/components/todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;
  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  });

  noTodosClass = computed(() => this.todosService.todosSig().length === 0);

  isAllTodosSelected = computed(() =>
    this.todosService.todosSig().every((todo) => todo.isCompleted)
  );

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.todosService.toggleAll(target.checked);
  }
}
