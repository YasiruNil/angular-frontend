import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './galary.component.html',
})
export class GalaryComponent implements OnInit {
  selectedImage: string = '';
  @Input() images: string[] | undefined;
  constructor() { }

  ngOnInit(): void {
    if (this.images?.length) {
      this.selectedImage = this.images[0]
    }
  }
  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }
  get hasImage() {
    return this.images && this.images.length > 0
  }
}
