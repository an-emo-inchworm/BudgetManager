let startedBackground = false;
let interval;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'startTimer') {
    if (startedBackground === false) {
      startTimer(request.targetDate, request.target, request.iteration);
    }
  }
});

function startTimer(time, target, iteration) {
  interval = setInterval(function () {
    const currdate = new Date().getTime();
    const remaining = time - currdate;
    chrome.runtime.sendMessage({ action: 'updateTime', remainingTime: remaining });

    started = true
    if (remaining <= 0 && target == 0) {
      if (iteration == 0 || iteration == 1) {
        startedBackground === false;
        chrome.runtime.sendMessage({ action: 'shortAlert', remainingTime: remaining });
        pauseTimerBackground();
        chrome.runtime.sendMessage({ action: 'shortStart', iteration: iteration });
        // startTimer(request.targetDate.setSeconds(request.targetDate.getSeconds() + 10), 1, iteration + 1);
      } else {
        startedBackground === false;
        chrome.runtime.sendMessage({ action: 'longAlert', remainingTime: remaining });
        pauseTimerBackground();
        chrome.runtime.sendMessage({ action: 'longStart' });
        // startTimer(request.targetDate.setSeconds(request.targetDate.getSeconds() + 10), 0, 0);
      }
    } else if (remaining <= 0 && target == 1) {
      startedBackground === false;
      chrome.runtime.sendMessage({ action: 'startAlert', remainingTime: remaining });
      pauseTimerBackground();
      chrome.runtime.sendMessage({ action: 'sessionStart1', iteration: iteration });
      // startTimer(request.targetDate.setSeconds(request.targetDate.getSeconds() + 10), 0, iteration);
    } else if (remaining <= 0) {
      startedBackground === false;
      chrome.runtime.sendMessage({ action: 'startAlert', remainingTime: remaining });
      pauseTimerBackground();
      chrome.runtime.sendMessage({ action: 'sessionStart2' });
      // startTimer(request.targetDate.setSeconds(request.targetDate.getSeconds() + 10), 0, 0);
    }
  }, 1000);
}

function pauseTimerBackground() {
  clearInterval(interval);
  // chrome.runtime.sendMessage({ action: 'change', i: interval });
}

// // Example: Listen for a message from content script and send a response
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("Message received in background script:", request);

//   // Perform some logic and send a response back to the content script
//   sendResponse({ message: "Response from background script" });
// });