import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsideLightPage } from './inside-light';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    InsideLightPage,
  ],
  imports: [
    IonicPageModule.forChild(InsideLightPage), ComponentsModule
  ],
})
export class InsideLightPageModule { }
