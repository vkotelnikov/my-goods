import { Component, OnInit, Input } from '@angular/core';
import { GameLogService } from '../services/game-log.service';
import { LogEntry } from '../services/log-entry';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})


export class ScoreboardComponent implements OnInit {

  @Input('log') log: Array<LogEntry>;
  // log : Array<LogEntry>;

  constructor(private logger: GameLogService) { }

  ngOnInit(): void {
    // try {
    // this.log = JSON.parse( this.logger.getCookie("log") );
    // } catch ( e ){
    //   console.log('log is empty');
    // }
  }

}
