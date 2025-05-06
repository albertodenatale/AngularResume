import { Component, OnInit } from '@angular/core';
declare var Skype : any;

@Component({
    selector: 'personal-details',
    template: `  
      <div class="personal-container">
        <div class="personal-title">
          <h5>Alberto De Natale</h5>
        </div>
        <div class="darkmode-toggle">
          <darkmodetoggle></darkmodetoggle>
        </div>
        <div class="personal-info">
          <h5>Personal Information</h5>
        </div>
        <div class="personal-details jupiter">
          <span class="trait"><i class="fa fa-linkedin" aria-hidden="true"></i><a target="_blank" href="https://www.linkedin.com/in/alberto-de-natale/">LinkedIn</a></span>
          <span class="trait"><i class="fa fa-github" aria-hidden="true"></i><a target="_blank" href="https://github.com/albertodenatale/my-angular-website">GitHub</a></span>
          <span class="trait"><i class="fa fa-stack-overflow" aria-hidden="true"></i><a target="_blank" href="https://stackoverflow.com/users/2987314/alberto">Stack Overflow</a></span>
          <span class="trait"><i class="fa fa-windows" aria-hidden="true"></i><a target="_blank" href="https://docs.microsoft.com/en-us/users/albertodenatale/">Microsoft Learn</a></span>
        </div>
      </div>`,
      styles: [`
        .personal-container {
          display: flex;
          flex-wrap: wrap;
          container-type: inline-size;
        }

        .personal-details {
          margin-bottom: 30px;
        }

        .personal-info {
          display: none;
        }
          
        .personal-title {
          flex: 1 1 83%;
          order: 0;
        }
          
        .darkmode-toggle {
          flex: 1 1 17%;
          order: 0;
        }

        @container (min-width: 576px) {
          .personal-info,
          .personal-details {
            flex: 1 1 100%;
            order: 0;
          }
        }

        @container (min-width: 768px) {
          .personal-details {
            flex: 1 1 100%;
            order: 0;
          }
        }

        @container (min-width: 768px) {
          .personal-title {
            flex: 1 1 66.6667%;
            order: 3;
          }

          .darkmode-toggle {
            flex: 1 1 8.3333%;
            order: 3;
          }

          .personal-info {
            flex: 1 1 25%;
            order: 0;
            display: block;
          }

          .personal-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 25%;
          }
        }

        @container (min-width: 1200px) {
          .personal-title {
            flex: 1 1 66.6667%;
            order: 3;
          }

          .darkmode-toggle {
            flex: 1 1 8.3333%;
            order: 3;
          }

          .personal-info {
            flex: 1 1 25%;
            order: 0;
            display: block;
          }

          .personal-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 25%;
          }
        }

        @container (min-width: 1400px) {
          .personal-title {
            flex: 1 1 66.6667%;
            order: 3;
          }

          .darkmode-toggle {
            flex: 1 1 8.3333%;
            order: 3;
          }

          .personal-info {
            flex: 1 1 25%;
            order: 0;
            display: block;
          }

          .personal-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 25%;
          }
        }
        `],
    standalone: false
})
export class PersonalDetailsComponent {

  ngAfterViewInit() {
  }

}
