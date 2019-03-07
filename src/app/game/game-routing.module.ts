import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanvasComponent } from './canvas/canvas.component';

const routes: Routes = [
	{
		path: 'canvas',
		component: CanvasComponent
	},
	{
		path: '**',
		redirectTo: 'canvas'
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class GameRoutingModule {}
