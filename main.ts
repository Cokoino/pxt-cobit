// Microbit communicates with Cobit
// Write: S + SensorAddress + Data + ... + P --> Waiting to receive data --> SP
// Read : S + SensorAddress + Data + ... + P --> Waiting to receive data --> S + Data + P

/********SensorAddress*******/
/*
const LeftWheel : string          =    "100";
const RightWheel : string         =    "101";
const Sonar : string              =    "102";
const Buzzer : string             =    "103";
const Servo_ : string             =    "104";
const Reset : string              =    "105";
const LeftHeadlight : string      =    "106";
const RightHeadlight : string     =    "107";
const LeftPR : string             =    "108";
const RightPR : string            =    "109";
const LeftLineDetection : string  =    "110";
const RightLineDetection : string =    "111";
const RGB_ : string               =    "112";
const Voltmeter : string          =    "113";
const A0 : string                 =    "114";
const A1 : string                 =    "115";
const A2 : string                 =    "116";
const D11 : string                =    "117";
const D12 : string                =    "118";
const D13 : string                =    "119";
const Car_ : string               =    "120";
const Font: string                =    "121";
const IRremote: string            =    "122";
*/

/********Data(master)********/
/*
const CW : string                 =    "101";
const CCW : string                =    "102";
const On : string                 =    "103";
const Off : string                =    "104";
const Step : string               =    "105";
const Continue : string           =    "106";
const Distance : string           =    "107";
const Stop : string               =    "108";
const Brake : string              =    "109";
const Forward : string            =    "110";
const back : string               =    "111";
const Left : string               =    "112";
const Right : string              =    "113";
const ForwardDistance : string    =    "114";
const BackDistance : string       =    "115";
const Speed : string              =    "116";
const TurnDegree : string         =    "117";
const Frequency : string          =    "118";
const Volume : string             =    "119";
const Servo1 : string             =    "120";
const Servo2 : string             =    "121";
const Servo3 : string             =    "122";
const RGB1 : string               =    "123";
const RGB2 : string               =    "124";
const RGB3 : string               =    "125";
const RGB4 : string               =    "126";
const Brightness : string         =    "127";
const Read : string               =    "128";
const Write : string              =    "129";
const Digital : string            =    "130";
const Analog : string             =    "131";
const percent : string            =    "132";
const Input : string              =    "133";
const Output : string             =    "134";
*/

//use for RGB-LED
enum RGBNUM {
    No1 = "123",
    No2 = "124",
    No3 = "125",
    No4 = "126"
}

//use for control car
enum CarDirection {
    Forward = "110",
    Back = "111",
    Left = "112",
    Right = "113"
}
enum FB {
    ForwardDistance = "114",
    BackDistance = "115"
}

//use for control wheels
enum CarWheelDirection {
    CW = "101",
    CCW = "102"
}
enum CarWheelMode {
    Step = "105",
    Continue = "106"
}

//use for control car and wheels.
enum CarWheelState {
    Stop = "108",
    Brake = "109"
}

//Use for wheels,headlight and PH.
enum Side {
    Left = "112",
    Right = "113"
}

//Use for buzzer,servo and sonar.
enum ON_OFF {
    ON = "103",
    OFF = "104"
}

//use for servo
enum SERVOPIN {
    S1 = "120",
    S2 = "121",
    S3 = "122"
}

//use for port
enum ALLPIN {
    A0 = "114",
    A1 = "115",
    A2 = "116",
	D11 = "117",
    D12 = "118",
    D13 = "119"
}
enum ANALOGPIN {
    A0 = "114",
    A1 = "115",
    A2 = "116"
}
enum PINMODE {
    INPUT = "133",
    OUTPUT = "134"
}
enum Level {
    HIGH = "101",
    LOW = "100"
}

const enum IrButton {
    //% block="1"
    Number_1 = 93,
    //% block="2"
    Number_2 = 157,
    //% block="3"
    Number_3 = 29,
    //% block="4"
    Number_4 = 221,
    //% block="5"
    Number_5 = 253,
    //% block="6"
    Number_6 = 61,
    //% block="7"
    Number_7 = 31,
    //% block="8"
    Number_8 = 95,
    //% block="9"
    Number_9 = 111,
    //% block="*"
    Star = 151,
    //% block="0"
    Number_0 = 103,
    //% block="#"
    Hash = 79,
    //% block=" "
    Any = -1,
    //% block="▲"
    Up = 231,
    //% block=" "
    Unused_2 = -2,
    //% block="◀"
    Left = 239,
    //% block="OK"
    Ok = 119,
    //% block="▶"
    Right = 165,
    //% block=" "
    Unused_3 = -3,
    //% block="▼"
    Down = 181,
    //% block=" "
    Unused_4 = -4
}

