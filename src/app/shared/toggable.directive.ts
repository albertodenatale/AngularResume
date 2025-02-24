import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener, Input, Directive } from '@angular/core';

@Directive({
    selector: 'toggable, [toggable]',
    host: { 'class': 'btn' },
    standalone: false
})
export class ToggableDirective{
  @Output()
  whenOn: EventEmitter<ToggableDirective> = new EventEmitter<ToggableDirective>();
  
  @Output()
  whenOff: EventEmitter<ToggableDirective> = new EventEmitter<ToggableDirective>();

  @Input()
  @HostBinding('class.btn-primary') isOn: boolean;
  
  @HostBinding('class.btn-outline-primary') get isOff() { return !this.isOn;};

  toggleState(){
    this.isOn = !this.isOn;
  }

  @HostListener('click') toggle() {
    this.isOn = !this.isOn;

    if(this.isOn){
      this.whenOn.emit(this);
    }
    else{
      this.whenOff.emit(this);
    }
  }

}
