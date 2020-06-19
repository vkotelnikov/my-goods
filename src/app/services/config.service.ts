export class ConfigService {
  private _api: string;

  static set( attribute, value){
    this['_' + attribute] = value;
  }

  static get( attribute: string ){
    return this['_' + attribute];
  }

}
