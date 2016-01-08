"use strict";
console.log("Shop loaded");
var Shop = {
    init:function(){

    },
    open:function(){
        var i;
        var xPos=20;
        var limit = Game.unlocks[Game.currentScene];
        Shop.container = new createjs.Container();
        for(i=0; i<limit; i++){
            var t = new createjs.Sprite(Sprites.creatures, (Game.currentScene+1)+"_"+(i+1));
            t.x=xPos;
            Shop.container.addChild(t);
            xPos+=80;
        }
        Shop.container.y=Game.stage.canvas.height-70;
        Game.stage.addChild(Shop.container)
        //TODO figure out prices
    },
    close:function(){
        Game.stage.removeChild(Shop.container)
    }
}