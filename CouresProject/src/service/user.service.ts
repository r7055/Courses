import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../models/userType';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { baseUrl } from './env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject=new BehaviorSubject<UserType[]>([])
  public  users$=this.usersSubject.asObservable()
  constructor(private http:HttpClient) { }

  getUsers():any{
    this.http.get(`${baseUrl}/users`).subscribe(users=> users)
  }
  getUserById(id:number){
    this.http.get(`${baseUrl}/users/${id}`)
  }
  updateUserDeiteles(id:number,user:UserType)
  {
    this.http.put(`${baseUrl}/users/${id}`,user).subscribe(id=>id)///submit thiout id !!!!!!
  }
  addUser(user:UserType)
  {
    this.http.post(`${baseUrl}/auth/register`,user).subscribe(user=>user)
  }
  deleteById(id:number){
    this.http.delete(`${baseUrl}/users/${id}`).subscribe(id=>console.log("this user deleted"+id));
  }
}
