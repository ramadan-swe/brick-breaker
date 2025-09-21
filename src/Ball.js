export default class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 12;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.speed = 4;
    this.vx = 1 * this.speed;
    this.vy = 2 * this.speed;
    this.active = true;
  }
  draw(context) {
    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.2,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, "#e0e8ff"); // light center
    gradient.addColorStop(0.5, "#e4a214ff"); // mid blue
    gradient.addColorStop(1, "#f85234ff"); // dark edge

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = gradient;
    context.shadowColor = "#eeff00ff";

    context.fill();
  }
  update() {
    if (!this.active) return;
    //move
    this.x += this.vx;
    this.y += this.vy;
    //walls
    if (this.x - this.radius < 0 || this.x + this.radius > this.game.width) {
      this.vx *= -1;
    }
    //ceiling
    if (this.ballTop < 0) {
      this.vy *= -1;
    }
    //paddle collision
    const paddle = this.game.paddle;
    if (
      this.ballBottom > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.ballTop < paddle.y + paddle.height
    ) {
      this.vy *= -1;
      const hitPos = (this.x - paddle.x) / paddle.width;
      this.vx = (hitPos - 0.5) * 2 * this.speed;
      this.y = paddle.y - this.radius;
    }

    if (this.ballTop > this.game.height) {
      this.active = false;
      // this.game.lives -= 1;

      // if (this.game.lives <= 0) {
      //   //Eman: used helper function in game.js
      //   //to stop the game and print gameover
      //   this.game.phase = "gameOver";
      //   this.game.started = false;
      //   this.game.extraBalls = [];
      // } else{ //if u have lives left
      //   this.game.started = false;
      //   this.game.resetPositions();
      //   this.game.phase = "ready";
      // }
    }
  }
  get ballBottom() {
    return this.y + this.radius;
  }
  get ballTop() {
    return this.y - this.radius;
  }
}
