import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
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
    this.started = true;
    this.difficulty = 1;
    this.score = 0;
    this.lives = 3;
    this.bricks = [];
    this.initializeBricks();
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

  initializeBricks() {
    this.bricks = [];

    // Based on difficulty, determine rows, cols, and total bricks count
    const rows = 3 + this.difficulty; // for example
    const cols = this.difficulty * 4; // for example
    const totalBricks = rows * cols * 0.75; // 75% of total positions randomly filled

    // Create a grid filled with false, indicating no brick
    const grid = new Array(rows)
      .fill(null)
      .map(() => new Array(cols).fill(false));

    // Randomly select positions to place bricks
    let bricksPlaced = 0;
    while (bricksPlaced < totalBricks) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!grid[r][c]) {
        grid[r][c] = true;
        bricksPlaced++;
      }
    }

    // Create bricks and set their positions
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c]) {
          const brick = new Brick(this);
          brick.x = c * (brick.width + brick.padding) + brick.offsetLeft;
          brick.y = r * (brick.height + brick.padding) + brick.offsetTop;
          this.bricks.push(brick);
        }
      }
    }
  }

  render(context) {
    // Draw score and lives
    context.fillStyle = "white";
    context.font = "20px Pixelify";
    context.fillText("Score: " + this.score, 20, 30);
    context.fillText("Lives: " + this.lives, this.width - 100, 30);

    // Draw and update paddle
    this.paddle.draw(context);
    this.paddle.update();
    this.ball.draw(context);
    this.ball.update();

    // Draw bricks
    this.bricks.forEach((brick) => {
      brick.draw(context);
      brick.update();
    });

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