//% color="#ff6800" icon="\uf1b9" weight=15
//% groups="['Car', 'Wheels', 'Sonar', 'IRremote', 'Buzzer', 'Servo', 'HeadLight', 'PR', 'LineDetection', 'RGB', 'Voltmeter', 'Port']"
namespace Cobit {

    //  start(S) + sensor(000) + data(000) + ... + stop(P)
    //  Example: let cmdWrite : string = "S000000...P";

    /////////////////////////////////////////////////////Serial read and write data function
    //  microbit write data to cobit
    function WriteCMD(cmd: string) {
        let i: number = 0;
        let tempStr: string = "     ";
        while (tempStr[0] != 'S' && tempStr[1] != 'P' && i < 10) {
            serial.writeString(cmd);
            basic.pause(10)
            tempStr = serial.readString();
            i++;
        }
    }

    //  microbit read data from cobit
    function ReadData(cmd: string) {
        let i: number = 0;
        let tempStr: string = "     ";
        while (tempStr[0] != 'S' && tempStr[4] != 'P' && i < 10) {
            serial.writeString(cmd);
            basic.pause(10)
            tempStr = serial.readString();
            i++;
        }
        if (tempStr[0] != 'S' && tempStr[4] != 'P') { return "000"; }

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
    //% block="Init device"
    //% group="" weight=103
    export function init_() {
        // init serial port. tx=P0  rx=P1
        serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);

        //Sets the length of the serial reception buffer in bytes.
        //serial.setRxBufferSize(16);
        //Sets the length of the serial transmission buffer in bytes.
        //serial.setTxBufferSize(16);

        //reset N76E003 IC, Reset mote,servo,buzzer
        WriteCMD("S105P");
    }
	
    /////////////////////////////////////////////////////Car
    //  Car write character
    //% block="Car write a char $Str size $Size"
    //% Size.min=1 Size.max=9 Size.defl=1
    //% group="Car" weight=100
    export function write_(Str: string, Size: number) {
        if (Str.length > 1) { return; }
        let charNum: number = Str.charCodeAt(0);
        WriteCMD("S121" + NumToStr(Size, 3) + NumToStr(charNum, 3) + "P");
    }

    //  Set car state
    //% block="Car $State"
    //% group="Car" weight=99
    export function CarState(State: CarWheelState) {
        WriteCMD("S120" + State + "P");
    }

    //  Set car direction
    //% block="Car $CD speed $Speed"
    //% Speed.min=0 Speed.max=4
    //% group="Car" weight=98
    export function carDirection(CD: CarDirection, Speed: number) {
        WriteCMD("S120" + CD + NumToStr(Speed, 3) + "P");
    }

    //  Set car travel distance --> Only use in step mode.
    //% block="Car $CD $D mm speed $Speed(step)"
    //% D.min=0 D.max=30000 Speed.min=0 Speed.max=4
    //% group="Car" weight=97
    export function CarTravelsDistance(CD: FB, D: number, Speed: number) {
        WriteCMD("S120" + CD + NumToStr(D, 6) + NumToStr(Speed, 3) + "P");
    }

    //  Car turn angle --> Only use in step mode.
    //% block="Car $D $Angle ° speed $Speed(step)"
    //% Angle.min=0 Angle.max=360 Speed.min=0 Speed.max=4
    //% group="Car" weight=96
    export function CarAngle(D: CarWheelDirection, Angle: number, Speed: number) {
        WriteCMD("S120" + D + NumToStr(Angle, 3) + NumToStr(Speed, 3) + "P");
    }

