import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, LOCALE_ID } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AppService, ScreenSize, GridSize } from '../../app.service';
import { EngineService, GameStatus } from '../engine.service';
import { CanvasService } from '../canvas/canvas.service';
import { ColorService, ColorProps, Animate } from '../color.service';
import { PercentPipe } from '@angular/common';

@Component({
	selector: 'rmg-grid',
	templateUrl: './grid.component.html',
	styleUrls: [ './grid.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
	grid: string[][] = [];
	colorGrid: ColorProps[][] = [];
	gridSize: GridSize = { w: 16.25, h: 16.25, ch: 19.5 };
	rem: number;
	hues: number[] = [];

	get visibleCellCnt(): number {
		return this.canvasEngine.visibleCellCnt;
	}

	get visibleColCnt(): number {
		return this.canvasEngine.colCnt;
	}

	get gridCellOffsetPath(): SafeStyle {
		const m = this.rem * 1.5;
		const v = this.rem * 3;
		return this.sanitizer.bypassSecurityTrustStyle(`path('m ${m}, ${m} v ${v} z')`);
	}

	get randomHue(): number {
		return Math.floor(Math.random() * (359 - 1) + 1);
	}

	constructor(
		private appService: AppService,
		private gameEngine: EngineService,
		private canvasEngine: CanvasService,
		private colorEngine: ColorService,
		private sanitizer: DomSanitizer,
		private cdRef: ChangeDetectorRef,
		private percentPipe: PercentPipe
	) {
		this.subscribleAllColorObservables();
		this.grid = this.canvasEngine.populateGrid();
		this.colorGrid = this.colorEngine.populateColorGrid();
		this.handleRemChange();
		this.handleGridSize();
		this.cdRef.markForCheck();
	}

	subscribleAllColorObservables() {
		this.colorEngine.colorGridObservable.subscribe(cgrid => {
			// console.log("grid changeing ");
			this.colorGrid = cgrid;
			this.cdRef.markForCheck();
		})
	}

	canAnimate(i: number, j: number): boolean {
		const { anim } = this.colorGrid[i][j];
		// console.log("i, j, anim", i, j, anim);
		return anim === Animate.YES ? true : false;
	}

	isStale(i: number, j: number): boolean {
		const { anim } = this.colorGrid[i][j];
		return anim === Animate.STALE ? true : false;
	}

	getGridCellBackgroundColor(i: number, j: number): SafeStyle {
		const { hsla } = this.colorGrid[i][j];
		// console.log('hue', hsla.h);
		return this.sanitizer.bypassSecurityTrustStyle(
			`hsla(${hsla.h}, ${this.percentPipe.transform(hsla.s)}, ${this.percentPipe.transform(hsla.l)}, ${hsla.a})`
		);
	}

	handleGridSize() {
		this.appService.gridMetricsObservable.subscribe((size: GridSize) => {
			this.gridSize = size;
			this.cdRef.markForCheck();
		});
	}

	handleRemChange() {
		this.appService.fontSizeObservable.subscribe((v: number) => {
			this.rem = v;
			this.cdRef.markForCheck();
		});
		this.cdRef.markForCheck();
	}

	ngOnInit() {}
}
