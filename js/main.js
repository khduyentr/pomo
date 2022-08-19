const countdownText = document.getElementById("countdown-text");
const countdownBtn = document.getElementById("countdown-btn");

const mainSection = document.querySelector(".main-section");
const clockWrapper = document.querySelector(".clock-wrapper");

const askTaskButton = document.getElementById("ask-task-btn");

let myCountdownInterval;
let startingMinutes = 25;
let totalSeconds = startingMinutes * 60;

const clickAudio = new Audio();
clickAudio.src = "../audio/click.mp3";

function updateClock() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownText.innerHTML = `${minutes}:${seconds}`;
  totalSeconds--;

  return [minutes, seconds];
}

function pressCountdownButton() {
  clickAudio.play();

  const icon = document.querySelector("#icon-countdown-btn");

  icon.style.display = "block";

  countdownBtn.textContent = "PAUSE";
  countdownBtn.style.boxShadow = "none";
  countdownBtn.style.top = "258px";
}

function releaseCountdownButton() {
  const icon = document.querySelector("#icon-countdown-btn");

  icon.style.display = "none";

  clickAudio.play();

  countdownBtn.textContent = "START";
  countdownBtn.style.boxShadow = "0px 8px 0px #ebebeb";
  countdownBtn.style.top = "250px";
}

function pauseClock() {
    countdownText.classList.toggle("pausing");
    window.clearInterval(myCountdownInterval);
    releaseCountdownButton();
}

function runClock() {
    pressCountdownButton();
    countdownText.classList.toggle("pausing");
    myCountdownInterval = window.setInterval(updateClock, 1000);
}

function handleClock() {

    // the clock is paused
    if (countdownText.classList.contains("pausing")) {
        // pressCountdownButton();
        // countdownText.classList.toggle("pausing");
        // myCountdownInterval = window.setInterval(updateClock, 1000);
        runClock();
    } 
    // the clock is running 
    else {
        // countdownText.classList.toggle("pausing");
        // window.clearInterval(myCountdownInterval);
        // releaseCountdownButton();
        pauseClock();
    }
}

function resetClock(min = 25) {
    totalSeconds = min * 60;
    
    var minutes = min < 10 ? "0" + min : min;
    countdownText.innerHTML = `${minutes}:00`;

    myCountdownInterval = window.setInterval(updateClock, 1000);
    window.clearInterval(myCountdownInterval);
}

countdownBtn.addEventListener("click", handleClock);

// change tab
const pomoTabName = "POMO";
const longbreakTabName = "LONGBREAK";
const shortbreakTabName = "SHORTBREAK";

const pomoButton = document.getElementById("pomo-tab-btn");
const shortbreakButton = document.getElementById("shortbreak-tab-btn");
const longbreakButton = document.getElementById("longbreak-tab-btn");

const mainNav = document.querySelector(".main-nav");
const noteHashtag = document.querySelector("#hashtag-note");
const taskTitle = document.querySelector(".tasks__title");

// 3 nav button
const navButtonList = document.querySelectorAll(".nav-button");

let currentTab = pomoTabName;


// remove theme 
function removePomoTheme() {
    pomoButton.classList.remove("active-tomato");
    askTaskButton.classList.remove("btn-bg-dark-tomato");
    mainSection.classList.remove("main-bg-tomato");
    clockWrapper.classList.remove("clock-bg-tomato");
    countdownBtn.classList.remove("pomo-btn");
    mainNav.classList.remove("pomo-nav");
    noteHashtag.classList.remove("pomo-hashtag");
    taskTitle.classList.remove("tasks__title--pomo");

    navButtonList.forEach(button => {
        button.classList.remove("btn-bg-pink");
    })
}

