import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { ToolsProvider } from '../../../../providers/tools/tools';
import { LeaveHomeModeLightTwinkParams } from '../../../../providers/model/model';
/**
 * Generated class for the LeaveHomeModeLightTwinklePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-home-mode-light-twinkle',
  templateUrl: 'leave-home-mode-light-twinkle.html',
})
export class LeaveHomeModeLightTwinklePage {
  title: string;

  runtime: number;
  timerOpen: any;
  lightIndex: number;


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
    let params = new LeaveHomeModeLightTwinkParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.runtime = Number(this.runtime);
    params.lightIndex = this.getTwoValue(this.lightIndex);
    return params;
  }
  checkParam(): boolean {
    if (this.runtime > 240) {
      this.tools.presentToast("闪烁间隔不能超过4小时");
      return false;
    }

    if (this.lightIndex < 0) {
      this.tools.presentToast("回路编号不能位空");
      return false;
    }

    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('73');
    this.timerOpen = Number(fnData.F734);
    this.runtime = fnData.F735;
    this.lightIndex = fnData.F736;
  }
  getTwoValue(num: number): Array<any> {
    let temp = parseInt(num.toString());
    let num16 = this.tools.padStart(temp.toString(16), 4, '0');
    let reg = /\w{2}/gi;
    let arr: Array<string> = num16.match(reg);
    let one = parseInt(arr[1], 16);
    let two = parseInt(arr[0], 16);
    let result = Array<any>();
    result.push(one);
    result.push(two);

    return result;
  }
}
