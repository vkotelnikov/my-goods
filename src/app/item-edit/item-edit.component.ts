import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ListItem } from '../list-item';
import { ItemEditService } from '../services/item-edit-service';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit, OnDestroy {

  
  editableItem : ListItem = ItemEditService.get();

  counter: number = 0;

  timer: any;

  constructor(private router : Router,
              private http : HttpClient,
              private ref: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.editableItem = ItemEditService.get();

    this.timer = setInterval(() => {
      this.editableItem.name += this.editableItem.name[this.counter];
      this.counter++;
      this.ref.markForCheck(); },2000 );
    
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onSubmit(form : NgForm){
    console.log('submitted');
    console.log(this.editableItem);
    this.http.post(ConfigService.get('api')+'/goods/edit/'+this.editableItem.id, this.editableItem)
        .subscribe( response => {
          console.log(response);
          this.router.navigateByUrl('/item/' + this.editableItem.id );
        });
    
  }

}
