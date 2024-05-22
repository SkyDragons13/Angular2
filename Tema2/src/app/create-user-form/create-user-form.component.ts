import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
})
export class CreateUserFormComponent implements OnInit {
  userForm!: FormGroup<any>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NzNotificationService,
    private userUpdateService: UserUpdateService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
          EmailValidator,
        ],
      ],
      Name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
          LetterValidator,
        ],
      ],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]],
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
