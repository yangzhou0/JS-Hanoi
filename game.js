var _ = require('underscore');
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor(numberOfTowers){
    this.towers = Game.buildTowers(numberOfTowers);
  }

  promptMove(reader, callback){
    this.print();
    reader.question('Which tower to move from?', function(from){
      reader.question('Which tower to move to?', function(to){
        callback(from,to);
      })
    })
  }

  print(){
    let towers = this.towers;
    let num = towers.length;
    let base = '\n0  1  2';
    while(towers.some((x)=>x.length>0)) {
      let line = ''
      towers.forEach((tower)=>{
        let item = tower[0] === undefined ? ' ' : tower.shift()
        line += `${item}  `;
      })
      base = line + '\n' + base;
    }
    console.log(base);
  }

  isValidMove(startTowerIdx, endTowerIdx){
    let fromTower = this.towers[startTowerIdx];
    let toTower = this.towers[endTowerIdx];
    if(_.isEmpty(fromTower)) {return false;}
    else if (_.isEmpty(toTower)) {return true;}
    else{return _.last(fromTower) < _.last(toTower);}
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

let g = new Game(3);
// g.promptMove(reader,(from,to)=>console.log(from + ' ' + to)); // test for promptMove
//tests for isValidMove
console.log(g.isValidMove(1,2));
console.log(g.isValidMove(2,1));
console.log(g.isValidMove(0,1));
