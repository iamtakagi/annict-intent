const manifest = browser.runtime.getManifest()

window.addEventListener("DOMContentLoaded", () => {
    const p = document.getElementById("version")
    if(p !== null){
        p.innerText = `v${manifest.version}`
    }
})