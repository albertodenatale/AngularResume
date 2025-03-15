import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'layout',
  template: `
    <div class="layout-container">
      <div class="main" [ngStyle]="{'width.px': mainWidth, 'padding-left.px': padding, 'padding-right.px': padding}">
        <ng-content select="[main]"></ng-content>
      </div>
      <div class="resizer" (mousedown)="onResize($event)" [ngStyle]="{ 'width.px': resizerWidth }"></div>
      <div class="aside" [ngStyle]="{ 'width.px': asideWidth }">
        <ng-content select="[aside]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      container-type: inline-size;
    }

    .main {
      float: left;
      container-type: inline-size;
      height: 100%;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
      -ms-overflow-style: auto;
    }

    @container (max-width: 768px) {
      .main {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .main::-webkit-scrollbar {
        display: none;
      }
    }

    :host-context(.darkModeOn) .main {
      scrollbar-color: #90caf9 #333;
    }

    .main::-webkit-scrollbar {
      width: 6px;
    }

    .main::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    :host-context(.darkModeOn) .main::-webkit-scrollbar-track {
      background: #333;
    }

    .main::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }

    :host-context(.darkModeOn) .main::-webkit-scrollbar-thumb {
      background: #90caf9;
    }

    .main::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    :host-context(.darkModeOn) .main::-webkit-scrollbar-thumb:hover {
      background: #bbe0ff;
    }

    .resizer {
      height: 100vh;
      background-color: white;
      cursor: ew-resize;
      float: left;
    }

    :host-context(.darkModeOn) .resizer {
      background-color: #333;
    }

    .aside {
      float: left;
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
  @Output() asideWidthChange = new EventEmitter<number>();
  
  asideWidth: number;
  mainWidth: number;
  resizerWidth: number = 5;
  padding: number = 20;

  ngOnInit() {
    this.initializeWidths();
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent(event: Event) {
    this.initializeWidths();
  }

  initializeWidths() {
    this.asideWidth = 400;

    this.calculateWidths();
  }

  onResize(event: MouseEvent) {
    const startX = event.clientX;
    const startWidth = this.asideWidth;

    const mouseMoveListener = (moveEvent: MouseEvent) => {
      const newWidth = startWidth - (moveEvent.clientX - startX);
      this.asideWidth = Math.max(newWidth, 400);

      this.calculateWidths();
    };

    const mouseUpListener = () => {
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  }

  private calculateWidths() {
    let screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      this.asideWidth = 0;
    } else {
      screenWidth += 20;
    }

    this.mainWidth = screenWidth - this.asideWidth - this.resizerWidth - (2 * this.padding);
    this.asideWidthChange.emit(this.asideWidth);
  }
}