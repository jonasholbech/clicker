"use strict";
console.log("G loaded");
var Game = {
    stage:null,
    init:function(){
        Game.stage = new createjs.Stage("canvas");
        createjs.Touch.enable(Game.stage);
        Preload.load();
    }
};
