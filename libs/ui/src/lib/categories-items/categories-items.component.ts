import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@frontend/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'categories-items',
  templateUrl: './categories-items.component.html',
})
export class CategoriesItemsComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject;
  categories: Category[] = [];
  constructor(private categoryService: CategoriesService) { }
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
  ngOnInit(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((cat) => {
      this.categories = cat
    })
  }
}
