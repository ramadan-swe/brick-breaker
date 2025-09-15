export default class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 10;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.speed = 4;
    this.vx = 1 * this.speed;
    this.vy = 2 * this.speed;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "white";
    context.fill();
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
    this.game.bricks.forEach((brick) => {
      if (!brick.broken) {
        if (
          this.x > brick.x &&
          this.x < brick.x + brick.width &&
          this.y - this.radius < brick.y + brick.height &&
          this.y + this.radius > brick.y
        ) {
          // Ball hits brick
          this.vy *= -1;
          brick.broken = true;
          this.game.score += 10;
        }
      }
    });
    if (this.y - this.radius > this.game.height) {
      this.x = this.game.width * 0.5;
      this.y = this.game.height * 0.5;
      paddle.x = this.game.width * 0.5 - paddle.width * 0.5;
      this.game.lives -= 1;
      if (this.game.lives <= 0) {
        this.game.lives = 3;
        this.game.score = 0;
        this.game.difficulty = 1;
        this.game.paddle.width = 250;
        this.game.extraBalls = [];
      }
    }
  }
}
