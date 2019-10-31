import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  colorPickerValue: string = '';
  colorPickerHeight: number;
  colorPickerWidth: number;
  colorPickerBorderRadius: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.colorPickerWidth = window.innerWidth - 20;

    this.colorPickerHeight = this.colorPickerWidth / 2;
    this.colorPickerBorderRadius = 5;
  }
  // 颜色选择器中事件，传递出来的值。
  colorPickerFun(event) {
    console.log(event, "单机组件返回的信息");
    this.colorPickerValue = "#" + event.color;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LightHuaianSettingPage');
  }

}
