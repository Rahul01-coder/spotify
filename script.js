
// dynamicaly playbar slider background color handle handle 
// time is update when slider-tumb is move
const slider = document.querySelector('.progress-bar');
const currTime = document.querySelector('.curr-time');
const soundbar = document.querySelector('.sound-bar');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimeAndBackground() {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;

    // Update background color up to thumb
    slider.style.background = `linear-gradient(to right, #1bd760 ${value}%, #ddd ${value}%)`;

    // Update time text
    currTime.textContent = formatTime(slider.value);
}


function updateTimeAndBackground2(){
    const value = (soundbar.value - soundbar.min) / (soundbar.max - soundbar.min) * 100;
    
    // Corrected this line:
    soundbar.style.background = `linear-gradient(to right, #1bd760 ${value}%, #ddd ${value}%)`;
}

soundbar.addEventListener('input', updateTimeAndBackground2);
updateTimeAndBackground2();

slider.addEventListener('input', updateTimeAndBackground);

// Initial update
updateTimeAndBackground();



const soundIcon = document.querySelector('.sound-icon');

let lastVolume = soundbar.value; // stores previous volume before mute
let isMuted = false;

// Update background on slider move
soundbar.addEventListener('input', () => {
    isMuted = soundbar.value == 0; // track mute state based on slider
    if (!isMuted) {
        lastVolume = soundbar.value; // update lastVolume only if not muted
    }
    updateSoundbarBackground();
});

soundIcon.addEventListener('click', () => {
    if (isMuted) {
        soundbar.value = lastVolume || 50; // restore previous volume or default to 50
    } else {
        lastVolume = soundbar.value;
        soundbar.value = 0;
    }
    isMuted = !isMuted;
    updateSoundbarBackground();
});
