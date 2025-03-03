import { EducationComponent } from './education.component';
import { SharedModule } from './../shared/shared.module';
import { ExperienceService } from './experience.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import { HistoryComponent } from './history.component';
import { PeriodPipe } from './period.pipe';
import { SortByDateFromPipe } from './sort-by-date-from.pipe';
import { TrainingComponent } from "../experiences/training.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ExperienceComponent, HistoryComponent, PeriodPipe, SortByDateFromPipe, TrainingComponent, EducationComponent],
  providers:[ExperienceService],
  exports:[HistoryComponent, TrainingComponent, EducationComponent]
})
export class ExperiencesModule { }
