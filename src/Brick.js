import { playHitSound } from "./Music.js";
class Brick {
  constructor(game) {
    this.game = game;
    this.width = 70;
    this.height = 30;
    this.padding = 10;
    this.offsetTop = 50;
    this.offsetLeft = 75;

    this.x = this.offsetLeft;
    this.y = this.offsetTop;
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
    if (this.broken) return;

    const balls = [this.game.ball, ...(this.game.extraBalls || [])];
    for (const b of balls) {
      const collision = this.detectCollision(b);
      if (collision) {
        if (collision === 'horizontal') {
          b.vx = -b.vx;
        } else { // 'vertical'
          b.vy = -b.vy;
        }
        this.broken = true;
        this.game.score += 10;
        this.game.spawnPowerup(b.x, b.y);
        playHitSound();
        break;
      }
    }
  }

  detectCollision(ball) {
    // compute ball edges using its radius
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;

    const brickLeft = this.x;
    const brickRight = this.x + this.width;
    const brickTop = this.y;
    const brickBottom = this.y + this.height;

    // Broad-phase AABB test: if there's no overlap at all, no collision
    if (ballRight < brickLeft || ballLeft > brickRight || ballBottom < brickTop || ballTop > brickBottom) {
      return null;
    }

    // How much the ball penetrates the brick on each axis
    const overlapX = Math.min(ballRight - brickLeft, brickRight - ballLeft);
    const overlapY = Math.min(ballBottom - brickTop, brickBottom - ballTop);

    // If horizontal penetration is smaller -> collision from left/right, else top/bottom
    if (overlapX < overlapY) {
      return 'horizontal';
    }
    return 'vertical';
  }

  get brickRight() {
    return this.x + this.width;
  }
  get brickBottom() {
    return this.y + this.height;
  }
}

export default Brick;
