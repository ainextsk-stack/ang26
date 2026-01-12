import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanvasHeroComponent } from '../../ui/canvas-hero/canvas-hero.component';
import { SiteChromeComponent } from '../../ui/site-chrome/site-chrome.component';
import { PRODUCTS, Product } from '../../data/products';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CanvasHeroComponent, SiteChromeComponent],
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FrontPageComponent {
  // data
  products: Product[] = PRODUCTS;

  // ===== navigation =====
goTo(hash: string): void {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
}
