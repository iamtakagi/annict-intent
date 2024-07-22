window.addEventListener("DOMContentLoaded", async () => {
    const accessTokenField = document.getElementById("accessToken")
    if(accessTokenField !== null && accessTokenField instanceof HTMLInputElement) {
        const accessToken = (await browser.storage.sync.get("accessToken"))["accessToken"]
        if(accessToken && typeof accessToken === "string") {
            accessTokenField.value = accessToken
        }
        accessTokenField.addEventListener("change", async (event) => {
            if (!(event.currentTarget instanceof HTMLInputElement)) {
                return;
            }
            await browser.storage.sync.set({"accessToken": event.currentTarget.value});
        })
        accessTokenField.addEventListener('paste', async (event) => {
            event.preventDefault();
            const clipboardData = event.clipboardData
            if (!clipboardData) return;
            const pastedData = clipboardData.getData('text');
            accessTokenField.value = pastedData.trim();
            if (!(event.currentTarget instanceof HTMLInputElement)) {
                return;
            }
            await browser.storage.sync.set({"accessToken": event.currentTarget.value});
        })
    }
})