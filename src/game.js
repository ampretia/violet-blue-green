'use strict';

const Board = require('../../violet-blue-green/src/board.js');
const readlineSync = require('readline-sync');


let view=[
    ['a','b','b'],
    ['d','e','f'],
    ['g','h','i']
];

let b = new Board(view);

let findWinableLine = (b,who)=> {
    for (let x=0; x<3; x++){
        let line = [b.getCell(x,0),b.getCell(x,1),b.getCell(x,2)];
        if (b._checkLine(line)==='possible'){
            console.log(line);
        }
    }
    for (let y=0; y<3; y++){
        let line = [b.getCell(0,y),b.getCell(1,y),b.getCell(2,y)];
        if (b._checkLine(line)==='possible'){
            console.log(line);
        }
    }
};

b.setMoveCallback(Board.GREEN,()=>{
    console.log('Thinking...');
    let m = b.getValidMoves();
    let i = Math.floor(Math.random()*m.length);

    findWinableLine(b,Board.GREEN);
    b.makeMove({'x':m[i].x,'y':m[i].y,id:{'c':Board.GREEN}});

});



b.setMoveCallback(Board.BLUE,()=>{
    console.log(b.toString());
    // get the users choice
    let move;
    let cont=false;
    do {
        let r = readlineSync.question('May I have your move? ');
        let d = r.match(/\s*([012])\s*,\s*([012])\s*/);
        if (d)
        {
            move = {x:d[1],y:d[2],id:{c:Board.BLUE}};
            cont = b.isMoveValid(move);
        } else if (r.match(/([xq]|EXIT|QUIT|END)/gi)){
            process.exit();
        }
    } while (!(cont));

    if (move){
        b.makeMove(move);
    }


});

b.setResultCallback(Board.BLUE,(result)=>{
    console.log(b.toString());
    console.log(`${result.result} for ${result.who}`);
    // console.log(JSON.stringify(result));

    process.exit(0);
});

b.setResultCallback(Board.GREEN,(result)=>{
    // console.log('Computer wins');
    // console.log(result);
    // console.log(b.toString());
    // process.exit(0);
});

b.start(Board.BLUE);