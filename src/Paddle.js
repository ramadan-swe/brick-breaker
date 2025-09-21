export default class Paddle {
  constructor(game) {
    this.game = game;
    this.width = 200;
    this.height = 50;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - 20 - this.height;
    this.speed = 10;
    this.game.canvas.addEventListener("mousemove", (e) => {
      if (!this.game.started) return;
      const rect = this.game.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.x = mouseX - this.width * 0.5;
    });
  }
  draw(context) {
    context.fillStyle = "#3a6ea5";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed;
    if (this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed;

    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }
}
