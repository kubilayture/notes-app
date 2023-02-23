import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/note-list']);
    } else {
      this.loginError = true;
    }
  }
}
