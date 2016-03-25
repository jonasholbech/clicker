'use strict';
console.log("Scenes loaded");
var Scenes = {
    container:null,
    sprite:null,
    init:function(){
        this.container = new createjs.Container();
        this.sprite = new createjs.Sprite(Sprites.worlds, "w_1");
        this.container.addChild(this.sprite);
        Game.stage.addChild(this.container);
        this.left=new createjs.Bitmap(Preload.queue.getResult('gfx/list-arrow.png'));
        this.right=new createjs.Bitmap(Preload.queue.getResult('gfx/list-arrow.png'));

        this.left.regX=this.right.regX=14;
        this.left.regY=this.right.regY=19;
        this.left.x=10;
        this.left.y=this.right.y=Game.stage.canvas.height/2;
        this.right.x=Game.stage.canvas.width-10;
        this.left.rotation=180;
    },
    setScene:function(index){
        var i,z;
        Shop.close();//TODO shop kræver to klik's efter setScene
        console.log("set scene",index, this.sprite);
        Game.currentScene=index;
        this.sprite.gotoAndStop("w_"+(index+1));
        this.container.removeAllChildren();
        this.container.addChild(this.sprite)
        //repopulate
        for(i=0; i<Game.creatures[index].length; i++){
            this.container.addChild(Game.creatures[index][i]);
        }
        if(index==0){
            for(i=0; i<Game.crates.length;i++){
                this.container.addChild(Game.crates[i]);
            }
        }
        this.addArrows();
    },
    arrowClicked:function(evt, data){
        this.setScene(data.index)
    },
    addArrows:function(){
        if(Game.unlocks[Game.currentScene+1]>0 || Game.creatures[Game.currentScene+1].length>0){//TODO duer ikke, du kan have creatures i næste verden uden de er unlocked, hack
            //right
            this.container.addChild(this.right)
            this.right.removeAllEventListeners()
            this.right.on('click', this.arrowClicked, this, true, {index:Game.currentScene+1});
        }
        if(Game.currentScene>0){
            //left
            this.container.addChild(this.left)
            this.left.removeAllEventListeners()
            this.left.on('click', this.arrowClicked, this, true, {index:Game.currentScene-1});
        }
    }
}