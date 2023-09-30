const startTimerButton = document.getElementById('start-timer');
const activeTimersSection = document.querySelector('.active-timers');

startTimerButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    createTimer(hours, minutes, seconds);
});

function createTimer(hours, minutes, seconds) {
    const timer = {
        hours,
        minutes,
        seconds,
        interval: setInterval(() => {
            updateTimerDisplay(timer);
        }, 1000)
    };

    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    activeTimersSection.appendChild(timerElement);

    updateTimerDisplay(timer);

    const stopButton = document.createElement('button');
    stopButton.innerText = 'Stop Timer';
    stopButton.addEventListener('click', () => {
        stopTimer(timer, timerElement);
    });

    timerElement.appendChild(stopButton);
}

function updateTimerDisplay(timer) {
    const timerElement = document.querySelector('.timer');
    if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(timer.interval);
        timerElement.textContent = 'Timer Ended';
    } else {
        
        timerElement.textContent = `${timer.hours}h ${timer.minutes}m ${timer.seconds}s`;
        
        if (timer.seconds > 0) {
            timer.seconds--;
        } else if (timer.minutes > 0) {
            timer.minutes--;
            timer.seconds = 59;
        } else {
            timer.hours--;
            timer.minutes = 59;
            timer.seconds = 59;
        }
    }
}

function stopTimer(timer, timerElement) {
    clearInterval(timer.interval);
    timerElement.remove();
}
