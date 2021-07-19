// cobit car for microbit
// author: Very strong man
// github:https://github.com/cokoino
// Write the date: 2021-7-13

// Microbit communicates with Cobit
// Write: S + SensorAddress + Data + Data + Data + Data + P
// Read : S + SensorAddress + Data + Data + Data + Data + P --> Waiting to receive data --> S + SensorAddress + Data + P

//use for RGB-LED
enum RGBNUM {
    No1 = 0x00,
    No2 = 0x01,
    No3 = 0x02,
    No4 = 0x03
}
enum COLOR {
    Red   = 0x00,
    Green = 0x01,
    Blue  = 0x02,
    White = 0x03,
    Black = 0x04
}

//use for control car
enum CarDirection {
    RunForward = 0x00,
    RunBack    = 0x01,
    TurnLeft   = 0x02,
    TurnRight  = 0x03
}
enum FB {
    Forward = 0x00,
    Back    = 0x01
}

//use for control wheels
enum CarWheelDirection {
    CW  = 0x00,
    CCW = 0x01
}
enum CarWheelMode {
    Step     = 0x00,
    Continue = 0x01
}

//use for control car and wheels.
enum CarWheelState {
    Stop  = 0x00,
    Brake = 0x01
}

//Use for wheels,headlight and PH.
enum Side {
    Left  = 0x00,
    Right = 0x01
}

//Use for buzzer,servo and sonar.
enum ON_OFF {
    ON  = 0x00,
    OFF = 0x01
}

//use for servo
enum SERVOPIN {
    S1 = 0x00,
    S2 = 0x01,
    S3 = 0x02,
}

//use for port
enum ALLPIN {
    A0  = 0x00,
    A1  = 0x01,
    A2  = 0x02,
    D12 = 0x03,
    D13 = 0x04
}
enum ANALOGPIN {
    A0 = 0x00,
    A1 = 0x01,
    A2 = 0x02
}
enum PINMODE {
    INPUT  = 0x00,
    OUTPUT = 0x01
}
enum Level {
    HIGH = 0x00,
    LOW  = 0x01
}

//% color="#ff6800" icon="\uf1b9" weight=15
//% groups="['Car', 'Wheels', 'Sonar', 'Buzzer', 'Servo', 'HeadLight', 'PR', 'LineDetection', 'RGB', 'Voltmeter', 'Port']"
namespace Cobit {

    /********SensorAddress*******/
    /*
    const LeftWheel : string          =    "000";
    const RightWheel : string         =    "001";
    const Sonar : string              =    "002";
    const Buzzer : string             =    "003";
    const Servo_ : string             =    "004";
    const Reset : string              =    "005";
    const LeftHeadlight : string      =    "006";
    const RightHeadlight : string     =    "007";
    const LeftPR : string             =    "008";
    const RightPR : string            =    "009";
    const LeftLineDetection : string  =    "010";
    const RightLineDetection : string =    "011";
    const RGB_ : string               =    "012";
    const Voltmeter : string          =    "013";
    const A0 : string               =      "014";
    const A1 : string               =      "015";
    const A2 : string               =      "016";
    const D12 : string              =      "017";
    const D13 : string              =      "018";
    const Car_ : string             =      "019";
    */

    /********Data(master)********/
    /*
    const LeftWheelCW : string      =      "001";
    const RightWheelCW : string     =      "002";
    const LeftWheelCCW : string     =      "003";
    const RightWheelCCW : string    =      "004";
    const SonarOn : string          =      "005";
    const BuzzerOn : string         =      "006";
    const ServoOn : string          =      "007";
    const SonarOff : string         =      "008";
    const BuzzerOff : string        =      "009";
    const ServoOff : string         =      "010";
    const SonarRead : string        =      "011";
    const BuzzerFrequency : string  =      "012";
    const LeftWheelSpeed : string   =      "013";
    const RightWheelSpeed : string  =      "014";
    const LeftWheelStep : string    =      "015";
    const RightWheelStep : string   =      "016";
    const LeftWheelMode : string    =      "017";
    const RightWheelMode : string   =      "018";
    const Servo3 : string           =      "019";
    const Servo2 : string           =      "020";
    const Servo1 : string           =      "021";
    const BuzzerVolume : string     =      "022";
    const LeftWheelBrake : string   =      "023";
    const RightWheelBrake : string  =      "024";
    const xxxxxxxxxxx : string      =      "025";
    const xxxxxxxxxxx : string      =      "026";
    const RGB1 : string             =      "027";
    const RGB2 : string             =      "028";
    const RGB3 : string             =      "029";
    const RGB4 : string             =      "030";
    const RgbBrightness : string    =      "031";
    const PinMode : string          =      "032";
    const Read : string             =      "033";
    const Write : string            =      "034";
    const Digital : string          =      "035";
    const Analog : string           =      "036";
    const V_Analog : string         =      "037";
    const V_percent : string        =      "038";
    const Car_state : string        =      "039";
    const Car_Direction : string    =      "040";
    const Car_forwardDistance : string  =  "041";
    const Car_backDistance : string =      "042";
    const Car_turnDegree : string   =      "043";

    */