    //  Car delay for distance.
	//	3.14*65/(360/0.9)=0.51025mm
    //% block="CarDelay distance $Distance speed $Speed(step)"
    //% Speed.min=0 Speed.max=4
    //% group="Car" weight=95
    export function CarDelayDistance(Distance: number, Speed: number) {
		switch(Speed){
		case 0: break;
		case 1: basic.pause(10*Distance/0.5/0.8);   break;     //0.8 is the compensation delay.
		case 2: basic.pause(5*Distance/0.5/0.8);    break;
		case 3: basic.pause(2.5*Distance/0.5/0.8);  break;
		case 4: basic.pause(1.25*Distance/0.5/0.8); break;
		default:break;
		}
    }

    //  Car delay for degree.
	//	The distance between the two wheels is 96mm. circumference = 96*3.14 = 301.44mm 
	//	The circumference of each degree is 301.44/360 = 0.83733mm. accuracy = 0.51025/0.83733 = 0.609 degree.
    //% block="CarDelay degree $Degree speed $Speed"
    //% Degree.min=0 Degree.max=360 Speed.min=0 Speed.max=4
    //% group="Car" weight=94
    export function CarDelayDegree(Degree: number, Speed: number) {
		switch(Speed){
		case 0: break;
		case 1: basic.pause(Degree/0.45*10);   break;       //0.45 is the compensation delay.
		case 2: basic.pause(Degree/0.45*5);    break;
		case 3: basic.pause(Degree/0.45*2.5);  break;
		case 4: basic.pause(Degree/0.45*1.25); break;
		default:break;
		}
    }
	
    /////////////////////////////////////////////////////Wheels
    //  Set wheel mode
    //% block="Wheel $S mode $Mode"
    //% group="Wheels" weight=90
    export function wheelMode(S: Side, Mode: CarWheelMode) {
        if (S == Side.Left) {                    //left side
            WriteCMD("S100" + Mode + "P");
        }
        if (S == Side.Right) {                   //right side
            WriteCMD("S101" + Mode + "P");
        }
    }

    //  Set wheel direction
    //% block="Wheel $S turn $WD"
    //% group="Wheels" weight=89
    export function wheelDirection(S: Side, WD: CarWheelDirection) {
        if (S == Side.Left) {                 //left side
            WriteCMD("S100" + WD + "P");
        }
        if (S == Side.Right) {                //right side
            WriteCMD("S101" + WD + "P");
        }
    }

    //  Set wheel speed
    //% block="Wheel $S speed $Speed"
    //% Speed.min=0 Speed.max=4
    //% group="Wheels" weight=88
    export function wheelSpeed(S: Side, Speed: number) {
        let cmd: string;
        if (S == Side.Left) {          //left side
            cmd = "S100116" + NumToStr(Speed, 3) + "P";
            WriteCMD(cmd);
        }
        if (S == Side.Right) {         //right side
            cmd = "S101116" + NumToStr(Speed, 3) + "P";
            WriteCMD(cmd);
        }
    }

    //  Set wheel turn angle --> Only use in step mode.
    //% block="Wheel $S turn $Angle ° (step)"
    //% Angle.min=0 Angle.max=360
    //% group="Wheels" weight=87
    export function WheelAngle(S: Side, Angle: number) {
        let step: number;
        step = Angle / 0.9;
        let cmd: string;
        if (S == Side.Left) {          //left side
            cmd = "S100117" + NumToStr(step, 3) + "P";
            WriteCMD(cmd);
        }
        if (S == Side.Right) {         //right side
            cmd = "S101117" + NumToStr(step, 3) + "P";
            WriteCMD(cmd);
        }
    }

    //  Set wheel travels distance --> Only use in step mode.
    //% block="Wheel $S run $D mm (step)"
    //% D.min=0 D.max=30000
    //% group="Wheels" weight=86
    export function WheelTravelsDistance(S: Side, D: number) {
        //wheel diameter:65mm, Stepper motor stepping Angle:0.9
        //0.5105 = (3.1415926*65)/(360/0.9)
        let step: number = Math.floor(D/0.5105);
        if (S == Side.Left) {          //left side
            WriteCMD("S100107" + NumToStr(step, 6) + "P");
        }
        if (S == Side.Right) {         //right side
            WriteCMD("S101107" + NumToStr(step, 6) + "P");
        }
    }

    //  Set wheel state
    //% block="Wheel $S $State"
    //% group="Wheels" weight=85
    export function wheelState(S: Side, State: CarWheelState) {
        if (S == Side.Left) {          //left side
            WriteCMD("S100" + State + "P");
        }
        if (S == Side.Right) {         //right side
            WriteCMD("S101" + State + "P");
        }
    }

