'use strict';
console.log("Utils loaded");
var Utils = {
    distance:function(o1, o2){
        var difx = o2.x - o1.x;
        var dify = o2.y - o1.y;
        var t = Math.sqrt( (difx*difx) + (dify*dify) );
        return t;
    },
    getRandomInt:function(min, max){
        if (min === undefined){
            throw new Error("getRandomInt must have at least one parameter: max");
        }
        // If one parameter is given, use it as max and default min to 0
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getDelta:function(start,end,speed){
        var dy = end.y - start.y;
        var dx = end.x - start.x;
        var distance=Math.sqrt((dx*dx)+(dy*dy));
        dx/=distance;
        dy/=distance;
        dx*=speed;
        dy*=speed;
        return {dX:dx,dY:dy}
    },
    getRandomCoordinates:function(oWidth, oHeight){
        return {
            x:Utils.getRandomInt(oWidth, Game.stage.canvas.width-oWidth),
            y:Utils.getRandomInt(oHeight, Game.stage.canvas.height-oHeight)
        }
    },
    nFormatter:function(num, digits) {
        var si = [
            { value: 1E18, symbol: "E" },
            { value: 1E15, symbol: "P" },
            { value: 1E12, symbol: "T" },
            { value: 1E9,  symbol: "G" },
            { value: 1E6,  symbol: "M" },
            { value: 1E3,  symbol: "k" }
        ], i;
        for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
                return (num / si[i].value).toFixed(digits).replace(/\.?0+$/, "") + si[i].symbol;
            }
        }
        return num;
    }
}