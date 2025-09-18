class Brick {
  constructor(game) {
    this.game = game;
    const config = game.config || {};
    const brickConfig = config.brick || {};

    this.width = brickConfig.width || 75;
    this.height = brickConfig.height || 30;
    this.padding = brickConfig.padding || 10;
    this.offsetTop = brickConfig.offsetTop || 50;
    this.offsetLeft = brickConfig.offsetLeft || 50;

    this.x = this.offsetTop;
    this.y = this.offsetLeft;
    this.broken = false;

    this.ball = this.game.ball;
  }
  draw(context) {
    if (!this.broken) {
      context.fillStyle = "#3a6ea5";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.strokeStyle = "black";
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
  update() {
    if (!this.broken && this.detectCollision(this, this.ball)) {
      this.broken = true; // brick got destroyed
      this.ball.vy = -this.ball.vy; // reverse vertical direction
      this.game.score += 10;
      // spawn powerup with ball position
      this.game.spawnPowerup(this.ball.x, this.ball.y);
    }
  }
  detectCollision() {
    if (
      this.ball.x > this.x &&
      this.ball.x < this.brickRight &&
      this.ball.ballTop < this.brickBottom &&
      this.ball.ballBottom > this.y
    ) {
      // Ball hits brick
      return true;
    }
    return false;
  }

  get brickRight() {
    return this.x + this.width;
  }
  get brickBottom() {
    return this.y + this.height;
  }
}

export default Brick;
