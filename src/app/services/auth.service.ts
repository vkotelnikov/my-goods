import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ConfigService } from '../services/config.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

interface User {
  id: number;
  name: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor( private http: HttpClient,
               private router: Router,
               private storage: LocalStorageService) { }

  authenticated(){
    // return this.storage.get('authenticated', false );
    return this.isAuthenticated;
  }

  authenticate( credentials, callback ) {
    const headers = new HttpHeaders( credentials 
                                    ? { authorization: 'Basic ' + btoa( credentials.username 
                                                                        + ':' 
                                                                        + credentials.password) }
                                    : {});
    console.log('authenticating')
    this.http.get(ConfigService.get('api')+'/user', {headers: headers}).subscribe(response => {
      if ( response ) {
        if (response['name']) {
          // this.storage.set('authenticated', true);
          this.isAuthenticated = true;
        } else {
          // this.storage.set('authenticated', false);
          this.isAuthenticated = false;
        }
        return callback && callback(); 
      }
    }
    );
  }

  logout(){
    this.http.post(ConfigService.get('api')+'/logout', {}).pipe(finalize(() => {
      // this.storage.set('authenticated', false);
      console.log('finalizing logout');
      this.isAuthenticated = false;
      // this.router.navigateByUrl('/login');
    })).subscribe();
  }

  register( username, password, email ) {
    console.log('registering');
    const user: User ={
      id: 2,
      name: username,
      password: password,
      email: email
    }

    this.http.post(ConfigService.get('api')+'/register', user, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    } ).pipe(tap(data => {
      console.log(data['url']);
      if ( data instanceof HttpResponse && data.url === ConfigService.get('api') ){
        if ( data.status == 201 ){
          this.router.navigate(['/login']);
        }
      }
    })).subscribe();
  }
}