function removeLongBreakTheme() {
    longbreakButton.classList.remove("active-blue");
    askTaskButton.classList.remove("btn-bg-dark-blue");
    mainSection.classList.remove("main-bg-blue");
    clockWrapper.classList.remove("clock-bg-blue");
    countdownBtn.classList.remove("longbreak-btn");
    mainNav.classList.remove("longbreak-nav");
    noteHashtag.classList.remove("longbreak-hashtag");
    taskTitle.classList.remove("tasks__title--longbreak");

    navButtonList.forEach(function (button) {
        button.classList.remove("btn-bg-light-blue");
    });
}


function removeShortBreakTheme() {
    shortbreakButton.classList.remove("active-green");
    askTaskButton.classList.remove("btn-bg-dark-green");
    mainSection.classList.remove("main-bg-green");
    clockWrapper.classList.remove("clock-bg-green");
    countdownBtn.classList.remove("shortbreak-btn");
    mainNav.classList.remove("shortbreak-nav");
    noteHashtag.classList.remove("shortbreak-hashtag");
    taskTitle.classList.remove("tasks__title--shortbreak");

    navButtonList.forEach(function (button) {
        button.classList.remove("btn-bg-light-green");
    });
}

// add theme 
function addShortBreakTheme() {
    shortbreakButton.classList.add("active-green");
    askTaskButton.classList.add("btn-bg-dark-green");
    mainSection.classList.add("main-bg-green");
    clockWrapper.classList.add("clock-bg-green");
    countdownBtn.classList.add("shortbreak-btn");
    mainNav.classList.add("shortbreak-nav");
    noteHashtag.classList.add("shortbreak-hashtag");
    taskTitle.classList.add("tasks__title--shortbreak");

    navButtonList.forEach(function (button) {
        button.classList.add("btn-bg-light-green");
    })
}

function addLongBreakTheme() {
    longbreakButton.classList.add("active-blue");
    askTaskButton.classList.add("btn-bg-dark-blue");
    mainSection.classList.add("main-bg-blue");
    clockWrapper.classList.add("clock-bg-blue");
    countdownBtn.classList.add("longbreak-btn");
    mainNav.classList.add("longbreak-nav");
    noteHashtag.classList.add("longbreak-hashtag");
    taskTitle.classList.add("tasks__title--longbreak");

    navButtonList.forEach(function (button) {
        button.classList.add("btn-bg-light-blue");
    });

}

function addPomoTheme() {
    pomoButton.classList.add("active-tomato");
    askTaskButton.classList.add("btn-bg-dark-tomato");
    mainSection.classList.add("main-bg-tomato");
    clockWrapper.classList.add("clock-bg-tomato");
    countdownBtn.classList.add("pomo-btn");
    mainNav.classList.add("pomo-nav");
    noteHashtag.classList.add("pomo-hashtag");
    taskTitle.classList.add("tasks__title--pomo");

    navButtonList.forEach(button => {
        button.classList.add("btn-bg-pink");
    })

}

function handleShortBreakUpdate() {
    if (currentTab === pomoTabName) {
        removePomoTheme();
    } 
    else if (currentTab === longbreakTabName) {
        removeLongBreakTheme();
    }
    addShortBreakTheme();
    currentTab = shortbreakTabName;

    pauseClock();
    resetClock(5);
}

function handleLongBreakUpdate() {
    if (currentTab === pomoTabName) {
        removePomoTheme();
    } 
    else if (currentTab === shortbreakTabName) {
        removeShortBreakTheme();
    }
    addLongBreakTheme();
    currentTab = longbreakTabName;

    pauseClock();
    resetClock(15);
}

function handlePomoUpdate() {
    if (currentTab === longbreakTabName) {
        removeLongBreakTheme();
    } 
    else if (currentTab === shortbreakTabName) {
        removeShortBreakTheme();
    }
    addPomoTheme();
    currentTab = pomoTabName;

    pauseClock();
    resetClock(); 
}

shortbreakButton.addEventListener("click", handleShortBreakUpdate);
longbreakButton.addEventListener("click", handleLongBreakUpdate);
pomoButton.addEventListener("click", handlePomoUpdate)