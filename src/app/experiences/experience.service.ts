import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Experience } from './experience';
import { Injectable } from '@angular/core';
import * as MainActions from '../reducers/actions';
import { map } from 'rxjs/operators'
import experienceEntities from '../storage/experiences.json';

@Injectable()
export class ExperienceService {
  experiences: Partial<Experience>[];
  
  constructor(
      private actions$: Actions
    ) { 
      this.experiences = <Partial<Experience>[]> experienceEntities;
    }

    loadInitialState$ = createEffect(() => this.actions$
      .pipe(
        ofType(MainActions.FETCHMAINCONTENT),
        map(res => ({type: MainActions.MAINCONTENTLOADED, payload: { isLoaded: true } }))
      ));
}
