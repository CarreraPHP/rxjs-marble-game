import { Injectable } from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';

export interface ScreenSize {
	h: number;
	w: number;
}

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private headerSize: ScreenSize = {
		h: 56,
		w: -1 // if width is -1, it means either 'auto' or 100%
	};
	private scrnSize: ScreenSize = { h: 0, w: 0 };
	private availableContentSize: ScreenSize = { h: 0, w: 0 };
  private scrnMetrics$: ReplaySubject<ScreenSize> = new ReplaySubject(1);
  private availableContentMetrics$: ReplaySubject<ScreenSize> = new ReplaySubject(1);

	constructor() {}

	set scrnMetrics(scrnSize: ScreenSize) {
		this.scrnSize = scrnSize;
		this.availableContentSize = <ScreenSize>{
			h: scrnSize.h - this.headerSize.h,
			w: scrnSize.w
		};
    this.scrnMetrics$.next(scrnSize);
    this.availableContentMetrics$.next(this.availableContentSize);
	}

	get scrnMetrics(): ScreenSize {
		return this.scrnSize;
	}

	get scrnMetricsObservable(): Observable<ScreenSize> {
		return this.scrnMetrics$.asObservable();
	}

	get availableContentMetrics() {
		return this.availableContentSize;
  }
  
  get availableContentMetricsObservable(): Observable<ScreenSize> {
		return this.availableContentMetrics$.asObservable();
  }
  
  // setBaseSize() {
  //   const val = 
  // }
}
