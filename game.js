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
    let base = '\n1  2  3';
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
