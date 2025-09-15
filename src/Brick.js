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
    // console.log(this.ball);
    if (this.detectCollision(this, this.ball)) {
      // this.broken = true; // "destroy" the brick
      // this.ball.vy = -this.ball.vy; // simple response: reverse vertical direction
    }
  }
  detectCollision() {
    // To be implmented
    if (
      this.ball.x > this.x &&
      this.ball.x < this.x + this.width &&
      this.ball.y > this.y &&
      this.ball.y < this.y + this.height
    ) {
      // Ball hits brick
      this.ball.vy *= -1;
      this.broken = true;
      this.game.score += 10;
      return true;
    }
    return false;
  }
}

export default Brick;
