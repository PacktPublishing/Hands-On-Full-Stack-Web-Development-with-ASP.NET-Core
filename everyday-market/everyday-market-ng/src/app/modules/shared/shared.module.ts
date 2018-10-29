import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { BusyComponent } from './busy/busy.component';
import { PlusButtonComponent } from './plus-button/plus-button.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SearchInputComponent,
    BusyComponent,
    PlusButtonComponent,
  ],
  exports: [
    SearchInputComponent,
    BusyComponent,
    PlusButtonComponent,
  ],
})
export class SharedModule { }
