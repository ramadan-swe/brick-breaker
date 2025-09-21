import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Powerup from "./powerup.js";
import { isGameMuted } from "./Music.js";

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

    this.level = 1;
    this.phase = "menu";

    this.bricks = [];
    this.initializeBricks();
    this.extraBalls = [];

    window.addEventListener("keydown", (e) => {
      if (this.phase == "win") {
        if (e.code === "Space") {
          this.goToNextLevel();
          return;
        }
        if (e.code === "Escape") {
          this.returnToMainMenu();
          return;
        }
      }
      if (this.phase == "gameOver") {
        if (e.code === "Space") {
          this.restart();
          return;
        }
        if (e.code === "Escape") {
          this.returnToMainMenu();
          return;
        }
      }

      if (!this.started) return;
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
    });

    window.addEventListener("keyup", (e) => {
      // if (!this.started) return;
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }
  spawnPowerup(x, y) {
    let probailty = Math.floor(Math.random() * 100);
    if (probailty < 20) {
      // Randomly choose a type
      const types = ["expand", "shrink", "extraLife", "multiBall"];
      const type = types[Math.floor(Math.random() * types.length)];
      const powerup = new Powerup(this, x, y);
      powerup.type = type;
      this.powerups.push(powerup);
    }
  }

  initializeBricks() {
    this.bricks = [];

    // Based on difficulty, determine rows, cols, and total bricks count
    const rows = 3 + this.difficulty;
    const cols = 10;
    const totalBricks = rows * cols * 0.66; // 66% of total positions randomly filled

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

  // Draw bricks
  drawBricks(context) {
    this.bricks.forEach((brick) => {
      brick.draw(context);
      brick.update();
    });
  }

  render(context) {
    // Draw score and lives
    context.fillStyle = "white";
    context.font = "20px Pixelify";
    if (this.phase == "playing" || this.phase == "ready") {
      context.fillText("Score: " + this.score, this.width - 200, 30);
    }
    context.fillText("Lives: " + this.lives, this.width - 100, 30);

    //in case we are not playing, show:
    if (this.phase != "playing") {
      context.fillStyle = "rgba(0,0,0,0.5)"; //give it a dim
      context.fillRect(0, 0, this.width, this.height);
      context.textAlign = "center";
      context.fillStyle = "white";
      context.font = "30px Pixelify";

      if (this.phase === "menu") {
        context.fillText(
          "Press space to start",
          this.width * 0.5,
          this.height * 0.5
        );
        return;
      }

      if (["win", "gameOver"].includes(this.phase)) {
        const key = `${playerName.value}-topScore`;
        const topScore = Number(localStorage.getItem(key)) || 0;

        if (this.score > topScore) {
          localStorage.setItem(key, this.score);
        }

        const topScoreText = Math.max(this.score, topScore);

        context.textAlign = "center";
        context.fillText("Top Score: " + topScoreText, this.width * 0.5, this.height * 0.7);
      }

      if (this.phase === "win") {
        //place you win in the middle of the screen
        context.font = "30px Pixelify";
        context.fillText("🎉 You Win!", this.width * 0.5, this.height * 0.5);
        //press Space to continue
        context.font = "20px Pixelify";
        context.fillText(
          "Press space to continue to next level",
          this.width * 0.5,
          this.height * 0.6
        );
        //Press esc to exit
        context.textAlign = "left";
        context.font = "20px Pixelify";
        context.fillText("Press esc to exit", 20, 50);
      }
      if (this.phase === "gameOver") {
        //place you win in the middle of the screen
        context.textAlign = "center";
        context.font = "30px Pixelify";
        context.fillText("💀 Game Over!", this.width * 0.5, this.height * 0.5);
        //press Space to continue
        context.font = "20px Pixelify";
        context.fillText(
          "Press space to restart",
          this.width * 0.5,
          this.height - 40
        );
        //Press esc to exit
        context.textAlign = "left";
        context.font = "20px Pixelify";
        context.fillText("Press esc to exit", 20, 50);
      }
      if (this.phase == "ready") {
        context.textAlign = "center";
        context.font = "20px Pixelify";
        context.fillText(
          "Press space to continue",
          this.width * 0.5,
          this.height * 0.5
        );
      }
    }
    // Draw and update paddle
    //Eman: switched update with draw

    if (this.started) {
      this.ball.update();
      this.paddle.update();
    }

    this.ball.draw(context);
    this.paddle.draw(context);
    // Draw bricks
    this.drawBricks(context)
    //removing the balls that falls under the screen
    this.extraBalls = this.extraBalls.filter(
      (ball) => ball.y - ball.radius < this.height
    ); //update & draw extra balls 
    this.extraBalls.forEach((ball) => {
      ball.draw(context);
      if (this.started) ball.update();
    });

    if (this.phase == "playing") {
      const activeBalls = [this.ball, ...this.extraBalls].filter(b => b.y - b.radius < this.height);
      if (activeBalls.length === 0) {
        this.lives -= 1;
        if (this.lives > 0) {
          this.resetPositions();
          this.phase = "ready";
          this.started = false;
          this.keys = []; //clear any leftover keys
          if (this.ball) this.ball.active = true;
          this.extraBalls = [];
        } else {
          this.phase = "gameOver";
          this.started = false;
          this.extraBalls = [];
        }
      }
    }


    // Draw and update powerups
    this.powerups = this.powerups.filter((p) => p.active);
    this.powerups.forEach((p) => {
      if (this.started) p.update();
      p.draw(context);
    });

    //win condition
    if (this.bricks && this.bricks.length) {
      const bricksLeft = this.bricks.some((b) => !b.broken);
      if (!bricksLeft) {
        this.phase = "win";
        this.started = false;
      }
    }
  }
  //center paddle and ball at the reset position
  resetPositions() {
    //putting everything in the very center
    this.paddle.x = this.width * 0.5 - this.paddle.width * 0.5;
    this.paddle.y = this.height - 20 - this.paddle.height;
    this.ball.x = this.paddle.x + this.paddle.width * 0.5;
    this.ball.y = this.paddle.y - this.ball.radius;
    //velocity along the x and y axis
    this.ball.vx = 1 * this.ball.speed;
    this.ball.vy = 2 * this.ball.speed;
    this.paddle.resetWidth();
  }

  startPlaying() {
    this.phase = "playing";
    this.started = true;
    if(this.ball) this.ball.active = true;
  }
  //progress to next level
  goToNextLevel() {
    this.level += 1;
    this.initializeBricks();
    this.resetPositions();
    this.startPlaying();
    this.extraBalls = [];
  }
  //restart the game upon losing
  restart() {
    this.level = 1;
    this.lives = 3;
    this.score = 0;
    this.initializeBricks();
    this.resetPositions();
    this.startPlaying();
    this.extraBalls = [];
    this.powerups = [];
  }
  //Return to main menu
  returnToMainMenu() {
    const canvas = document.getElementById("canvas");
    const mainMenu = document.getElementById("main-menu");
    const diffMenu = document.getElementById("difficulty-menu");
    if (canvas) canvas.style.display = "none";
    if (diffMenu) diffMenu.style.display = "none";
    if (mainMenu) mainMenu.style.display = "flex";
    this.phase = "menu";
    this.started = false;
  }
}
