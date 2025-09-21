import Ball from "./Ball.js";

export default class Powerup {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.type = "expand"; // e.g., 'expand', 'shrink', 'extraLife'
    this.width = 20;
    this.height = 20;
    this.speed = 2;
    this.active = true;
  }
  draw(context) {
    context.fillStyle = this.getColor();
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += this.speed;
    if (this.y > this.game.height) {
      this.active = false;
    }
    const paddle = this.game.paddle;
    if (
      this.y + this.height > paddle.y &&
      this.x < paddle.x + paddle.width &&
      this.x + this.width > paddle.x &&
      this.y < paddle.y + paddle.height
    ) {
      this.applyEffect();
      this.active = false;
    }
  }
  getColor() {
    switch (this.type) {
      case "expand":
        return "green";
      case "shrink":
        return "red";
      case "extraLife":
        return "blue";
      case "multiBall":
        return "purple";
      default:
        return "white";
    }
  }
  applyEffect() {
    switch (this.type) {
      case "expand":
        this.game.paddle.width += 50;
        if (this.game.paddle.width > this.game.width) {
          this.game.paddle.width = this.game.width;
        }
        break;
      case "shrink":
        this.game.paddle.width -= 50;
        if (this.game.paddle.width < 50) {
          this.game.paddle.width = 50;
        }
        break;
      case "extraLife":
        this.game.lives += 1;
        break;
      case "multiBall":
        const activeBalls = [this.game.ball, ...(this.game.extraBalls || [])];
        const candidates = activeBalls.filter(b => b && b.active && b.y - b.radius < this.game.height);
        const srcBall = candidates.length ? candidates[Math.floor(Math.random()* candidates.length)] : this.game.ball;

        const newBall = new Ball(this.game);
        newBall.x = srcBall.x;
        newBall.y = srcBall.y;
        newBall.vx = -srcBall.vx; // opposite direction
        newBall.vy = srcBall.vy;
        this.game.extraBalls = this.game.extraBalls || [];
        this.game.extraBalls.push(newBall);
        break;
    }
  }
}
