import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveHomeModeLightTwinklePage } from './leave-home-mode-light-twinkle';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    LeaveHomeModeLightTwinklePage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveHomeModeLightTwinklePage), ComponentsModule
  ],
})
export class LeaveHomeModeLightTwinklePageModule { }
