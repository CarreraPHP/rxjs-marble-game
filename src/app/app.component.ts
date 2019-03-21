import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AppService, ScreenSize } from './app.service';
import { MatToolbar, MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material';
import { ReplaySubject, fromEvent, combineLatest } from 'rxjs';
import { delay, map, throttleTime } from 'rxjs/operators';
import { EngineService } from './game/engine.service';

enum ButtonState {
	start,
	stop
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	private minHeaderSize: ScreenSize = {
		h: 56,
		w: -1 // if width is -1, it means either 'auto' or 100%
	};
	private onResize$: ReplaySubject<HTMLElement> = new ReplaySubject(1);
	private contentArea$: ReplaySubject<ScreenSize> = new ReplaySubject(1);

	startBtnState: number = ButtonState.stop;

	get canShowStart(): boolean {
		return this.startBtnState === ButtonState.stop ? true : false;
	}

	@ViewChild(MatSidenavContent) contentRef: MatSidenavContent;

	constructor(private appService: AppService, private gameEngine: EngineService, private elRef: ElementRef) {
		this.appService.appElementRef = elRef;
		this.onWinResize();
	}

	handleScreenMetrics(h, w) {
		this.appService.scrnMetrics = <ScreenSize>{
			h: h,
			w: w
		};
	}

	// @HostListener('window:resize', [ '$event' ])
	onWinResize() {
		const resize$ = fromEvent(window, 'resize');
		const { innerWidth, innerHeight } = window;
		resize$.pipe(throttleTime(500), delay(500)).subscribe(() => {
			const el = this.contentRef.getElementRef().nativeElement;
			// console.log("resize triggered.", el.offsetHeight, el.offsetWidth, el);
			this.handleScreenMetrics(el.offsetHeight, el.offsetWidth);
			this.onResize$.next(el);
		});
		this.handleScreenMetrics(innerHeight - this.minHeaderSize.h, innerWidth);
	}

	observeContentArea() {
		// this.resize$.pipe(
		// 	trotl
		// )
	}

	triggerStart() {
		if (this.startBtnState === ButtonState.stop) {
			this.startBtnState = ButtonState.start;
			this.gameEngine.startGame();
		} else {
			this.startBtnState = ButtonState.stop;
			this.gameEngine.endGame();
		}
	}

	ngOnInit() {
		this.observeContentArea();
	}
}
