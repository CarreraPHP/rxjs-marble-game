import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'game',
		loadChildren: () => {
			return import('./game/game.module').then((m) => m.GameModule);
		}
	},
	{
		path: '**',
		redirectTo: 'game'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
