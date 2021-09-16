import { Injectable } from '@angular/core';
import { SkillTree } from "../shared/skilltree";
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as NodesActions from '../reducers/actions';
import { map } from 'rxjs/operators'
import skillTree from '../storage/skilltree.json'

@Injectable()
export class StateService {
  skillTree: SkillTree;

  constructor(private actions$: Actions) {
    this.skillTree = <SkillTree> skillTree;
  }

  @Effect() loadInitialState$ = this.actions$
    .pipe(
      ofType(NodesActions.FETCHINITIALSTATE),
      map(res => this.createState())
    );

  private createState() {
    return { type: NodesActions.INITIALSTATELOADED, payload: skillTree };
  }
}
