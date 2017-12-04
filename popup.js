function AlarmClock() {

    this.enabled = false;
    this.container = void 0;
    this.timerValue =  0.2;
    this.timerInput = void 0;


    this.setTimerValue = function (value) {
        this.timerValue = value / 60;
    };

    this.getTimerValueInSec = function () {
        return this.timerValue ? Math.round(this.timerValue * 60) : 0;
    };

    this.onHandler = (function (e) {
        this.container.classList.add('enabled');
        this.setTimerValue(this.timerInput.value);
        chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: this.timerValue});
        //window.close();
    }).bind(this);

    this.offHandler = (function (e) {
        this.container.classList.remove('enabled');
        chrome.alarms.clear("myAlarm");
        //window.close();
    }).bind(this);

    this.setup = function () {
        const onButton = document.querySelector('#alarmOn');
        const offButton = document.querySelector('#alarmOff');

        this.container = document.querySelector('#container');
        this.timerInput = document.querySelector('#timer');
        this.timerInput.value = this.getTimerValueInSec(this.timerValue);

        onButton.addEventListener('click', this.onHandler);
        offButton.addEventListener('click', this.offHandler);
    };

    /*return {
        setTimerValue: this.setTimerValue,

        getTimerValueInSec: this.getTimerValueInSec,

        onHandler: this.onHandler,

        offHandler: this.offHandler,

        setup: this.setup
    }*/
}

document.addEventListener('DOMContentLoaded', function () {
    const alarmClock = new AlarmClock();

    setTimeout(function() {
        alarmClock.setup();
    }, 8000);
});