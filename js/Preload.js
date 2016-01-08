"use strict"
console.group();
console.log("Preload loaded")
var Preload = {
    queue: new createjs.LoadQueue(true),
    loadText: new createjs.Text("", "50px Courier New", "#FFF"),
    load:function(){
        Game.stage.addChild(this.loadText)
        this.queue.installPlugin(createjs.Sound)
        this.queue.on("progress", this.progress, this)
        this.queue.on("complete", Preload.complete)
        this.queue.loadManifest("js/preloadManifest.json")
    },
    complete:function(){
        Game.setupGame();
    },
    progress:function(e){
        //console.log("update");
        this.loadText.text= Math.round(e.progress*100)+"% done"
        Game.stage.update();
    }
}
