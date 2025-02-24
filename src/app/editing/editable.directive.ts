import { AppState } from '../shared/skilltree';
import { Store } from '@ngrx/store';
import { EditService } from './../core/edit.service';
import { Directive, HostBinding, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
    selector: '[editable]',
    standalone: false
})
export class EditableDirective {

  @Output()
  contentChanges: EventEmitter<string> = new EventEmitter<string>();

  constructor(private editService: EditService, private store: Store<AppState>, private elementRef: ElementRef) { }

  ngOnInit()
  {
    this.store.select<AppState>(state => state.authentication).subscribe(
      auth => {
        if (auth != null) {
          this.isEditable = true;
        }
        else {
          this.isEditable = false;
        }
      }
    );
  }

  @HostListener('mousemove', ['$event']) onMousemove(e: MouseEvent) {
    if(this.isEditable){
      var x = e.clientX + 10, y = e.clientY - 20;
      this.editService.setNewPosition(x + 'px', y + 'px');
    }
  }

  @HostListener('mouseout') onMouseOut() {
    this.editService.hide();
  }

  @HostListener('focusout') onContentChange() {
    this.contentChanges.emit(this.getContent());
  }

  private getContent():string{
    return this.elementRef.nativeElement.innerHTML;
  }

  @HostBinding('attr.contenteditable') isEditable: boolean
}
