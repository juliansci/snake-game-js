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
  let food = createFood();

  function createSnake() {
    const randomPosition = getRandomPositionAvailable();
    return [randomPosition];
  }

  function createFood() {
    return getRandomPositionAvailable();
  }

  function getRandomPositionAvailable() {
    const dimensionMatrix = matrix.length;
    const randX = Math.floor(Math.random() * dimensionMatrix);
    const randY = Math.floor(Math.random() * dimensionMatrix);
    return [randX, randY];
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
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = "#F66B00";
      const snakeBlock = snake[i];
      ctx.fillRect(snakeBlock[0] * widthBlock, snakeBlock[1] * heightBlock, widthBlock, heightBlock);
      if (i === 0) {
        drawSnakeHead(snakeBlock[0] * widthBlock, snakeBlock[1] * heightBlock);
      }
    }
  }

  function drawFood() {
    ctx.fillStyle = "green";
    ctx.fillRect(food[0] * widthBlock, food[1] * heightBlock, widthBlock, heightBlock);
  }

  function drawGame() {
    drawScenary();
    drawSnake();
    drawFood();
  }

  function snakeMoveHead(snakeHead) {
    switch (snakeDirection) {
      case SNAKE_DIRECTIONS.UP:
        if (snakeHead[1] > 0) {
          snakeHead[1] -= 1;
        } else {
          snakeHead[1] = matrixHeight - 1;
        }
        break;
      case SNAKE_DIRECTIONS.DOWN:
        if (snakeHead[1] < matrixHeight - 1) {
          snakeHead[1] += 1;
        } else {
          snakeHead[1] = 0;
        }
        break;
      case SNAKE_DIRECTIONS.LEFT:
        if (snakeHead[0] > 0) {
          snakeHead[0] -= 1;
        } else {
          snakeHead[0] = matrixWidth - 1;
        }
        break;
      case SNAKE_DIRECTIONS.RIGHT:
        if (snakeHead[0] < matrixWidth - 1) {
          snakeHead[0] += 1;
        } else {
          snakeHead[0] = 0;
        }
        break;
    }
  }

  function snakeMoveBody(snakeBlock, snakeNextBlock) {
    snakeBlock[0] = snakeNextBlock[0];
    snakeBlock[1] = snakeNextBlock[1];
  }

  function snakeMove() {
    console.log('snakeMove');
    for (let i = snake.length - 1; i >= 0; i--) {
      const snakeBlock = snake[i];
      if (i === 0) {
        snakeMoveHead(snakeBlock);
      } else {
        const snakeNextBlock = snake[i - 1];
        snakeMoveBody(snakeBlock, snakeNextBlock);
      }
    }
  }

  function growSnake() {
    snakeTail = snake[snake.length - 1];
    switch (snakeDirection) {
      case SNAKE_DIRECTIONS.UP:
        snake.push([snakeTail[0], snakeTail[1] + 1]);
        break;
      case SNAKE_DIRECTIONS.DOWN:
        snake.push([snakeTail[0], snakeTail[1] - 1]);

        break;
      case SNAKE_DIRECTIONS.LEFT:
        snake.push([snakeTail[0] + 1, snakeTail[1]]);

        break;
      case SNAKE_DIRECTIONS.RIGHT:
        snake.push([snakeTail[0] - 1, snakeTail[1]]);
        break;
    }
    console.log(snake);
  }

  function checkSnakeEat() {
    const snakeHead = snake[0];
    if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
      console.log('come!');
      growSnake();
      food = createFood();
    }
  }

  function animate() {
    snakeMove();
    checkSnakeEat();
    drawGame();
  }

  function handleKeyEvent() {
    document.onkeydown = function (e) {
      e = e || window.event;
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
    drawGame();
    setInterval(animate, 100);
    handleKeyEvent();
  }

  return {
    start
  }
}

const game = Game();
game.start();

