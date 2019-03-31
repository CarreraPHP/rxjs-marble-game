import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { GameRoutingModule } from './game-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { GridComponent } from './grid/grid.component';
import { PadComponent } from './pad/pad.component';

@NgModule({
	declarations: [ CanvasComponent, GridComponent, PadComponent ],
	providers: [PercentPipe],
	imports: [ CommonModule, MatButtonModule, MatCheckboxModule, GameRoutingModule ],
	exports: [ CanvasComponent, GridComponent, PadComponent ]
})
export class GameModule {}
