import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CemeraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cemera',
  templateUrl: 'cemera.html',
})
export class CemeraPage {
  @ViewChild("cvs1") cvs1;
  @ViewChild("ionContent") ionContent;




  id: number;
  name: string;
  _context: any;
  _cvsWidth: number;
  _cvsHeight: number;
  ws: any;
  _lastMsg = "";
  _lastColor = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {



  }

  ionViewDidLoad() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;

    this._cvsWidth = htmlWidth;

    this._cvsHeight = htmlWidth * 3 / 4;

    this.cvs1.nativeElement.width = this._cvsWidth;
    this.cvs1.nativeElement.height = this._cvsHeight;

    document.getElementById("divFresh").style.height = this._cvsHeight + "px";

    document.getElementById("divSetting").style.height = (htmlHeight - this._cvsHeight) + "px";

    this._context = this.cvs1.nativeElement.getContext('2d');
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");

    this.startWebSocket();
  }
  startWebSocket() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.ws = new WebSocket("ws://192.168.4.113:9999");
    this.ws.onmessage = (e) => {
      this.onMessage(e);
    };
    this.ws.onopen = () => {
      this._showPaint("正在连接服务器...");
    }

    this.ws.onerror = (event) => {
      this._showPaint("连接服务器失败！");
    };
    this.ws.onclose = (event) => {
      this._showPaint("连接已断开！", "#FF0000");
    };
  }
  onMessage(event) {
    let r = JSON.parse(event.data);

    if (r.State == 3) {
      // _close();
      // _showPaint("链接中", "#FF0000");
      return;
    }
    if (r.Data) {
      let imgObj = new Image();
      imgObj.src = r.Data;
      let that = this;
      imgObj.onload = function () {

        that._context.drawImage(this, 0, 0, that._cvsWidth, that._cvsHeight);
      }
    }
  }

  _showPaint(msg, color = "#fff") {

    if (msg) {
      this._lastMsg = msg;
      this._lastColor = color ? color : '#0000FF';

      this._context.fillStyle = 'black';
      this._context.fillRect(0, 0, this._cvsWidth, this._cvsHeight);
      this._context.fillStyle = this._lastColor;
      this._context.textAlign = "center";
      this._context.font = "bold 12px '宋体'";
      this._context.fillText(msg, this._cvsWidth / 2, this._cvsHeight / 2);
    } else {
      this._lastMsg = null;
      this._lastColor = null;
    }
  }

  ionViewDidLeave() {
    this.ws.close();
  }
  setCemera(type, data) {
    let params = {
      Type: type,
      Data: data
    }

    this.sendMessage(params);
  }
  sendMessage(message: any) {
    console.log(message);

    this.ws.send(JSON.stringify(message));
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: '预置点设置',
      inputs: [
        {
          name: 'num',
          placeholder: '序号',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.num) {
              this.setCemera(8, data.num);
              // logged in!
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }



}
