class Game {
  constructor(numberOfTowers){
    this.towers = Game.buildTowers(numberOfTowers);
  }

  static buildTowers(num){
    let result = [];
    let firstTower = [];
    let i = num;
    while(i>0){
      firstTower.push(i);
      i--;
    }
    for (let j = 0; j < num; j++){
      if (j !== 0) {
        result.push([]);
      }
      else {
        result.push(firstTower);
      }
    }
    return result;
  }
}

let g = new Game(4);
console.log(g.towers)
