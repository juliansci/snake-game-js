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
}

export default Snake;

