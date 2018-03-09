'use strict';
const table = require('table').table;
const _ = require('lodash');
const chalk = require('chalk');
/** represents the OXO board */
class Board {


    constructor(view){
        this.board= [ [], [] , [] ];
        for (let x=0; x<3; x++){
            for (let y=0; y<3; y++){
                this.board[x][y]={'x':x,'y':y,id:{'c':'','view':view[x][y]}};
            }
        }
        this.moveCallbacks={ 'blue':null,'green':null};
        this.resultCallbacks={'blue':null,'green':null};
    }

    toString(){
        let op = [ [], [], [] ];
        for (let y=0; y<3; y++){
            for (let x=0; x<3; x++){
                let s = this.board[x][y].id.c;
                s = chalk.green(_.padEnd(s));
                op[x][y]=`[${x}:${y}] ${(this.board[x][y]).id.c}`;
            }
        }
        return table(op);
    }

    isMoveValid(move){
        if (move.x<0 || move.x>2){ return false;}
        if (move.y<0 || move.y>2){ return false;}
        if (!move.id) { return false;}
        if (!move.id.c) {return false;}
        if (!(move.id.c===Board.BLUE || move.id.c===Board.GREEN) ) {return false;}
        if (this.board[move.x][move.y].id.c !== ''){ return false; }

        return true;
    }

    makeMove(move){
        if (this.isMoveValid(move)){
            this.board[move.x][move.y].id.c=this.playerToMove;
            // run the validation logic for results
            let r = this.checkResultForWin();
            if (r.result === 'win' || r.result === 'draw'){
                // this.resultCallbacks[this.playerToMove](r);
                this.resultCallbacks[Board.GREEN](r);
                this.resultCallbacks[Board.BLUE](r);
            } else {
                console.log(this.playerToMove);

                if(this.playerToMove===Board.GREEN) {
                    this.playerToMove= Board.BLUE;
                } else {
                    this.playerToMove = Board.GREEN;
                }

                this.moveCallbacks[this.playerToMove]();

            }
        }
    }

    _checkLine(line){
        let a = line[0].id.c;
        let b = line[1].id.c;
        let c = line[2].id.c;

        let l = a.charAt(0)+b.charAt(0)+c.charAt(0);

        if (l === 'bbb' || l === 'ggg'){
            return 'win';
        } else if (l === 'bb' || l === 'gg'){
            return 'possible';
        } else if (l === 'b' || l === 'g') {
            return 'one';
        } else if (l === '' ) {
            return 'empty';
        } else if (l === 'bg' || l === 'gb'){
            return 'mix';
        } else {
            return 'full';
        }
    }

    checkResultForWin(){
        // diagonals
        let line = [];

        line.push( [this.board[0][0], this.board[1][1], this.board[2][2] ] );
        line.push( [this.board[2][0], this.board[1][1], this.board[0][2] ] );
        // add rows
        line.push( this.board[0] );
        line.push( this.board[1] );
        line.push( this.board[2] );

        line.push( [this.board[0][0], this.board[1][0], this.board[2][0] ] );
        line.push( [this.board[0][1], this.board[1][1], this.board[2][1] ] );
        line.push( [this.board[0][2], this.board[1][2], this.board[2][2] ] );

        let retval = {result:'draw'};
        for (let l=0; l<line.length; l++){
            let r = this._checkLine(line[l]);
            if (r === 'win' ){
                retval.result =  'win';
                console.log(line[l]);
                retval.who = line[l][0].id.c;
                retval.line = line[l];
                break;
            }
            if (r !== 'full'){
                retval.result = '';
            }
        }
        return retval;
    }

    setResultCallback(player,callback){
        this.resultCallbacks[player]=callback;
    }

    setMoveCallback(player,callback){
        this.moveCallbacks[player]=callback;
    }

    start(player){
        this.playerToMove = player;
        this.moveCallbacks[player](this);
    }

    getValidMoves(){
        let valid=[];
        for (let x=0; x<3; x++){
            for (let y=0; y<3; y++){
                let s = this.board[x][y].id.c;
                if (s===''){
                    valid.push(this.board[x][y]);
                }
            }
        }
        return valid;
    }
}

module.exports = Board;
module.exports.GREEN = 'green';
module.exports.BLUE = 'blue';