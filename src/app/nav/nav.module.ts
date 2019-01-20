import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { NavComponent } from './nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NavComponent]
})
export class NavModule {}
