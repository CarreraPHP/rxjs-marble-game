import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { map } from 'rxjs/operators';

@Component({
	selector: 'rmg-pad',
	templateUrl: './pad.component.html',
	styleUrls: [ './pad.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PadComponent implements OnInit {
	operatorList: Array<String> = [
		'audit',
		'auditTime',
		'buffer',
		'bufferCount',
		'bufferTime',
		'bufferToggle',
		'bufferWhen',
		'catchError',
		'combineAll',
		'combineLatest',
		'concat',
		'concatAll',
		'concatMap',
		'concatMapTo',
		'count',
		'debounce',
		'debounceTime',
		'defaultIfEmpty',
		'delay',
		'delayWhen',
		'dematerialize',
		'distinct',
		'distinctUntilChanged',
		'distinctUntilKeyChanged',
		'elementAt',
		'endWith',
		'every',
		'exhaust',
		'exhaustMap',
		'expand',
		'filter',
		'finalize',
		'find',
		'findIndex',
		'first',
		'groupBy',
		'ignoreElements',
		'isEmpty',
		'last',
		'map',
		'mapTo',
		'materialize',
		'max',
		'merge',
		'mergeAll',
		'mergeMap',
		'mergeMap as flatMap',
		'mergeMapTo',
		'mergeScan',
		'min',
		'multicast',
		'observeOn',
		'onErrorResumeNext',
		'pairwise',
		'partition',
		'pluck',
		'publish',
		'publishBehavior',
		'publishLast',
		'publishReplay',
		'race',
		'reduce',
		'repeat',
		'repeatWhen',
		'retry',
		'retryWhen',
		'refCount',
		'sample',
		'sampleTime',
		'scan',
		'sequenceEqual',
		'share',
		'shareReplay',
		'single',
		'skip',
		'skipLast',
		'skipUntil',
		'skipWhile',
		'startWith',
		'subscribeOn',
		'switchAll',
		'switchMap',
		'switchMapTo',
		'take',
		'takeLast',
		'takeUntil',
		'takeWhile',
		'tap',
		'throttle',
		'throttleTime',
		'throwIfEmpty',
		'timeInterval',
		'timeout',
		'timeoutWith',
		'timestamp',
		'toArray',
		'window',
		'windowCount',
		'windowTime',
		'windowToggle',
		'windowWhen',
		'withLatestFrom',
		'zip',
		'zipAll'
	];

	constructor() {}

	ngOnInit() {}
}
