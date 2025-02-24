import { LoadingService } from './loading.service';
import { timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
    selector: 'loader',
    template: `
   <mat-progress-bar *ngIf="isDisplayed" mode="determinate" [value]="progress"></mat-progress-bar>
  `,
    standalone: false
})
export class LoaderComponent implements OnInit {

  private progress: number = 0;
  private timerPace: number = 1;
  private threshold: number = 20;
  private timer: Subscription = null;
  isDisplayed: boolean = true;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loadingStatus$.subscribe(
      status => {
        this.progress = status.progress;
        this.threshold = status.threshold;
      }
    );
  }

  ngOnInit() {
    this.timer = timer(1000, 100).subscribe(_ => {
      if (this.progress >= 100.5) {
        this.isDisplayed = false;
        this.timer.unsubscribe();
      }
      else {
        if (this.progress < this.threshold) {
          this.timerPace = 1;
        }
        else if (this.progress < this.threshold + 20) {
          this.timerPace = 0.1;
        }
        else {
          this.timerPace = 0;
        }

        this.progress += this.timerPace;
      }
    });
  }

}
