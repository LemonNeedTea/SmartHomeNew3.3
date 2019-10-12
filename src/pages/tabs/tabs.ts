import { Component } from '@angular/core';
import { Events, NavParams } from 'ionic-angular'

import { MessagePage } from '../message/message';
import { HomePage } from '../home/home';
import { RoomPage } from '../room/room';
import { DevicePage } from '../device/device';
import { EnergyPage } from '../energy/energy';
import { DeviceRequestsProvider } from "../../providers/tools/requests";
import { Variable } from '../../providers/model/variable';
import { JPush } from '@jiguang-ionic/jpush';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs'
})
export class TabsPage {
  tabRoots: any = [];
  interval: any;
  deviceIndex: number;
  messageIndex: number;

  constructor(private device: DeviceRequestsProvider,
    private navParams: NavParams,
    private events: Events,
    private jpush: JPush) {
    let params = this.navParams.get("Data");
    // this.device.getTabsList().then((res: Array<any>) => {
    this.tabRoots = params.map((r, index) => {
      switch (r.F_Root) {
        case 'HomePage': { r.F_Root = HomePage; break; }
        case 'RoomPage': { r.F_Root = RoomPage; break; }
        case 'DevicePage': { r.F_Root = DevicePage; break; }
        case 'EnergyPage': { r.F_Root = EnergyPage; break; }
        case 'MessagePage': { r.F_Root = MessagePage; break; }
      }
      if (r.F_Badge <= 0) {
        r.F_Badge = null;
      }
      if (r.F_Type === 'device') {
        this.deviceIndex = index;
      } else if (r.F_Type === 'message') {
        this.messageIndex = index;
      }
      return r;
    });
    this.getMessageNum();
    this.getDeviceOpenNum();
  }
  ionViewDidLoad() {
    this.interval = setInterval(() => {
      this.getMessageNum();
    }, 10000);
    this.events.subscribe("FnData:MessageNum", (res: any) => {
      this.tabRoots[this.messageIndex].F_Badge = res || null;
      this.jpush.setApplicationIconBadgeNumber(Number(res));
    });
  }
  ionViewWillLeave() {
    clearInterval(this.interval);
  }
  getMessageNum() {
    this.device.getAlarmDataList(false).then((res: any) => {
      this.tabRoots[this.messageIndex].F_Badge = res.length || null;
      this.jpush.setApplicationIconBadgeNumber(Number(res.length));
      this.events.publish("data:messageList", res);
    })
    // this.http.post('EnergyAppData/GetMessageData',null,false).then(res=>{
    //   let data=res['MainData'];
    //   this.tabRoots[2].tabBadge = data.length;
    // });
  }
  private getDeviceOpenNum() {
    this.tabRoots[this.deviceIndex].F_Badge = Variable.deviceNum || null;
    this.events.subscribe("FnData:DeviceOpenNum", (res: any) => {
      this.tabRoots[this.deviceIndex].F_Badge = res || null;
    });
  }
}
