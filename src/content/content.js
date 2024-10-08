chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message) {
        alert(request.message);
    }
});

