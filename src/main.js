import Game from "./Game.js";
import { startGame } from "./menu.js";

window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startBtn");
  startButton.addEventListener("click", startGame);
});

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

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") game.started = true;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    window.requestAnimationFrame(animate);
  }
  animate();
});