    //  Wheel delay for distance.
	//	3.14*65/(360/0.9)=0.51025mm
    //% block="WheelDelay distance $Distance speed $Speed(step)"
    //% Speed.min=0 Speed.max=4
    //% group="Wheels" weight=84
    export function wheelDelayDistance(Distance: number, Speed: number) {
		switch(Speed){
		case 0: break;
		case 1: basic.pause(10*Distance/0.5/0.8);   break;     //0.8 is the compensation delay.
		case 2: basic.pause(5*Distance/0.5/0.8);    break;
		case 3: basic.pause(2.5*Distance/0.5/0.8);  break;
		case 4: basic.pause(1.25*Distance/0.5/0.8); break;
		default:break;
		}
    }

    //  Wheel delay for degree.
    //% block="WheelDelay degree $Degree speed $Speed"
    //% Degree.min=0 Degree.max=360 Speed.min=0 Speed.max=4
    //% group="Wheels" weight=83
    export function wheelDelayDegree(Degree: number, Speed: number) {
		switch(Speed){
		case 0: break;
		case 1: basic.pause(10*Degree/0.9/0.8);   break;       //0.8 is the compensation delay.
		case 2: basic.pause(5*Degree/0.9/0.8);    break;
		case 3: basic.pause(2.5*Degree/0.9/0.8);  break;
		case 4: basic.pause(1.25*Degree/0.9/0.8); break;
		default:break;
		}
    }
	
    /////////////////////////////////////////////////////Sonar
    //  Turn sonar on or off.
    //% block="Sonar $SW"
    //% group="Sonar" weight=82
    export function sonarOnOFF(SW: ON_OFF) {
        WriteCMD("S102" + SW + "P");
    }

