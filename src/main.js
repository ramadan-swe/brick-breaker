import Game from "./Game.js";
import { startGame, chooseDifficultyLevel, SettingMenu } from "./menu.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = canvas.width * 0.8;
  const game = new Game(canvas);

  // Test: drop a powerup every 3 seconds
  setInterval(() => {
    if (game.started) game.spawnPowerup();
  }, 3000);
  
  window.addEventListener("keydown", (e) =>{
    if(e.key === "Space") game.startPlaying();
  });
  
  ["Easy", "Medium", "Hard"].forEach((id, i) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      game.difficulty = i + 1; // 1,2,3 if you need it later
      game.initializeBricks();
      document.getElementById("difficulty-menu").style.display = "none";
      document.getElementById("canvas").style.display = "block";
      game.startPlaying();
    });
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    window.requestAnimationFrame(animate);
  }
  animate();
});
