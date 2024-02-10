let in_session;

const generateHTML = (pageName) => {
  if (in_session == true) {
    if (pageName == "YOUTUBE") {
      return `
  <div class='c'>
      <div class='_1'>Are you watching an educational video?</div>
      <button>yes i promise</button>
  </div>
   `;
    } else if (pageName == "INSTA") {
      return `
  <div class='c'>
      <div class='_1'>wait until the timer goes off</div>
  </div>
   `;
    }
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'shortAlert') {
    console.log("fdfa")
  } else if (request.action === 'longAlert') {
    in_session = false
  } else if (request.action === 'startAlert') {
    in_session = true
  }
});

if (window.location.hostname == "www.instagram.com") {
  document.body.innerHTML = generateHTML("INSTA")

} else if (window.location.hostname == "www.youtube.com") {
  document.body.innerHTML = generateHTML("YOUTUBE")
};