import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [LayoutComponent],
    declarations: [LayoutComponent],
    providers: [],
})
export class LayoutModule { }
