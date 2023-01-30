var state_door = false;
var state_led1 = false;
var state_led2 = false;

var ct_door = "OPEN";
var ct_led1 = "OFF";
var ct_led2 = "OFF";
var ct_pwm = 0;
var ct_status = "Already sync";
var ct_rfid_mode = "1";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

var Door_click = document.getElementById("ClickDoor")
Door_click.addEventListener('click', ClickDoor);
var Led1_click = document.getElementById("ClickLed1")
Led1_click.addEventListener('click', ClickLed1);
var Led2_click = document.getElementById("ClickLed2")
Led2_click.addEventListener('click', ClickLed2);
var RFID_Mode0_click = document.getElementById("RFID_mode0");
RFID_Mode0_click.addEventListener('click', RFID_Mode0);
var RFID_Mode1_click = document.getElementById("RFID_mode1");
RFID_Mode1_click.addEventListener('click', RFID_Mode1);
var RFID_Mode2_click = document.getElementById("RFID_mode2");
RFID_Mode2_click.addEventListener('click', RFID_Mode2);
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

function WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status) {
    const db = getDatabase();
    set(ref(db, 'control/'), {
        ct_door: ct_door,
        ct_led1: ct_led1,
        ct_led2: ct_led2,
        ct_pwm: ct_pwm,
        ct_status: "Change"
    });
}
function WriteDataToRFIDMode(ct_rfid_mode) {
    const db = getDatabase();
    set(ref(db, 'rfid/'), {
        rf_mode: ct_rfid_mode,
        rf_status: "Change"
    });
}
var dbRefDoor = ref(getDatabase(), 'control/ct_door');
onValue(dbRefDoor, (snapshot) => {
    console.log(snapshot.val());
    document.getElementById("Door").value = snapshot.val();
    if (snapshot.val() == "OPEN") {
        state_door = true;
        ct_door = "OPEN";
        document.getElementById("Door").style.backgroundColor = "#33ff33";
        document.getElementById("Door").style.color = "black";
    }
    else if (snapshot.val() == "CLOSE") {
        state_door = false;
        ct_door = "CLOSE";
        document.getElementById("Door").style.backgroundColor = "#ff0000";
        document.getElementById("Door").style.color = "white";
    }
});
var dbRefLed1 = ref(getDatabase(), 'control/ct_led1');
onValue(dbRefLed1, (snapshot) => {
    console.log(snapshot.val());
    document.getElementById("Led1").value = snapshot.val();
    if (snapshot.val() == "ON") {
        state_led1 = true;
        ct_led1 = "ON";
        document.getElementById("Led1").style.backgroundColor = "#33ff33";
        document.getElementById("Led1").style.color = "black";
    }
    else if (snapshot.val() == "OFF") {
        state_led1 = false;
        ct_led1 = "OFF";
        document.getElementById("Led1").style.backgroundColor = "#ff0000";
        document.getElementById("Led1").style.color = "white";
    }
});
var dbRefLed2 = ref(getDatabase(), 'control/ct_led2');
onValue(dbRefLed2, (snapshot) => {
    console.log(snapshot.val());
    document.getElementById("Led2").value = snapshot.val();
    if (snapshot.val() == "ON") {
        state_led2 = true;
        ct_led2 = "ON";
        document.getElementById("Led2").style.backgroundColor = "#33ff33";
        document.getElementById("Led2").style.color = "black";
    }
    else if (snapshot.val() == "OFF") {
        state_led2 = false;
        ct_led2 = "OFF";
        document.getElementById("Led2").style.backgroundColor = "#ff0000";
        document.getElementById("Led2").style.color = "white";
    }
});
var dbRefPWM = ref(getDatabase(), 'control/ct_pwm');
onValue(dbRefPWM, (snapshot) => {
    console.log(snapshot.val());
    ct_pwm = snapshot.val();
    slider.value = ct_pwm;
    output.innerHTML = slider.value;
});
var dbRefRFID_Mode = ref(getDatabase(), 'rfid/rf_mode');
onValue(dbRefRFID_Mode, (snapshot) => {
    console.log(snapshot.val());
    ct_rfid_mode = snapshot.val();
    console.log("MODE" + snapshot.val());
    document.getElementById("RFID_mode").value = "MODE " + snapshot.val();
    document.getElementById("RFID_mode").style.backgroundColor = "#ff0000";
});

function RFID_Mode0() {
    ct_rfid_mode = "0";
    WriteDataToRFIDMode(ct_rfid_mode);
}
function RFID_Mode1() {
    ct_rfid_mode = "1";
    WriteDataToRFIDMode(ct_rfid_mode);
}
function RFID_Mode2() {
    ct_rfid_mode = "2";
    WriteDataToRFIDMode(ct_rfid_mode);
}
function ClickDoor() {
    state_door = !state_door;
    if (state_door) {
        ct_door = "OPEN";
    }
    else ct_door = "CLOSE";
    WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}
