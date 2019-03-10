import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AppService, ScreenSize } from "../../app.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'rmg-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit {
  contentSize:ScreenSize;

  constructor(private appService: AppService, private cdRef:ChangeDetectorRef) {
    this.handleContentSize();
  }

  handleContentSize() {
    const contentMetrics$: Observable<ScreenSize> = this.appService.availableContentMetricsObservable;
    contentMetrics$.subscribe((size: ScreenSize) => {
      console.log("Height x width", size);
      this.contentSize = {...size};
      this.cdRef.markForCheck();
    });
  }

  ngOnInit() {
  }

}
