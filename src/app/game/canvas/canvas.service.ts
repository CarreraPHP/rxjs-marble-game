import { Injectable } from "@angular/core";
import { AppService } from "src/app/app.service";

@Injectable({
  providedIn: "root"
})
export class CanvasService {
  rem: number;
  grid: string[][] = [];

  get cellCnt(): number {
    return this.appService.cellCnt;
  }

  get visibleCellCnt(): number {
    return this.cellCnt - 1;
  }

  get colCnt(): number {
    return this.appService.colCnt;
  }

  constructor(private appService: AppService) {}

  /**
   * populate the grid by the count provided.
   */
  populateGrid(): string[][] {
    let ret: string[][] = [];
    for (let i = 0; i < this.colCnt; i++) {
      for (let j = 0, col: string[] = []; j < this.cellCnt; j++) {
        col = [...col, ...[`(${i + 1},${j + 1})`]];
        // col = [ ...col, ...[ `${this.hues[i * j]}` ] ];
        if (j == this.cellCnt - 1) {
          ret = [...ret, ...[col]];
        }
      }
    }
    return (this.grid = ret);
  }

  handleRemChange() {
    this.appService.fontSizeObservable.subscribe((v: number) => {
      this.rem = v;
    });
  }
}
