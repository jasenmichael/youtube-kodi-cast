console.log("background script loaded")



browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(`content script sent a message: ${request.name}`);
        switch (request.name) {
            case "getSavedOptions":
                let savedOptions = {
                    "host": localStorage.getItem("host") || null,
                    "port": localStorage.getItem("port") || null,
                    "user": localStorage.getItem("user") || null,
                    "pass": localStorage.getItem("pass") || null,
                }
                sendResponse(savedOptions);
                break;
        }
    })