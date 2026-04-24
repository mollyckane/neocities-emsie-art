const audio = document.getElementById('audio');
audio.volume = 0.2;
const playPauseBtn = document.getElementById('playPause');
const progressBar = document.getElementById('progressBar');
const progressWrap = document.getElementById('progressWrap');
// const currentTimeEl = document.getElementById('currentTime');
// const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

// optional: multiple tracks
const playlist = [
    { src: 'https://files.catbox.moe/74rgxr.mp3', title: 'new joys', artist: '- pamela yuen.mp3' },
    { src: 'https://files.catbox.moe/4ni0u0.mp3', title: 'lotus quiet', artist: '- lopkerjo.mp3' },
    { src: 'https://files.catbox.moe/8czsrn.mp3', title: 'electric guitar with eboe', artist: '- mark lingard.mp3' }
];
let currentTrack = 0;

function loadTrack(index) {
    audio.src = playlist[index].src;
    document.querySelector('.player-title').textContent = playlist[index].title;
    document.querySelector('.player-artist').innerHTML = playlist[index].artist;
    audio.load();
}

// play / pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸'; // pause icon
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
});

// update progress bar as track plays
audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${pct}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// set duration once loaded
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// click on bar to seek
progressWrap.addEventListener('click', (e) => {
    const rect = progressWrap.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
});

// volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// next / prev
document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
});

// auto advance
audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
});

// function formatTime(secs) {
//     if (isNaN(secs)) return '0:00';
//     const m = Math.floor(secs / 60);
//     const s = Math.floor(secs % 60).toString().padStart(2, '0');
//     return `${m}:${s}`;
// }

loadTrack(0); // init