import { findSkill } from '../shared/skilltree';
import { Store } from '@ngrx/store';
import { Skill, AppState } from './../shared/skilltree';
import { Experience, ParsePeriod } from './experience';
import { Component, Input } from '@angular/core';
import { Add, Remove } from "../reducers/actions";
import { ExperienceService } from '../experiences/experience.service';

@Component({
    selector: 'experience',
    template: `
      <div class="experience-container">
        <div class="experience-title second">
          <h5>{{experience.title}}</h5>
        </div>
        <div class="experience-period first">
          <strong>{{experience | period}}</strong>
        </div>
        <div class="experience-details second">
          <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
          <div>{{experience.place}}</div>
          <pre>{{experience.description}}</pre>
        </div>
      </div>
    `,
    styles: [`
        :host {
            display: block;
        }

        .experience-container {
            display: flex;
            flex-wrap: wrap;
          }
          
        .experience-title {
            flex: 1 1 100%;
            order: 0;
        }

        .experience-period {
            flex: 1 1 100%;
            order: 0;
        }

        .experience-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 0%;
        }

        @container (min-width: 576px) {
          .experience-title,
          .experience-details {
            flex: 1 1 100%;
            order: 0;
          }

          .experience-period {
            flex: 1 1 100%;
            order: 0;
          }
        }

        @container (min-width: 768px) {
          .experience-title,
          .experience-details {
            flex: 1 1 100%;
            order: 0;
          }

          .experience-period {
            flex: 1 1 100%;
            order: 0;
          }
        }

        @container (min-width: 992px) {
          .experience-title {
            flex: 1 1 75%;
            order: 3;
          }

          .experience-period {
            flex: 1 1 25%;
            order: 0;
          }

          .experience-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 25%;
          }
        }

        @container (min-width: 1200px) {
          .experience-title {
            flex: 1 1 75%;
            order: 3;
          }

          .experience-period {
            flex: 1 1 25%;
            order: 0;
          }

          .experience-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 25%;
          }
        }

        @container (min-width: 1400px) {
          .experience-title {
            flex: 1 1 75%;
            order: 3;
          }

          .experience-period {
            flex: 1 1 25%;
            order: 0;
          }

          .experience-details {
            flex: 1 1 75%;
            order: 3;
            margin-left: 25%;
          }
        }
      `],
    standalone: false
})
export class ExperienceComponent {

  @Input()
  experience: Experience;

  navs: Array<Skill> = [];

  isEditable: boolean;

  constructor(private store: Store<AppState>, private experienceService: ExperienceService) { }

  ngOnInit() {
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.navs = [];

        this.experience.path.forEach(skillId => {
          let skill: Skill = findSkill(state.navigation, skillId);

          this.navs.push(skill);
        });

        if (state.authentication != null) {
          this.isEditable = true;
        }
        else {
          this.isEditable = false;
        }
      }
    )
  }

  whenOn(skill: Skill) {
    this.store.dispatch(
      new Add(skill.id)
    )
  }

  whenOff(skill: Skill) {
    this.store.dispatch(
      new Remove(skill.id)
    )
  }
}
