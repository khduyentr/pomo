const countdownText = document.getElementById("countdown-text");
const countdownBtn = document.getElementById("countdown-btn");


const mainSection = document.querySelector(".main-section");
const clockWrapper = document.querySelector(".clock-wrapper");

const addTaskButton = document.getElementById("ask-task-btn");
const addTaskForm = document.querySelector('.task__form');
const saveTaskBtn = document.getElementById("save-form-btn");
const cancelTaskBtn = document.getElementById("cancel-form-btn");

const reportNavButton = document.getElementById('report-btn');
const settingsNavButton = document.getElementById('settings-btn');
const loginNavButton = document.getElementById('login-btn');

let allTaskList = [];


let myCountdownInterval;

let startingMinutes = 25;
let shortbreakTime = 5;
let longbreakTime = 15;

let totalSeconds = startingMinutes * 60;

const clickAudio = new Audio();
clickAudio.src = "../audio/click.mp3";

class TaskItem {

    #title;
    #estSession;
    #note = '';
    #doneSession = 0;
    #isDone = false;

    static id = 0;

    constructor(title, estSession, note = '', isDone = false) {
        this.#title = title;
        this.#estSession = estSession;
        this.#note = note;
        this.#isDone = isDone;
    }

    get isDone() {
        return this.#isDone;
    }

    set done(msg) {
        this.#isDone = msg;
    }

    get doneSession() {
        return this.#doneSession;
    }

    get estSession() {
        return this.#estSession;
    }

    set estSession(msg) {
        this.#estSession = msg;
    }

    get title() {
        return this.#title;
    }

    set title(msg) {
        this.#title = msg;
    }

    get note() {
        return this.#note;
    }

    set note(newNote) {
        this.#note = newNote;
    }

}

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

        runClock();
    } 
    // the clock is running 
    else {
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
const noteMessage = document.querySelector(".note-message");
const taskTitle = document.querySelector(".tasks__title");

// 3 nav button
const navButtonList = document.querySelectorAll(".nav-button");

let currentTab = pomoTabName;


// remove theme 
function removePomoTheme() {
    pomoButton.classList.remove("active-tomato");
    addTaskButton.classList.remove("btn-bg-dark-tomato");
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
    addTaskButton.classList.remove("btn-bg-dark-blue");
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
    addTaskButton.classList.remove("btn-bg-dark-green");
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
    addTaskButton.classList.add("btn-bg-dark-green");
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
    addTaskButton.classList.add("btn-bg-dark-blue");
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
    addTaskButton.classList.add("btn-bg-dark-tomato");
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
    resetClock(shortbreakTime);
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
    resetClock(longbreakTime);
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
    resetClock(startingMinutes); 
}

shortbreakButton.addEventListener("click", handleShortBreakUpdate);
longbreakButton.addEventListener("click", handleLongBreakUpdate);
pomoButton.addEventListener("click", handlePomoUpdate);


function openForm() {
    addTaskForm.classList.add('form-active');
    addTaskForm.style.display = 'block';
    addTaskButton.style.display = 'none';
}

function closeForm() {
    addTaskForm.classList.remove('form-active');
    addTaskForm.style.display = 'none';
    addTaskButton.style.display = 'block';
}

// create an task item li 
function createTaskItem(taskObj) {
    if (taskObj.note === '') {
        return `                    
            <span class="task__item__left">
                <i class="fa-solid fa-circle-check"></i>
                <p class="task__item__title">${taskObj.title}</p>
            </span>

            <span class="task__item__right">
                <p class="task__item__section"><span class="task__item__section--done">${taskObj.doneSession}</span> / <span class="task__item__section--est">${taskObj.estSession}</span></p>
                <i class="fa-solid fa-ellipsis-vertical fa-1.5x"></i>
            </span>
        `
    } else {
        return `
            <div>
                <span class="task__item__left">
                    <i class="fa-solid fa-circle-check"></i>
                    <p class="task__item__title">${taskObj.title}</p>
                </span>

                <span class="task__item__right">
                    <p class="task__item__section"><span class="task__item__section--done">${taskObj.doneSession}</span> / <span class="task__item__section--est">${taskObj.estSession}</span></p>
                    <i class="fa-solid fa-ellipsis-vertical fa-1.5x"></i>
                </span>
            </div>

            <div class="task__item__note">
                <p>${taskObj.note}</p>
            </div>
        `;
    }
}



function handleTaskOperation(e) {
    const sessionInput = document.querySelector('#session-input');

    const taskList = document.querySelector('.task__list');


    if (e.target.closest('#cancel-form-btn')) {
        closeForm();
    } else if (e.target.closest('#save-form-btn')) {
        // code right here 

        // create and add task item to task list 
        const title = document.querySelector('#title-input');
        const estSession = document.querySelector('#session-input');
        const note = document.querySelector('#note textarea');

        const taskItem = new TaskItem(
            title.value, 
            estSession.value, 
            note.value.length === 0 ? '' : note.value);

        allTaskList.push(taskItem);

        title.value = '';
        estSession.value = 1;
        note.value = '';

        const li = document.createElement('li');

        li.innerHTML = createTaskItem(taskItem);
        li.classList.add('task__item');

        if (TaskItem.id === 0) {
            li.classList.add('active');
            noteMessage.innerText = taskItem.title;
        }
            
    
        li.dataset.index = TaskItem.id;
        TaskItem.id += 1;

        taskList.appendChild(li);

        closeForm();

    } else if (e.target.closest('#add-note-btn')) {

        if (noteInput.style.display === 'none')
            noteInput.style.display = 'block';
        else 
            noteInput.style.display = 'none';
    } else if (e.target.closest('#add-pj-btn')) {
        console.log(e.target);
    } else if (e.target.closest('#increase-btn')) {
        sessionInput.value = parseInt(sessionInput.value) + 1;
    } else if (e.target.closest('#decrease-btn')) {
        if (parseInt(sessionInput.value) > 1) {
            sessionInput.value = parseInt(sessionInput.value) - 1;
        }
    }
}

addTaskButton.addEventListener('click', openForm);
addTaskForm.addEventListener('click', handleTaskOperation)


// setting time form 

function turnOverlayOn() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
}

