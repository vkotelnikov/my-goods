import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';
import { GameLogService } from '../services/game-log.service';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {

  field: string[][];

  //AI plays as player O
  aiOn = false;

  winner: string;

  private steps: number = 0;
  private waitingForAi: boolean = false;
  private xTurn: boolean = true;
  private readonly X: string = "X";
  private readonly O: string = "O";

  constructor(public dialog: MatDialog,
    public gameLogger: GameLogService) { }

  private openDialog() {
    this.dialog.open(WinnerDialogComponent,
      {
        data: { winner: this.winner }
      }
    ).afterClosed().subscribe(e => this.reset());
  }

  ngOnInit(): void {
    this.field = [["", "", ""], ["", "", ""], ["", "", ""]];
  }

  process(value) {
    if (this.isWaitingForAi()) {
      return;
    }
    let cell: HTMLTableCellElement = value.target;
    let row = cell.getAttribute('row');
    let col = cell.getAttribute('col');
    if (!this.field[row][col]) {
      this.field[row][col] = this.whoseTurn();
      this.steps++;
      this.switchSides();
      
      this.checkForWinner();

      if ((!this.xTurn && this.aiOn) && this.winner == null) {
        this.aiTurn();
        this.checkForWinner();
        this.switchSides();
      }

    }
  }

  private aiTurn() {
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
    this.field[row][col] = this.whoseTurn();
    this.steps++;
    this.waitingForAi = false;
  }

  aiStateChanged() {
    this.reset();
  }

  private isWaitingForAi(): boolean {
    return this.waitingForAi;
  }

  whoseTurn(): string {
    return this.xTurn ? this.X : this.O;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


  checkForWinner() {
    if ( this.steps < 5 ) {
      return;
    }
    if (this.checkHorizontals()
      || this.checkVerticals()
      || this.checkDiagonals()) {

      this.gameLogger.putWinner(this.winner, new Date());
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

  private reset() {
    this.field = [["", "", ""], ["", "", ""], ["", "", ""]];
    this.steps = 0;
    this.winner = null;
    this.xTurn = true;
    this.waitingForAi = false;
  }

  private checkHorizontals(): boolean {
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

  private checkVerticals(): boolean {
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

  private checkDiagonals(): boolean {
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

  private switchSides() {
    this.xTurn = !this.xTurn;
  }

}