function ClickLed1() {
    state_led1 = !state_led1;
    if (state_led1) {
        ct_led1 = "ON";
    }
    else ct_led1 = "OFF";
    WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}
function ClickLed2() {
    state_led2 = !state_led2;
    if (state_led2) {
        ct_led2 = "ON";
    }
    else ct_led2 = "OFF";
    WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}


slider.oninput = function () {
    output.innerHTML = this.value;
    ct_pwm = this.value;
    WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}

/*******************************************************************/
const FanTime1 = document.getElementById('FanTime1');
const FanTime2 = document.getElementById('FanTime2');

const Led1Time1 = document.getElementById('Led1Time1');
const Led1Time2 = document.getElementById('Led1Time2');

const Led2Time1 = document.getElementById('Led2Time1');
const Led2Time2 = document.getElementById('Led2Time2');

let countdownDate = '';
let countdownTime = '';
let countdownValue = Date;
let savedCountdown;
let startTime;
let stopTime;
let startStruct;
let stopStruct;

function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
        return new Date(
            new Date(date).toLocaleString('en-US', {
                timeZone,
            }),
        );
    }
    return new Date(
        date.toLocaleString('en-US', {
            timeZone,
        }),
    );
}

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

var ft_mode = 1;
var ft_periodic = "";
var ft_start_time;
var ft_state;
var ft_stop_time;
var ft_time_oneshot;

var ld_mode = 1;
var ld_periodic = "";
var ld_start_time;
var ld_state;
var ld_stop_time;
var ld_time_oneshot = "";

var ld2_mode = 1;
var ld2_periodic = "";
var ld2_start_time;
var ld2_state;
var ld2_stop_time;
var ld2_time_oneshot = "";
function WriteDataToFirebaseFanTime(ft_mode, ft_periodic, ft_start_time, ft_state,
    ft_stop_time, ft_time_oneshot, ft_pwm) {
    const db = getDatabase();
    set(ref(db, 'fan_time/'), {
        ft_mode: ft_mode,
        ft_periodic: ft_periodic,
        ft_start_time: ft_start_time,
        ft_state: ft_state,
        ft_status: "Change",
        ft_stop_time: ft_stop_time,
        ft_time_oneshot: ft_time_oneshot,
        ft_value_oneshot: ct_pwm,
        ft_value_periodic: ft_pwm
    });
    WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}