    //  Return sonar data.
    //% block="Sonar measure CM"
    //% group="Sonar" weight=81
    export function SonarMeasure(): number {
        let str: string;
        str = ReadData("S102107P");
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////IRremote
    //  Turn value of IR.
    //% block="IR Value"
    //% group="IRremote" weight=80
    export function IRvalue(): number {
        let str: string;
        str = ReadData("S122128P");
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }
	
    //  Returns the command code of a specific IR button.
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=3
    //% button.fieldOptions.tooltips="false"
    //% block="IR button %button"
    //% group="IRremote" weight=79
    export function irButton(button: IrButton): number {
        return button as number;
    }
	
    /////////////////////////////////////////////////////Buzzer
    //  Turn buzzer on or off.
    //% block="Buzzer $SW"
    //% group="Buzzer" weight=78
    export function buzzerOnOFF(SW: ON_OFF) {
        WriteCMD("S103" + SW + "P");
    }

    //  Set frequency of buzzer.
    //% block="BuzzerFrequency $Hz Hz"
    //% Hz.min=20 Hz.max=1000
    //% group="Buzzer" weight=77
    export function buzzerHz(Hz: number) {
        let cmd: string = "S103118" + NumToStr(Hz, 6) + "P";
        WriteCMD(cmd);
    }

    //  Set volume of buzzer.
    //% block="BuzzerVolume $V"
    //% V.min=0 V.max=9
    //% group="Buzzer" weight=76
    export function volume(V: number) {
        let cmd: string = "S103119" + NumToStr(V, 3) + "P";
        WriteCMD(cmd);
    }

    /////////////////////////////////////////////////////Servo
    //  Turn servo on or off.
    //% block="All servo $SW"
    //% group="Servo" weight=75
    export function servoOnOFF(SW: ON_OFF) {
        WriteCMD("S104" + SW + "P");
    }

    //  Set servo anagle
    //% block="Servo channel|%channel|turn %degree °"
    //% degree.min=0 degree.max=180
    //% group="Servo" weight=74
    export function Servo(channel: SERVOPIN, degree: number) {
        WriteCMD("S104" + channel + NumToStr(degree, 3) + "P");
    }

    /////////////////////////////////////////////////////HeadLight
    //  Turn HeadLight on or off.
    //% block="HeadLight $S $SW"
    //% group="Headlight" weight=73
    export function headLightOnOFF(S: Side, SW: ON_OFF) {
        if (S == Side.Left) {                //left headlight
            WriteCMD("S106" + SW + "P");
        }
        if (S == Side.Right) {               //right headlight
            WriteCMD("S107" + SW + "P");
        }
    }
	
    //  Set HeadLight brightness.
    //% block="HeadLightBrightness $S $B"
	//% B.min=0 B.max=255
    //% group="Headlight" weight=72
    export function headLightBrightness(S: Side, B: number) {
        if (S == Side.Left) {                //left headlight
            WriteCMD("S106131" + NumToStr(B, 3) + "P");
        }
        if (S == Side.Right) {               //right headlight
            WriteCMD("S107131" + NumToStr(B, 3) + "P");
        }
    }

    /////////////////////////////////////////////////////PR
    //  Get value of photoresistance.
    //% block="Photoresistance $S"
    //% group="PR" weight=70
    export function photoresistance(S: Side): number {
        let str: string;
        if (S == Side.Left) {
            str = ReadData("S108P");
        }
        if (S == Side.Right) {
            str = ReadData("S109P");
        }
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////LineDetection
    //  Get value of LineDetection.
    //% block="LineDetection $S"
    //% group="LineDetection" weight=69
    export function LineDetection(S: Side): number {
        let str: string;
        if (S == Side.Left) {
            str = ReadData("S110P");
        }
        if (S == Side.Right) {
            str = ReadData("S111P");
        }
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////RGB
    // Set brightness of RGB
    //% block="RGB brightness $Level"
    //% Level.min=0 Level.max=255
    //% group="RGB" weight=68
    export function RGBbrightness(Level: number) {
        let cmd: string = "S112127" + NumToStr(Level, 3) + "P";
        WriteCMD(cmd);
    }

    //% block="RGB $num show $color"
    //% color.shadow="colorNumberPicker"
    //% group="RGB" weight=67
    export function showColor(num: RGBNUM, color: number) {
        let R = Math.floor(color / 65536);
        let G = Math.floor(color % 65536 / 256);
        let B = color % 256;
        WriteCMD("S112" + num + NumToStr(R, 3) + NumToStr(G, 3) + NumToStr(B, 3) +  "P");
    }

    // set the rgb-led color via data
    //% block="RGB $num R:     $red G:     $green B:     $blue"
    //% num.min=1 num.max=4 red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% group="RGB" weight=66
    export function setRGB(num: RGBNUM, red: number, green: number, blue: number) {
        WriteCMD("S112" + num + NumToStr(red, 3) + NumToStr(green, 3) + NumToStr(blue, 3) + 'P');
    }

    /////////////////////////////////////////////////////Voltmeter
    //  Get voltage of battery
    //% block="Voltmeter_V"
    //% group="Voltmeter" weight=65
    export function Voltmeter_V(): number {
        let str: string;
        str = ReadData("S113131P");
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data / 10;
    }

    //  Get voltage of battery
    //% block="VoltmeterPercent"
    //% group="Voltmeter" weight=64
    export function Voltmeter_percent(): number {
        let str: string;
        str = ReadData("S113132P");
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }

    /////////////////////////////////////////////////////Port use two data
    // Set pin mode
    //% block="PinMode $P $M"
    //% group="Port" weight=63
    export function pinMode(P: ALLPIN, M: PINMODE) {
        WriteCMD("S" + P + M + "P");
    }

    // Set pin level
    //% block="DigitalWrite $P $L"
    //% group="Port" weight=62
    export function digitalWrite(P: ALLPIN, L: Level) {
        WriteCMD("S" + P + "129130" + L + "P");
    }

    // Set pin level
    //% block="AnalogWrite D11 $Num"
    //% Num.min=0 Num.max=255
    //% group="Port" weight=61
    export function analogWrite(Num: number) {
        WriteCMD("S117129131" + NumToStr(Num, 3) + "P");
    }

    //  Get digital value of pin
    //% block="DigitalRead $P"
    //% group="Port" weight=60
    export function DigitalRead(P: ALLPIN): number {
        let str: string;
        str = ReadData("S" + P + "128130P");
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }

    //  Get analog value of pin
    //% block="AnalogRead $P"
    //% group="Port" weight=59
    export function AnalogRead(P: ANALOGPIN): number {
        let str: string;
        str = ReadData("S" + P + "128131P");
        //substr(start,length)
        let data: number = parseInt(str.substr(0, 3), 10);
        return data;
    }
}
