const SERVICE_WORKER_PATH = location.hostname === 'michael-levitski.github.io' ? '/udemy/sw.js' : '/sw.js'
const button = document.createElement('a')
let deferredPrompt
let prompted = false

const promptUser = async e => {
    e.preventDefault()
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
        window.location = 'https://www.udemy.com/'
    } 
}

const convertPromptButton = () => {
    if (prompted) return
    button.textContent = 'Install App'
    button.addEventListener('click', promptUser)
    prompted = true
}

const registerServiceWorker = async () => {
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH)
}

addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    convertPromptButton()
})

if ('serviceWorker' in navigator) {
    button.textContent = 'Open App'
    button.href = './udemy.html'
    document.body.appendChild(button)

    registerServiceWorker()
}
else {
    alert('Sorry your browser is not compatible with this application.')
    window.location = 'https://www.udemy.com/'
}
