// popup.js
document.getElementById('connectButton').addEventListener('click', () => {
    console.log('Connect with All button clicked');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "connectAll" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    console.log("Response from content script:", response);
                }
            });
        }
    });
});