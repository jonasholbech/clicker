'use strict';
console.log("Explosion loaded");
var Explosion = function (parent, posX, posY) {

    var my
    var r = Math.floor(Math.random()*4)+1;
    console.log(r)
    switch(r){
        case 1:
            var data = {
                images: ["img/explode_1.png"],
                frames: {
                    width: 96,
                    height: 96,
                    regX: 32,
                    regY: 32
                },
                framerate:12,
                animations: {
                    explode: [0, 16]
                }
            }
            break;
        case 2:
            var data = {
                images: ["img/explode_2.png"],
                frames: {
                    width: 96,
                    height: 96,
                    regX: 48,
                    regY: 48
                },
                framerate:12,
                animations: {
                    explode: [0, 14]
                }
            }
            break;
        case 3:
            var data = {
                images: ["img/explode_3.png"],
                frames: {
                    width: 64,
                    height: 64,
                    regX: 32,
                    regY: 32
                },
                framerate:12,
                animations: {
                    explode: [0, 15]
                }
            }
            break;
        case 4:
            var data = {
                images: ["img/explode_4.png"],
                frames: {
                    width: 320,
                    height: 232,
                    regX: 160,
                    regY: 116
                },
                framerate:12,
                animations: {
                    explode: [0, 24]
                }
            }
            break;
    }
        
        var spriteSheet = new createjs.SpriteSheet(data);

    my = new createjs.Sprite(spriteSheet);
    my.x = posX;
    my.y = posY;
    parent.addChild(my);
    my.gotoAndPlay("explode");
    //var a = createjs.Sound.play("audio/explosion.mp3");
    my.addEventListener("animationend", function () {
        parent.removeChild(my);
    });

    return my;
};