'use strict';
console.log("Scenes loaded");
var Scenes = {
    //list:[],
    container:null,
    sprite:null,
    init:function(){
        //var i;

        //for(i=0; i<Game.settings.scenes.length; i++){
            this.container = new createjs.Container();
            this.sprite = new createjs.Sprite(Sprites.worlds, "w_1")
            this.container.addChild(this.sprite);
            Game.stage.addChild(this.container)
        //    Scenes.list.push(t)
        //}
    },
    setScene:function(index){
        //Game.stage.removeAllChildren()
        console.log("set scene",index, this.sprite)
        Game.currentScene=index;
        this.sprite.gotoAndStop("w_"+(index+1));
        console.log("sprite", this.sprite)
        //var a = ["a", "b", "c"];

        /*Scenes.list.forEach(function(entry) {
            Game.stage.removeChild(entry);
        });
        Game.stage.addChild(Scenes.list[index])
        */
    }
}