import { AnimationService } from '../core/animation.service';
import { AppState, MAINNAV } from './../shared/skilltree';
import { Add, Remove } from '../reducers/actions';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { ISkillTree, getByNavigationBarId, Skill } from "../shared/skilltree";
import { style, trigger, state, transition, animate, keyframes, query, stagger } from "@angular/animations";

@Component({
    selector: 'navigation',
    template: `
    <div [@animatebar]="animationTrigger" (@animatebar.done)="triggerSubnav($event)">
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
    </div>
  `,
    animations: [
        trigger("animatebar", [
            transition('* => *', [
                query(':enter', style({ opacity: 0 }), { optional: true }),
                query(':enter', stagger('200ms', [
                    animate(300, keyframes([
                        style({ transform: 'translateX(-100%)', opacity: 0 }),
                        style({ transform: 'translateX(30px)', opacity: 1 }),
                        style({ transform: 'translateX(0)' })
                    ]))
                ]), { optional: true })
            ])
        ])
    ],
    standalone: false
})
export class NavigationComponent {

  navs: Array<Skill>;
  animationTrigger: string = "no";

  constructor(private store: Store<AppState>, private animationService: AnimationService) {
    this.store.select<ISkillTree>(state => state.navigation).subscribe(
      skillTree => {
        this.navs = getByNavigationBarId(skillTree, MAINNAV);
        if (skillTree.isLoaded) { this.animationTrigger = "yes" }
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

  triggerSubnav(event) {
    if (event.toState === "yes") {
      this.animationService.startSubAnimation();
    }
  }

}
