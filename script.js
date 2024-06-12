let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('StrtStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH} : ${formattedMM} : ${formattedSS} . ${formattedMS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    startStopBtn.innerHTML = "Stop";
    startStopBtn.onclick = stop;
}

function stop() {
    clearInterval(timerInterval);
    startStopBtn.innerHTML = "Start";
    startStopBtn.onclick = start;
}

function reset() {
    clearInterval(timerInterval);
    print("00 : 00 : 00 . 000");
    elapsedTime = 0;
    lapsContainer.innerHTML = '';
    startStopBtn.innerHTML = "Start";
    startStopBtn.onclick = start;
}

function lap() {
    let lapTime = timeToString(elapsedTime);
    let lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.innerText = lapTime;
    lapsContainer.appendChild(lapElement);
}

startStopBtn.onclick = start;
resetBtn.onclick = reset;
lapBtn.onclick = lap;