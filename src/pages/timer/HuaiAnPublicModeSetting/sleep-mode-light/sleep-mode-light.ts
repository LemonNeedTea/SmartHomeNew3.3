import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { ToolsProvider } from '../../../../providers/tools/tools';
import { SleepModeLight } from '../../../../providers/model/model';

/**
 * Generated class for the SleepModeLightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sleep-mode-light',
  templateUrl: 'sleep-mode-light.html',
})
export class SleepModeLightPage {
  title: string;
  runtime: number;
  timerOpen: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    let data = this.navParams.get("Data");
    this.title = data["F_Name"];
    this.getData();
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    if (this.checkParam()) {

      let params = this.getParams();
      Variable.socketObject.setTimer(params, '设置', 61);
      this.dismiss();
    }

  }
  getParams() {
    let params = new SleepModeLight();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.runtime = Number(this.runtime);
    return params;
  }
  checkParam(): boolean {
    if (this.runtime > 240) {
      this.tools.presentToast("闪烁间隔不能超过4小时");
      return false;
    }

    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('73');
    this.timerOpen = Number(fnData.F739);
    this.runtime = fnData.F7310;
  }
}
