export const SNAKE_DIRECTIONS = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
};

function Snake(position) {
  this.body = [position];
  this.direction = SNAKE_DIRECTIONS.RIGHT;
  this.isDead = false;



  this.move = board => {
    const snakeBody = this.body;
    for (let i = this.body.length - 1; i >= 0; i--) {
      const snakeBlock = snakeBody[i];
      if (i === 0) {
        _moveHead(snakeBlock, board);
      } else {
        const snakeNextBlock = snakeBody[i - 1];
        _moveBody(snakeBlock, snakeNextBlock);
      }
    }
  }

  this.checkEatFood = (food) => {
    const { position: foodPosition } = food;
    const snakeHead = this.body[0];
    if (snakeHead[0] === foodPosition[0] && snakeHead[1] === foodPosition[1]) {
      grow();
      return true;
    }
    return false;
  }

  this.checkCollision = () => {
    const { body } = this;
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

  const grow = () => {
    const { body, direction } = this;
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

  const _moveHead = (snakeHead, board) => {
    const { blocksHorizontal, blocksVertical } = board;
    switch (this.direction) {
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

  const _moveBody = (snakeBlock, snakeNextBlock) => {
    snakeBlock[0] = snakeNextBlock[0];
    snakeBlock[1] = snakeNextBlock[1];
  }
}

export default Snake;

