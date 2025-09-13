import Game from "./Game.js";
import { startGame } from "./menu.js";

window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startBtn");
  startButton.addEventListener("click", startGame);
});

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  const game = new Game(canvas);

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

console.log(menu, start);
