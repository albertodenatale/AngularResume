import { AnimationService } from '../core/animation.service';
import { Add, Remove } from './../reducers/actions';
import { findSkill } from '../shared/skilltree';
import { Skill } from '../shared/skilltree';
import { AppState } from '../shared/skilltree';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training',
  template: `
  <div *ngIf="display">
    <line>Training</line>
    <div *ngFor="let training of trainings" class="row">
      <div class="col-12 col-lg-9 order-lg-3 col second">
        <h5>{{training.title}}</h5>
      </div>
      <div class="col-12 col-lg-3 order-lg-0 first">
        <strong>{{training.duration}}</strong>
      </div>
      <div class="col-12 col-lg-9 offset-lg-3 order-lg-3 col second">
        <toggable *ngFor="let nav of training.navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
        <div>{{training.place}}</div>
      </div>
    </div>
  </div>
  `
})
export class TrainingComponent {
  public display:boolean = false;
  
  constructor(private store: Store<AppState>, private animationService:AnimationService) { }

  ngOnInit() {
    this.animationService.showContentAndEducation$.subscribe(
      result => {
        if(result){
          this.display = true;
        }
      }
    )
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.trainings.forEach(
          training =>{
            training.navs = [];
            training.path.forEach(skillId => {
              let skill: Skill = findSkill(state.navigation, skillId);
              
              if(skill){
                training.navs.push(skill);
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

  trainings = [
    {
      duration:"October 2021",
      title:"Problem solving intermediate",
      place:"HackerRank",
      path:["problemsolving"],
      navs:[]
    },
    {
      duration:"29th May 2021",
      title:"Exam AZ-400: Designing and Implementing Microsoft DevOps Solutions",
      place:"Microsoft",
      path:["instrument", "sre", 
            "azuresecurity", "sourcecontrol", 
            "communication", "ci", 
            "cd" ],
      navs:[]
    },
    {
      duration:"12th July 2020",
      title:"Exam AZ-204: Developing Solutions for Microsoft Azure",
      place:"Microsoft",
      path:["appservices", "azurefunctions", 
            "azurecontainer", "azureregistry", 
            "azurestorage", "azurecosmosdb", 
            "azurecdn", "azureredis", 
            "azuremonitor", "azureapi", 
            "azurelogicapp", "azureeventgrid", 
            "azureeventhubs", "azurestoragequeues", "azureservicebus" ],
      navs:[]
    },
    {
      duration:"13th June 2018",
      title:"Exam 70-483: Programming in C#",
      place:"Microsoft",
      path:["csharp"],
      navs:[]
    },
    {
      duration:"October 2013 – December 2013",
      title:".NET Advanced Applications Development Using C#",
      place:"City University, London, UK",
      path:["backend", "wpf", "csharp"],
      navs:[]
    },
    {
      duration:"October 2013 – December 2013",
      title:"ASP.NET: Web Applications with MVC and Entity Framework Using C#",
      place:"City University, London, UK",
      path:["backend", "mvc", "csharp", "ef"],
      navs:[]
    },
    {
      duration:"18th November 2013",
      title:"Java SE 7 Certified Programmer I (Exam 1Z0-803)",
      place:"Oracle",
      path:["java"],
      navs:[]
    }
  ]

}
