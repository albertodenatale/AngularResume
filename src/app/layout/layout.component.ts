import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'layout',
  template: `
    <div>
      <div class="main" [ngStyle]="{'width.px': mainWidth, 'padding-left.px': padding, 'padding-right.px': padding}">
        <ng-content select="[main]"></ng-content>
      </div>
      <div class="resizer" (mousedown)="onResize($event)"></div>
      <div class="aside" [ngStyle]="{'width.px': asideWidth, 'padding-left.px': padding, 'padding-right.px': padding}">
        <ng-content select="[aside]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .main {
      float: left;
      container-type: inline-size;
    }

    .resizer {
      width: 5px;
      height: 100vh;
      background-color: #000;
      cursor: ew-resize;
      float: left;
    }

    .aside {
      float: right;
    }

    @container (min-width: 700px) {
      .aside h2 {
        font-size: 4em;
        color: blue;
      }
    }

    @media (max-width: 575.98px), (min-width: 576px) and (max-width: 767.98px) {
      .aside {
        display: none;
      }
      .resizer {
        display: none;
      }
    }
  `],
  standalone: false
})
export class LayoutComponent implements OnInit {
  asideWidth: number;
  mainWidth: number;
  padding: number = 20;

  ngOnInit() {
    this.initializeWidths();
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent(event: Event) {
    this.initializeWidths();
  }

  initializeWidths() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 576) {
      this.asideWidth = 0;
    } else if (screenWidth < 768) {
      this.asideWidth = 0;
    } else if (screenWidth < 992) {
      this.asideWidth = 200;
    } else if (screenWidth < 1200) {
      this.asideWidth = 250;
    } else {
      this.asideWidth = 300;
    }

    this.mainWidth = screenWidth - this.asideWidth - 5 - (2 * this.padding);
  }

  onResize(event: MouseEvent) {
    const startX = event.clientX;
    const startWidth = this.asideWidth;

    const mouseMoveListener = (moveEvent: MouseEvent) => {
      const newWidth = startWidth - (moveEvent.clientX - startX);
      this.asideWidth = Math.max(newWidth, 100);
      this.mainWidth = window.innerWidth - this.asideWidth - 5 - (2 * this.padding);
    };

    const mouseUpListener = () => {
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  }
}