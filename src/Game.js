import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Powerup from "./powerup.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.powerups = [];
    this.keys = [];
    this.started = true;
    this.difficulty = 1;
    this.score = 0;
    this.lives = 3;
    this.extraBalls = [];

    window.addEventListener("keydown", (e) => {
      if (!this.started) return;
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
    });
    window.addEventListener("keyup", (e) => {
      if (!this.started) return;
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }
  spawnPowerup() {
    // Randomly choose a type
    const types = ["expand", "shrink", "extraLife", "multiBall"];
    const type = types[Math.floor(Math.random() * types.length)];
    const powerup = new Powerup(this);
    powerup.type = type;
    this.powerups.push(powerup);
  }
  render(context) {
    // Draw score and lives
    context.fillStyle = "white";
    context.font = "20px Pixelify";
    context.fillText("Score: " + this.score, 20, 30);
    context.fillText("Lives: " + this.lives, this.width - 100, 30);

    // Draw and update paddle
    this.paddle.draw(context);
    this.paddle.update();
    this.ball.draw(context);
    this.ball.update();

    this.extraBalls = this.extraBalls.filter(
      (ball) => ball.y - ball.radius < this.height
    );
    this.extraBalls.forEach((ball) => {
      ball.draw(context);
      ball.update();
    });

    // Draw and update powerups
    this.powerups = this.powerups.filter((p) => p.active);
    this.powerups.forEach((p) => {
      p.update();
      p.draw(context);
    });
  }
}
