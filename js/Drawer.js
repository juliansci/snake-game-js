const SNAKE_DIRECTIONS = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
};

function Drawer(board) {
  this.canvas = document.getElementById('boardGame');
  this.ctx = this.canvas.getContext("2d");
  console.log()
  this.board = {
    ...board,
    blockWidthPx: this.canvas.width / board.blocksHorizontal,
    blockHeightPx: this.canvas.height / board.blocksVertical
  };

  const drawScenary = () => {
    const { canvas, ctx, board } = this;
    const { blocksHorizontal, blockWidthPx, blockHeightPx } = board;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Fill background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid
    for (let i = 0; i < blocksHorizontal; i++) {
      ctx.fillStyle = "#FFFFD0";
      ctx.fillRect(i * blockWidthPx, 0, 0.2, canvasHeight);
      ctx.fillRect(0, i * blockHeightPx, canvasWidth, 0.2);
    }
  }

  const drawSnake = (snake) => {
    const { ctx, board } = this;
    const { blockWidthPx, blockHeightPx } = board;
    const snakeBody = snake.body;

    for (let i = snakeBody.length - 1; i >= 0; i--) {
      ctx.fillStyle = "#F66B00";
      const snakeBlock = snakeBody[i];
      ctx.fillRect(snakeBlock[0] * blockWidthPx, snakeBlock[1] * blockHeightPx, blockWidthPx, blockHeightPx);
      if (i === 0) {
        drawSnakeHead(snake, snakeBlock);
      }
    }
  }

  const drawSnakeHead = (snake, snakeBlock) => {
    const { ctx, board } = this;
    const { direction: snakeDirection, isDead: snakeIsDead } = snake;
    const { blockWidthPx, blockHeightPx } = board;
    const x = snakeBlock[0] * blockWidthPx;
    const y = snakeBlock[1] * blockHeightPx;
    const eyeDimension = 0.15 * blockWidthPx;
    const marginBetweenEyes = 0.1 * blockWidthPx;
    const marginFirstEye = 0.3 * blockWidthPx;
    const marginSecondEye = marginFirstEye + eyeDimension + marginBetweenEyes;
    const marginToHead = 0.1 * blockWidthPx;
    ctx.fillStyle = "#C95903";
    ctx.fillRect(x, y, blockWidthPx, blockHeightPx);
    ctx.fillStyle = snakeIsDead ? "#EB1414" : "#000000";
    switch (snakeDirection) {
      case SNAKE_DIRECTIONS.UP:
        ctx.fillRect(x + marginFirstEye, y + marginToHead, eyeDimension, eyeDimension);
        ctx.fillRect(x + marginSecondEye, y + marginToHead, eyeDimension, eyeDimension);
        break;
      case SNAKE_DIRECTIONS.DOWN:
        ctx.fillRect(x + marginFirstEye, y + blockHeightPx - eyeDimension - marginToHead, eyeDimension, eyeDimension);
        ctx.fillRect(x + marginSecondEye, y + blockHeightPx - eyeDimension - marginToHead, eyeDimension, eyeDimension);
        break;
      case SNAKE_DIRECTIONS.LEFT:
        ctx.fillRect(x + marginToHead, y + marginFirstEye, eyeDimension, eyeDimension);
        ctx.fillRect(x + marginToHead, y + marginSecondEye, eyeDimension, eyeDimension);
        break;
      case SNAKE_DIRECTIONS.RIGHT:
        ctx.fillRect(x + blockWidthPx - eyeDimension - marginToHead, y + marginFirstEye, eyeDimension, eyeDimension);
        ctx.fillRect(x + blockWidthPx - eyeDimension - marginToHead, y + marginSecondEye, eyeDimension, eyeDimension);
        break;
    }
  }

  const drawFood = (food) => {
    const { ctx, board } = this;
    const { blockWidthPx, blockHeightPx } = board;
    const foodPosition = food.position;
    ctx.fillStyle = "green";
    ctx.fillRect(foodPosition[0] * blockWidthPx, foodPosition[1] * blockHeightPx, blockWidthPx, blockHeightPx);
  }

  this.drawGame = (snake, food) => {
    drawScenary();
    drawSnake(snake);
    drawFood(food);
  }

}

export default Drawer;

