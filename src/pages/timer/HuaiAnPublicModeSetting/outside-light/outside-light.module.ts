import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutsideLightPage } from './outside-light';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    OutsideLightPage,
  ],
  imports: [
    IonicPageModule.forChild(OutsideLightPage), ComponentsModule
  ],
})
export class OutsideLightPageModule { }
