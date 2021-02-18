chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                // pageUrl: {hostEquals: 'www.bankofamerica.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

const host = 'http://127.0.0.1:3000';

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log("background received a message,", request.msg);
        const msg = JSON.stringify({
            msg: request.msg
          });

        const req = new XMLHttpRequest();
        const baseUrl = host;

        req.open("POST", baseUrl, true);
        req.setRequestHeader("Content-type", "application/json;charset=UTF-8");

        req.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Got response 200!");
            } else {

            }
        }

        req.send(msg);
        sendResponse();
    }
);