import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { ToolsProvider } from '../../../../providers/tools/tools';
import { BodyInduction } from '../../../../providers/model/model';

/**
 * Generated class for the BodyInductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-body-induction',
  templateUrl: 'body-induction.html',
})
export class BodyInductionPage {

  title: string;
  timerOpen: any;
  lightIndex1: number;
  lightIndex2: number;
  lightIndex3: number;

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
    let params = new BodyInduction();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.lightIndex1 = this.getTwoValue(this.lightIndex1);
    params.lightIndex2 = this.getTwoValue(this.lightIndex2);
    params.lightIndex3 = this.getTwoValue(this.lightIndex3);

    return params;
  }
  checkParam(): boolean {

    if (this.lightIndex1 < 0) {
      this.tools.presentToast("回路编号1不能为空");
      return false;
    }
    if (this.lightIndex2 < 0) {
      this.tools.presentToast("回路编号2不能为空");
      return false;
    }
    if (this.lightIndex3 < 0) {
      this.tools.presentToast("回路编号3不能为空");
      return false;
    }

    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('73');
    this.timerOpen = Number(fnData.F7318);
    this.lightIndex1 = fnData.F7319;
    this.lightIndex2 = fnData.F7320;
    this.lightIndex3 = fnData.F7321;
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
