import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.username === 'admin' && currentUser.password === '12345') {
      this.isLoggedInSubject.next(true);
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '12345') {
      this.isLoggedInSubject.next(true);
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ username, password })
      );
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('currentUser');
    
    console.log('logged out')
    
  }

  get isLoggedIn(): boolean {
    console.log(this.isLoggedInSubject.value);
    return this.isLoggedInSubject.value;
    
  }
}
