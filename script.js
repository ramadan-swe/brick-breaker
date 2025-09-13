class Paddle {
  constructor(game) {
    this.game = game;
    this.width = 250;
    this.height = 50;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - 20 - this.height;
    this.speed = 10;
    this.image = new Image();
    this.image.src = "./wintertileset/png/Object/IceBox.png";
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    // horizontal movement
    if (this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed;
    if (this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed;
    // mouse movement
    this.game.canvas.addEventListener("mousemove", (e) => {
      const rect = this.game.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.x = mouseX - this.width * 0.5;
    });
    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }
}

class Ball {
  constructor(game) {
    this.game = game;
    this.radius = 30;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.speed = 4; // Add speed property
    this.vx = 1 * this.speed; // horizontal velocity
    this.vy = 2 * this.speed; // vertical velocity (falling down)
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

    // Bounce off left/right walls
    if (this.x - this.radius < 0 || this.x + this.radius > this.game.width) {
      this.vx *= -1;
    }
    // Bounce off top wall
    if (this.y - this.radius < 0) {
      this.vy *= -1;
    }

    // Bounce off paddle
    const paddle = this.game.paddle;
    if (
      this.y + this.radius > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y - this.radius < paddle.y + paddle.height
    ) {
      this.vy *= -1;
      // Calculate hit position
      const hitPos = (this.x - paddle.x) / paddle.width; // 0 (left) to 1 (right)
      // Set vx based on hit position and speed
      this.vx = (hitPos - 0.5) * 2 * this.speed; // -speed (left), 0 (center), speed (right)
      this.y = paddle.y - this.radius; // Prevent sticking
    }

    // Reset if ball falls below canvas
    if (this.y - this.radius > this.game.height) {
      this.game.started = false;
      this.x = this.game.width * 0.5;
      this.y = this.game.height * 0.5;
      paddle.x = this.game.width * 0.5 - paddle.width * 0.5;
    }
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.keys = [];
    this.started = false;
    // track the key get pressed and put it inside keys array
    window.addEventListener("keydown", (e) => {
      if (!this.started) return;
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      console.log(this.keys);
    });
    window.addEventListener("keyup", (e) => {
      if (!this.started) return;
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
      console.log(this.keys);
    });
  }
  render(context) {
    if (!this.started) {
      context.fillStyle = "rgba(0,0,0,0.5)";
      context.fillRect(0, 0, this.width, this.height);
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        "Press Enter to Start",
        this.width * 0.5,
        this.height * 0.5
      );
      return;
    }
    this.paddle.draw(context);
    this.paddle.update();
    this.ball.draw(context);
    this.ball.update();
  }
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  const game = new Game(canvas);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") game.started = true;
  });
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    window.requestAnimationFrame(animate);
  }
  animate();
});
