import { AnimationService } from '../core/animation.service';
import { LoadingService } from './../loading/loading.service';
import { FetchMainContent } from './../reducers/actions';
import { Store } from '@ngrx/store';
import { ExperienceComponent } from './experience.component';
import { ExperienceService } from './experience.service';
import { Experience } from './experience';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core';
import { AppState, ISkillTree, convertToRegex, enumerateTree } from "../shared/skilltree";
import { style, trigger, state, transition, animate, keyframes, query, stagger } from "@angular/animations";
import { map } from 'rxjs/operators'

@Component({
    selector: 'history',
    template: `
     <line>Work Experience</line>
     <div [@flyInOut]="queue.length" (@flyInOut.done)="displayEducationAndTraining()">
       <experience *ngFor="let experience of queue" [experience]="experience" [style.transform]="'translateY('+experience.currentPosition+'px)'"></experience>
     </div>
    `,
    animations: [
        trigger('flyInOut', [
            transition('* => *', [
                query('experience:enter', style({ opacity: 0 }), { optional: true }),
                query('experience:enter', stagger('200ms', [
                    animate(300, keyframes([
                        style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                    ]))
                ]), { optional: true })
            ])
        ])
    ],
    standalone: false
})
export class HistoryComponent implements OnInit {
  queue: Array<Experience> = [];
  isEditable: boolean = false;
  weight = 0;
  currentState:AppState

  @ViewChildren(ExperienceComponent, { read: ElementRef }) componentsSizes: QueryList<ElementRef>;
  @ViewChildren(ExperienceComponent) experienceComponents: QueryList<ExperienceComponent>;

  constructor(private store: Store<AppState>, private experienceService: ExperienceService, private loadingService: LoadingService, private animationService:AnimationService) {
    this.store.select<AppState>((state) => state).subscribe(
      state => {
        if (state.authentication != null) {
          this.isEditable = true;
        }
        else {
          this.isEditable = false;
        }

        if (state.navigation.isLoaded && state.main.isLoaded) {
          this.handleHistoryReload();
          this.process(state);
        }

        this.currentState = state;
      }
    );
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.process(this.currentState);
  }

  ngOnInit() {
    this.store.dispatch(new FetchMainContent());
  }

  sizes: Array<number> = [];

  process(state: AppState) {
    if (!this.componentsSizes)
    {
      return;
    }
    
    if (this.componentsSizes.length) {
      this.getComponentSize("1");
    }

    var sorted = this.queue.slice();

    this.queue.forEach(e => {
      let relevancy = 0;
      e.relevancy = 0;

      for (var skill of Array.from(enumerateTree(state.navigation))) {
        if (skill.isActive && e.path.find(p => p === skill.id)) {
          var weight = 1;

          if (skill.weight) {
            weight = skill.weight;
          }
          relevancy += weight;
        }
      }

      e.relevancy = relevancy;
    });

    this.sortHistory(sorted);

    if (this.componentsSizes.length) {
      this.queue.forEach(e => {
        var newIndex = sorted.indexOf(e);
        var initialIndex = this.queue.indexOf(e);
        var initialPosition = 0;

        for (var i = 0; i < initialIndex; i++) {
          initialPosition += this.getComponentSize(this.queue[i].id);
        }

        var newPosition = 0;
        
        for (var i = 0; i < newIndex; i++) {
          newPosition += this.getComponentSize(sorted[i].id);
        }

        e.currentPosition = newPosition - initialPosition;
      });
    }

  }

  private sortHistory(unsorted) {
    return unsorted.sort((a: Experience, b: Experience) => {
      if (a.relevancy > b.relevancy) {
        return -1;
      }
      else if (a.relevancy === b.relevancy) {
        if (a.period.from < b.period.from) {
          return 1;
        }
        else if (a.period.from == b.period.from) {
          return 0;
        }
        else if (a.period.from > b.period.from) {
          return -1;
        }
      }
      else if (a.relevancy < b.relevancy) {
        return 1;
      }

      throw new Error("Ouch!");
    });
  }

  getComponentSize(key: string) {
    var component = this.experienceComponents.find(e => e.experience.id === key);

    if (component) {
      var index = this.experienceComponents.toArray().indexOf(component);

      if (index > -1) {
        var natEl = this.componentsSizes.toArray()[index].nativeElement;

        if (natEl) {
          return natEl.offsetHeight + parseInt(window.getComputedStyle(natEl, null).marginBottom);
        }
      }
    }
  }

  handleHistoryReload() {
    if (this.queue == null || this.queue.length === 0) {
      this.queue = this.sortHistory(this.experienceService.experiences);
    }
  }

  displayEducationAndTraining(){
    this.loadingService.mainContentRendered();
    this.animationService.showEducationAndTraining();
  }
}
