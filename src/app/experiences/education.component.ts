import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../core/animation.service';
import { Add, Remove } from './../reducers/actions';
import { findSkill } from '../shared/skilltree';
import { Skill } from '../shared/skilltree';
import { AppState } from '../shared/skilltree';
import { Store } from '@ngrx/store';

@Component({
  selector: 'education',
  template: `
    <div *ngIf="display">
      <line>Education</line>
      <div *ngFor="let education of educations" class="education-container">
        <div class="education-title second">
          <h5>{{education.title}}</h5>
        </div>
        <div class="education-duration first">
          <strong>{{education.duration}}</strong>
        </div>
        <div class="education-details second">
          <toggable *ngFor="let nav of education.navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
          <div>{{education.place}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .education-container {
      display: flex;
      flex-wrap: wrap;
      container-type: inline-size;
      margin-bottom: 15px;
    }
      
    .education-duration {
        margin-bottom: 10px;
    }

    toggable{
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .education-title,
    .education-duration,
    .education-details {
      flex: 1 1 100%;
      order: 0;
    }

    @container (min-width: 576px) {
      .education-title,
      .education-duration,
      .education-details {
        flex: 1 1 100%;
        order: 0;
      }
    }

    @container (min-width: 768px) {
      .education-title,
      .education-duration,
      .education-details {
        flex: 1 1 100%;
        order: 0;
      }
    }

    @container (min-width: 992px) {
      .education-title {
        flex: 1 1 75%;
        order: 3;
      }

      .education-duration {
        flex: 1 1 25%;
        order: 0;
      }

      .education-details {
        flex: 1 1 75%;
        order: 3;
        margin-left: 25%;
      }
    }

    @container (min-width: 1200px) {
      .education-title {
        flex: 1 1 75%;
        order: 3;
      }

      .education-duration {
        flex: 1 1 25%;
        order: 0;
      }

      .education-details {
        flex: 1 1 75%;
        order: 3;
        margin-left: 25%;
      }
    }

    @container (min-width: 1400px) {
      .education-title {
        flex: 1 1 75%;
        order: 3;
      }

      .education-duration {
        flex: 1 1 25%;
        order: 0;
      }

      .education-details {
        flex: 1 1 75%;
        order: 3;
        margin-left: 25%;
      }
    }
  `],
  standalone: false
})
export class EducationComponent implements OnInit {
  public display: boolean = false;

  constructor(private store: Store<AppState>, private animationService: AnimationService) { }

  ngOnInit() {
    this.animationService.showContentAndEducation$.subscribe(
      result => {
        if (result) {
          this.display = true;
        }
      }
    );
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.educations.forEach(
          education => {
            education.navs = [];
            education.path.forEach(skillId => {
              let skill: Skill = findSkill(state.navigation, skillId);

              if (skill) {
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
      duration: "August 2010-December 2010",
      title: "Semester Abroad",
      place: "Universidade Estadual de Campinas, Campinas (Brazil)",
      path: ["probability", "statistic", "stochasticp"],
      navs: []
    },
    {
      duration: "March 2009 - February 2012",
      title: "Master's Degree in Computer Science (2012)",
      place: "Politecnico di Milano, Milan (Italy)",
      path: ["AI", "machinel", "vision", "naturall", "videogame"],
      navs: []
    },
    {
      duration: "September 2005 February 2009",
      title: "Bachelor's Degree in Computer Science (2009)",
      place: "Politecnico di Milano, Milan (Italy)",
      path: ["math", "physic", "IT", "economy", "networks", "automation", "electronic", "chemistry"],
      navs: []
    }
  ]
}