export default class Powerup {
  constructor(game) {
    this.game = game;
    this.x = Math.random() * (this.game.width - 20);
    this.y = -20;
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
        // Add a new ball with random direction
        const newBall = new this.game.ball.constructor(this.game);
        newBall.x = this.game.ball.x;
        newBall.y = this.game.ball.y;
        newBall.vx = -this.game.ball.vx; // opposite direction
        newBall.vy = this.game.ball.vy;
        this.game.extraBalls = this.game.extraBalls || [];
        this.game.extraBalls.push(newBall);
        break;
    }
  }
}
