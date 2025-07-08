function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes(); 
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 24h to 12h format

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    updateAndAnimate('hours', hours);
    updateAndAnimate('minutes', minutes);
    updateAndAnimate('seconds', seconds);
    updateAndAnimate('ampm', ampm);
}

function updateAndAnimate(id, newValue) {
    const element = document.getElementById(id);
    if (element.textContent !== newValue) {
        element.textContent = newValue;
        element.classList.add('change');
        setTimeout(() => {
            element.classList.remove('change');
        }, 300);
    }
}

setInterval(updateClock, 1000);
updateClock();
