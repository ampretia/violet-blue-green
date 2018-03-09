'use strict';

const Board = require('./board.js');
const readlineSync = require('readline-sync');

let view=[
    ['a','b','b'],
    ['d','e','f'],
    ['g','h','i']
];

let b = new Board(view);

b.setMoveCallback(Board.GREEN,()=>{
    console.log('Thinking...');
    let m = b.getValidMoves();
    let i = Math.floor(Math.random()*m.length);

    console.log(m[i]);
    b.makeMove({'x':m[i].x,'y':m[i].y,id:{'c':Board.GREEN}});

});

b.setMoveCallback(Board.BLUE,()=>{
    console.log(b.toString());
    // get the users choice
    let r = readlineSync.question('May I have your move? ').split(',');
    let move = {x:r[0],y:r[1],id:{c:Board.BLUE}};
    console.log(move);
    b.makeMove(move);

});

b.setResultCallback(Board.BLUE,(result)=>{
    console.log(JSON.stringify(result));
    console.log(b.toString());
    process.exit(0);
});

b.setResultCallback(Board.GREEN,(result)=>{
    console.log('Computer wins');
    console.log(result);
    console.log(b.toString());
    process.exit(0);
});

b.start(Board.BLUE);