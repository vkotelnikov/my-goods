import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { DataManagerService } from '../services/data-manager.service';
import { ListItem } from '../list-item';
import { ItemEditService } from '../services/item-edit-service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: ListItem = {id: null, name: null, createdAt: null };

  constructor( private route: ActivatedRoute,
               private router: Router,
               private data: DataManagerService ) { }

  ngOnInit(): void {
    console.log(this.route);
    
    this.route.paramMap.subscribe((params :ParamMap) => {
      let itemId = params.get('item_id');
      console.log(params.getAll);
      console.log(params.get('item_id'));
      if ( itemId ){
        this.data.getItem(Number(itemId)).subscribe( it => this.item = it);
        }
      }
    );
  }

  edit(): void {
    ItemEditService.set( this.item );
    this.router.navigateByUrl('/edit/'+this.item.id);
  }

}
