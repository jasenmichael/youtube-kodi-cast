// defaultOptions also hardcoded in options.js line 38-41
let defaultOptions = {
    host: "localhost",
    port: 8080,
    user: "kodi",
    pass: "kodi"
}

// import axios
let imported = document.createElement('script');
imported.src = chrome.extension.getURL('axios.min.js')
document.head.appendChild(imported)

// create share button
createShareButton()


// functions

// create share button
function createShareButton() {
    let youtubeKodiCast = document.createElement("Button")
    youtubeKodiCast.setAttribute("id", "kodicast")
    let kodi = chrome.extension.getURL("images/kodi-logo.png")
    youtubeKodiCast.innerHTML = `<img src="${kodi}"/>`
    youtubeKodiCast.style = "top:0;right:0;position:fixed;z-index:9999"
    document.body.appendChild(youtubeKodiCast)
    // listen for click
    youtubeKodiCast.onclick = function () {
        getSavedOptions().then(function (savedOptions) {
            let options
            if (savedOptions.host != null && savedOptions.port != null) {
                options = savedOptions
            } else {
                options = defaultOptions
            }
            console.log("clicked")
            console.log("link " + window.location.href.slice("0", "43"))
            castToKodi(getYoutubeVideoID(), options)
        })
    }
}

// returns current url YoutubeID
function getYoutubeVideoID() {
    // console.log("link " + window.location.href.slice("0", "43"))
    return window.location.href.replace("https://www.youtube.com/watch?v=", "").slice("0", "11")
}

// returns the value of sendResponse(savedOptions)
function getSavedOptions() {
    return chrome.runtime.sendMessage({
        name: "getSavedOptions"
    })
}

// cast to Kodi with options and videoID
function castToKodi(videoID, options) {
    console.log("attempting cast to Kodi")
    console.log("videoID: ", videoID)
    console.log("options: ", options)
    let creds = options.user ? `${options.user}:${options.pass}@` : ""
    let host = options.host
    let port = options.port ? ":" + options.port : ""


    let url = `http://${creds}${host}${port}/jsonrpc`
    console.log("url", url)
    return axios({
            method: 'post',
            url,
            data: {
                "jsonrpc": "2.0",
                "id": "1",
                "method": "Player.Open",
                "params": {
                    "item": {
                        "file": "plugin://plugin.video.youtube/play/?video_id=" + videoID
                    }
                }
            }
        })
        .then((response) => {
            // console.log(response.statusText)
            return {
                status: 200,
                message: response.statusText,
                video: videoID
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                error
            }
        })
}