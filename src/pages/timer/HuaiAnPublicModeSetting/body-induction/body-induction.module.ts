import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BodyInductionPage } from './body-induction';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    BodyInductionPage,
  ],
  imports: [
    IonicPageModule.forChild(BodyInductionPage), ComponentsModule
  ],
})
export class BodyInductionPageModule { }
