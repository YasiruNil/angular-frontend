import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, ProductsService } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  edditMode = false;
  isSubmited = false;
  currentId = '';
  categories: Category[] = [];
  imageDisplay!: string | ArrayBuffer | null;


  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false],
    });
    this._getCategories();
    this._checkEditMode();

  }
  private _checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.edditMode = true;
        this.currentId = params['id'];
        this.productService.getSingleProduct(params['id']).subscribe(res => {
          this.imageDisplay = res.image || '';
          this.productForm['name'].setValue(res.name);
          this.productForm['image'].setValidators([]);
          this.productForm['brand'].setValue(res.brand);
          this.productForm['price'].setValue(res.price);
          this.productForm['image'].updateValueAndValidity();
          this.productForm['category'].setValue(res.category?.id);
          this.productForm['isFeatured'].setValue(res.isFeatured);
          this.productForm['description'].setValue(res.description);
          this.productForm['countInStock'].setValue(res.countInStock);
          this.productForm['richDescription'].setValue(res.richDescription);
        })
      };
    })
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) return;
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[`${key}`].value)
    })


    if (this.edditMode) return this._updateProduct(productFormData);
    return this._addProduct(productFormData);
  }
  private _updateProduct(productFormData: FormData) {
    this.productService.updateProduct(productFormData, this.currentId).subscribe((res) => {
      console.log(res)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Updated' });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not updated' });
      this.isSubmited = false;
    });
  }
  enableButton() {
    this.isSubmited = false;
  }
  get productForm() {
    return this.form.controls;
  }
  private _getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }
  private _addProduct(productFormData: any) {
    return this.productService.createProduct(productFormData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product created' });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not created' });
      this.isSubmited = false;
    });
  }
  onImageUpload(event: any) {
    const file = event?.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file)
    }
  }
}
