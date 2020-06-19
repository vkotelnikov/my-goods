import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListItem } from '../list-item';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(private http: HttpClient) {
    
   }

  getItems()  {
    return this.http.get<Array<ListItem>>(ConfigService.get('api')+'/goods/list');
  }

  getItem( id: number ){
    return this.http.get<ListItem>(ConfigService.get('api')+'/goods/'+id);
  }
}
