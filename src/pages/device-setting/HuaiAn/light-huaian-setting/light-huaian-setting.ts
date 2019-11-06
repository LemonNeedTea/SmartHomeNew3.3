import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../../providers/tools/requests'
/**
 * Generated class for the LightHuaianSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-light-huaian-setting',
  templateUrl: 'light-huaian-setting.html',
})
export class LightHuaianSettingPage {


  /*
          传递给颜色选择器组件初始化值
          ----------------------------------------
          colorPickerValue: 获取颜色的16进制值
          colorPickerHeight: 设置颜色选择框的高度
          colorPickerWidth: 设置颜色选择框的宽度
          colorPickerBorderRadius: 设置颜色选择器的圆角
      */
  colorPickerHeight: number;
  colorPickerWidth: number;
  colorPickerBorderRadius: number;

  name: string;
  id: number;
  state: number;
  fnID: string;
  brightness: number;
  brightness1: number;

  deviceFnData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
    private device: DeviceRequestsProvider) {
    this.colorPickerWidth = window.innerWidth - 20;

    this.colorPickerHeight = this.colorPickerWidth / 2;
    this.colorPickerBorderRadius = 5;
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");

    if (this.id == 19) {//电视背景灯
      this.deviceFnData = {
        SeWenFnCode: 'F725',
        LiangDuFnCode: 'F726',
        SetCode: 1
      };
    } else if (this.id == 20) {
      this.deviceFnData = {
        SeWenFnCode: 'F727',
        LiangDuFnCode: 'F728',
        SetCode: 2
      };
    }

    this.fnID = 'state';
    let fnData = Variable.GetFnData(this.fnID);
    this.getDeviceState(fnData);
    this.events.subscribe(`FnData:${this.fnID}`, this.eventsFnStateHandler);

    let fn72Data = Variable.GetFnData('72');
    this.getLightState(fn72Data);
    this.events.subscribe(`FnData:72`, this.eventsFn72Handler);

  }
  // 颜色选择器中事件，传递出来的值。
  colorPickerFun(event) {
    let color = event;
    let data = `3,${this.deviceFnData.SetCode},${3},255,${color.r},1,255,${color.g},1,255,${color.b},1`;
    console.log(data);
    Variable.socketObject.setAir(data, 1, 61);
  }

  /**start**/
  private eventsFnStateHandler = (data: any) => {
    this.getDeviceState(data);
  }
  private eventsFn72Handler = (data: any) => {
    this.getLightState(data);
  }
  /**end***/

  ionViewDidLoad() {
  }
  setInfo: any = null;
  getLightState(data: any) {
    if (data) {
      let color = data[this.deviceFnData.SeWenFnCode];//色温
      let brightness = data[this.deviceFnData.LiangDuFnCode];//亮度
      if (this.setInfo) {
        if (this.setInfo.type == 'color') {
          if (this.setInfo.data == color) {
            this.brightness1 = color;//色温
            this.setInfo = null;

          }
        } else if (this.setInfo.type == 'brightness') {
          if (this.setInfo.data == brightness) {
            this.brightness = brightness;//色温
            this.setInfo = null;

          }
        }
      } else {
        this.brightness1 = color;//色温
        this.brightness = brightness;//亮度
      }

    }

    // console.log(data);

  }
  getDeviceState(data: any) {
    if (data) {
      this.state = data[this.id][0];

    }
  }
  setDeviceState(state: any) {
    this.state = state;
    Variable.socketObject.setDeviceState(this.id, this.name, state);
  }
  ionViewDidLeave() {
    this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFnStateHandler);
    this.events.unsubscribe(`FnData:72`, this.eventsFn72Handler);

  }
  brightnessChange(data: any) {
    let id = 2;
    this.setLight(id, this.brightness);
    this.setInfo = {
      type: 'brightness',
      data: this.brightness
    };

  }
  colorChange(data: any) {
    let id = 1;
    this.setLight(id, this.brightness1);
    this.setInfo = {
      type: 'color',
      data: this.brightness1
    };
  }
  setLight(id: number, value: number) {
    let data = `3,${this.deviceFnData.SetCode},${id},${value}`;//42 主机标号 模式 参数
    console.log(data);
    Variable.socketObject.setCurtain(data, 1, 61, false);

  }

}
