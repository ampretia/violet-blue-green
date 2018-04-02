/*
Copyright [2018] [Matthew B White]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';
require('bulma/css/bulma.css');
require('animate.css/animate.css');


const axios = require('axios');
const req = axios.create({
    baseURL: 'https://openwhisk.eu-gb.bluemix.net/api/v1/web/markedwards%40ampretia.co.uk_dev/Ampretia/Violet-Blue-Green%20to%20db.json'
});

let hash = require('hash.js');
const faker = require('faker');
const __r = require('rowinia');

const BlankBlock = require('./BlankBlock.png');
const GreenBlock  = require( './GreenBlock.png');
const BlueBlock  = require( './BlueBlock.png');

const Board = require('./board.js');

let b;
let h;

async function send(result){
    try{
        console.log(JSON.stringify(result));
        result.id = h;
        let payload = { result};

        let res = await req.post('',payload);
        console.log(res.data);
    } catch(err){
        console.log(err);
    }
}

async function handleResult(result){

    console.log(result);

    let line = result.line;

    removeBoardEvent();
    if (result.result==='win'){
        __r.addClass(line[0].id.view,'animated');
        __r.addClass(line[0].id.view,'bounce');
        __r.addClass(line[1].id.view,'animated');
        __r.addClass(line[1].id.view,'bounce');
        __r.addClass(line[2].id.view,'animated');
        __r.addClass(line[2].id.view,'bounce');

        if (result.who === 'blue'){
            __r.show(__r.e('#youwin'),'');
            await send(result);
        } else {
            __r.show(__r.e('#youloose'),'');
            await send(result);
        }
    } else {
        __r.show(__r.e('#youdraw'),'');
        await send(result);
    }


}
/**
 * Rest the board back to a starting state, each cell set to blank
 */
function resetBoard(){
    // get all the elements and set the blank block
    let list = __r.el('.cell');
    let el = [ [],[],[] ];
    // iterate over elements and output their HTML content
    for (let i = 0; i < list.length; i++) {
        // Add the image to our existing div.
        let myIcon = new Image();
        myIcon.src = BlankBlock;
        myIcon.width = 150;
        myIcon.height = 150;

        list[i].innerHTML = '';
        list[i].appendChild(myIcon);

        // add the click event which is to select pressed block
        __r.espond(list[i],'click',pick);

        let coords=list[i].id.split('x');
        el[coords[0]][coords[1]] = myIcon;

    }

    b = new Board(el);
    b.setResultCallback(Board.BLUE,handleResult);
    b.setResultCallback(Board.GREEN,function(){console.log('Computer won!!!');});
    b.setMoveCallback(Board.BLUE,function(){console.log('Computer is waiting...');});
    b.setMoveCallback(Board.GREEN,()=>{
        console.log('Thinking...');
        let m = b.getValidMoves();
        let i = Math.floor(Math.random()*m.length);

        console.log(m[i]);
        m[i].id.view.src =GreenBlock;
        b.makeMove({'x':m[i].x,'y':m[i].y,id:{'c':Board.GREEN}});

    });

    // hide any of the result boxes
    __r.hide(__r.e('#youwin'));
    __r.hide(__r.e('#youdraw'));
    __r.hide(__r.e('#youloose'));

}

/**
 * Quick helper function to make sure that the click events have been removed from the board
 */
function removeBoardEvent(){
    // get all the elements and set the blank block
    let list = __r.el('.cell');

    // iterate over elements and output their HTML content
    for (let i = 0; i < list.length; i++) {
        __r.emove(list[i],'click',pick);
    }
}



/**
 * Has the player won or lost?
 */


async function pick(e){

    let id = e.srcElement.parentElement.id;
    let coords = id.split('x');
    let move = {x:coords[0],y:coords[1],id:{c:Board.BLUE} };
    if (b.isMoveValid(move))
    {
        e.srcElement.src = BlueBlock;
        b.makeMove(move);

    } else {
        console.log('no');
    }

}


/**
 * Main function to display the interface
 */
function run() {
    // addEvent(document.getElementById('btn-reset'),'click',resetBoard);

    __r.espond(__r.e('#btn-reset'),'click',()=>{
        resetBoard();
        b.start(Board.BLUE);
    });
    let name = faker.name.findName();
    h = hash.sha256().update(name).digest('hex');

    __r.e('#ip-name').value=name;
    resetBoard();
    b.start(Board.BLUE);
}

// when page is ready display the upload
__r.eady(run);



