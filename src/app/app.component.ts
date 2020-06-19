import { Component, Input } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor( private auth: AuthService,
               private http: HttpClient,
               private router: Router ){
    // this.auth.authenticate(undefined, undefined);
  }

  authenticated(){
    return this.auth.authenticated();
  }

  logout() {
    this.auth.logout();
  }

  title = 'my-goods';
}
