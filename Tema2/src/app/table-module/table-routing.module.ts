import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableModuleComponent } from './table-module.component';

const routes: Routes = [{ path: '', component: TableModuleComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
