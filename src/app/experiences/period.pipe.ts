import { Pipe, PipeTransform } from '@angular/core';
import { formatPeriod, Experience } from "../experiences/experience";

@Pipe({
    name: 'period',
    standalone: false
})
export class PeriodPipe implements PipeTransform {

  transform(experience: Experience, args?: any): string {
    return formatPeriod(experience.period);
  }

}
