import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveHomeModeCurtainPage } from './leave-home-mode-curtain';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    LeaveHomeModeCurtainPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveHomeModeCurtainPage), ComponentsModule
  ],
})
export class LeaveHomeModeCurtainPageModule { }
