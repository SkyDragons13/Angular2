import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableRoutingModule } from './table-routing.module';
import { TableModuleComponent } from './table-module.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [TableModuleComponent, CreateUserFormComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    NzTableModule,
    NzNotificationModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NzPaginationModule,
  ],
})
export class TableModule {}