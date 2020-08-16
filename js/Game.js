import Drawer from './Drawer.js';
import Board from './Board.js';
import Snake, { SNAKE_DIRECTIONS } from './Snake.js';
import Food from './Food.js';




function Game(blocksHorizontal, blocksVertical) {
  this.board = new Board(blocksHorizontal, blocksVertical);
  this.drawer = new Drawer(this.board);
  this.snake = new Snake(this.board.getRandomPositionAvailable());
  this.food = new Food(this.board.getRandomPositionAvailable(this.snake));

  const snakeMove = () => {
    const { body: snakeBody } = this.snake
    for (let i = snakeBody.length - 1; i >= 0; i--) {
      const snakeBlock = snakeBody[i];
      if (i === 0) {
        snakeMoveHead(snakeBlock);
      } else {
        const snakeNextBlock = snakeBody[i - 1];
        snakeMoveBody(snakeBlock, snakeNextBlock);
      }
    }
  }

  const snakeMoveHead = (snakeHead) => {
    const { blocksHorizontal, blocksVertical } = this.board;
    const { direction: snakeDirection } = this.snake;
    switch (snakeDirection) {
      case SNAKE_DIRECTIONS.UP:
        if (snakeHead[1] > 0) {
          snakeHead[1] -= 1;
        } else {
          snakeHead[1] = blocksVertical - 1;
        }
        break;
      case SNAKE_DIRECTIONS.DOWN:
        if (snakeHead[1] < blocksVertical - 1) {
          snakeHead[1] += 1;
        } else {
          snakeHead[1] = 0;
        }
        break;
      case SNAKE_DIRECTIONS.LEFT:
        if (snakeHead[0] > 0) {
          snakeHead[0] -= 1;
        } else {
          snakeHead[0] = blocksHorizontal - 1;
        }
        break;
      case SNAKE_DIRECTIONS.RIGHT:
        if (snakeHead[0] < blocksHorizontal - 1) {
          snakeHead[0] += 1;
        } else {
          snakeHead[0] = 0;
        }
        break;
    }
  }

  const snakeMoveBody = (snakeBlock, snakeNextBlock) => {
    snakeBlock[0] = snakeNextBlock[0];
    snakeBlock[1] = snakeNextBlock[1];
  }

  const growSnake = () => {
    const { body, direction } = this.snake;
    const snakeTail = body[body.length - 1];
    switch (direction) {
      case SNAKE_DIRECTIONS.UP:
        body.push([snakeTail[0], snakeTail[1] + 1]);
        break;
      case SNAKE_DIRECTIONS.DOWN:
        body.push([snakeTail[0], snakeTail[1] - 1]);
        break;
      case SNAKE_DIRECTIONS.LEFT:
        body.push([snakeTail[0] + 1, snakeTail[1]]);
        break;
      case SNAKE_DIRECTIONS.RIGHT:
        body.push([snakeTail[0] - 1, snakeTail[1]]);
        break;
    }
  }

  const checkSnakeEat = () => {
    const { body: snakeBody } = this.snake;
    const { position: foodPosition } = this.food;

    const snakeHead = snakeBody[0];
    if (snakeHead[0] === foodPosition[0] && snakeHead[1] === foodPosition[1]) {
      growSnake();
      this.food.position = this.board.getRandomPositionAvailable(this.snake, this.food);
    }
  }
  const checkSnakeColission = () => {
    const { body } = this.snake;
    if (body.length <= 1) return false;
    const snakeHead = body[0];
    for (let i = 1; i < body.length; i++) {
      const snakeBlock = body[i];
      if (snakeHead[0] === snakeBlock[0] && snakeHead[1] === snakeBlock[1]) {
        return true;
      }
    }
    return false;
  }


  const animate = () => {
    snakeMove();
    const snakeColission = checkSnakeColission();
    if (snakeColission) {
      clearInterval(this.intervalAnimation);
      this.snake.isDead = true;
      this.drawer.drawGame(this.snake, this.food);
      console.log('Perdiste!');
    }
    checkSnakeEat();
    this.drawer.drawGame(this.snake, this.food);
  }

  const handleKeyEvent = () => {
    const onKeyDown = function (e) {
      e = e || window.event;
      const { direction: snakeDirection } = this.snake;
      switch (e.code) {
        case 'ArrowUp':
          if (snakeDirection !== SNAKE_DIRECTIONS.DOWN) {
            this.snake.direction = SNAKE_DIRECTIONS.UP;
          }
          break;
        case 'KeyW':
          if (snakeDirection !== SNAKE_DIRECTIONS.DOWN) {
            this.snake.direction = SNAKE_DIRECTIONS.UP;
          }
          break;
        case 'ArrowDown':
          if (snakeDirection !== SNAKE_DIRECTIONS.UP) {
            this.snake.direction = SNAKE_DIRECTIONS.DOWN;
          }
          break;
        case 'KeyS':
          if (snakeDirection !== SNAKE_DIRECTIONS.UP) {
            this.snake.direction = SNAKE_DIRECTIONS.DOWN;
          }
          break;
        case 'ArrowLeft':
          if (snakeDirection !== SNAKE_DIRECTIONS.RIGHT) {
            this.snake.direction = SNAKE_DIRECTIONS.LEFT;
          }
          break;
        case 'KeyA':
          if (snakeDirection !== SNAKE_DIRECTIONS.RIGHT) {
            this.snake.direction = SNAKE_DIRECTIONS.LEFT;
          }
          break;
        case 'ArrowRight':
          if (snakeDirection !== SNAKE_DIRECTIONS.LEFT) {
            this.snake.direction = SNAKE_DIRECTIONS.RIGHT;
          }
          break;
        case 'KeyD':
          if (snakeDirection !== SNAKE_DIRECTIONS.LEFT) {
            this.snake.direction = SNAKE_DIRECTIONS.RIGHT;
          }
          break;
      }
    };
    document.onkeydown = onKeyDown.bind(this);
  }

  const createBoard = (blocksHorizontal, blocksVertical) => {
    return {
      blocksHorizontal,
      blocksVertical
    }
  };

  const start = () => {
    this.drawer.drawGame(this.snake, this.food);
    this.intervalAnimation = setInterval(animate, 130);
    handleKeyEvent();
  }

  return {
    start
  }
}

export default Game;

