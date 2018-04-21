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
    let towers = JSON.parse(JSON.stringify(this.towers)); //deep copy tower;
    let num = towers.length;
    let base = '\n0  1  2';
    while(towers.some((x)=>x.length>0)) {
      let line = ''
      towers.forEach((tower)=>{
        let item = tower[0] === undefined ? ' ' : tower.shift() // this part may cause problem if i didnt deep clone at first
        line += `${item}  `;
      })
      base = line + '\n' + base;
    }
    console.log(base);
  }

  isValidMove(startTowerIdx, endTowerIdx){
    let fromTower = this.towers[startTowerIdx];
    let toTower = this.towers[endTowerIdx];
    if(_.isEmpty(fromTower)) { return false;}
    else if (_.isEmpty(toTower)) { return true;}
    else{return _.last(fromTower) < _.last(toTower);}
  }

  move(startTowerIdx, endTowerIdx){

    let fromTower = this.towers[startTowerIdx];
    let toTower = this.towers[endTowerIdx];
    if(this.isValidMove(startTowerIdx,endTowerIdx)) {
      toTower.push(fromTower.pop());
      this.print();
      return true;
    }
    throw Error('Invalid Move');
    return false;
  }

  isWon(){
    if (this.towers[0].length === 0){
      return this.filter(tower=>tower.length === 0).length === this.length - 1;
    }
    return false;
  }

  run(completionCallback){
    this.promptMove(reader,this.move.bind(this));//really important, remmeber to bind this.
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
// console.log(g.isValidMove(1,2));
// console.log(g.isValidMove(2,1));
// console.log(g.isValidMove(0,1));
// g.move(1,2);
// g.move(0,1);
// g.move(1,2);
g.run();
