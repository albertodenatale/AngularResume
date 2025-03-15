import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'line',
    template: `  
    <div class="separator">
      <div class="first">
        <h5><ng-content></ng-content></h5>
      </div>
      <div class="second">
        <div class="line"></div>
        <div class="square"></div>
      </div>
    </div>`,
  styles: [`
      .separator {
        display: none;
        flex-wrap: wrap;
        container-type: inline-size;
        height: 40px;
        margin-bottom: 3%;

        .first,
        .second {
          flex: 1 1 100%;
        }
        
        .second {
          display: flex;
          align-items: center;
        }
        
        .line {
          width: 100%;
          height: 2px;
          background: var(--blue-medium);
          position: relative;
          bottom: -6px;
          left: 0;
          flex: 1;
          height: 2px;
          background: var(--blue-medium);
        }
        
        .square {
          width: 15px;
          height: 15px;
          background: var(--blue-medium);
          bottom: 0;
          right: 0;
          width: 15px;
          height: 15px;
          background: var(--blue-medium);
        }
      }

      @container (min-width: 768px) {
        .separator {
          display: flex;

          .first {
            flex: 1 1 25%;
          }

          .second {
            flex: 1 1 75%;
          }
        }
      }

      @container (min-width: 992px) {
        .separator {
          display: flex;

          .first {
            flex: 1 1 25%;
          }

          .second {
            flex: 1 1 75%;
          }
        }
      }

      @container (min-width: 1200px) {
        .separator {
          .first {
            flex: 1 1 25%;
          }

          .second {
            flex: 1 1 75%;
          }
        }
      }

      @container (min-width: 1400px) {
        .separator {
          .first {
            flex: 1 1 25%;
          }

          .second {
            flex: 1 1 75%;
          }
        }
      }
    `],
    standalone: false
})
export class LineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
