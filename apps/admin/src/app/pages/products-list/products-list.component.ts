import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  constructor(private router: Router, private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(response => {
      this.products = response;
    })
  }
  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }
  deleteProduct(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the category?',
      icon: 'pi pi-exclamation-triangle',
      header: 'Delete Category',
      accept: () => {
        this.productsService.deleteProduct(categoryId).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product got deleted' });
          this._getProducts();
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not got deleted' });
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'Warn', summary: 'Warn', detail: 'Cancel category deletion' });
      }
    });


  }
}
