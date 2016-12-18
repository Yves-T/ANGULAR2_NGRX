import { AppStore } from '../models/appstore.model';
import { ItemsService } from '../services/items.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemsService],
})
export class AppComponent {
  title = 'app works!';
  items: Observable<Array<Item>>;
  selectedItem: Observable<Item>;

  constructor(private itemService: ItemsService, private store: Store<AppStore>) {
    this.items = itemService.items;
    this.selectedItem = store.select('selectedItem');
    this.selectedItem.subscribe(v => console.log(v));
    itemService.loadItems();
  }

  selectItem(item: Item) {
    this.store.dispatch({type: 'SELECT_ITEM', payload: item});
  }

  deleteItem(item: Item) {
    this.itemService.deleteItem(item);
  }

  resetItem() {
    let emptyItem: Item = {id: null, name: '', description: ''};
    this.store.dispatch({type: 'SELECT_ITEM', payload: emptyItem});
  }

  saveItem(item: Item) {
    this.itemService.saveItem(item);
    this.resetItem();
  }

}
