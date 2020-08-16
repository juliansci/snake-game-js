import Drawer from './Drawer.js';
import Board from './Board.js';
import Snake, { SNAKE_DIRECTIONS } from './Snake.js';
import Food from './Food.js';

function Game(blocksHorizontal, blocksVertical) {
  this.board = new Board(blocksHorizontal, blocksVertical);
  this.drawer = new Drawer(this.board);
  this.snake = new Snake(this.board.getRandomPositionAvailable());
  this.food = new Food(this.board.getRandomPositionAvailable(this.snake));

  const animate = () => {
    this.snake.move(this.board);
    const snakeInColission = this.snake.checkCollision();
    if (snakeInColission) {
      clearInterval(this.intervalAnimation);
      this.snake.isDead = true;
      this.drawer.drawGame(this.snake, this.food);
    }
    const snakeEatFoot = this.snake.checkEatFood(this.food);
    if (snakeEatFoot) {
      this.food.position = this.board.getRandomPositionAvailable(this.snake, this.food);
    }
    this.drawer.drawGame(this.snake, this.food);
  }

  const handleKeyEvents = () => {
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

  const start = () => {
    this.drawer.drawGame(this.snake, this.food);
    this.intervalAnimation = setInterval(animate, 130);
    handleKeyEvents();
  }

  return {
    start
  }
}

export default Game;

