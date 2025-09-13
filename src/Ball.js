export default class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 30;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.speed = 4;
    this.vx = 1 * this.speed;
    this.vy = 2 * this.speed;
    this.image = new Image();
    this.image.src = "./wintertileset/png/Object/Crate.png";
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x - this.radius < 0 || this.x + this.radius > this.game.width) {
      this.vx *= -1;
    }
    if (this.y - this.radius < 0) {
      this.vy *= -1;
    }
    const paddle = this.game.paddle;
    if (
      this.y + this.radius > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y - this.radius < paddle.y + paddle.height
    ) {
      this.vy *= -1;
      const hitPos = (this.x - paddle.x) / paddle.width;
      this.vx = (hitPos - 0.5) * 2 * this.speed;
      this.y = paddle.y - this.radius;
    }
    if (this.y - this.radius > this.game.height) {
      this.game.started = false;
      this.x = this.game.width * 0.5;
      this.y = this.game.height * 0.5;
      paddle.x = this.game.width * 0.5 - paddle.width * 0.5;
    }
  }
}
