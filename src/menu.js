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
      document.getElementById("leader-board").style.display = "none";
      document.getElementById("main-menu").style.display = "flex";
    });
  });

  const LeaderBoardBtn = document.getElementById("LeaderBoardBtn");
  LeaderBoardBtn.addEventListener("click", () => {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("leader-board").style.display = "flex";
    const scoreList = document.getElementById("score-list");

    scoreList.innerHTML = ""; // clear previous list

    // Get scores from localStorage
    const scores = JSON.parse(localStorage.getItem("playerTopScores")) || {};

    // Convert object to array: [ [name, score], ... ]
    const scoreArray = Object.entries(scores);

    // Sort by score descending
    scoreArray.sort((a, b) => b[1] - a[1]);

    // Take top 5
    const topFive = scoreArray.slice(0, 5);

    // Render into <li> elements
    topFive.forEach(([name, score]) => {
      scoreList.innerHTML += `
        <li style="display: flex; justify-content: space-between; align-items: center; margin: 5px 0;">
          <div style="margin-right: 40px;">${name}</div>
          <div>Score: ${score}</div>
        </li>
      `;
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
