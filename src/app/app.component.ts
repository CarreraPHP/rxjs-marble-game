import { Component, HostListener } from '@angular/core';
import { AppService, ScreenSize } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'rxjs-marble-game';

	@HostListener('window:resize', [ '$event' ])
	onWinResize(event?) {
		const { innerWidth, innerHeight } = window;
		this.appService.scrnMetrics = <ScreenSize>{ h: innerHeight, w: innerWidth };
	}

	constructor(private appService: AppService) {
		this.onWinResize();
	}
}
