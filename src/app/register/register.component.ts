import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  passwordConfirm = '';
  email = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    if( this.password === this.passwordConfirm ){
      this.auth.register(this.username, this.password, this.email);
    }
  }

}
