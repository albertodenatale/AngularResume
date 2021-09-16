import { LoadingModule } from './loading/loading.module';
import { SharedModule } from './shared/shared.module';
import { QueryStringService } from './core/querystring.service';
import { EditingModule } from './editing/editing.module';
import { ExperienceService } from './experiences/experience.service';
import { StateService } from './core/state.service';
import { CoreModule } from './core/core.module';
import { NavigationModule } from './navigation/navigation.module';
import { ExperiencesModule } from './experiences/experiences.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsClippyModule } from 'js-clippy'
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as moment from 'moment';
import { RouterModule } from "@angular/router";
import { mainReducer, authenticationReducer, navigationReducer, clippyReducer } from './reducers/reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    FormsModule,
    ExperiencesModule,
    NavigationModule,
    CoreModule,
    SharedModule,
    EditingModule,
    StoreModule.forRoot({ navigation: navigationReducer, main: mainReducer, authentication: authenticationReducer, clippy: clippyReducer }),
    EffectsModule.forRoot([StateService, ExperienceService, QueryStringService]),     
    LoadingModule,
    JsClippyModule
  ],
  providers: [{ provide: 'moment', useValue: moment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
