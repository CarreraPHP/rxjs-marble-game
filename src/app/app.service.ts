import { Injectable, ElementRef } from "@angular/core";

import { ReplaySubject, Observable } from "rxjs";

export interface ScreenSize {
  h: number;
  w: number;
}

export interface GridSize extends ScreenSize {
  ch: number;
}

@Injectable({
  providedIn: "root"
})
export class AppService {
  cellHeight: number = 3.25;
  cellCnt: number = 18; // always have plus one cell to show animation.
  colCnt: number = 12;
  private _gridSize: number;
  private _colSize: number = 19.5;
  private _fontSize: number = 16;
  private _scrnSize: ScreenSize = { h: 0, w: 0 };
  private _availableContentSize: ScreenSize = { h: 0, w: 0 };
  private _availableContentMetrics$: ReplaySubject<
    ScreenSize
  > = new ReplaySubject(1);
  private _gridMetrics$: ReplaySubject<GridSize> = new ReplaySubject(1);
  private _fontSize$: ReplaySubject<number> = new ReplaySubject(1);
  private _appEl: ElementRef;

  set appElementRef(el: ElementRef) {
    this._appEl = el;
  }

  get appElementRef(): ElementRef {
    return this._appEl;
  }

  set scrnMetrics(scrnSize: ScreenSize) {
    console.log("scrn size", scrnSize);
    this._scrnSize = scrnSize;
    this._availableContentSize = <ScreenSize>{
      h: scrnSize.h,
      w: scrnSize.w
    };
    this._availableContentMetrics$.next(this._availableContentSize);
    this.handleRootFontSize(this.getCustomFontSize());
  }

  get scrnMetrics(): ScreenSize {
    return this._scrnSize;
  }

  get availableContentMetrics() {
    return this._availableContentSize;
  }

  get availableContentMetricsObservable(): Observable<ScreenSize> {
    return this._availableContentMetrics$.asObservable();
  }

  get gridMetricsObservable(): Observable<ScreenSize> {
    return this._gridMetrics$.asObservable();
  }

  get fontSizeObservable(): Observable<number> {
    return this._fontSize$.asObservable();
  }

  constructor() {
    this.setGridRem();
  }

  public setGridRem() {
    this._colSize = this.cellCnt * this.cellHeight;
    this._gridSize = this.colCnt * this.cellHeight;
    this._gridMetrics$.next({
      h: this._colSize,
      w: this._gridSize,
      ch: (this.cellCnt + 1) * this.cellHeight
    });
  }

  private getStyleTextNode = (v: number) =>
    `html{ font-size: ${v}px !important; }`;

  /**
   * Formula:
   * Rewirte the formula.
   * no of cube, across width is 30 & across height is 60(visible only)
   * total cubes in the rectangle is 1800.
   * cube(square) Area is Math.pow(3.25x, 2), where x is the value we need to find.
   * total cubes Area is Math.pow(3.25x, 2) * 1800
   * applicable width(y) is 30/60 * h
   * total applicable rectangle Area = (30/60) * h * h
   * so formulae would be
   * = Math.sqrt((30/60) * Math.pow(h, 2) / (Math.pow(3.25, 2) * (30 * 60)))
   */
  public getCustomFontSize(): number {
    const size: ScreenSize = this._availableContentSize;
    const g = this.cellCnt;
    const c = this.colCnt;
    const h: number = size.h; // always handle width
    const r: number =
      h > 0
        ? Math.sqrt(((c / g) * Math.pow(h, 2)) / (Math.pow(3.25, 2) * (c * g)))
        : this._fontSize; // gridSize is always greater than colSize.
    this._fontSize$.next(r);
    return r;
  }

  private handleRootFontSize(custFontSize: number = -1) {
    const el: Element = <HTMLElement>this._appEl.nativeElement;
    let _: Element = el.querySelector("#resetEl");
    let resteEl: Element;
    if (_ !== null) {
      resteEl = _;
    } else {
      resteEl = document.createElement("style");
      resteEl.id = "resetEl";
      el.appendChild(resteEl);
    }
    resteEl.textContent = this.getStyleTextNode(
      custFontSize > 0 ? custFontSize : this._fontSize
    );
  }
}
