import { Subscription } from 'rxjs';
import { LoadingService } from './loading/loading.service';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from './reducers/actions';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent {
  user: any
  isNavShowed: boolean = true;
  loadingNavSubscription: Subscription;
  isDarkModeOn: Boolean;

  constructor(private store: Store<AppState>,
    private loadingService: LoadingService
  ) {
    this.loadingNavSubscription = this.store.select<ISkillTree>(state => state.navigation).subscribe(
      skillTree => {
        if (skillTree.isLoaded) {
          this.loadingNavSubscription.unsubscribe();
          this.loadingService.navigationLoaded();
        }
      });

    this.store.select<AppState>(state => state).subscribe(
      state => {

      }
    );

  }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.FETCHINITIALSTATE
    });
  }
}
