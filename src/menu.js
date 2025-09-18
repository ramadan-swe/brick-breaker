// menu.js
import {
  audio,
  playMusic,
  nextMusic,
  prevMusic,
  setVolume,
  muteMusic,
  muteAllGameSounds,
  isGameMuted,
  playHitSound,
} from "./Music.js";

// Mute button for canvas

const muteBtn = document.getElementById("CanvasMuteBtn");
function updateMuteIcon() {
  muteBtn.textContent = isGameMuted ? "🔇" : "🔊";
}
if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    muteAllGameSounds();
    updateMuteIcon();
  });
  updateMuteIcon();
}

// function to position the mute button relative to the canvas

function positionMuteBtn() {
  const canvas = document.getElementById("canvas");
  const muteBtn = document.getElementById("CanvasMuteBtn");
  const rect = canvas.getBoundingClientRect();
  muteBtn.style.left = `${rect.left + 15}px`;
  muteBtn.style.top = `${rect.top + 5}px`;
}

//function hides the main menu to start the game
function startGame() {
  const canvas = document.getElementById("canvas");
  const menu = document.getElementById("main-menu");
  const nameInput = document.getElementById("playerName");
  const muteBtn = document.getElementById("CanvasMuteBtn");
  const playerName = nameInput.value.trim();
  if (!playerName) {
    nameInput.style.border = "2px solid red";
    nameInput.placeholder = "Please enter your name!";
    nameInput.focus();
    return;
  }
  nameInput.style.border = ""; // reset border if valid
  canvas.style.display = "block";
  menu.style.display = "none";
  muteBtn.style.display = "block";
  playHitSound();
  positionMuteBtn();
}

function chooseDifficultyLevel() {
  const mainMenu = document.getElementById("main-menu");
  const diffMenu = document.getElementById("difficulty-menu");
  const nameInput = document.getElementById("playerName");
  const playerName = nameInput.value.trim();

  if (!playerName) {
    nameInput.style.border = "2px solid red";
    nameInput.placeholder = "Please enter your name!";
    nameInput.focus();
    return;
  }
  mainMenu.style.display = "none";
  diffMenu.style.display = "flex";
}

function SettingMenu() {
  const mainMenu = document.getElementById("main-menu");
  const setMenu = document.getElementById("setting-menu");
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("difficulty-menu").style.display = "none";
  document.getElementById("setting-menu").style.display = "flex";
}

window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startBtn");
  startButton.addEventListener("click", startGame);

  const difficultyBtn = document.getElementById("difficulty");
  difficultyBtn.addEventListener("click", chooseDifficultyLevel);

  const SettingBtn = document.getElementById("SettingBtn");
  SettingBtn.addEventListener("click", SettingMenu);

  const backButtons = document.querySelectorAll("#Back");
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("setting-menu").style.display = "none";
      document.getElementById("difficulty-menu").style.display = "none";
      document.getElementById("main-menu").style.display = "flex";
    });
  });

  // Music controls
  const volumeSlider = document.getElementById("MusicVolume");
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      setVolume(e.target.value);
    });
  }
  const muteBtn = document.getElementById("MuteMusic");
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      muteMusic();
    });
  }
  const nextBtn = document.getElementById("NextMusic");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextMusic();
    });
  }
  const prevBtn = document.getElementById("PrevMusic");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevMusic();
    });
  }
});

window.addEventListener("resize", positionMuteBtn);

export { startGame, chooseDifficultyLevel, SettingMenu, positionMuteBtn };
