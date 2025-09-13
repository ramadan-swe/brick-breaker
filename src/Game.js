import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.keys = [];
    this.started = false;
    this.difficulty = 1;
    this.score = 0;
    this.lives = 3;
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
  }
}
