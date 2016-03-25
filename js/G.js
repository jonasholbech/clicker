"use strict";
console.log("G loaded");
var Game = {
    stage:null,
    init:function(){

        var statusBarSize = 0;//22;
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - statusBarSize;
        var canvas = document.querySelector('canvas');

        canvas.width=w;
        canvas.height=h;
        w = canvas.offsetWidth;
        h = canvas.offsetHeight;

        Game.stage = new createjs.Stage("canvas");
        createjs.Touch.enable(Game.stage);
        Preload.load();
    }
};
