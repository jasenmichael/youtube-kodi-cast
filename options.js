console.log("options loading..")
restoreOptions()
// console.log("options ", restoreOptions())

// document.getElementById("reset").addEventListener("click", restoreOptions);
document.getElementById("save").addEventListener("click", function (e) {    
    saveOptions(e)
});
document.getElementById("reset").addEventListener("click", function () {
    restoreOptions()
});

function saveOptions(e) {
    let host = document.getElementById("host").value.replace("http://", "")
    let port = document.getElementById("port").value
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value

    localStorage.setItem("host", host)
    localStorage.setItem("port", port)
    localStorage.setItem("user", user)
    localStorage.setItem("pass", pass)

    e.target.innerHTML = "Saved"
    e.target.style.backgroundColor = "#6de075"

    window.setTimeout(function () {
        e.target.innerHTML = "Save"
        e.target.style.backgroundColor = "#eee"
    }, 2000)

    console.log("saved")
}

function restoreOptions() {
    let options = {}

    document.getElementById("host").value = localStorage.getItem("host") || 'localhost'
    document.getElementById("port").value = localStorage.getItem("port") || '8080'
    document.getElementById("user").value = localStorage.getItem("user") || 'kodi'
    document.getElementById("pass").value = localStorage.getItem("pass") || 'kodi'
    options.username = localStorage.getItem("user") || '',
    options.password = localStorage.getItem("pass") || '',
    options.ip = localStorage.getItem("host") || '',
    options.port = localStorage.getItem("port") || ''
    console.log("options loaded from storage")
    console.log("options ", options)
    return options
}