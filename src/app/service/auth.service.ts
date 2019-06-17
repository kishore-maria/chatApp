import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class _AuthService {

  constructor(public http: HttpClient) {
  
  }

  currentUser() {
    return this.http.get('/api/auth')
  }

  signIn(data: any) {
    if(data.provider && data.provider === 'FACEBOOK') {
      return this.signInWithFB(data);
    } else if(data.provider && data.provider === 'GOOGLE') {
      return this.signInWithGoogle(data);
    } else {
      return this.signInWithDSA(data);
    }
  }

  signInWithDSA(data) {
    return this.http.post('/api/auth/', { user: data })
  }

  signInWithGoogle(data) {
    return this.http.post('/api/auth/login/google', data)
  }

  signInWithFB(data) {
    return this.http.post('/api/auth/login/facebook', data)
  }

  logout() {
    return this.http.post('/api/auth/logout/', {})
  }

}
