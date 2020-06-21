import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';
import { GameLogService } from '../services/game-log.service';
import { LogEntry } from '../services/log-entry';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {

  log: Array<LogEntry>;

  field: string[][] = [["", "", ""], ["", "", ""], ["", "", ""]];

  xTurn: boolean = true;

  //AI plays as player O
  aiOn: boolean = false;
  waitingForAi: boolean = false;

  readonly X: string = "X";
  readonly O: string = "O";

  winner: string;

  steps: number = 0;

  constructor(public dialog: MatDialog,
    private logger: GameLogService) { }

  openDialog() {
    this.dialog.open(WinnerDialogComponent, {
      data: {
        winner: this.winner
      }
    }).afterClosed().subscribe(e => this.reset());
  }

  ngOnInit(): void {
    console.log(this.field);
    try {
      this.log = JSON.parse(this.logger.getCookie("log"));
    } catch (e) {
      console.log(e);
      this.log = [];
    }
  }

  process(value) {
    if (this.waitingForAi) {
      return;
    }
    let cell: HTMLTableCellElement = value.target;
    console.log(value);
    let row = cell.getAttribute('row');
    let col = cell.getAttribute('col');
    if (!this.field[row][col]) {
      this.field[row][col] = this.xTurn ? this.X : this.O;
      this.steps++;
      this.switchSides();
      if (this.steps > 4) {
        this.checkForWinner();
      }

      if ((!this.xTurn && this.aiOn) && this.winner == null) {
        this.aiTurn();
      }

    }
    console.log(this.field);
  }

  aiTurn() {
    this.waitingForAi = true;
    let selectedCell = null;
    let row = null;
    let col = null;
    let trials = 0;
    while (selectedCell !== "" && trials < 9) {
      row = this.getRandomInt(0, 3);
      col = this.getRandomInt(0, 3);
      selectedCell = this.field[row][col];
      trials++;
    }
    this.field[row][col] = this.xTurn ? this.X : this.O;
    this.steps++;
    this.switchSides();
    if (this.steps > 4) {
      this.checkForWinner();
    }
    this.waitingForAi = false;
  }

  aiStateChanged() {
    this.reset();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


  checkForWinner() {
    if (this.checkHorizontals()
      || this.checkVerticals()
      || this.checkDiagonals()) {

      let newEntry: LogEntry = { date: new Date(), winner: this.winner };
      if (this.log.length >= 10) {
        this.log.pop();
        this.log.unshift(newEntry);
      } else {
        this.log.unshift(newEntry);
      }
      this.logger.setCookie("log", JSON.stringify(this.log), 1);
      this.openDialog();
    } else {

      if (this.field.every((value, index, arr) => {
        return value.every((value, index, arr) => {
          return value !== "";
        });
      })) {
        alert('Draw. Restart.');
        this.reset();
      }
    }
  }

  ok() {
    this.reset();
  }

  reset() {
    this.field = [["", "", ""], ["", "", ""], ["", "", ""]];
    this.steps = 0;
    this.winner = null;
    this.xTurn = true;
    this.waitingForAi = false;
  }


  checkHorizontals(): boolean {
    let result = false;
    for (let i = 0; i < this.field.length && !result; i++) {
      result = this.field[i].every((value, index, arr) => {
        if (index == 0) {
          return true;
        } else {
          return ((value === this.O || value === this.X) && value === arr[0]);
        }
      });
      if (result)
        this.winner = this.field[i][0];
    }

    return result;
  }

  checkVerticals(): boolean {
    let result = false;
    for (let i = 0; i < this.field.length && !result; i++) {
      let temp: string[] = [this.field[0][i], this.field[1][i], this.field[2][i]];

      result = temp.every((value, index, arr) => {
        if (index == 0) {
          return true;
        } else {
          return ((value === this.O || value === this.X) && value === arr[0]);
        }
      });
      if (result)
        this.winner = this.field[0][i];
    }

    return result;
  }

  checkDiagonals(): boolean {
    let result = false;
    let main: string[] = [this.field[0][0], this.field[1][1], this.field[2][2]];

    result = main.every((value, index, arr) => {
      if (index == 0) {
        return true;
      } else {
        return ((value === this.O || value === this.X) && value === arr[0]);
      }
    });
    if (result) {
      this.winner = this.field[0][0];
    } else {
      let secondary: string[] = [this.field[0][2], this.field[1][1], this.field[2][0]];

      result = secondary.every((value, index, arr) => {
        if (index == 0) {
          return true;
        } else {
          return ((value === this.O || value === this.X) && value === arr[0]);
        }
      });
      if (result)
        this.winner = this.field[0][2];
    }

    return result;
  }

  switchSides() {
    this.xTurn = !this.xTurn;
  }

}
