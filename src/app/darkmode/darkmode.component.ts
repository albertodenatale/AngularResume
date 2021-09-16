import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'darkmodetoggle',
    template: '',
    styles: [
        ':host { display: block }',
        ':host { width: 100%; height: 100%; }',
        ':host.moon { background: url(/assets/img/moon-clear-fill.svg) no-repeat right top / 100% 100% }',
        ':host.sun { background: url(/assets/img/sun-fill.svg) no-repeat right top / 100% 100% }'
    ]
})
export class DarkmodeComponent {
    @HostBinding('class.sun') isOn: boolean = false;
    @HostBinding('class.moon')  get isOff() { return !this.isOn; };

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

    @HostListener('click') toggle() {
        if (this.isOn) {
            this.turnDarkModeOff();
        }
        else {
            this.turnDarkModeOn();
        }

        this.isOn = !this.isOn;
    }

    private turnDarkModeOn() {
        this.renderer.addClass(this.document.body, 'darkModeOn');
    }

    private turnDarkModeOff() {
        this.renderer.removeClass(this.document.body, 'darkModeOn');
    }
}