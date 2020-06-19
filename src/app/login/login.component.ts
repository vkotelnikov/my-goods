import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = { username: '', password: '' };

  constructor(private auth: AuthService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/list');
    });
    return false;
  }


}
