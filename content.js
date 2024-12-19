// content.js
console.log("Content script is running on LinkedIn");
const addButton = () => {
    const button = document.createElement('button');
    button.innerText = 'Connect with All';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#0073b1';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    document.body.appendChild(button);
  
    button.addEventListener('click', async () => {
      const connectButtons = document.querySelectorAll('button[data-control-name="connect"]');
      if (connectButtons.length === 0) {
        alert('No connectable profiles available.');
        return;
      }
  
      for (let i = 0; i < connectButtons.length; i++) {
        connectButtons[i].click();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000)); // Delay between 1-3 seconds
      }
    });
  };
  
  // Use MutationObserver to detect changes in the DOM
  const observer = new MutationObserver((mutations) => {
    addButton();
  });
  
  // Start observing the body for changes
  observer.observe(document.body, { childList: true, subtree: true });
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "connectAll") {
        console.log("Connecting with all visible profiles...");

        // Select all visible "Connect" buttons
        const connectButtons = document.querySelectorAll('button[data-control-name="connect"]');

        // Loop through each button and trigger a click event
        connectButtons.forEach(button => {
            if (button.offsetParent !== null) { // Check if the button is visible
                button.click();
                console.log("Clicked connect button for:", button);
            }
        });

        // Optionally, you can send a response back
        sendResponse({ status: "done" });
    }
});

// content.js
console.log("Content script loaded and ready to receive messages.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "connectAll") {
        console.log("Connecting with all visible profiles...");

        const connectButtons = document.querySelectorAll('button[data-control-name="connect"]');

        connectButtons.forEach(button => {
            if (button.offsetParent !== null) {
                button.click();
                console.log("Clicked connect button for:", button);
            }
        });

        sendResponse({ status: "done" });
    }
});