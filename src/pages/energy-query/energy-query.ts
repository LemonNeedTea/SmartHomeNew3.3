import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
// import { BarchartPage } from '../barchart/barchart';
import { EnumDateType } from '../../providers/model/enumdata';

/**
 * Generated class for the EnergyQueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-energy-query',
  templateUrl: 'energy-query.html',
})
export class EnergyQueryPage {
  name: string;
  type: string;
  dateType: EnumDateType;
  displayFormat: string;
  startDate: string;
  stopDate: string;

  showTimeRange: boolean = false;
  dateTypeList: any = [];
  objList:Array<any>=[];

  objType:any;
  child:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tools: ToolsProvider,
    private device: DeviceRequestsProvider) {
    // this.name = this.navParams.get('name');
    // this.type = this.navParams.get('type');
    let params = this.navParams.get("Data");

    this.child = params.F_Params;
    // child=child?child.parseJSON:{};
    if (this.child.type == 'power') {
      this.showTimeRange = false;
      this.dateTypeList = [
        { key: 'day', value: '按天' },
      ];
      this.dateType = EnumDateType.Day;

    } else {
      this.showTimeRange = true;
      this.dateTypeList = [
        { key: 'year', value: '按年' },
        { key: 'month', value: '按月' },
        { key: 'day', value: '按天' }
      ];
      this.dateType = EnumDateType.Day;
      
    }
    if (this.child.type == 'message') {

    } else {
      this.device.getEnergyQuery(params.F_ID,true).then((res:any) => {
        this.objType=res[0].F_SortIndex;
        this.objList=res;
      });
    }

    this.name = params.F_MenuName;

    
    this.dateTypeChange();
  }

  ionViewDidLoad() {
  }
  dateTypeChange() {
    let now = this.tools.getNowDateStr(this.dateType);
    this.startDate = this.stopDate = now;
    switch (this.dateType) {
      case EnumDateType.Year: {
        this.displayFormat = 'YYYY'; break;
      }
      case EnumDateType.Month: {
        this.displayFormat = 'YYYY-MM'; break;
      }
      case EnumDateType.Day: {
        this.displayFormat = 'YYYY-MM-DD'; break;
      }
    }
  }
  objTypeChange(){
  }
  goBarChartPage(data?: any) {
    let params: any;
    if (data) {
      params = data;
    } else {
      params = {
        StartTime: this.startDate,
        StopTime: this.stopDate,
      DateType: this.dateType,

      }
    }
    params.ObjType=this.objType;
    params.FnID=this.objList[0].F_GPRSFnID;
    params.MonitorID=this.objList[0].F_MonitorID;

    this.navCtrl.push(this.child.url, { params: params });
  }
  timeRange(type: string) {
    let data;
    switch (type) {
      case 'yearall': {
        data = this.tools.getYearAllRange();
        break;
      }
      case 'year': {
        data = this.tools.getYearRange();
        break;
      }
      case 'month': {
        data = this.tools.getMonthRange();
        break;
      }
    }
    this.goBarChartPage(data);

  }

}
