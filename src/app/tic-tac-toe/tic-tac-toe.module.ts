import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayFieldComponent } from './play-field/play-field.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';

const ticTacToeRoutes : Routes = [ 
  { path: 'tic-tac-toe', component: PlayFieldComponent }
];

const materialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule
]

@NgModule({
  declarations: [PlayFieldComponent, WinnerDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    materialComponents,
    RouterModule.forChild(ticTacToeRoutes)
  ]
})
export class TicTacToeModule { }
