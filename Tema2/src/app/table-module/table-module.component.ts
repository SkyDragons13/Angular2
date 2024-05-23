import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../core/user.interface';
import { UserService } from '../core/user.service';
import { UserUpdateService } from '../core/user.update.service';
import { ChangeDetectorRef } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table-module.component.html',
  styleUrls: ['./table-module.component.scss'],
})
export class TableModuleComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  isAddNewUserFormVisible: boolean = false;
  isLoading: boolean = true;
  pageIndex: number = 1;

  constructor(
    private userService: UserService,
    private userUpdateService: UserUpdateService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.getListOfUsers();
    this.userUpdateService.userUpdated$.subscribe(() => {
      this.userService.getUpdatedList().subscribe((res) => {
        console.log(res);
        this.users$.next(res || []);
        this.isLoading = false;
        this.isAddNewUserFormVisible = false;
        this.cdr.detectChanges();
      });
    });
  }

  getListOfUsers() {
    this.userService.getListOfUsers().subscribe((res) => {
      console.log(res);
      this.users$.next(res || []);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  toggleAddUser() {
    this.modalService.create({
      nzTitle: 'Add User',
      nzContent: CreateUserFormComponent,
      nzData: { isEdit: false },
    });
  }

  editUser(data: User) {
    this.modalService.create({
      nzTitle: 'Edit User',
      nzContent: CreateUserFormComponent,
      nzViewContainerRef:this.viewContainerRef,
      nzData:{data,isEdit:true},
      nzFooter: null
    });
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
}
