import { Component, Inject, Input, OnInit,inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../core/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EmailValidator, LetterValidator } from '../core/form.helper';
import { UserUpdateService } from '../core/user.update.service';
import { User } from '../core/user.interface';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
})
export class CreateUserFormComponent implements OnInit {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  @Input() user: User = {} as User;
  @Input() isEdit:boolean=false;
  userForm!: FormGroup<any>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NzNotificationService,
    private userUpdateService: UserUpdateService
  ) {}

  ngOnInit(): void {
    this.user=this.nzModalData.data;
    this.isEdit=this.nzModalData.isEdit;
    this.createUserForm(this.user);
    console.log(this.isEdit);
  }

  createUserForm(user:User) {
    this.userForm = this.formBuilder.group({
      Email: [
        user?.email,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
          EmailValidator,
        ],
      ],
      Name: [
        user?.name,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
          LetterValidator,
        ],
      ],
      Age: [user?.age, [Validators.required]],
      Address: [user?.adress, [Validators.required]],
    });
  }

  addNewUser() {
    const name =this.userForm.controls['Name'].value;
    const email=this.userForm.controls['Email'].value;
    const age=this.userForm.controls['Age'].value;
    const address=this.userForm.controls['Address'].value; 

    this.userService.createNewUser(email,name,age,address).subscribe({
      next: () => {
        this.notificationService.success('Success', 'User added successfully');
        this.userUpdateService.notifyUserUpdated();
      },
      error: () => {
        this.notificationService.error('Error', 'Something went wrong');
      },
    });
  }
  editUser() {
    this.user.name=this.userForm.controls['Name'].value;
    this.user.email=this.userForm.controls['Email'].value;
    this.user.age=this.userForm.controls['Age'].value;
    this.user.adress=this.userForm.controls['Address'].value;

    console.log('In edit user inceput')
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.notificationService.success('Success','User updated successfully');
        console.log(this.user,' Asta e ala ')
        console.log(this.userService.getUpdatedList());

      },
      error: () => {
        this.notificationService.error('Error','An error occurred');
      }
    });
    this.userUpdateService.notifyUserUpdated();
  }

  // -------------- form getters ------------------
  get email(): AbstractControl {
    return this.userForm.controls['Email'];
  }

  get name(): AbstractControl {
    return this.userForm.controls['Name'];
  }

  get age(): AbstractControl {
    return this.userForm.controls['Age'];
  }
  get address(): AbstractControl {
    return this.userForm.controls['Address'];
  }
}
