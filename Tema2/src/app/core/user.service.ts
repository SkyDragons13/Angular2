import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, filter,tap } from 'rxjs/operators';
import { User } from './user.interface';
import { Input } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Input() user: User | null = null;
  private users: User[] = [];
  private usersUrl: string = 'assets/users.json';

  constructor(private httpClient: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.httpClient
      .get<{ users: any[] }>(this.usersUrl)
      .subscribe((response) => {
        this.users = response.users;
      });
  }
  getUpdatedList():Observable<any[]>{
    return of(this.users);
  }
  getListOfUsers(): Observable<any[]> {
    return this.httpClient.get<{ users: User[] }>(this.usersUrl).pipe(
      map((response) => response.users), // Extract the users array
      filter((users) => {
        return users.length > 7; // Ensure there are more than 10 users
      }),
      delay(2000), // Simulate a loading delay
      tap((users) => this.users = users)
    );
  }
  createNewUser(email:string,name:string,age:number,address:string): Observable<any> {
    const newUser = {
      id:this.users.length+1,
      email: email,
      name: name,
      age: age, // Example age
      adress: address,
    };
    this.users.push(newUser);
    console.log(this.users);
    return of(newUser);
  }
  updateUser(user:User):Observable<User>
  {
    return new Observable((observer) => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users[index] = user;
      observer.next(user);
      console.log(this.users[index]);
      observer.complete();
    });
  }
}
