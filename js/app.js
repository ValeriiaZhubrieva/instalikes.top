"use strict";
function startTimer(duration, display) {
    let days,
        hours,
        minutes,
        seconds,
        timer = duration;
    setInterval(function () {
        days = Math.floor(timer / (24 * 60 * 60));
        hours = Math.floor((timer % (24 * 60 * 60)) / (60 * 60));
        minutes = Math.floor((timer % (60 * 60)) / 60);
        seconds = Math.floor(timer % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        hours = hours < 10 ? "0" + hours : hours;
        days = days < 10 ? "0" + days : days;
        display.days.textContent = days;
        display.hours.textContent = hours;
        display.minutes.textContent = minutes;
        display.seconds.textContent = seconds;
        if (--timer < 0) timer = duration;
    }, 1e3);
}
window.onload = function () {
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    const display = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };
    startTimer(sevenDaysInSeconds, display);
};
function getSecondsUntilNextMonday() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilNextMonday = (8 - dayOfWeek) % 7;
    const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilNextMonday, 0, 0, 0);
    return Math.floor((nextMonday - now) / 1e3);
}
window.onload = function () {
    const display = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };
    let remainingSeconds = localStorage.getItem("remainingSeconds");
    if (!remainingSeconds) {
        remainingSeconds = getSecondsUntilNextMonday();
        localStorage.setItem("remainingSeconds", remainingSeconds);
    }
    startTimer(remainingSeconds, display);
    setInterval(() => {
        remainingSeconds--;
        localStorage.setItem("remainingSeconds", remainingSeconds);
    }, 1e3);
};
