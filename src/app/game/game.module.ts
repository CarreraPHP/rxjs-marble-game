import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { GameRoutingModule } from './game-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
	declarations: [ CanvasComponent, GridComponent ],
	imports: [ CommonModule, MatButtonModule, MatCheckboxModule, GameRoutingModule ],
	exports: [ CanvasComponent, GridComponent ]
})
export class GameModule {}
