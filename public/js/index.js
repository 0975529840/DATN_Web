import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
///////////////////////////////////
var valueTemp = ref(getDatabase(), 'display/temp');
onValue(valueTemp, (snapshot) => {
    console.log(snapshot.val());
    document.getElementById("t1").innerHTML = snapshot.val();
});
var valueHumid = ref(getDatabase(), 'display/humidity');
onValue(valueHumid, (snapshot) => {
    console.log(snapshot.val());
    document.getElementById("h1").innerHTML = snapshot.val();
});