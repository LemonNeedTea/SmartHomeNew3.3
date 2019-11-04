import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigProvider {

  //api请求地址
  // public apiUrl = "http://223.112.4.23:11000";
  public apiUrl = "http://218.206.104.2:8888/";
  // public apiUrl = "http://223.112.4.23:8888";

  //websokcet地址
  // public websocketUrl = "ws://223.112.4.23:53200";
  public websocketUrl = "ws://218.206.104.2:24302/";
  // public websocketUrl = "ws://223.112.4.23:5678";

  //用户信息localstorage存储名称
  public userInfoSotrageName = 'userinfo';

  constructor() { }


}
