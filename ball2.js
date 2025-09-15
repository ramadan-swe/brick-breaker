update() {
  // Move ball
  this.ballX += this.ballVelocityX;
  this.ballY += this.ballVelocityY;

  // Wall collisions
  if (this.ballX - this.ballRadius < 0 || this.ballX + this.ballRadius > this.game.width) {
    this.ballVelocityX *= -1;
  }
  if (this.ballY - this.ballRadius < 0) {
    this.ballVelocityY *= -1;
  }

  // Paddle collision
  const paddle = this.game.paddle;
  if (
    this.ballY + this.ballRadius > paddle.y &&
    this.ballX > paddle.x &&
    this.ballX < paddle.x + paddle.width &&
    this.ballY - this.ballRadius < paddle.y + paddle.height
  ) {
    this.ballVelocityY *= -1;
    const relativeHitPosition = (this.ballX - paddle.x) / paddle.width;
    this.ballVelocityX = (relativeHitPosition - 0.5) * 2 * this.ballSpeed;
    this.ballY = paddle.y - this.ballRadius;
  }

  // Brick collisions
  this.game.bricks.bricks.forEach((brick) => {
    if (brick.active) {
      if (
        this.ballX > brick.x &&
        this.ballX < brick.x + brick.width &&
        this.ballY - this.ballRadius < brick.y + brick.height &&
        this.ballY + this.ballRadius > brick.y
      ) {
        // Ball hits brick
        this.ballVelocityY *= -1;
        brick.active = false;
        this.game.score += 10;
      }
    }
  });

  // Missed paddle (ball falls)
  if (this.ballY - this.ballRadius > this.game.height) {
    this.game.started = false;
    this.ballX = this.game.width * 0.5;
    this.ballY = this.game.height * 0.5;
    paddle.x = this.game.width * 0.5 - paddle.width * 0.5;
  }
}
