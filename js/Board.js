function Board(blocksHorizontal, blocksVertical) {
  this.blocksHorizontal = blocksHorizontal;
  this.blocksVertical = blocksVertical;

  this.getRandomPositionAvailable = (snake, food) => {
    let blocksUsed = snake && food ? [...snake.body, food] : [];
    let randX = 0;
    let randY = 0;
    let blockIsUsed = false;
    do {
      randX = Math.floor(Math.random() * this.blocksHorizontal);
      randY = Math.floor(Math.random() * this.blocksVertical);
      blockIsUsed = blocksUsed.find(block => block[0] === randX && block[1] === randY);
    } while (blockIsUsed);
    return [randX, randY];
  }
}

export default Board;

