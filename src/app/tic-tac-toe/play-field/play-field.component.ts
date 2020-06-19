import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {

  field: string[][] = [["", "", ""], ["", "", ""], ["", "", ""]];

  xTurn: boolean = true;

  readonly X: string = "X";
  readonly O: string = "O";

  winner: string;

  steps: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.field);
  }

  // process(value: HTMLTableCellElement) { 
  process(value) {
    // console.log(value);
    // console.log( value.target.attributes['row'].value );
    let cell: HTMLTableCellElement = value.target;
    console.log(value);
    let row = cell.getAttribute('row');
    let col = cell.getAttribute('col');
    if (!this.field[row][col]) {
      this.field[row][col] = this.xTurn ? this.X : this.O;
      value.nodeValue = this.xTurn ? this.X : this.O;
      this.steps++;
      this.switchSides();
      if (this.steps > 4) {
        this.checkForWinner();
      }

    }
    console.log(this.field);
  }

  checkForWinner() {
    // console.log('first row: ' + this.checkHorizontals());
    if (this.checkHorizontals()
      || this.checkVerticals()
      || this.checkDiagonals() ) {
      alert(this.winner + ' win');
      this.reset();
    }

    if (this.field.every((value, index, arr) => {
      return value.every((value, index, arr) => {
        return value !== "";
      });
    })) {
      alert('Draw. Restart.');
      this.reset();
    }
  }

  reset() {
    this.field = [["", "", ""], ["", "", ""], ["", "", ""]];
    this.steps = 0;
    this.winner = null;
    this.xTurn = true;
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
