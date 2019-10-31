import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LightHuaianSettingPage } from './light-huaian-setting';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    LightHuaianSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(LightHuaianSettingPage),
    ComponentsModule
  ],
})
export class LightHuaianSettingPageModule { }
