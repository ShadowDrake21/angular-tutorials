import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable, map } from 'rxjs';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  todosService = inject(TodosService);
  noTodosClass$!: Observable<boolean>;
  activeCount$!: Observable<number>;
  itemsLeftText$!: Observable<string>;
  filter$!: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  ngOnInit(): void {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.filter$ = this.todosService.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
