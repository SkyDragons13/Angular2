import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../core/user.interface';
import { UserService } from '../core/user.service';
import { UserUpdateService } from '../core/user.update.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table-module.component.html',
  styleUrls: ['./table-module.component.scss'],
})
export class TableModuleComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  isAddNewUserFormVisible: boolean = false;
  isLoading: boolean = true;
  pageIndex: number = 1;  // Initialize the page index to 1

  constructor(
    private userService: UserService,
    private userUpdateService: UserUpdateService,
    private cdr: ChangeDetectorRef
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
    this.isAddNewUserFormVisible = true;
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
}
