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
    baseURL: 'http://localhost:8641/'
});
const faker = require('faker');
const __r = require('rowinia');
import BlankBlock from './BlankBlock.png';
import GreenBlock from './GreenBlock.png';
import BlueBlock from './BlueBlock.png';

let board={ '0x0':{c:''},'1x0':{c:''},'2x0':{c:''},
            '0x1':{c:''},'1x1':{c:''},'2x1':{c:''},
            '0x2':{c:''},'1x2':{c:''},'2x2':{c:''}};
let keys;

function resetBoard(){
    // get all the elements and set the blank block
    var list = document.getElementsByClassName('cell');

    // iterate over elements and output their HTML content
    for (var i = 0; i < list.length; i++) {
        // Add the image to our existing div.
        var myIcon = new Image();
        myIcon.src = BlankBlock;
        myIcon.width = 150;
        myIcon.height = 150;

        list[i].innerHTML = '';
        list[i].appendChild(myIcon)
        
        __r.espond(list[i],'click',pick);
        board[list[i].id].c='';
        board[list[i].id].img=myIcon;
    }
}

function hide(el) {
    el.style.display = 'none';
}

function show(el, value) {
    el.style.display = value;
}

function checkWin(){

    if (board['0x0'].c !== '' && board['0x0'].c === board['1x1'].c && board['1x1'].c === board['2x2'].c ){
        console.log(board['0x0'].c + 'win diagnal' );
        __r.addClass(board['0x0'].img,'animated');
        __r.addClass(board['0x0'].img,'bounce');
        __r.addClass(board['1x1'].img,'animated');
        __r.addClass(board['1x1'].img,'bounce');
        __r.addClass(board['2x2'].img,'animated');
        __r.addClass(board['2x2'].img,'bounce');   
        if (board['0x0'].c=='blue'){
            show(document.getElementById('youwin'),'');
        } else {
            show(document.getElementById('youloose'),'');
        }
    }
    if (board['0x2'].c !== '' && board['0x2'].c === board['1x1'].c && board['1x1'].c === board['2x0'].c ){
        console.log(board['0x2'].c + 'win diagnal' );
        __r.addClass(board['0x2'].img,'animated');
        __r.addClass(board['0x2'].img,'bounce');
        __r.addClass(board['1x1'].img,'animated');
        __r.addClass(board['1x1'].img,'bounce');
        __r.addClass(board['2x0'].img,'animated');
        __r.addClass(board['2x0'].img,'bounce');   
        if (board['0x2'].c=='blue'){
            show(document.getElementById('youwin'),'');
        } else {
            show(document.getElementById('youloose'),'');
        }
    }

    for (let x=0; x<3; x++){
        let k0 = `${x}x0`;
        let k1 = `${x}x1`;
        let k2 = `${x}x2`;

        if (board[k0].c !== '' && board[k0].c === board[k1].c && board[k1].c === board[k2].c ){
            console.log(board[k0].c + 'win on row'+x );
            __r.addClass(board[k0].img,'animated');
            __r.addClass(board[k0].img,'bounce');
            __r.addClass(board[k1].img,'animated');
            __r.addClass(board[k1].img,'bounce');
            __r.addClass(board[k2].img,'animated');
            __r.addClass(board[k2].img,'bounce');            
            if (board[k0].c=='blue'){
                show(document.getElementById('youwin'),'');
            } else {
                show(document.getElementById('youloose'),'');
            }
        }
    }

    for (let y=0; y<3; y++){
        let l0 = `0x${y}`;
        let l1 = `1x${y}`;
        let l2 = `2x${y}`;

        if (board[l0].c !== '' && board[l0].c === board[l1].c && board[l1].c === board[l2].c ){
            console.log(board[l0].c + 'win on column'+y );
            __r.addClass(board[l0].img,'animated');
            __r.addClass(board[l0].img,'bounce');
            __r.addClass(board[l1].img,'animated');
            __r.addClass(board[l1].img,'bounce');            
            __r.addClass(board[l2].img,'animated');
            __r.addClass(board[l2].img,'bounce');  
            if (board[l0].c=='blue'){
                show(document.getElementById('youwin'),'');
            } else {
                show(document.getElementById('youloose'),'');
            }
        }
    }    
}

function pick(e){
    console.log(board);

    let id = e.srcElement.parentElement.id;
    if (board[id].c === ''){
        e.srcElement.src = BlueBlock;
        board[id].c = 'blue';

        checkWin();

        keys.splice(keys.indexOf(id),1);
        console.log(keys);

        if (keys.length===0){
            show(document.getElementById('draw'),'');
            return;
        }
         // pick somewhere are random for other block to go
        let i = Math.floor(Math.random() * (keys.length));
        let place = keys[i];
        keys.splice(i,1);        

        
        console.log(`Chosen to put somewhere at ${board[place]} `);
        board[place].img.src =GreenBlock;
        board[place].c='green';

        checkWin();

    } else {
        console.log('no')
    }

}

/**
 * Main function to display the interface
 */
function run() {

    resetBoard();

    keys = Object.keys(board);

    __r.espond(document.getElementById('btn-reset'),'click',resetBoard);


    document.getElementById('ip-name').value=faker.name.findName();

}

// when page is ready display the upload
__r.eady(run);



