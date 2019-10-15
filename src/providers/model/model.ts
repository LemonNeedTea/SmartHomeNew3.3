/**
 * 井水泵定时参数
 */
export class WellPumpParams {
    public code: number = 2;
    public timerOpen: number;
    public startHour: any;
    public startMinute: any;
    public runtime: number;
    public minLevel: number;
    public maxLevel: number;
    public repeatOpen: number;
}
/**
 * 南园浇花阀
 */
export class EastCourtValveParams {
    public code: number = 8;
    public loop: Array<any>;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;
}
/**
 * 北园喷灌泵
 */
export class NorthCourtPumpParams {
    public code: number = 7;
    public loop: number;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;

}
/**
 * 南水池补水阀
 */
export class EastPoolValveParams {
    public code: number = 11;
    public loop: number;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;

}
/**
 * 北水池补水阀
 */
export class NorthPoolValveParams {
    public code: number = 10;
    public loop: number;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;
}
/**
 * 北院喷灌补水阀
 */
export class EastnorthpoolValveParams {
    public code: number = 12;
    public loop: number
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;
}






export class CurtainModeParams {
    public code: number = 6;
    public timerOpen: number;
    public loop: Array<number>;
    public starDate: Array<any>;
    public stopDate: Array<any>;
    public starDate1: Array<any>;
    public stopDate1: Array<any>;
}
export class LightModeParams {
    public code: number = 5;
    public timerOpen: number;
    public starDate: Array<any>;
    public stopDate: Array<any>;
    public stopDate1: Array<any>;
}
export class SeasonModeParams {
    public code: number = 4;
    public loop: Array<number>;
}
export class LighJWModeParams {
    public code: number = 9;
    public timerOpen: number;
    public runtime: number;
    public runtime1: number;
}

export class CurtainBrightnessParams {
    public code: number = 3;
    public timerOpen: number;
    public maxNum: Array<any>;
    public minNum: Array<any>;
}

export class AirQualityParams {
    public code: number = 4;
    public timerOpen: number;
    public timerOpen1: number;
    public maxNum: number;
    public minNum: number;
    public maxNum2: number;
    public minNum2: number;
    public maxNum3: number;
    public minNum3: number;
    public maxNum4: number;
    public minNum4: number;
}

export class HumidityParams {
    public code: number = 5;
    public timerOpen: number;
    public tempMaxNum1: number;
    public tempMinNum1: number;
    public humiMaxNum1: number;
    public humiMinNum1: number;

    public tempMaxNum2: number;
    public tempMinNum2: number;
    public humiMaxNum2: number;
    public humiMinNum2: number;

    public tempMaxNum3: number;
    public tempMinNum3: number;
    public humiMaxNum3: number;
    public humiMinNum3: number;

}
export class airSettingTimerParams {
    public code: number;
    public loop: number;
    public startDate: Array<any>;
    public stopDate: Array<any>;
    public startDate1: Array<any>;
    public stopDate1: Array<any>;
    public mode: string;
    public speed: string;
    public temp: string;
}
/*
*功能码4：离家模式闪烁演示功能配置
*/
export class LeaveHomeModeLightTwinkParams {
    public code: number = 4;
    public timerOpen: number;
    public runtime: number;
    public lightIndex: Array<any>;
}
/*
*功能码5：离家模式窗帘自动开启关闭演示功能配置
*/
export class LeaveHomeModeCurtain {
    public code: number = 5;
    public timerOpen: number;
    public runtime: number;
}

/*
*功能码6：睡眠模式灯光自动关闭演示功能配置
*/
export class SleepModeLight {
    public code: number = 6;
    public timerOpen: number;
    public runtime: number;
}
/*
*功能码7：光导室外光/有源光的照明效果演示配置参数
*/
export class OutsideLight {
    public code: number = 7;
    public timerOpen: number;
    public maxNum: Array<any>;
    public minNum: Array<any>;
}

/*
*功能码8：室内照明关联照度效果演示配置参数
*/
export class InsideLight {
    public code: number = 8;
    public timerOpen: number;
    public maxNum: Array<any>;
    public minNum: Array<any>;
    public lightIndex: Array<any>;
}

/*
*功能码9：人体感应关联照明演示配置参数
*/
export class BodyInduction {
    public code: number = 9;
    public timerOpen: number;
    public lightIndex1: Array<any>;
    public lightIndex2: Array<any>;
    public lightIndex3: Array<any>;
}
