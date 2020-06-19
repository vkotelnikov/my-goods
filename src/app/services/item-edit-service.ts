import { ListItem } from '../list-item';

export class ItemEditService {
    // private itemData : ListItem;

    static set( data: ListItem ){
        this['itemData'] = data;
    }

    static get(): ListItem{
        return this['itemData'];
    }
}
