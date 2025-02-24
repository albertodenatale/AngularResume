import { AnimationService } from '../core/animation.service';
import { SUBNAV, AppState } from './../shared/skilltree';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { ISkillTree, Skill, getByNavigationBarId, findSkill } from "../shared/skilltree";
import { Add, Remove } from "../reducers/actions";
import { style, trigger, transition, animate, keyframes, query, stagger } from "@angular/animations";

@Component({
    selector: 'subnavigation',
    template: `
    <div [@animateSubnav]="navs.length">
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
    </div>
  `,
    animations: [
        trigger('animateSubnav', [
            transition('* => *', [
                query(':enter', style({ opacity: 0 }), { optional: true }),
                query(':enter', stagger('200ms', [
                    animate(300, keyframes([
                        style({ transform: 'translateX(-100%)', opacity: 0 }),
                        style({ transform: 'translateX(30px)', opacity: 1 }),
                        style({ transform: 'translateX(0)' })
                    ]))
                ]), { optional: true }),
                query(':leave', stagger('200ms', [
                    animate(300, keyframes([
                        style({ transform: 'translateX(0)' }),
                        style({ transform: 'translateX(-30px)', opacity: 1 }),
                        style({ transform: 'translateX(1000%)', opacity: 0 })
                    ]))
                ]), { optional: true })
            ])
        ])
    ],
    standalone: false
})
export class SubnavigationComponent {
  navs: Array<Skill> = [];
  isNavBarLoaded: boolean = false;
  loadedTree: ISkillTree

  constructor(private store: Store<AppState>, private animationService: AnimationService) {
    this.store.select<ISkillTree>((state) => state.navigation).subscribe(
      skillTree => {
        if (this.isNavBarLoaded) {
          this.process(skillTree, getByNavigationBarId(skillTree, SUBNAV));
        }
        else {
          this.loadedTree = skillTree;
        }
      }
    );

    this.animationService.startSubAnimation$.subscribe(
      isOkToStart => {
        if (isOkToStart) {
          this.isNavBarLoaded = true;
          this.process(this.loadedTree, getByNavigationBarId(this.loadedTree, SUBNAV));
        }
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

  process(skillTree: ISkillTree, selected: Array<Skill>): void {
    if (this.navs == null) {
      this.navs = [];
    }

    selected = JSON.parse(JSON.stringify(selected));

    var toAdd = selected.filter(
      node => {
        let parent: Skill = findSkill(skillTree, node.parentId);

        if (parent != null && parent.isActive) {
          let existing = this.navs.find(n => n.id === node.id);

          if (existing) {
            existing.isActive = node.isActive;

            return false;
          }

          return true;
        }

        return false;
      }
    );

    var toRemove = selected.filter(
      node => {
        let parent: Skill = findSkill(skillTree, node.parentId);

        if (parent != null && !parent.isActive) {
          return this.navs.some(n => n.id === node.id);
        }

        return false;
      }
    );

    this.navs = this.navs.concat(toAdd).filter(s => toRemove.find(r => r.id === s.id) == null);
  }

}