    //  start(S) + sensor(000) + data(000) + data(000) + data(000) + data(000) + stop(P)
    //  Example: let cmdWrite : string = "S000000000000000P";

    /////////////////////////////////////////////////////Serial read and write data function
    //  microbit write data to cobit
    function WriteCMD(cmd: string) {
        serial.writeString(cmd);
    }

    //  microbit read data from cobit
    function ReadData(cmd: string) {
        WriteCMD(cmd);
        let i: number;
        let tempStr: string = serial.readString();
        while (tempStr[0] != 'S' && i < 10) {
            tempStr = serial.readString();
            i++;
        }
        if (tempStr[0] != 'S' && tempStr[7] != 'P') { return "Err"; }

        //Remove S and P characters from the string.
        tempStr = tempStr.replace("S", "");
        tempStr = tempStr.replace("P", "");

        return tempStr;
    }

    //  Converts numbers to strings.
    //  Example: NumToStr(10, 5) ==> 00010
    function NumToStr(num: number, bit: number) {
        let str: string;
        let i: number;
        let div: number = 1;
        for (i = 0; i < bit; i++) {
            div = div * 10;
        }
        str = (num % div).toString();
        if (str.length < bit) {
            let b: number;
            b = bit - str.length;
            for (i = 0; i < b; i++) {
                str = '0' + str;
            }
        }
        return str;
    }

    /////////////////////////////////////////////////////Init microbit
    //  Init microbit
    //% block="Init All"
    //% group="" weight=101
    export function init_() {
        // init serial port. tx=P0  rx=P1
        serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);

        //Sets the length of the serial reception buffer in bytes.
        //serial.setRxBufferSize(16);

