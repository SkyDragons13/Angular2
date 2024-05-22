import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableModuleComponent } from './table-module/table-module.component';

const routes: Routes = [
  { path: '', component: TableModuleComponent },
  {
    path: '',
    loadChildren: () =>
      import('./table-module/table.module').then((m) => m.TableModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
