let [hours, minutes, seconds] = [0, 0, 0];
let displayTime = document.querySelector("#displayTime");
let timer = null;
let buttons = document.querySelectorAll(".buttons img");
let container = document.querySelector(".container");
let secondClass = document.querySelector(".secondClass");
let playBtn = document.querySelector("#playBtn");
let pauseBtn = document.querySelector("#pauseBtn");

buttons[1].addEventListener("click", startTimer);
buttons[2].addEventListener("click", resetTimer);
pauseBtn.addEventListener("click", stopFunc);

function setData() {
  localStorage.setItem("hours", hours);
  localStorage.setItem("minutes", minutes);
  localStorage.setItem("seconds", seconds);
}
function getData() {
  const savedHours = localStorage.getItem("hours");
  const savedMinutes = localStorage.getItem("minutes");
  const savedSeconds = localStorage.getItem("seconds");

  if (savedHours !== null && savedMinutes !== null && savedSeconds !== null) {
    hours = parseInt(savedHours, 10);
    minutes = parseInt(savedMinutes, 10);
    seconds = parseInt(savedSeconds, 10);
  }
  updateDisplay();
}

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  displayTime.innerHTML = h + ":" + m + ":" + s;
}

function runningTimer() {
  seconds++;
  if (seconds == 50) {
    container.classList.toggle("secondClass");
  }

  if (seconds == 60) {
    container.classList.toggle("secondClass");
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
  setData();
}

function startTimer() {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(runningTimer, 1000);
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function stopFunc() {
  clearInterval(timer);
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
  updateDisplay();
  setData();
}

function resetTimer() {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
  updateDisplay();
  setData();
}

getData();
