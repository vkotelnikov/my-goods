import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list-item';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: Array<ListItem>;

  constructor(private data: DataManagerService) { }

  ngOnInit(): void {
    this.data.getItems().subscribe(items => {
      this.itemsList = items;
    });
  }

}
