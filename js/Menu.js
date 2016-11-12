/**
 * Created by holbech on 12/11/2016.
 */
"use strict";
console.log("Menu loaded");
var Menu = {
    items:[

    ],
    state:'closed',
    button:null,
    container:null,
    init:function(parent){
        Menu.container = new createjs.Container();
        this.button = new createjs.Bitmap(Preload.queue.getResult('gfx/menu.png'));//skal være sprite en dag
        this.button.x=parent.canvas.width-64;
        this.button.y=0;
        parent.addChild(this.button);
        this.button.on('click', Menu.toggleMenu);

        var item1 = new createjs.Container();
        var square = new createjs.Shape();
        square.graphics.beginFill("#00F").drawRect(0,0,200,100);
        var text = new createjs.Text("Clean DB", "30px Verdana");
        item1.addChild(square, text);
        item1.on('click', function(){
           Database.clean();
            window.location='';
        });
        Menu.container.addChild(item1);

    },
    toggleMenu:function(){
        if(Menu.state==='open'){
            Menu.state='closed';
            Menu.close();
        } else {
            Menu.state='open';
            Menu.open();
        }
    },
    open:function(){
        Menu.state='open';
        Game.stage.addChild(Menu.container);
    },
    close:function(){
        Menu.state='closed';
        Game.stage.removeChild(Menu.container);
    }
};