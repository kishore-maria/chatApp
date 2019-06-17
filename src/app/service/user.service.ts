import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = '/api/user/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  signup(user): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}`, user)
  }  

  signIn(data) {
    return this.http.post(`${this.BASE_URL}login`, data)
  }

  // loginUser(user: User): Observable<any> {
  //   return this.http.post<User>(`${this.BASE_URL}loginUser`, user)
  // }

  logout() {
    let token = this.cookieService.get('token');
    return this.http.post(`${this.BASE_URL}logout`, {token: token})
  }

  currentUser() {
    return this.http.get(`${this.BASE_URL}me`)
  }

  getAllUsers() {
    return this.http.get(`${this.BASE_URL}allUsers`)
  }

}
