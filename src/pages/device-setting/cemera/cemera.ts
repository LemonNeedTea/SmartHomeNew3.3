import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  id: number;
  name: string;
  _context: any;
  _cvsWidth: number;
  _cvsHeight: number;
  ws: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.ws = new WebSocket("ws://192.168.4.113:9999");
    this.ws.onmessage = this.onMessage;


  }

  ionViewDidLoad() {
    this._context = this.cvs1.nativeElement.getContext('2d');

    console.log(this._context);

    this._cvsWidth = this.cvs1.nativeElement.clientHeight;
    this._cvsHeight = this.cvs1.nativeElement.clientWidth;
  }
  onMessage(event) {
    console.log(event);


    var r = JSON.parse(event.data);

    if (r.State == 3) {
      // _close();
      // _showPaint("链接中", "#FF0000");
      return;
    }
    if (r.Data) {
      var imgObj = new Image();
      imgObj.src = r.Data;
      imgObj.onload = () => {
        this._context.drawImage(this, 0, 0, this._cvsWidth, this._cvsHeight);
      }
    }
  }


}
