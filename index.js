const Game = () => {
  const SNAKE_DIRECTIONS = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN',
  };

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext("2d");
  const matrixWidth = 30;
  const matrixHeight = 30;
  const widthBlock = canvas.width / matrixWidth;
  const heightBlock = canvas.height / matrixHeight;
  const matrix = createMatrix(matrixWidth, matrixHeight);
  const snake = createSnake();
  let snakeDirection = 'RIGHT';

  function createSnake() {
    const dimensionMatrix = matrix.length;
    const randX = Math.floor(Math.random() * dimensionMatrix);
    const randY = Math.floor(Math.random() * dimensionMatrix);
    matrix[randX][randY] = 'S';
    console.log(matrix[randX][randY]);
    return [[randX, randY]];
  }
  function createMatrix(m, n) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
      matrix.push(new Array(m).fill(0));
    }
    return matrix;
  }


  function drawScenary() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    for (let i = 0; i < matrixWidth; i++) {
      ctx.fillStyle = "#FFFFD0";
      ctx.fillRect(i * widthBlock, 0, 0.2, canvas.height);
      ctx.fillRect(0, i * heightBlock, canvas.width, 0.2);
    }
  }

  function drawSnakeHead(x, y) {
    ctx.fillStyle = "#000000";
    const eyeDimension = 0.15 * widthBlock;
    const marginBetweenEyes = 0.1 * widthBlock;
    const marginFirstEye = 0.3 * widthBlock;
    const marginSecondEye = marginFirstEye + eyeDimension + marginBetweenEyes;
    const marginToHead = 0.1 * widthBlock;
    switch (snakeDirection) {
      case SNAKE_DIRECTIONS.UP:
        ctx.fillRect(x + marginFirstEye, y + marginToHead, eyeDimension, eyeDimension);
        ctx.fillRect(x + marginSecondEye, y + marginToHead, eyeDimension, eyeDimension);
        break;
      case SNAKE_DIRECTIONS.DOWN:
        ctx.fillRect(x + marginFirstEye, y + heightBlock - eyeDimension - marginToHead, eyeDimension, eyeDimension);
        ctx.fillRect(x + marginSecondEye, y + heightBlock - eyeDimension - marginToHead, eyeDimension, eyeDimension);
        break;
      case SNAKE_DIRECTIONS.LEFT:
        ctx.fillRect(x + marginToHead, y + marginFirstEye, eyeDimension, eyeDimension);
        ctx.fillRect(x + marginToHead, y + marginSecondEye, eyeDimension, eyeDimension);
        break;
      case SNAKE_DIRECTIONS.RIGHT:
        ctx.fillRect(x + widthBlock - eyeDimension - marginToHead, y + marginFirstEye, eyeDimension, eyeDimension);
        ctx.fillRect(x + widthBlock - eyeDimension - marginToHead, y + marginSecondEye, eyeDimension, eyeDimension);
        break;
    }


  }
  function drawSnake() {
    ctx.fillStyle = "#F66B00";
    for (let i = 0; i < snake.length; i++) {
      const snakeBlock = snake[i];
      ctx.fillRect(snakeBlock[0] * widthBlock, snakeBlock[1] * heightBlock, widthBlock, heightBlock);
      if (i === 0) {
        drawSnakeHead(snakeBlock[0] * widthBlock, snakeBlock[1] * heightBlock);
      }
    }
  }
  function drawGame() {
    drawScenary();
    drawSnake();
  }

  function snakeMove() {
    console.log(snakeDirection);
    console.log('snake: ', snake[0], snake[1]);
    for (let i = 0; i < snake.length; i++) {
      const snakeBlock = snake[i];
      switch (snakeDirection) {
        case SNAKE_DIRECTIONS.UP:
          if (snakeBlock[1] > 0) {
            snakeBlock[1] -= 1;
          } else {
            snakeBlock[1] = matrixHeight - 1;
          }
          break;
        case SNAKE_DIRECTIONS.DOWN:
          if (snakeBlock[1] < matrixHeight - 1) {
            snakeBlock[1] += 1;
          } else {
            snakeBlock[1] = 0;
          }
          break;
        case SNAKE_DIRECTIONS.LEFT:
          if (snakeBlock[0] > 0) {
            snakeBlock[0] -= 1;
          } else {
            snakeBlock[0] = matrixWidth - 1;
          }
          break;
        case SNAKE_DIRECTIONS.RIGHT:
          if (snakeBlock[0] < matrixWidth - 1) {
            snakeBlock[0] += 1;
          } else {
            snakeBlock[0] = 0;
          }
          break;
      }

    }
  }
  function animate() {
    snakeMove();
    drawGame();

  }

  function handleKeyEvent() {
    document.onkeydown = function (e) {
      e = e || window.event;
      console.log(e);
      switch (e.code) {
        case 'ArrowUp':
          snakeDirection = SNAKE_DIRECTIONS.UP;
          break;
        case 'KeyW':
          snakeDirection = SNAKE_DIRECTIONS.UP;
          break;
        case 'ArrowDown':
          snakeDirection = SNAKE_DIRECTIONS.DOWN;
          break;
        case 'KeyS':
          snakeDirection = SNAKE_DIRECTIONS.DOWN;
          break;
        case 'ArrowLeft':
          snakeDirection = SNAKE_DIRECTIONS.LEFT;
          break;
        case 'KeyA':
          snakeDirection = SNAKE_DIRECTIONS.LEFT;
          break;
        case 'ArrowRight':
          snakeDirection = SNAKE_DIRECTIONS.RIGHT;
          break;
        case 'KeyD':
          snakeDirection = SNAKE_DIRECTIONS.RIGHT;
          break;

      }
    };
  }
  function start() {
    console.log('starting game!');
    drawGame();
    setInterval(animate, 200);
    handleKeyEvent();
  }

  return {
    start
  }
}

const game = Game();
game.start();

