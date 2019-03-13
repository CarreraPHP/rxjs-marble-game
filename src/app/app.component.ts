import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AppService, ScreenSize } from './app.service';
import { MatToolbar, MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material';
import { ReplaySubject, fromEvent, combineLatest } from 'rxjs';
import { delay, map, last } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	private onResize$:ReplaySubject<HTMLElement> = new ReplaySubject(1);
	private contentArea$:ReplaySubject<ScreenSize> = new ReplaySubject(1);

	@ViewChild(MatSidenavContent)
	contentRef: MatSidenavContent;

	// @HostListener('window:resize', [ '$event' ])
	onWinResize() {
		const resize$ = fromEvent(window, 'resize');
		const load$ = fromEvent(window, 'load');
		const domload$ = fromEvent(document, 'DOMContentLoaded');
		const { innerWidth, innerHeight } = window;
		// const { clientHeight, clientWidth, offsetHeight, offsetWidth } = ;
		// console.log("header", clientHeight, clientWidth, offsetHeight, offsetWidth, this.contentRef);

		combineLatest(resize$, load$, domload$).pipe(
			last(),
			delay(1000)			
		).subscribe(() => {
			const el = this.contentRef.getElementRef().nativeElement;
				console.log("resize triggered.", el.offsetHeight, el.offsetWidth);
				this.onResize$.next(el);
				this.appService.scrnMetrics = <ScreenSize>{ h: innerHeight, w: innerWidth };
		});
		this.appService.scrnMetrics = <ScreenSize>{ h: innerHeight, w: innerWidth };
	}

	constructor(private appService: AppService, private elRef:ElementRef) {
		this.appService.appElementRef = elRef;
		this.onWinResize();
	}

	observeContentArea() {
		// this.resize$.pipe(
		// 	trotl
		// )
	}

	ngOnInit() {
		this.observeContentArea();
	}
}
