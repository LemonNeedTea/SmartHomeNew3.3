import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiftSettingPage } from './lift-setting';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    LiftSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(LiftSettingPage),
    ComponentsModule
  ],
})
export class LiftSettingPageModule {}
