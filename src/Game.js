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
    this.started = false;
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
    if (!this.started) {
      context.fillStyle = "rgba(0,0,0,0.5)";
      context.fillRect(0, 0, this.width, this.height);
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        "Press Enter to Start",
        this.width * 0.5,
        this.height * 0.5
      );
      return;
    }
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
