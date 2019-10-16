import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { ToolsProvider } from '../../../../providers/tools/tools';
import { InsideLight } from '../../../../providers/model/model';

/**
 * Generated class for the InsideLightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inside-light',
  templateUrl: 'inside-light.html',
})
export class InsideLightPage {

  title: string;
  timerOpen: any;
  maxNum: number;
  minNum: number;
  lightIndex: number;


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
    let params = new InsideLight();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.maxNum = this.getTwoValue(this.maxNum);
    params.minNum = this.getTwoValue(this.minNum);
    params.lightIndex = this.getTwoValue(this.lightIndex);

    return params;
  }
  checkParam(): boolean {

    if (this.maxNum < 0) {
      this.tools.presentToast("光照度上限不能位空");
      return false;
    }
    if (this.minNum < 0) {
      this.tools.presentToast("光照度下限不能位空");
      return false;
    }
    if (this.lightIndex < 0) {
      this.tools.presentToast("回路编号不能为空");
      return false;
    }

    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('73');
    this.timerOpen = Number(fnData.F7314);
    this.maxNum = fnData.F7315;
    this.minNum = fnData.F7316;
    this.lightIndex = fnData.F7317;
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
