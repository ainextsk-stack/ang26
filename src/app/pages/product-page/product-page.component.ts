import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Product, PRODUCTS } from '../../data/products';
import { SiteChromeComponent } from '../../ui/site-chrome/site-chrome.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteChromeComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductPageComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = PRODUCTS.find((p) => p.id === id);

    if (this.product) {
      const desc = `${this.product.description} Купить и узнать больше на сайте СДК.`;
      this.title.setTitle(`${this.product.name} — СДК`);
      this.meta.updateTag({ name: 'description', content: desc });
      this.meta.updateTag({ property: 'og:title', content: `${this.product.name} — СДК` });
      this.meta.updateTag({ property: 'og:description', content: desc });
      this.meta.updateTag({ property: 'og:image', content: this.product.image });
      this.meta.updateTag({ property: 'og:type', content: 'product' });
      this.meta.updateTag({ property: 'og:url', content: window.location.href });
    } else {
      const desc = 'Товар не найден. Вернитесь в каталог СДК и выберите другой продукт.';
      this.title.setTitle('Товар не найден — СДК');
      this.meta.updateTag({ name: 'description', content: desc });
      this.meta.updateTag({ property: 'og:title', content: 'Товар не найден — СДК' });
      this.meta.updateTag({ property: 'og:description', content: desc });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: window.location.href });
    }
  }
}
