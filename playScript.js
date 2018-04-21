const Game = require("./game.js");

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function completion (){
  reader.question('Play again? y : n', function(answer){
    if(answer === 'y'){
      g = new Game(3);
      g.run(reader, completion);
    }
    else {console.log('Bye');}
  })
  reader.close();
}

g = new Game(3);
g.run(reader, completion);
