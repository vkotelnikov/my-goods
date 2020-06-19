import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayFieldComponent } from './play-field/play-field.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';

const ticTacToeRoutes : Routes = [ 
  { path: 'tic-tac-toe', component: PlayFieldComponent }
];

@NgModule({
  declarations: [PlayFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ticTacToeRoutes)
  ]
})
export class TicTacToeModule { }
