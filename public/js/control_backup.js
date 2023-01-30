var state_door = false;
var state_led1 = false;
var state_led2 = false;

var ct_door = "OPEN";
var ct_led1 = "OFF";
var ct_led2 = "OFF";
var ct_pwm = 0;
var ct_status = "Already sync";
var ct_rfid_mode = "MODE0";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

var Door_click = document.getElementById("ClickDoor")
Door_click.addEventListener('click', ClickDoor);
var Led1_click = document.getElementById("ClickLed1")
Led1_click.addEventListener('click', ClickLed1);
var Led2_click = document.getElementById("ClickLed2")
Led2_click.addEventListener('click', ClickLed2);
var RFID_Mode0_click = document.getElementById("RFID_mode0");
RFID_Mode0_click.addEventListener('click',RFID_Mode0);
var RFID_Mode1_click = document.getElementById("RFID_mode1");
RFID_Mode1_click.addEventListener('click',RFID_Mode1);
var RFID_Mode2_click = document.getElementById("RFID_mode2");
RFID_Mode2_click.addEventListener('click',RFID_Mode2);
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

function WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status,ct_rfid_mode) {
    const db = getDatabase();
    set(ref(db, 'control/'), {
        ct_door: ct_door,
        ct_led1: ct_led1,
        ct_led2: ct_led2,
        ct_pwm: ct_pwm,
        ct_status: "Already sync"
    });
    set(ref(db, 'rfid/'), {
        rf_mode: ct_rfid_mode,
        rf_status: "Already sync"
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
    document.getElementById("RFID_mode").value = "MODE "+ snapshot.val();
    document.getElementById("RFID_mode").style.backgroundColor = "#ff0000";
});
// var dbRefStatus = ref(getDatabase(), 'control/ct_status');
// onValue(dbRefStatus, (snapshot) => {
//     console.log(snapshot.val());
//     document.getElementById("Status").value = snapshot.val();
//     if (snapshot.val() == "Already sync") {
//         ct_status = "Already sync";
//         document.getElementById("Status").style.backgroundColor = "#33ff33";
//         document.getElementById("Status").style.color = "black";
//     }
//     else if (snapshot.val() == "Change") {
//         ct_status = "Change";
//         document.getElementById("Status").style.backgroundColor = "#ff0000";
//         document.getElementById("Status").style.color = "white";
//     }
// });

function RFID_Mode0()
{  
    ct_rfid_mode = "0";
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status, ct_rfid_mode);
}
function RFID_Mode1()
{  
    ct_rfid_mode = "1";
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status, ct_rfid_mode);
}
function RFID_Mode2()
{  
    ct_rfid_mode = "2";
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status, ct_rfid_mode);
}
function ClickDoor() {
    state_door = !state_door;
    if (state_door) {
        ct_door = "OPEN";
    }
    else ct_door = "CLOSE";
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}
function ClickLed1() {
    state_led1 = !state_led1;
    if (state_led1) {
        ct_led1 = "ON";
    }
    else ct_led1 = "OFF";
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}
function ClickLed2() {
    state_led2 = !state_led2;
    if (state_led2) {
        ct_led2 = "ON";
    }
    else ct_led2 = "OFF";
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}


slider.oninput = function () {
    output.innerHTML = this.value;
    ct_pwm = this.value;
    WriteDataToFirebase(ct_door, ct_led1, ct_led2, ct_pwm, ct_status);
}

/*******************************************************************/
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span.countdown_span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownTime = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

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
function updateDom() {
    countdownActive = setInterval(() => {
        const now = changeTimeZone(new Date(), 'Asia/Ho_Chi_Minh').getTime();
        const distance = countdownValue - now;
        console.log(countdownValue);
        console.log('distance:', distance);

        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(hours, minutes, seconds);

        inputContainer.hidden = true;
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else {
            timeElements[0].textContent = `${hours}`;
            timeElements[1].textContent = `${minutes}`;
            timeElements[2].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);

}
function updateCountdown(e) {
    e.preventDefault();
    const date = new Date();
    countdownDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
    countdownTime = e.srcElement[0].value;
    savedCountdown = {
        date: countdownDate,
        time: countdownTime
    }
    // console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    console.log(countdownDate, countdownTime);
    if (countdownTime === '') {
        alert('Plese select a date for the Countdown');
    }
    else {
        countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
        console.log('countdown value:', countdownValue);
        updateDom()
    }
}
function reset() {
    clearInterval(countdownActive);
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    countdownTitle = '';
    countdownDate = '';
}
function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownTime = savedCountdown.time;
        countdownValue = changeTimeZone(new Date(countdownDate + " " + countdownTime), 'Asia/Ho_Chi_Minh').getTime();
        updateDom();
    }
}
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
restorePreviousCountdown();
