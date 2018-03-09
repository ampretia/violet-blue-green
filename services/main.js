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
    baseURL: 'https://openwhisk.eu-gb.bluemix.net/api/v1/web/markedwards%40ampretia.co.uk_dev/Ampretia/'
});

let hash = require('hash.js');

const faker = require('faker');
const __r = require('rowinia');

const BlankBlock = require('./BlankBlock.png');
const GreenBlock  = require( './GreenBlock.png');
const BlueBlock  = require( './BlueBlock.png');

let board={
    '0x0':{c:''},'1x0':{c:''},'2x0':{c:''},
    '0x1':{c:''},'1x1':{c:''},'2x1':{c:''},
    '0x2':{c:''},'1x2':{c:''},'2x2':{c:''}
};
let keys;

let playColour;

/**
 * Rest the board back to a starting state, each cell set to blank
 */
function resetBoard(){
    // get all the elements and set the blank block
    let list = __r.el('.cell');

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

        // keep a list of image elements
        board[list[i].id].c='';
        board[list[i].id].img=myIcon;
    }

    // list of the keys - used for automatically choosing the 'AI' move
    keys = Object.keys(board);

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

async function send(result){
    try{
        let res = await req.post('Event.json',result);
        console.log(res.data);
    } catch(err){
        console.log(err);
    }
}

/**
 * Has the player won or lost?
 */
async function checkWin(){

    let result = {
        you:''
    };



    if (board['0x0'].c !== '' && board['0x0'].c === board['1x1'].c && board['1x1'].c === board['2x2'].c ){

        removeBoardEvent();
        __r.addClass(board['0x0'].img,'animated');
        __r.addClass(board['0x0'].img,'bounce');
        __r.addClass(board['1x1'].img,'animated');
        __r.addClass(board['1x1'].img,'bounce');
        __r.addClass(board['2x2'].img,'animated');
        __r.addClass(board['2x2'].img,'bounce');
        if (board['0x0'].c==='blue'){
            result.you='Win';
        } else {
            result.you='Loose';
        }

    }
    else if (board['0x2'].c !== '' && board['0x2'].c === board['1x1'].c && board['1x1'].c === board['2x0'].c ){

        removeBoardEvent();
        __r.addClass(board['0x2'].img,'animated');
        __r.addClass(board['0x2'].img,'bounce');
        __r.addClass(board['1x1'].img,'animated');
        __r.addClass(board['1x1'].img,'bounce');
        __r.addClass(board['2x0'].img,'animated');
        __r.addClass(board['2x0'].img,'bounce');
        if (board['0x2'].c==='blue'){
            result.you='Win';
        } else {
            result.you='Loose';
        }

    }

    for (let x=0; x<3; x++){
        let k0 = `${x}x0`;
        let k1 = `${x}x1`;
        let k2 = `${x}x2`;

        if (board[k0].c !== '' && board[k0].c === board[k1].c && board[k1].c === board[k2].c ){

            removeBoardEvent();
            __r.addClass(board[k0].img,'animated');
            __r.addClass(board[k0].img,'bounce');
            __r.addClass(board[k1].img,'animated');
            __r.addClass(board[k1].img,'bounce');
            __r.addClass(board[k2].img,'animated');
            __r.addClass(board[k2].img,'bounce');
            if (board[k0].c==='blue'){
                result.you='Win';
            } else {
                result.you='Loose';
            }

        }

    }

    for (let y=0; y<3; y++){
        let l0 = `0x${y}`;
        let l1 = `1x${y}`;
        let l2 = `2x${y}`;

        if (board[l0].c !== '' && board[l0].c === board[l1].c && board[l1].c === board[l2].c ){

            removeBoardEvent();
            __r.addClass(board[l0].img,'animated');
            __r.addClass(board[l0].img,'bounce');
            __r.addClass(board[l1].img,'animated');
            __r.addClass(board[l1].img,'bounce');
            __r.addClass(board[l2].img,'animated');
            __r.addClass(board[l2].img,'bounce');
            if (board[l0].c==='blue'){
                result.you='Win';
            } else {
                result.you='Loose';
            }

        }

    }

    if (result.you===''){
        if (keys.length===0){
            result.you = 'Draw';
        }
    }

    if (result.you==='Win'){
        __r.show(__r.e('#youwin'),'');
        await send(result);
    } else if (result.you==='Loose') {
        __r.show(__r.e('#youloose'),'');
        await send(result);
    } else if (result.you==='Draw'){
        __r.show(__r.e('#youdraw'),'');
        await send(result);
    }

    return result;
}

async function pick(e){

    let r;

    let id = e.srcElement.parentElement.id;
    if (board[id].c === ''){

        e.srcElement.src = BlueBlock;
        board[id].c = 'blue';
        keys.splice(keys.indexOf(id),1);

        r = await checkWin();
        if (r.you !== ''){
            return;
        }

        // pick somewhere are random for other block to go
        let i = Math.floor(Math.random() * (keys.length));
        let place = keys[i];
        keys.splice(i,1);
        board[place].img.src = GreenBlock;
        board[place].c='green';

        r = await checkWin();
        if (r.you !== ''){
            return;
        }
    } else {
        console.log('no');
    }

}


/**
 * Main function to display the interface
 */
function run() {
    // addEvent(document.getElementById('btn-reset'),'click',resetBoard);

    __r.espond(__r.e('#btn-reset'),'click',resetBoard);
    let name = faker.name.findName();
    let h = hash.sha256().update('abc').digest('hex');
    console.log(h);
    __r.e('#ip-name').value=name+'('+h+')';
    resetBoard();
}

// when page is ready display the upload
__r.eady(run);



