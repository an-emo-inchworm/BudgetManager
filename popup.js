const started = false;

$(function () {
    const targetDate = new Date();
    // let iteration;
    // let interval;

    $('#start').click(function () {
        if (started == false) {
            chrome.runtime.sendMessage({ action: 'startTimer', targetDate: targetDate.setSeconds(targetDate.getSeconds() + 5), target: 0, iteration: 0 });
        }
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'updateTime') {
            const remainingTime = request.remainingTime;
            $('#total').text(formatTime(remainingTime));
        } else if (request.action === 'shortAlert') {
            alert("Time for a short break!")
        } else if (request.action === 'longAlert') {
            alert("Time for a long break!")
        } else if (request.action === 'startAlert') {
            alert("Time for more work!")
        } else if ((request.action === 'shortStart')) {
            chrome.runtime.sendMessage({ action: 'startTimer', targetDate: targetDate.setSeconds(targetDate.getSeconds() + 15), target: 1, iteration: request.iteration + 1 });
        } else if ((request.action === 'longStart')) {
            chrome.runtime.sendMessage({ action: 'startTimer', targetDate: targetDate.setSeconds(targetDate.getSeconds() + 15), target: 2, iteration: -1 });
        } else if ((request.action === 'sessionStart1')) {
            chrome.runtime.sendMessage({ action: 'startTimer', targetDate: targetDate.setSeconds(targetDate.getSeconds() + 15), target: 0, iteration: request.iteration });
        }
        else if ((request.action === 'sessionStart2')) {
            chrome.runtime.sendMessage({ action: 'startTimer', targetDate: targetDate.setSeconds(targetDate.getSeconds() + 15), target: 0, iteration: 0 });
        }
    });

    function formatTime(time) {
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        return `${mins}m${secs}s`;
    }


    // function pauseTimer(interval) {
    //     alert("fjjdksfhjdhadl")
    //     // clearInterval(interval);
    // }
});