function WriteDataToFirebaseLedTime(ld_mode, ld_periodic, ld_start_time, ld_state,
    ld_stop_time, ld_time_oneshot, ld_number) {
    const db = getDatabase();
    if (ld_number == 1) {
        set(ref(db, 'led1_time/'), {
            l1t_mode: ld_mode,
            l1t_periodic: ld_periodic,
            l1t_start_time: ld_start_time,
            l1t_state: ld_state,
            l1t_status: "Change",
            l1t_stop_time: ld_stop_time,
            l1t_time_oneshot: ld_time_oneshot,
            l1t_value_oneshot: ct_led1,
            l1t_value_periodic: ct_led1
        });
    }
    else (ld_number == 2)
    {
        set(ref(db, 'led2_time/'), {
            l2t_mode: ld_mode,
            l2t_periodic: ld_periodic,
            l2t_start_time: ld_start_time,
            l2t_state: ld_state,
            l2t_status: "Change",
            l2t_stop_time: ld_stop_time,
            l2t_time_oneshot: ld_time_oneshot,
            l2t_value_oneshot: ct_led2,
            l2t_value_periodic: ct_led2
        });
    }
    WriteDataToControl(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}
function updateFanTime1(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    countdownTime = e.srcElement[0].value;
    savedCountdown = {
        date: countdownDate,
        time: countdownTime
    }
    // localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if (countdownTime === '') {
        alert('Plese select a date for the Countdown');
    }
    else {
        const now = changeTimeZone(new Date(), 'Asia/Ho_Chi_Minh').getTime();
        countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
        var distance = countdownValue - now;

        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        if (distance < 0) {
            countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
            countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
            distance = countdownValue - now;
            hours = Math.floor((distance % day) / hour);
            minutes = Math.floor((distance % hour) / minute);
            seconds = Math.floor((distance % minute) / second);
        }
        console.log(hours, minutes, seconds);
        console.log(countdownDate, countdownTime);
        ft_mode = "1";
        ft_time_oneshot = String(hours * hour + minutes * minute + seconds);
        WriteDataToFirebaseFanTime(ft_mode, 0, 0, "ON",
            0, ft_time_oneshot);
    }
}
function updateFanTime2(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    startTime = e.srcElement[0].value;
    stopTime = e.srcElement[1].value;
    let pwm = e.srcElement[2].value;
    for (let i = 3; i <= 9; i++) {
        if (e.srcElement[i].checked) {
            ft_periodic += String(i);
        }
    }
    console.log(ft_periodic);
    startStruct = {
        date: countdownDate,
        time: startTime
    }
    stopStruct = {
        date: countdownDate,
        time: stopTime
    }
    if (startTime === '' || stopTime === '') {
        alert('Plese select a time for the MODE2');
    }
    else {
        ft_mode = "2";
        ft_time_oneshot = "0";
        ft_start_time = startTime;
        ft_stop_time = stopTime;
        WriteDataToFirebaseFanTime(ft_mode, ft_periodic, ft_start_time, "ON",
            ft_stop_time, ft_time_oneshot, pwm);
    }
}
function updateLed1Time1(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    countdownTime = e.srcElement[0].value;
    savedCountdown = {
        date: countdownDate,
        time: countdownTime
    }
    // localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if (countdownTime === '') {
        alert('Plese select a date for the Countdown');
    }
    else {
        const now = changeTimeZone(new Date(), 'Asia/Ho_Chi_Minh').getTime();
        countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
        var distance = countdownValue - now;
        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        if (distance < 0) {
            countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
            countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
            distance = countdownValue - now;
            hours = Math.floor((distance % day) / hour);
            minutes = Math.floor((distance % hour) / minute);
            seconds = Math.floor((distance % minute) / second);
            console.log("HELLO");
        }
        console.log(hours, minutes, seconds);
        console.log(countdownDate, countdownTime);
        ld_mode = "1";
        ld_time_oneshot = String(hours * hour + minutes * minute + seconds);
        WriteDataToFirebaseLedTime(ld_mode, 0, 0, "ON",
            0, ld_time_oneshot, 1)
    }
}
function updateLed1Time2(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    startTime = e.srcElement[0].value;
    stopTime = e.srcElement[1].value;
    console.log(e.srcElement[2].checked);
    ld_periodic = "";
    for (let i = 2; i <= 8; i++) {
        if (e.srcElement[i].checked) {
            ld_periodic += String(i);
        }
    }
    console.log(ld_periodic);
    startStruct = {
        date: countdownDate,
        time: startTime
    }
    stopStruct = {
        date: countdownDate,
        time: stopTime
    }
    if (startTime === '' || stopTime === '') {
        alert('Plese select a time for the MODE2');
    }
    else {
        ld_mode = "2";
        ld_start_time = startTime;
        ld_stop_time = stopTime;
        WriteDataToFirebaseLedTime(ld_mode, ld_periodic, ld_start_time, "ON",
            ld_stop_time, ld_time_oneshot, 1);
    }
}
function updateLed2Time1(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    countdownTime = e.srcElement[0].value;
    savedCountdown = {
        date: countdownDate,
        time: countdownTime
    }
    // localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if (countdownTime === '') {
        alert('Plese select a date for the Countdown');
    }
    else {
        const now = changeTimeZone(new Date(), 'Asia/Ho_Chi_Minh').getTime();
        countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
        var distance = countdownValue - now;

        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        if (distance < 0) {
            countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
            countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
            distance = countdownValue - now;
            hours = Math.floor((distance % day) / hour);
            minutes = Math.floor((distance % hour) / minute);
            seconds = Math.floor((distance % minute) / second);
        }
        console.log(hours, minutes, seconds);
        console.log(countdownDate, countdownTime);
        ld2_mode = "1";
        ld2_time_oneshot = String(hours * hour + minutes * minute + seconds);
        WriteDataToFirebaseLedTime(ld2_mode, 0, 0, "ON",
            0, ld2_time_oneshot, 2)
    }
}
function updateLed2Time2(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    startTime = e.srcElement[0].value;
    stopTime = e.srcElement[1].value;
    ld2_periodic = "";
    console.log(e.srcElement[2].checked);
    for (let i = 2; i <= 8; i++) {
        if (e.srcElement[i].checked) {
            ld2_periodic += String(i);
        }
    }
    console.log(ft_periodic);
    startStruct = {
        date: countdownDate,
        time: startTime
    }
    stopStruct = {
        date: countdownDate,
        time: stopTime
    }
    if (startTime === '' || stopTime === '') {
        alert('Plese select a time for the MODE2');
    }
    else {
        ld2_mode = "2";
        ld2_start_time = startTime;
        ld2_stop_time = stopTime;
        WriteDataToFirebaseLedTime(ld2_mode, ld2_periodic, ld2_start_time, "ON",
            ld2_stop_time, ld2_time_oneshot, 2);
    }
}
FanTime1.addEventListener('submit', updateFanTime1);
FanTime2.addEventListener('submit', updateFanTime2);

Led1Time1.addEventListener('submit', updateLed1Time1);
Led1Time2.addEventListener('submit', updateLed1Time2);

Led2Time1.addEventListener('submit', updateLed2Time1);
Led2Time2.addEventListener('submit', updateLed2Time2);