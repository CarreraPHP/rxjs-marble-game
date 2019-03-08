import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rmg-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  cellCnt: number = 6;
	colCnt: number = 5;
	grid: string[][] = [];

	get visibleCellCnt(): number {
		return this.cellCnt - 1;
	}

	get visibleColCnt(): number {
		return this.colCnt;
	}

	constructor() {
		this.populateGrid();
	}

	populateGrid(): void {
    let ret: string[][] = [];
		for (let i = 0; i < this.colCnt; i++) {
			for (let j = 0, col: string[] = []; j < this.cellCnt; j++) {
				col = [ ...col, ...[ `[${i+1},${j+1}]` ] ];
				if (j == this.cellCnt - 1) {
					ret = [ ...ret, ...[ col ] ];
				}
			}
    }
    this.grid = ret;
	}

  ngOnInit() {
  }

}
