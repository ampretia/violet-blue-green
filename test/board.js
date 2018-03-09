'use strict';

const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
chai.use(require('chai-subset'));
// const expect = chair.expect;
const sinon = require('sinon');

// test classes

const Board = require('../src/board.js');

describe('Board validation', ()=>{

    describe('#constructor', ()=>{
        it('should create new blank board',()=>{
            let b = new Board();
            b.should.be.instanceOf(Board);
        });
        it('should have a toString',()=>{
            let b = new Board();
            console.log(b.toString());
        });
    });
    describe('#isValidMove',()=>{
        let b;

        beforeEach(()=>{
            b = new Board();
        });

        it('rows in range',()=>{
            b.isMoveValid({x:-1,y:0,id:{c:'green'}}).should.be.false;
            b.isMoveValid({x:3,y:0,id:{c:'green'}}).should.be.false;
            b.isMoveValid({x:0,y:0,id:{c:'green'}}).should.be.true;
            b.isMoveValid({x:1,y:0,id:{c:'green'}}).should.be.true;
            b.isMoveValid({x:2,y:0,id:{c:'green'}}).should.be.true;
        });
    });

    describe('#checkline', ()=>{
        let b;

        beforeEach(()=>{
            b = new Board();
        });

        //
        /*
        [[
            {"x":0,"y":0,"id":{"c":"","view":null}},
            {"x":0,"y":1,"id":{"c":"","view":null}},
            {"x":0,"y":2,"id":{"c":"","view":null}}
        ],
        [
            {"x":1,"y":0,"id":{"c":"","view":null}},
            {"x":1,"y":1,"id":{"c":"","view":null}},
            {"x":1,"y":2,"id":{"c":"","view":null}}
        ],
        [
            {"x":2,"y":0,"id":{"c":"","view":null}},
            {"x":2,"y":1,"id":{"c":"","view":null}},
            {"x":2,"y":2,"id":{"c":"","view":null}}
        ]]
        */
        //
        //

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'','view':null}},
                {'x':0,'y':1,'id':{'c':'','view':null}},
                {'x':0,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'','view':null}},
                {'x':1,'y':1,'id':{'c':'','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('');
        });

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'green','view':null}},
                {'x':0,'y':1,'id':{'c':'green','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'','view':null}},
                {'x':1,'y':1,'id':{'c':'','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('win');
        });

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'green','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'blue','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'green','view':null}},
                {'x':1,'y':1,'id':{'c':'','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'green','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('win');
        });

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'green','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'blue','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'blue','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'blue','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'green','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('win');
        });

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'blue','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'green','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'blue','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('win');

        });

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'green','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'blue','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'blue','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'blue','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('win');

        });

        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'green','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'blue','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'blue','view':null}},
                {'x':2,'y':1,'id':{'c':'blue','view':null}},
                {'x':2,'y':2,'id':{'c':'green','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('draw');
            b.getValidMoves().length.should.equal(0);
        });
        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'green','view':null}},
                {'x':1,'y':1,'id':{'c':'blue','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('');

        });
        it('',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'green','view':null}},
                {'x':0,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'blue','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'blue','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            b.checkResultForWin().result.should.equal('win');

        });
    });

    describe('#getValidMoves',()=>
    {

        let b;

        beforeEach(()=>{
            b = new Board();
        });

        it('should return full size array of 9',()=>{
            b.getValidMoves().length.should.equal(9);
        });

        it('should return 1 for a partially filled',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'green','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'blue','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'blue','view':null}},
                {'x':2,'y':1,'id':{'c':'blue','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            let m = b.getValidMoves();
            m.length.should.equal(1);
            m.should.containSubset([{x:2,y:2}]);

        });
        it('should return 0 for a fully filled',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'green','view':null}},
                {'x':1,'y':1,'id':{'c':'green','view':null}},
                {'x':1,'y':2,'id':{'c':'blue','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'blue','view':null}},
                {'x':2,'y':1,'id':{'c':'blue','view':null}},
                {'x':2,'y':2,'id':{'c':'blue','view':null}}
            ]];
            b.getValidMoves().length.should.equal(0);
        });
        it('should return 0 for a fully filled',()=>{
            b.board=         [[
                {'x':0,'y':0,'id':{'c':'blue','view':null}},
                {'x':0,'y':1,'id':{'c':'blue','view':null}},
                {'x':0,'y':2,'id':{'c':'green','view':null}}
            ],
            [
                {'x':1,'y':0,'id':{'c':'green','view':null}},
                {'x':1,'y':1,'id':{'c':'blue','view':null}},
                {'x':1,'y':2,'id':{'c':'','view':null}}
            ],
            [
                {'x':2,'y':0,'id':{'c':'','view':null}},
                {'x':2,'y':1,'id':{'c':'','view':null}},
                {'x':2,'y':2,'id':{'c':'','view':null}}
            ]];
            let m = b.getValidMoves();
            m.should.containSubset([ {x:1,y:2},{x:2,y:0},{x:2,y:1},{x:2,y:2} ]);

        });
    });

    describe('#checkline', ()=>{
        let b;

        beforeEach(()=>{
            b = new Board();
        });

        it('emptyLine',()=>{
            b._checkLine([ {id:{c:''}},  {id:{c:''}} ,  {id:{c:''}}  ]  ).should.equal('empty');
        });

        it('win',()=>{
            b._checkLine([ {id:{c:'green'}},  {id:{c:'green'}} ,  {id:{c:'green'}}  ]  ).should.equal('win');
            b._checkLine([ {id:{c:'blue'}},  {id:{c:'blue'}} ,  {id:{c:'blue'}}  ]  ).should.equal('win');
        });

        it('possible',()=>{
            b._checkLine([ {id:{c:'green'}},  {id:{c:'green'}} ,  {id:{c:''}}  ]  ).should.equal('possible');
            b._checkLine([ {id:{c:'green'}},  {id:{c:''}} ,  {id:{c:'green'}}  ]  ).should.equal('possible');
            b._checkLine([ {id:{c:''}},  {id:{c:'green'}} ,  {id:{c:'green'}}  ]  ).should.equal('possible');
            b._checkLine([ {id:{c:'blue'}},  {id:{c:'blue'}} ,  {id:{c:''}}  ]  ).should.equal('possible');
            b._checkLine([ {id:{c:'blue'}},  {id:{c:''}} ,  {id:{c:'blue'}}  ]  ).should.equal('possible');
            b._checkLine([ {id:{c:''}},  {id:{c:'blue'}} ,  {id:{c:'blue'}}  ]  ).should.equal('possible');
        });
        it('one',()=>{
            b._checkLine([ {id:{c:'green'}},  {id:{c:''}} ,  {id:{c:''}}  ]  ).should.equal('one');
            b._checkLine([ {id:{c:''}},  {id:{c:''}} ,  {id:{c:'green'}}  ]  ).should.equal('one');
            b._checkLine([ {id:{c:''}},  {id:{c:'green'}} ,  {id:{c:''}}  ]  ).should.equal('one');
            b._checkLine([ {id:{c:'blue'}},  {id:{c:''}} ,  {id:{c:''}}  ]  ).should.equal('one');
            b._checkLine([ {id:{c:''}},  {id:{c:''}} ,  {id:{c:'blue'}}  ]  ).should.equal('one');
            b._checkLine([ {id:{c:''}},  {id:{c:'blue'}} ,  {id:{c:''}}  ]  ).should.equal('one');
        });
        it('mix',()=>{
            b._checkLine([ {id:{c:'green'}},  {id:{c:'blue'}} ,  {id:{c:''}}  ]  ).should.equal('mix');
            b._checkLine([ {id:{c:''}},  {id:{c:'blue'}} ,  {id:{c:'green'}}  ]  ).should.equal('mix');
            b._checkLine([ {id:{c:''}},  {id:{c:'green'}} ,  {id:{c:'blue'}}  ]  ).should.equal('mix');
            b._checkLine([ {id:{c:'green'}},  {id:{c:''}} ,  {id:{c:'blue'}}  ]  ).should.equal('mix');
            b._checkLine([ {id:{c:''}},  {id:{c:'blue'}} ,  {id:{c:'green'}}  ]  ).should.equal('mix');
        });
        it('full',()=>{
            b._checkLine([ {id:{c:'blue'}},  {id:{c:'green'}} ,  {id:{c:'green'}}  ]  ).should.equal('full');
        });



    });

    // describe('#setmove',()=>{
    //     let b;

    //     beforeEach(()=>{
    //         b = new Board();
    //     });

    //     it('should set a valid move',()=>{
    //         b.makeMove({x:1,y:1,id:{c:Board.GREEN}});
    //         console.log(b.toString());
    //     });
    // });



});