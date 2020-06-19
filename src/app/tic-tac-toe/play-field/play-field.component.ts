import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {

  field: string[][] = [["","",""], ["","",""], ["","",""]];

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
      if(this.steps > 5){
        this.checkForWinner();
      }

      this.switchSides();
    }
    console.log(this.field);
  }

  checkForWinner(){
    // console.log('first row: ' + this.checkHorizontals());
    if ( this.checkHorizontals() ) {
      alert(this.winner + 'win');
      this.reset();
    }
  }

  reset() {
    this.field = [["","",""], ["","",""], ["","",""]];
    this.steps = 0;
    this.winner = null;
    this.xTurn = true;
  }

  checkHorizontals() : boolean{
    let firstHit : string = null;
    let result = false;
    for (let i = 0; i < this.field.length && !result; i++) {
      result = this.field[i].every((value, index, arr) => {
        if( index == 0 ) {
          return true;
        } else {
          return ( ( value=== this.O || value === this.X ) && value === arr[0] ); 
        }
       });
       if( result ) 
       this.winner = this.field[i][0];
    }
    // result = this.field[0].every((value, index, arr) => {
    //   if( index == 0 ) {
    //     return true;
    //   } else {
    //     return ( ( value=== this.O || value === this.X ) && value === arr[0] ); 
    //   }
    //  });
    
    return result;
  }

  switchSides() {
    this.xTurn = !this.xTurn;
  }

}
