import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  edditMode = false;
  isSubmited = false;
  currentId = '';
  endSubscription$: Subject<any> = new Subject();
  constructor(
    private formBuilder: FormBuilder, private categoriesServive: CategoriesService,
    private messageService: MessageService, private location: Location,
    private router: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
    this._checkEditMode();
  }
  private _checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.edditMode = true;
        this.currentId = params['id'];
        this.categoriesServive.getSingleCategory(params['id']).pipe(takeUntil(this.endSubscription$)).subscribe(res => {
          this.categoryForm['name'].setValue(res.name);
          this.categoryForm['icon'].setValue(res.icon);
          this.categoryForm['color'].setValue(res.color);
        })
      };
    })
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) return;
    const category: Category = {
      id: this.currentId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,
    }
    if (this.edditMode) return this.categoriesServive.updateCategory(category, this.currentId).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated' });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not updated' });
      this.isSubmited = false;
    });
    return this.categoriesServive.createCategory(category).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category created' });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not created' });
      this.isSubmited = false;
    });

  }
  enableButton() {
    this.isSubmited = false;
  }
  get categoryForm() {
    return this.form.controls;
  }
}
