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
    <i *ngIf="isEditable" (click)="deleteExperience(experience)" class="fa fa-trash-o" aria-hidden="true"></i>
    <div class="col-12 col-lg-9 order-lg-3 second">
      <h5>{{experience.title}}</h5>
    </div>
    <div class="col-12 col-lg-3 order-lg-0 first">
      <strong>{{experience | period}}</strong>
    </div>
    <div class="col-12 col-lg-9 offset-lg-3 order-lg-3 col second">
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      <div>{{experience.place}}</div>
      <pre>{{experience.description}}</pre>
    </div>`,
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
