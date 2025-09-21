import Ball from "./Ball.js";

export default class Powerup {
  constructor(game, x, y, type) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.type = type; // e.g., 'expand', 'shrink', 'extraLife'
    this.width = 60;
    this.height = 25;
    this.speed = 3;
    this.active = true;

    // Set image based on type
    this.image = new Image();
    switch (this.type) {
      case "expand":
        this.image.src = "./assets/expand.png";
        break;
      case "shrink":
        this.image.src = "./assets/shrink.png";
        break;
      case "extraLife":
        this.image.src = "./assets/extralife.png";
        this.width = 30;
        this.height = 30;
        break;
      case "multiBall":
        this.image.src = "./assets/multiball.png";
        break;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        const newBall = new Ball(this.game);
        newBall.x = this.game.ball.x;
        newBall.y = this.game.ball.y;
        newBall.vx = -this.game.ball.vx;
        newBall.vy = this.game.ball.vy;
        this.game.extraBalls = this.game.extraBalls || [];
        this.game.extraBalls.push(newBall);
        break;
    }
  }
}
