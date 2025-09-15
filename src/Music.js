const tracks = [
  { name: "Track 1", src: "../assets/sounds/1.mp3" },
  { name: "Track 1", src: "../assets/sounds/2.mp3" },
  { name: "Track 1", src: "../assets/sounds/3.mp3" },
  { name: "Track 1", src: "../assets/sounds/4.mp3" },
  { name: "Track 1", src: "../assets/sounds/5.mp3" },
  { name: "Track 1", src: "../assets/sounds/6.mp3" },
  { name: "Track 1", src: "../assets/sounds/7.mp3" },
  { name: "Track 1", src: "../assets/sounds/8.mp3" },
];

let currentTrack = 0;
let audio = new Audio(tracks[currentTrack].src);
audio.loop = true;
audio.volume = 0.5;
audio.autoplay = true;

function playMusic(index) {
  currentTrack = index;
  audio.src = tracks[currentTrack].src;
  audio.play();
  updateMusicName();
}

function nextMusic() {
  playMusic((currentTrack + 1) % tracks.length);
}

function prevMusic() {
  playMusic((currentTrack - 1 + tracks.length) % tracks.length);
}

function setVolume(val) {
  audio.volume = val;
}

function muteMusic() {
  audio.muted = !audio.muted;
}

// Export functions for use in menu.js
export { audio, playMusic, nextMusic, prevMusic, setVolume, muteMusic };
