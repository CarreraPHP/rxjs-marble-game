import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { ReplaySubject, Observable, Subject, timer } from 'rxjs';
import { EngineService, GameStatus } from './engine.service';
import { debounce, debounceTime, throttleTime } from 'rxjs/operators';

const { requestAnimationFrame, cancelAnimationFrame } = window;

/**
 * Possible Random Values for Hue between 0 to 399
 * 344, 275, 262, 172, 213, 299, 168,
 * 004, 272, 126, 282, 260, 316, 052, 270,
 * 109, 143, 181, 258, 113, 235, 46, 144,
 * 143, 292, 296, 106, 326, 71, 22, 348,
 * 113, 77, 85, 4, 337, 344, 343, 291,
 * 24, 182, 81, 34, 227, 25, 280, 74,
 * 268, 113, 237, 221, 308, 76, 275, 174,
 * 191, 57, 341, 63, 137, 320, 8, 113,
 * 76, 291, 338, 294, 206, 228, 38, 353,
 * 187, 234, 139, 160, 352, 260, 42, 269,
 * 6, 216, 113, 132, 68, 166
 */
export enum Hues {
	FIRST = 6,
	SECOND = 63,
	THIRD = 181,
	FOURTH = 275,
	// FIFTH = 353,
	// SIXTH = 118,
	// SEVENTH = 311,
	// EIGHTH = 213
}

export const HueList: Hues[] = [
	Hues.FIRST,
	Hues.SECOND,
	Hues.THIRD,
	Hues.FOURTH,
	// Hues.FIFTH,
	// Hues.SIXTH,
	// Hues.SEVENTH,
	// Hues.EIGHTH
];

export interface HSLA {
	h: number;
	s: number;
	l: number;
	a: number;
}

export enum Animate {
	NO,
	YES,
	STALE
}

export interface ColorProps {
	hsla: HSLA;
	anim: Animate;
}

@Injectable({
	providedIn: 'root'
})
export class ColorService {
	private _animId: number;
	private _gameStatus: GameStatus;
	// hsla(185, 56%, 40%, 0.8)
	private _colorGrid: ColorProps[][];
	private _baseColorGrid: ColorProps[][]; //reference of initial structure captured once.
	private _colorGrid$: ReplaySubject<ColorProps[][]> = new ReplaySubject(1);
	private _gameloop$: Subject<String> = new Subject();

	public blankHsla: HSLA = { h: 0, s: 0, l: 0, a: 0 };

	get randomHue(): number {
		return HueList[Math.floor(Math.random() * (HueList.length - 0) + 0)];
	}

	get cellCnt(): number {
		return this.appService.cellCnt;
	}

	get visibleCellCnt(): number {
		return this.cellCnt - 1;
	}

	get colCnt(): number {
		return this.appService.colCnt;
	}

	get colorGridObservable(): Observable<ColorProps[][]> {
		return this._colorGrid$.asObservable();
	}

	get canAnimate(): boolean {
		return this._gameStatus === GameStatus.START || this._gameStatus === GameStatus.STARTED ? true : false;
	}

	constructor(private appService: AppService, private gameEngine: EngineService) {
		this.subscribeAllEngineObservables();
		this.handleGameloop();
	}

	private subscribeAllEngineObservables() {
		this.gameEngine.gameStatusObservable.subscribe((status: GameStatus) => {
			this._gameStatus = status;
			console.log('observables', status, this._gameStatus, this.canAnimate);
			if (this.canAnimate) {
				this._animId = requestAnimationFrame(() => {
					this.loopAnimation();
				});
			} else {
				cancelAnimationFrame(this._animId);
			}
		});
	}

	public setHsla(hue: Hues): HSLA {
		return { h: hue, s: 0.56, l: 0.4, a: 0.8 };
	}

	public populateColorGrid(shouldAnimate: boolean = false): ColorProps[][] {
		let ret: ColorProps[][] = [];
		for (let i = 0; i < this.colCnt; i++) {
			for (let j = 0, col: ColorProps[] = []; j < this.cellCnt; j++) {
				col = [
					...col,
					...[
						{
							hsla: { ...this.setHsla(this.randomHue) }, // this.blankHsla,
							anim: Animate.STALE // shouldAnimate ? Animate.YES : Animate.NO
						}
					]
				];
				if (j == this.cellCnt - 1) {
					ret = [ ...ret, ...[ col ] ];
				}
			}
		}
		this._colorGrid$.next(ret);
		this._baseColorGrid = ret;
		this._colorGrid = ret;
		return ret;
	}

	/**
   * rotate color grid method tries to rotate the color from top to bottom.
   * 
   * 
   * @param shouldAnimate boolean to control animation.
   */
	public rotateColorGrid(shouldAnimate: boolean = false): ColorProps[][] {
		let cgrid: ColorProps[][] = this._colorGrid;
		let ret: ColorProps[][] = [];
		for (let i = 0; i < this.colCnt; i++) {
			let col: ColorProps[] = [];
			const first = cgrid[i].splice(0, 1).map((props: ColorProps) => {
				return {
					...props,
					anim: Animate.YES
				};
			});
			const last = cgrid[i].splice(this.cellCnt - 1, 1).map((props: ColorProps) => {
				return {
					...props,
					anim: Animate.NO
				};
			});
			col = [ ...cgrid[i], ...last, ...first ];
			ret = [ ...ret, ...[ col ] ];
		}
		this._colorGrid$.next(ret);
		return (this._colorGrid = ret);
	}

	public loopAnimation() {
		// console.log("Runing in a animation loop");
		this._gameloop$.next("next");
		if (this.canAnimate) {
			this._animId = requestAnimationFrame(() => {
				this.loopAnimation();
			});
		} else {
			cancelAnimationFrame(this._animId);
		}
	}

	handleGameloop() {
		let i = 0;
		const debouncedLoop = this._gameloop$.pipe(throttleTime(5000));
		debouncedLoop.subscribe(() => {
			console.log("Runing in a loop", ++i);
			this.rotateColorGrid(this.canAnimate);
		});
	}
}
