import { AnimationService } from '../core/animation.service';
import { Add, Remove } from './../reducers/actions';
import { findSkill } from '../shared/skilltree';
import { Skill } from '../shared/skilltree';
import { AppState } from '../shared/skilltree';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'education',
    template: `
  <div *ngIf="display">
    <line>Education</line>
    <div *ngFor="let education of educations" class="row">
      <div class="col-12 col-lg-9 order-lg-3 col second">
        <h5>{{education.title}}</h5>
      </div>
      <div class="col-12 col-lg-3 order-lg-0 first">
        <strong>{{education.duration}}</strong>
      </div>
      <div class="col-12 col-lg-9 offset-lg-3 order-lg-3 col second">
        <toggable *ngFor="let nav of education.navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
        <div>{{education.place}}</div>
      </div>
    </div>
  </div>
  `,
    standalone: false
})
export class EducationComponent {
  public display: boolean = false;
  
  constructor(private store: Store<AppState>, private animationService:AnimationService) { }

  ngOnInit() {
    this.animationService.showContentAndEducation$.subscribe(
      result => {
        if(result){
          this.display = true;
        }
      }
    );
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.educations.forEach(
          education =>{
            education.navs = [];
            education.path.forEach(skillId => {
              let skill: Skill = findSkill(state.navigation, skillId);
              
              if(skill){
                education.navs.push(skill);
              }
            });
          }
        );
      }
    );
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

  educations = [
    {
      duration:"August 2010-December 2010",
      title:"Semester Abroad",
      place:"Universidade Estadual de Campinas, Campinas (Brazil)",
      path:["probability", "statistic", "stochasticp"],
      navs:[]
    },
    {
      duration:"March 2009 - February 2012",
      title:"Master's Degree in Computer Science (2012)",
      place:"Politecnico di Milano, Milan (Italy)",
      path:["artificial", "machinel", "vision", "naturall", "videogame"],
      navs:[]
    },
    {
      duration:"September 2005 February 2009",
      title:"Bachelor's Degree in Computer Science (2009)",
      place:"Politecnico di Milano, Milan (Italy)",
      path:["math", "physic", "IT", "economy", "networks", "automation", "electronic", "chemistry"],
      navs:[]
    }
  ]

}
