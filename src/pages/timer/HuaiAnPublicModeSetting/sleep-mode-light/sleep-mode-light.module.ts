import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SleepModeLightPage } from './sleep-mode-light';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    SleepModeLightPage,
  ],
  imports: [
    IonicPageModule.forChild(SleepModeLightPage), ComponentsModule
  ],
})
export class SleepModeLightPageModule { }
