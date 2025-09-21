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
  // update() {
  //   if (!this.broken && this.detectCollision(this, this.ball)) {
  //     this.broken = true; // brick got destroyed
  //     this.ball.vy = -this.ball.vy; // reverse vertical direction
  //     this.game.score += 10;
  //     // spawn powerup with ball position
  //     this.game.spawnPowerup(this.ball.x, this.ball.y);
  //   }
  // }

  update(){
    if(this.broken) return;

    const balls = [this.game.ball, ...(this.game.extraBalls || [])];
    for(const b of balls){
      if(this.detectCollision(b)){
        this.broken = true;
        b.vy = -b.vy;
        this.game.score +=10;
        this.game.spawnPowerup(b.x, b.y);
        break;
      }
    }
  }

  detectCollision(ball){
    return(ball.x + ball.radius > this.x && ball.x - ball.radius < this.brickRight &&
      ball.ballTop < this.brickBottom && ball.ballBottom > this.y);
  }
  // detectCollision() {
  //   if (
  //     this.ball.x > this.x &&
  //     this.ball.x < this.brickRight &&
  //     this.ball.ballTop < this.brickBottom &&
  //     this.ball.ballBottom > this.y
  //   ) {
  //     // Ball hits brick
  //     return true;
  //   }
  //   return false;
  // }

  get brickRight() {
    return this.x + this.width;
  }
  get brickBottom() {
    return this.y + this.height;
  }
}

export default Brick;
