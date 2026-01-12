import { Routes } from '@angular/router';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: '**', redirectTo: '' },
];