function turnOverlayOff() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
}

// continue to be improved
function handleTimerForm(e) {
    if (e.target.closest('.fa-xmark')) {

        // get time session 
        const timerSessions = Array.from(document.querySelectorAll('.timer-form__session__item input'));

        startingMinutes = parseInt(timerSessions[0].value);
        shortbreakTime = parseInt(timerSessions[1].value);
        longbreakTime = parseInt(timerSessions[2].value);

        switch (currentTab) {
            case pomoTabName:
                pauseClock();
                resetClock(startingMinutes); 
                break;
            case longbreakTabName:
                pauseClock();
                resetClock(longbreakTime); 
                break;
            case shortbreakTabName:
                pauseClock();
                resetClock(shortbreakTabName); 
                break;
        }

        timerForm.style.display = 'none';
        turnOverlayOff();       
    }
}

const timerForm = document.getElementById('setting-timer-form');

settingsNavButton.addEventListener('click', function() {
    turnOverlayOn();
    timerForm.style.display = 'block';
})

timerForm.addEventListener('click', handleTimerForm)


// CRUD task item 

// delete and update task item 
const taskList = document.querySelector('.task__list');
const taskItems = taskList.querySelectorAll('.task__item');

function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }

        element = element.parentElement;
    }
}

function openFormInTask(li) {
    addTaskForm.classList.add('form-active');
    addTaskForm.style.display = 'block';
    //addTaskButton.style.display = 'none';

    li.style.display = 'none';
}


taskList.addEventListener('click', function(e) {
    
    if (e.target.closest('.fa-circle-check')) {
        const checkIcon = e.target; 
        const li = getParent(checkIcon, '.task__item');
        const title = li.querySelector('.task__item__title');

        if (checkIcon.classList.contains('done')) {
            checkIcon.classList.remove('done');
            title.classList.remove('done');            
        } else {
            checkIcon.classList.add('done');
            title.classList.add('done');
        }
    } else if (e.target.closest('.fa-ellipsis-vertical')) {
        const li = getParent(e.target, '.task__item');

        openFormInTask(li);
    } else {
        const li = e.target.closest('.task__item');

        if (li.classList.contains('active')) 
            return;

        const title = li.querySelector('.task__item__title');
        const activeTask = taskList.querySelector('.task__item.active');
        activeTask.classList.remove('active');
        li.classList.add('active');
        noteMessage.innerText = title;
    }
})


// login UI -> fetch API
// est time done UI