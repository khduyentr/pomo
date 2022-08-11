const countdownText = document.getElementById('countdown-text');
const countdownBtn = document.getElementById('countdown-btn');

const mainSection = document.querySelector('.main-section');
const clockWrapper = document.querySelector('.clock-wrapper');

const askTaskButton = document.getElementById('ask-task-btn');


let myCountdownInterval;
let startingMinutes = 25;
let totalSeconds = startingMinutes * 60;

const clickAudio = new Audio();
clickAudio.src = '../audio/click.mp3';

function updateClock(){
    let minutes =  Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownText.innerHTML = `${minutes}:${seconds}`;
    totalSeconds--;

    return [minutes, seconds];
}

function pressCountdownButton(){

    clickAudio.play();

    const icon = document.querySelector('#icon-countdown-btn');

    icon.style.display = 'block';

    countdownBtn.textContent = 'PAUSE';
    countdownBtn.style.boxShadow = 'none';
    countdownBtn.style.top = "258px";
}

function releaseCountdownButton(){

    const icon = document.querySelector('#icon-countdown-btn');

    icon.style.display = 'none';

    clickAudio.play();
    
    countdownBtn.textContent = 'START';
    countdownBtn.style.boxShadow = '0px 8px 0px #ebebeb';
    countdownBtn.style.top = "250px";
}

function handleClock(){

    if (countdownText.classList.contains('pausing')){
        // deal with this first 

        // handle the button animation
        pressCountdownButton();
        // remove the pausing class 
        countdownText.classList.toggle('pausing');

        // update the clock countdown animation
        myCountdownInterval = setInterval(updateClock, 1000);
    } else {

        // add the pausing class
        countdownText.classList.toggle('pausing');


        // save the current time to the screen 
        let currentTimes = updateClock();
        console.log(currentTimes);

        // clear the countdown interval
        clearInterval(myCountdownInterval);

        //alert('Clock is already running');
        releaseCountdownButton();
    }
}


countdownBtn.addEventListener('click', handleClock);

// change tab 
const pomoTabName = 'POMO';
const longbreakTabName = 'LONGBREAK';
const shortbreakTabName = 'SHORTBREAK';

const pomoButton = document.getElementById('pomo-tab-btn');
const shortbreakButton = document.getElementById('shortbreak-tab-btn');
const longbreakButton = document.getElementById('longbreak-tab-btn');

const mainNav = document.querySelector('.main-nav');
const noteHashtag = document.querySelector('#hashtag-note');
const taskTitle = document.querySelector('.tasks__title');

const navButtonList = document.querySelectorAll('.nav-button');

console.log(taskTitle);
// 3 nav button 

let currentTab = pomoTabName;

function handleShortBreakUpdate(e){
    



    if (currentTab === pomoTabName){
        pomoButton.classList.remove('active-tomato');
        askTaskButton.classList.remove('btn-bg-dark-tomato');
        mainSection.classList.remove('main-bg-tomato');
        clockWrapper.classList.remove('clock-bg-tomato');
        countdownBtn.classList.remove('pomo-btn');
        mainNav.classList.remove('pomo-nav');
        noteHashtag.classList.remove('pomo-hashtag');
        taskTitle.classList.remove('tasks__title--pomo');
        
        
        navButtonList.forEach(function(button){
            button.classList.remove('btn-bg-pink');
            button.classList.add('btn-bg-light-green');
        })
    } 
    else if (currentTab === longbreakTabName){
        longbreakButton.classList.remove('active-blue');
        askTaskButton.classList.remove('btn-bg-dark-blue');
        mainSection.classList.remove('main-bg-blue');
        clockWrapper.classList.remove('clock-bg-blue');
        countdownBtn.classList.remove('longbreak-btn');
        mainNav.classList.remove('longbreak-nav');
        noteHashtag.classList.remove('longbreak-hashtag');
        taskTitle.classList.remove('tasks__title--longbreak');

        navButtonList.forEach(function(button){
            button.classList.remove('btn-bg-light-blue');
            button.classList.add('btn-bg-light-green');
        })
    }

    shortbreakButton.classList.add('active-green');
    askTaskButton.classList.add('btn-bg-dark-green');
    mainSection.classList.add('main-bg-green');
    clockWrapper.classList.add('clock-bg-green');
    countdownBtn.classList.add('shortbreak-btn');
    mainNav.classList.add('shortbreak-nav');
    noteHashtag.classList.add('shortbreak-hashtag');
    taskTitle.classList.add('tasks__title--shortbreak');

    //finally update currentTab
    currentTab = shortbreakTabName; 
    
}

shortbreakButton.addEventListener('click', handleShortBreakUpdate);