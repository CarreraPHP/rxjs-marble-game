import { Component, HostListener, ElementRef } from '@angular/core';
import { AppService, ScreenSize } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

	@HostListener('window:resize', [ '$event' ])
	onWinResize(event?) {
		const { innerWidth, innerHeight } = window;
		this.appService.scrnMetrics = <ScreenSize>{ h: innerHeight, w: innerWidth };
	}

	constructor(private appService: AppService, private elRef:ElementRef) {
		this.appService.appElementRef = elRef;
		this.onWinResize();
	}
}
