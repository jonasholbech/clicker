'use strict';
console.log("Scenes loaded");
var Scenes = {
    list:[],
    init:function(){
        var i;
        for(i=0; i<Game.settings.scenes.length; i++){
            var t = new createjs.Container();
            var b = new createjs.Bitmap(Preload.queue.getResult(Game.settings.scenes[i].gfx))
            t.addChild(b);
            //Game.stage.addChild(t)
            Scenes.list.push(t)
        }
    },
    setScene:function(index){
        //Game.stage.removeAllChildren()
        Game.currentScene=index;
        //var a = ["a", "b", "c"];
        Scenes.list.forEach(function(entry) {
            Game.stage.removeChild(entry);
        });
        Game.stage.addChild(Scenes.list[index])

    }
}