import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

const MODULES = [CommonModule, MaterialModule, FlexLayoutModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class LayoutModule {}
