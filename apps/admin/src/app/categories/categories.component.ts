import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubscription$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private messageService: MessageService,
    private categoriesServive: CategoriesService,
    private confirmationService: ConfirmationService) { }
  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  ngOnInit(): void {
    this._getCategories();
  }
  private _getCategories() {
    this.categoriesServive.getCategories().pipe(takeUntil(this.endSubscription$)).subscribe(response => {
      this.categories = response;
    })
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the category?',
      icon: 'pi pi-exclamation-triangle',
      header: 'Delete Category',
      accept: () => {
        this.categoriesServive.deleteCategory(categoryId).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category got deleted' });
          this._getCategories();
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not got deleted' });
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'Warn', summary: 'Warn', detail: 'Cancel category deletion' });
      }
    });


  }
  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`category/form/${categoryId}`);
  }
}
