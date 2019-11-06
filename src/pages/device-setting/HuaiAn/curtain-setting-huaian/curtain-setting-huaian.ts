import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Variable } from '../../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../../providers/tools/requests'

/**
 * Generated class for the CurtainSettingHuaianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curtain-setting-huaian',
  templateUrl: 'curtain-setting-huaian.html',
})
export class CurtainSettingHuaianPage {

  name: string;
  id: number;
  state: number;
  auto: boolean;
  fnID: string;
  saturation: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events,
    private device: DeviceRequestsProvider
  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");

    // this.device.getDeviceGetInfoDataByID(this.id).then(res => {
    // this.fnID = res["F_FnID"];
    this.fnID = '72';
    let fnData = Variable.GetFnData(this.fnID);
    this.getDeviceState(fnData);
    this.events.subscribe(`FnData:${this.fnID}`, this.eventsFn72Handler);
    // });
  }
  /**start**/
  private eventsFn72Handler = (data: any) => {
    this.getDeviceState(data);
  }
  /**end***/

  ionViewDidLoad() {
  }
  getDeviceState(data: any) {
    if (data) {
      let state = data.F7210;
      let kaidu = data.F729;

      if (this.setInfo) {
        if (kaidu == this.setInfo.kaidu && state == this.setInfo.state) {
          // debugger;

          this.state = state;
          this.saturation = kaidu;
          this.dismissLoading();

        }
      } else {
        this.state = state;
        this.saturation = kaidu;
      }

    }
  }
  dismissLoading() {
    this.setInfo = null;
    Variable.socketObject.dismissLoading();
  }

  setInfo: any;
  setDeviceState(kaidu: number, state: number) {
    // this.state = state;
    // let params = new CurtainHuaiAn();//注意组装顺序
    // params.KaiDu = Number(kaidu);
    // params.State = Number(state);
    // Variable.socketObject.setTimer(params, '', 61);
    this.setInfo = {
      kaidu: kaidu,
      state: state
    };
    Variable.socketObject.setCurtain(`10,${kaidu},${state}`, 1, 61, false);

  }

  ionViewDidLeave() {
    this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn72Handler);
    // this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);

  }

  timerObj: any;
  rangeChange() {
    // console.log(this.saturation);
    // this.setDeviceState(this.saturation, 1);

    if (!this.timerObj) {
      this.timerObj = setTimeout(() => {
        // console.log(this.saturation);
        this.setDeviceState(this.saturation, 1);
        clearTimeout(this.timerObj);
        this.timerObj = null;
      }, 1000);
    }


  }

}