        //Sets the length of the serial transmission buffer in bytes.
        //serial.setTxBufferSize(16);
    }

    /////////////////////////////////////////////////////Reset all parts
    //  Reset mote,servo,buzzer
    //% block="Rest Device"
    //% group="" weight=100
    export function reset_n76e300() {
        //reset N76E003 IC
        WriteCMD("S005000000000000P");
    }

    /////////////////////////////////////////////////////Car
    //  Set car state
    //% block="Car $State"
    //% group="Car" weight=99
    export function CarState(State: CarWheelState) {
        if (State == CarWheelState.Stop) {
            WriteCMD("S019039000000000P");
        }
        if (State == CarWheelState.Brake) {
            WriteCMD("S019039001000000P");
        }
    }

    //  Set car direction
    //% block="Car $CD speed $Speed"
    //% Speed.min=0 Speed.max=4
    //% group="Car" weight=98
    export function carDirection(CD: CarDirection, Speed: number) {
        if (CD == CarDirection.RunForward) { //run forward
            WriteCMD("S019040000" + NumToStr(Speed, 3) + "000P");
        }
        if (CD == CarDirection.RunBack) {    //run back
            WriteCMD("S019040001" + NumToStr(Speed, 3) + "000P");
        }
        if (CD == CarDirection.TurnLeft) {  //turn left
            WriteCMD("S019040002" + NumToStr(Speed, 3) + "000P");
        }
        if (CD == CarDirection.TurnRight) {  //turn right
            WriteCMD("S019040003" + NumToStr(Speed, 3) + "000P");
        }
    }

    //  Set car travel distance --> Only use in step mode.
    //% block="Car $CD $D mm speed $Speed(step)"
    //% D.min=0 D.max=30000 Speed.min=0 Speed.max=4
    //% group="Car" weight=97
    export function CarTravelsDistance(CD: FB, D: number, Speed: number) {
        if (CD == FB.Forward) {  //turn left
            WriteCMD("S019041" + NumToStr(D, 6) + NumToStr(Speed, 3) + "P");
        }
        if (CD == FB.Back) {  //turn right
            WriteCMD("S019042" + NumToStr(D, 6) + NumToStr(Speed, 3) + "P");
        }
    }

    //  Car turn angle --> Only use in step mode.
    //% block="Car $D $Angle ° speed $Speed(step)"
    //% Angle.min=0 Angle.max=360 Speed.min=0 Speed.max=4
    //% group="Car" weight=96
    export function CarAngle(D: CarWheelDirection, Angle: number, Speed: number) {
        if (D == CarWheelDirection.CW) {
            WriteCMD("S019043000" + NumToStr(Angle, 3) + NumToStr(Speed, 3) + "P");
        }
        if (D == CarWheelDirection.CCW) {
            WriteCMD("S019043001" + NumToStr(Angle, 3) + NumToStr(Speed, 3) + "P");
        }
    }

    /////////////////////////////////////////////////////Wheels
    //  Set wheel mode
    //% block="Wheel $S mode $Mode"
    //% group="Wheels" weight=89
    export function wheelMode(S: Side, Mode: CarWheelMode) {
        if (S == Side.Left) {                    //left side
            if (Mode == CarWheelMode.Step)      //step mode
                WriteCMD("S000017001000000P");
            if (Mode == CarWheelMode.Continue)  //continue mode
                WriteCMD("S000017002000000P");
        }
        if (S == Side.Right) {                   //right side
            if (Mode == CarWheelMode.Step)      //step mode
                WriteCMD("S001018001000000P");
            if (Mode == CarWheelMode.Continue)  //continue mode
                WriteCMD("S001018002000000P");
        }
    }

    //  Set wheel direction
    //% block="Wheel $S turn $WD"
    //% group="Wheels" weight=88
    export function wheelDirection(S: Side, WD: CarWheelDirection) {
        if (S == Side.Left) {        //left side
            if (WD == CarWheelDirection.CW)      //CW
                WriteCMD("S000001000000000P");
            if (WD == CarWheelDirection.CCW)     //CCW
                WriteCMD("S000003000000000P");
        }
        if (S == Side.Right) {                 //right side
            if (WD == CarWheelDirection.CW)      //CW
                WriteCMD("S001002000000000P");
            if (WD == CarWheelDirection.CCW)     //CCW
                WriteCMD("S001004000000000P");
        }
    }

    //  Set wheel speed
    //% block="Wheel $S speed $Speed"
    //% speed.min=0 speed.max=4
    //% group="Wheels" weight=87
    export function wheelSpeed(S: Side, Speed: number) {
        let cmd: string;
        if (S == Side.Left) {          //left side
            cmd = "S000013" + NumToStr(Speed, 3) + "000000P";
            WriteCMD(cmd);
        }
        if (S == Side.Right) {         //right side
            cmd = "S001014" + NumToStr(Speed, 3) + "000000P";
            WriteCMD(cmd);
        }
    }

    //  Set wheel turn angle --> Only use in step mode.
    //% block="Wheel $S turn $Angle ° (step)"
    //% Angle.min=0 Angle.max=360
    //% group="Wheels" weight=86
    export function WheelAngle(S: Side, Angle: number) {
        let step: number;
        step = Angle / 0.9;
        let cmd: string;
        if (S == Side.Left) {          //left side
            cmd = "S000017001000000P";
            WriteCMD(cmd);             //set left moto step mode
            cmd = "S000015" + NumToStr(step, 3) + "000000P";
            WriteCMD(cmd);
        }
        if (S == Side.Right) {         //right side
            cmd = "S000018001000000P";
            WriteCMD(cmd);             //set right moto step mode
            cmd = "S001016" + NumToStr(step, 3) + "000000P";
            WriteCMD(cmd);
        }
    }

    //  Set wheel travels distance --> Only use in step mode.
    //% block="Wheel $S run $D mm (step)"
    //% D.min=0 D.max=30000
    //% group="Wheels" weight=85
    export function WheelTravelsDistance(S: Side, D: number) {
        let cmd: string;
        if (S == Side.Left) {          //left side
            cmd = "S000015" + NumToStr(D, 6) + "000P";
            WriteCMD(cmd);
        }
        if (S == Side.Right) {         //right side
            cmd = "S001016" + NumToStr(D, 6) + "000P";
            WriteCMD(cmd);
        }
    }

    //  Set wheel state
    //% block="Wheel $S $State"
    //% group="Wheels" weight=84
    export function wheelState(S: Side, State: CarWheelState) {
        if (S == Side.Left) {          //left side
            if(CarWheelState.Stop){
                WriteCMD("S000013000000000P");
            }
            if(CarWheelState.Brake){
                WriteCMD("S000023000000000P");
            } 
        }
        if (S == Side.Right) {         //right side
            if (CarWheelState.Stop) {
                WriteCMD("S001014000000000P");
            }
            if (CarWheelState.Brake) {
                WriteCMD("S001024000000000P");
            }
        }
    }

    /////////////////////////////////////////////////////Sonar
    //  Turn sonar on or off.
    //% block="Sonar $SW"
    //% group="Sonar" weight=79
    export function sonarOnOFF(SW: ON_OFF) {
        if (SW == ON_OFF.ON) {          //on
            WriteCMD("S002005000000000P");
        }
        if (SW == ON_OFF.OFF) {         //off
            WriteCMD("S002008000000000P");
        }
    }

    //  Return sonar data.
    //% block="Sonar measure CM"
    //% group="Sonar" weight=78
    export function SonarMeasure(): number {
        let str: string;
        str = ReadData("S002011000000000P");

        //substr(start,length)
        if (str.substr(0, 3) != '002') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////Buzzer
    //  Turn buzzer on or off.
    //% block="Buzzer $SW"
    //% group="Buzzer" weight=76
    export function buzzerOnOFF(SW: ON_OFF) {
        if (SW == ON_OFF.ON) {          //on
            WriteCMD("S003006000000000P");
        }
        if (SW == ON_OFF.OFF) {         //off
            WriteCMD("S003009000000000P");
        }
    }

    //  Set frequency of buzzer.
    //% block="BuzzerFrequency $Hz Hz"
    //% Hz.min=20 Hz.max=2000
    //% group="Buzzer" weight=75
    export function buzzerHz(Hz: number) {
        let cmd: string = "S003012" + NumToStr(Hz, 6) + "000P";
        WriteCMD(cmd);
    }

    //  Set volume of buzzer.
    //% block="BuzzerVolume $V"
    //% V.min=0 V.max=10
    //% group="Buzzer" weight=74
    export function volume(V: number) {
        let cmd: string = "S003022" + NumToStr(V, 3) + "000000P";
        WriteCMD(cmd);
    }

    /////////////////////////////////////////////////////Servo
    //  Turn servo on or off.
    //% block="All servo $SW"
    //% group="Servo" weight=73
    export function servoOnOFF(SW: ON_OFF) {
        if (SW == ON_OFF.ON) {          //on
            WriteCMD("S004007000000000P");
        }
        if (SW == ON_OFF.OFF) {         //off
            WriteCMD("S0040010000000000P");
        }
    }

    //  Set servo anagle
    //% block="Servo channel|%channel|turn %degree °"
    //% degree.min=0 degree.max=180
    //% group="Servo" weight=72
    export function Servo(channel: SERVOPIN, degree: number) {
        let cmd: string;
        if (channel == SERVOPIN.S1) {         //S1
            cmd = "S004021" + NumToStr(degree, 3) + "000000P";
        }
        if (channel == SERVOPIN.S2) {         //S2
            cmd = "S004020" + NumToStr(degree, 3) + "000000P";
        }
        if (channel == SERVOPIN.S3) {         //S3
            cmd = "S004019" + NumToStr(degree, 3) + "000000P";
        }
        WriteCMD(cmd);
    }

    /////////////////////////////////////////////////////HeadLight
    //  Turn HeadLight on or off.
    //% block="HeadLight $S $SW"
    //% group="Headlight" weight=71
    export function headLightOnOFF(S: Side, SW: ON_OFF) {
        if (S == Side.Left) {               //left
            if (SW == ON_OFF.ON) {        //on
                WriteCMD("S006001000000000P");
            }
            if (SW == ON_OFF.OFF) {        //off
                WriteCMD("S006000000000000P");
            }
        }
        if (S == Side.Right) {               //right
            if (SW == ON_OFF.ON) {        //on
                WriteCMD("S007001000000000P");
            }
            if (SW == ON_OFF.OFF) {        //off
                WriteCMD("S007000000000000P");
            }
        }
    }

    /////////////////////////////////////////////////////PR
    //  Get value of photoresistance.
    //% block="Photoresistance $S"
    //% group="PR" weight=70
    export function photoresistance(S: Side): number {
        let str: string;
        if (S == Side.Left) {
            str = ReadData("S008000000000000P");
        }
        if (S == Side.Right) {
            str = ReadData("S009000000000000P");
        }

        //substr(start,length)
        if (str.substr(0, 3) != '008' && str.substr(0, 3) != '009') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////LineDetection
    //  Get value of LineDetection.
    //% block="LineDetection $S"
    //% group="LineDetection" weight=69
    export function LineDetection(S: Side): number {
        let str: string;
        if (S == Side.Left) {
            str = ReadData("S010000000000000P");
        }
        if (S == Side.Right) {
            str = ReadData("S011000000000000P");
        }

        //substr(start,length)
        if (str.substr(0, 3) != '010' && str.substr(0, 3) != '011') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////RGB
    // Set brightness of RGB
    //% block="RGB brightness $Level"
    //% Level.min=0 Level.max=255
    //% group="RGB" weight=68
    export function RGBbrightness(Level: number) {
        let cmd: string = "S012031" + NumToStr(Level, 3) + "000000P";
        WriteCMD(cmd);
    }

    // set the rgb-led color via COLOR
    //% block="RGB $num $C"
    //% group="RGB" weight=67
    export function setRGB_(num: RGBNUM, C: COLOR) {
        if (num == RGBNUM.No1) {     //number 1
            switch (C) {
                case COLOR.Red: WriteCMD("S012027255000000P"); break; //red
                case COLOR.Green: WriteCMD("S012027000255000P"); break; //green
                case COLOR.Blue: WriteCMD("S012027000000255P"); break; //blue
                case COLOR.White: WriteCMD("S012027255255255P"); break; //white
                case COLOR.Black: WriteCMD("S012027000000000P"); break; //black
            }
        }
        if (num == RGBNUM.No2) {     //number 2
            switch (C) {
                case COLOR.Red: WriteCMD("S012028255000000P"); break; //red
                case COLOR.Green: WriteCMD("S012028000255000P"); break; //green
                case COLOR.Blue: WriteCMD("S012028000000255P"); break; //blue
                case COLOR.White: WriteCMD("S012028255255255P"); break; //white
                case COLOR.Black: WriteCMD("S012028000000000P"); break; //black
            }
        }
        if (num == RGBNUM.No3) {     //number 3
            switch (C) {
                case COLOR.Red: WriteCMD("S012029255000000P"); break; //red
                case COLOR.Green: WriteCMD("S012029000255000P"); break; //green
                case COLOR.Blue: WriteCMD("S012029000000255P"); break; //blue
                case COLOR.White: WriteCMD("S012029255255255P"); break; //white
                case COLOR.Black: WriteCMD("S012029000000000P"); break; //black      
            }
        }
        if (num == RGBNUM.No4) {     //number 4
            switch (C) {
                case COLOR.Red: WriteCMD("S012030255000000P"); break; //red
                case COLOR.Green: WriteCMD("S012030000255000P"); break; //green
                case COLOR.Blue: WriteCMD("S012030000000255P"); break; //blue
                case COLOR.White: WriteCMD("S012030255255255P"); break; //white
                case COLOR.Black: WriteCMD("S012030000000000P"); break; //black
            }
        }
    }

    // set the rgb-led color via data
    //% block="RGB No$num R:     $red G:     $green B:     $blue"
    //% num.min=1 num.max=4 red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% group="RGB" weight=66
    export function setRGB(num: number, red: number, green: number, blue: number) {
        switch (num) {
            case 1: WriteCMD("S012027" + NumToStr(red, 3) + NumToStr(green, 3) + NumToStr(blue, 3)); break;
            case 2: WriteCMD("S012028" + NumToStr(red, 3) + NumToStr(green, 3) + NumToStr(blue, 3)); break;
            case 3: WriteCMD("S012029" + NumToStr(red, 3) + NumToStr(green, 3) + NumToStr(blue, 3)); break;
            case 4: WriteCMD("S012030" + NumToStr(red, 3) + NumToStr(green, 3) + NumToStr(blue, 3)); break;
            default: break;
        }
    }

    /////////////////////////////////////////////////////Voltmeter
    //  Get voltage of battery
    //% block="Voltmeter_V"
    //% group="Voltmeter" weight=65
    export function Voltmeter_V(): number {
        let str: string;
        str = ReadData("S013037000000000P");

        //substr(start,length)
        if (str.substr(0, 3) != '013') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 6), 10);
        return data / 100;
    }

    //  Get voltage of battery
    //% block="VoltmeterPercent"
    //% group="Voltmeter" weight=64
    export function Voltmeter_percent(): number {
        let str: string;
        str = ReadData("S013038000000000P");

        //substr(start,length)
        if (str.substr(0, 3) != '013') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////Port
    // Set pin mode
    //% block="PinMode $P $M"
    //% group="Port" weight=63
    export function pinMode(P: ALLPIN, M: PINMODE) {
        let cmd: string;
        switch (P) {
            case ALLPIN.A0:
                if (M == PINMODE.INPUT) { WriteCMD("S014032000000000P"); break; }
                if (M == PINMODE.OUTPUT) { WriteCMD("S014032001000000P"); break; }
            case ALLPIN.A1:
                if (M == PINMODE.INPUT) { WriteCMD("S015032000000000P"); break; }
                if (M == PINMODE.OUTPUT) { WriteCMD("S015032001000000P"); break; }
            case ALLPIN.A2:
                if (M == PINMODE.INPUT) { WriteCMD("S016032000000000P"); break; }
                if (M == PINMODE.OUTPUT) { WriteCMD("S016032001000000P"); break; }
            case ALLPIN.D12:
                if (M == PINMODE.INPUT) { WriteCMD("S017032000000000P"); break; }
                if (M == PINMODE.OUTPUT) { WriteCMD("S017032001000000P"); break; }
            case ALLPIN.D13:
                if (M == PINMODE.INPUT) { WriteCMD("S018032000000000P"); break; }
                if (M == PINMODE.OUTPUT) { WriteCMD("S018032001000000P"); break; }
        }
    }

    // Set pin level
    //% block="DigitalWrite $P $L"
    //% group="Port" weight=62
    export function digitalWrite(P: ALLPIN, L: Level) {
        let cmd: string;
        switch (P) {
            case ALLPIN.A0:
                if (L == Level.LOW) { WriteCMD("S014035034000000P"); break; }
                if (L == Level.HIGH) { WriteCMD("S014035034001000P"); break; }
            case ALLPIN.A1:
                if (L == Level.LOW) { WriteCMD("S015035034000000P"); break; }
                if (L == Level.HIGH) { WriteCMD("S015035034001000P"); break; }
            case ALLPIN.A2:
                if (L == Level.LOW) { WriteCMD("S016035034000000P"); break; }
                if (L == Level.HIGH) { WriteCMD("S016035034001000P"); break; }
            case ALLPIN.D12:
                if (L == Level.LOW) { WriteCMD("S017035034000000P"); break; }
                if (L == Level.HIGH) { WriteCMD("S017035034001000P"); break; }
            case ALLPIN.D13:
                if (L == Level.LOW) { WriteCMD("S018035034000000P"); break; }
                if (L == Level.HIGH) { WriteCMD("S018035034001000P"); break; }
        }
    }

    // Set pin level
    //% block="AnalogWrite D13 $Num"
    //% Num.min=0 Num.max=255
    //% group="Port" weight=61
    export function analogWrite(Num: number) {
        WriteCMD("S018036034" + NumToStr(Num, 3) + "000P");
    }

    //  Get digital value of pin
    //% block="DigitalRead $P"
    //% group="Port" weight=60
    export function DigitalRead(P: ALLPIN): number {
        let str: string;
        switch (P) {
            case ALLPIN.A0: str = ReadData("S014035033000000P"); break;
            case ALLPIN.A1: str = ReadData("S015035033000000P"); break;
            case ALLPIN.A2: str = ReadData("S016035033000000P"); break;
            case ALLPIN.D12: str = ReadData("S017035033000000P"); break;
            case ALLPIN.D13: str = ReadData("S018035033000000P"); break;
            default: break;
        }

        //substr(start,length)
        let tempStr: string = str.substr(0, 3);
        if (tempStr != '014' && tempStr != '015' && tempStr != '016' && tempStr != '017' && tempStr != '018') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 3), 10);
        return data;
    }

    //  Get analog value of pin
    //% block="AnalogRead $P"
    //% group="Port" weight=59
    export function AnalogRead(P: ANALOGPIN): number {
        let str: string;
        switch (P) {
            case ANALOGPIN.A0: str = ReadData("S014036033000000P"); break;
            case ANALOGPIN.A1: str = ReadData("S015036033000000P"); break;
            case ANALOGPIN.A2: str = ReadData("S016036033000000P"); break;
            default: break;
        }

        //substr(start,length)
        let tempStr: string = str.substr(0, 3);
        if (tempStr != '014' && tempStr != '015' && tempStr != '016') {
            return 0;
        }
        let data: number = parseInt(str.substr(3, 3), 10);
        return data;
    }
}