console.log("loading options")

chrome.runtime.sendMessage({
        name: "getPreferences"
    },
    function (response) {
        let options = response;
        console.log("options ", options)

        let url = `http://${options.user}:${options.pass}@${options.host}${(options.port ? ":" + options.port : "" )}/jsonrpc`
        console.log("url ", url)
        console.log("addon loaded")
        let imported = document.createElement('script');
        imported.src = chrome.extension.getURL('axios.min.js')
        document.head.appendChild(imported);

        let youtubeKodiCast = document.createElement("Button")
        youtubeKodiCast.setAttribute("id", "kodicast")
        let kodi = chrome.extension.getURL("images/kodi-logo.png")
        youtubeKodiCast.innerHTML = `<img src="${kodi}"/>`
        youtubeKodiCast.style = "top:0;right:0;position:fixed;z-index:9999;visibility:hidden"
        document.body.appendChild(youtubeKodiCast)

        youtubeKodiCast.onclick = function () {
            const youtubeid = document.getElementById("share-url").value.replace("https://youtu.be/", "")
            console.log("play youtubeid  ", youtubeid)

            function playYoutube(youtubeid) {
                return axios({
                        method: 'post',
                        url,
                        data: {
                            "jsonrpc": "2.0",
                            "id": "1",
                            "method": "Player.Open",
                            "params": {
                                "item": {
                                    "file": "plugin://plugin.video.youtube/play/?video_id=" + youtubeid
                                }
                            }
                        }
                    })
                    .then((response) => {
                        // console.log(response.statusText)
                        return {
                            status: 200,
                            message: response.statusText,
                            video: youtubeid
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        return {
                            error
                        }
                    })
            }
            playYoutube(youtubeid).then(res => {
                console.log("message ", res.message)
            })
        }

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('ytd-button-renderer')) {
                youtubeKodiCast.style = "top:0;right:0;position:fixed;z-index: 9999"
            } else {
                youtubeKodiCast.style = "top:0;right:0;position:fixed;z-index: 9999;visibility:hidden"
            }
        }, false)

    })