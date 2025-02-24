import { EditService } from './../core/edit.service';
import { Component, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
    selector: 'edit-tooltip',
    template: `
    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
  `,
    styles: [':host { display:none; position:fixed; }'],
    standalone: false
})
export class EditTooltipComponent {

  constructor(private editService: EditService) {
    this.editService.newPosition$.subscribe(
      position => {
        if (position) {
          this.display = 'block';
          this.left = position[0];
          this.top = position[1];
        }
        else {
          this.display = 'none';
        }
      })
  }

  @HostBinding('style.top') top

  @HostBinding('style.left') left

  @HostBinding('style.display') display

}
