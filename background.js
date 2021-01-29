chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color: '#3aa757'}, () => {
      console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                // pageUrl: {hostEquals: 'www.bankofamerica.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        Promise.resolve("").then(result => {
            chrome.tabs.captureVisibleTab(
                null, {}, (dataUrl) => {
                    sendResponse({imgSrc:dataUrl})
                }
            );
        });

        return true;
    }
);