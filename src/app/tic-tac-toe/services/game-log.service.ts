import { Injectable } from '@angular/core';
import { LogEntry } from './log-entry';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameLogService {

  constructor( private localStorage: LocalStorageService ) {}

  getLog() : Array<LogEntry>{
    let log = JSON.parse( this.localStorage.get('log') );
    if ( !log ) {
      return [];
    }
    return log;
  } 

  putWinner( winner: string, time : Date ) {
    let newEntry : LogEntry = { winner: winner, date: time };
    this.putLogEntry( newEntry );
  }

  putLogEntry( newEntry : LogEntry ) {
    // let log :Array<LogEntry>  = this.getLog();
    let log = this.getLog();
    if (log.length >= 10) {
      log.pop();
      log.unshift(newEntry);
    } else {
      log.unshift(newEntry);
    }
    this.localStorage.set('log', JSON.stringify(log));
  }
  
}
