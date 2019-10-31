import { OnInit, Component, Output, Input, EventEmitter } from '@angular/core';

/**
 * Generated class for the ColorPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'color-picker',
  templateUrl: 'color-picker.html'
})
export class ColorPickerComponent implements OnInit {
  // 接收父组件参数，设置颜色选择器高度
  @Input() height: number;
  // 接收父组件参数，设置颜色选择器宽度
  @Input() width: number;
  // 接收父组件参数，设置颜色选择器圆角
  @Input() borderRadius: number;
  // 触发父组件的方法，传递参数给父组件
  @Output() colorPickerClick = new EventEmitter();

  // 画布
  canvas: any;
  // 显示颜色取值
  rgbString: string = '#fff';
  // 选中颜色点的位置
  markX: number = 0;
  markY: number = 0;
  constructor() { }
  ngOnInit() {
    // 1. 取得界面节点，创建画布
    var c: any = document.getElementById('canvas_picker');
    this.canvas = c.getContext('2d');
    this.canvas.canvas.width = this.width;
    // 2. Canvas 元素设置一张背景图片
    var img = new Image();
    img.src = '../../assets/color-bg.png';
    // 延迟几秒等图片加载完成了再创建画布
    setTimeout(() => {
      this.canvas.drawImage(img, 0, 0, this.width, this.height);
    }, 500);
  }
  getOffersetInfo(event) {
    console.log(event, '点击画布事件');
    // 点击的时候取在画布上的坐标
    var x = event.offsetX;
    var y = event.offsetY;
    console.log(x, y);
    // 边界判断函数
    this.checkBorderFun(x, y, this.width, this.height);
    this.markX = x - 10;
    this.markY = y - 10;
    // 通过坐标取的rgb的值
    // getImageDate(x, y, width, height)
    // 可以去到画布上的点的 RGBA的值 
    // x: x坐标  y: y坐标  width: 取的宽度  height: 取的高度
    // mark的宽高是30，borer:2   那么 34/2=12
    var imgData = this.canvas.getImageData(x, y, 1, 1).data;
    console.log(imgData, '图片数据');
    var R = imgData[0];
    var G = imgData[1];
    var B = imgData[2];

    console.log('R=' + R + '' + 'G=' + G + '' + 'B=' + B, 'rgb');
    // 转换为16进制字符串
    this.rgbString = this.gbToHex(R, G, B);
    console.log(this.rgbString);

    this.colorPickerClick.emit({ color: this.rgbString });
  }
  gbToHex(R, G, B) {
    return this.toHex(R) + this.toHex(G) + this.toHex(B);
  }
  // 色值16制转换函数
  toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return '00';
    n = Math.max(0, Math.min(n, 255));
    return '0123456789ABCDEF'.charAt((n - n % 16) / 16) + '0123456789ABCDEF'.charAt(n % 16);
  }
  // 边界判断函数
  checkBorderFun(x, y, width, height) {
    if (x < 10) {
      x = 10;
    } else if (y < 10) {
      y = 10;
    } else if (x > width - 10) {
      x = width - 10
    } else if (y > height - 10) {
      y = height - 10
    }
  }
}
