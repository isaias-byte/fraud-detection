import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-transaction',
    loadChildren: () => import('./pages/add-transaction/add-transaction.module').then( m => m.AddTransactionPageModule)
  },
  {
    path: '',
    redirectTo: 'add-transaction',
    pathMatch: 'full'
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('./pages/transaction-history/transaction-history.module').then( m => m.TransactionHistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
