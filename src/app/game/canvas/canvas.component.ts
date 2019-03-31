import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { AppService, ScreenSize } from "../../app.service";
import { Observable } from "rxjs";
import { ColorService, ColorProps } from '../color.service';

@Component({
  selector: "rmg-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit {
  _colorGrid: ColorProps[][];
  contentSize: ScreenSize;

  get colorGrid(): ColorProps[][] {
    return this._colorGrid;
  }

  constructor(
    private appService: AppService,
    private colorEngine: ColorService,
    private cdRef: ChangeDetectorRef
  ) {
    this.handleContentSize();
    this.handleColorServiceObservables();
  }

  handleColorServiceObservables() {
    this.colorEngine.colorGridObservable.subscribe((cgrid: ColorProps[][]) => {

      this._colorGrid = cgrid;
      this.cdRef.markForCheck();
    })
  }

  handleContentSize() {
    const contentMetrics$: Observable<ScreenSize> = this.appService
      .availableContentMetricsObservable;
    contentMetrics$.subscribe((size: ScreenSize) => {
      console.log("Height x width", size);
      this.contentSize = { ...size };
      this.cdRef.markForCheck();
    });
  }

  ngOnInit() {}
}
