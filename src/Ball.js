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
    // create a radial gradient for the ball's color effect
    // center is lighter and edges are darker to give a 3D spherical appearance
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
      this.ballBottom > paddle.y && // bottom of ball below top of paddle
      this.x > paddle.x && // ball right of paddle left edge
      this.x < paddle.x + paddle.width && // ball left of paddle right edge
      this.ballTop < paddle.y + paddle.height // top of ball above bottom of paddle
    ) {
      this.vy *= -1; // reverse vertical velocity to bounce
      const hitPos = (this.x - paddle.x) / paddle.width; // relative hit position on paddle (0 to 1)
      this.vx = (hitPos - 0.5) * 2 * this.speed; // adjust horizontal velocity proportional to hit position
      this.y = paddle.y - this.radius; // reposition ball on top of paddle to prevent sticking
    }

    // check if ball has fallen below the bottom of the screen
    if (this.ballTop > this.game.height) {
      this.active = false; // deactivate the ball as it is out of play
    }
  }
  get ballBottom() {
    return this.y + this.radius;
  }
  get ballTop() {
    return this.y - this.radius;
  }
}
