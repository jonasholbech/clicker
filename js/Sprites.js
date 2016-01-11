'use strict';
console.log("Sprites loaded");
var Sprites = {
    init:function(){
        Sprites.creatures = new createjs.SpriteSheet(Preload.queue.getResult("creaturesSS"))
        Sprites.worlds = new createjs.SpriteSheet(Preload.queue.getResult("worldsSS"))
        Sprites.worldIcons = new createjs.SpriteSheet(Preload.queue.getResult("worldIconsSS"))
    }
}