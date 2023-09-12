import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletionTransactionComponent } from './checkout/completion-transaction/completion-transaction.component';
import { ErrorPageComponent } from './home/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'error-page',
    component: ErrorPageComponent
  },
  {
    path: 'completion-transaction',
    component: CompletionTransactionComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'checkout'
  },
  {
    path: '*',
    loadComponent: () => import('./home/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
