console.log("background script loaded")
let savedOptions = {
    "host": localStorage.getItem("host") || '',
    "port": localStorage.getItem("port") || '',
    "user": localStorage.getItem("user") || '',
    "pass": localStorage.getItem("pass") || '',
}

function fetchSettings(request, sender, sendResponse) {
    console.log(`content script sent a message: ${request.name}`);
    switch (request.name) {
        case "getPreferences":
            sendResponse(savedOptions);
            break;
    }
}

browser.runtime.onMessage.addListener(fetchSettings);