import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { ToolsProvider } from '../../../../providers/tools/tools';
import { LeaveHomeModeCurtain } from '../../../../providers/model/model';

/**
 * Generated class for the LeaveHomeModeCurtainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-home-mode-curtain',
  templateUrl: 'leave-home-mode-curtain.html',
})
export class LeaveHomeModeCurtainPage {
  title: string;

  runtime: number;
  timerOpen: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    let data = this.navParams.get("Data");
    this.title = data["F_Name"];
    // this.getData();
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    if (this.checkParam()) {

      let params = this.getParams();
      Variable.socketObject.setTimer(params);
      this.dismiss();
    }

  }
  getParams() {
    let params = new LeaveHomeModeCurtain();//注意组装顺序
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
    this.timerOpen = Number(fnData.F737);
    this.runtime = fnData.F738;
  }


}
