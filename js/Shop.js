"use strict";
console.log("Shop loaded");
var Shop = {
    prices:[
        [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000],
        [128000, 256000, 512000, 1024000, 2048000],
        [4096000, 4096000*2, 4096000*4, 4096000*8, 4096000*16, 4096000*32],
        [4096000*64, 4096000*128, 4096000*256, 4096000*512, 4096000*1024],
        [8388608000,8388608000*2, 8388608000*4, 8388608000*8, 8388608000*16, 8388608000*32],
        [8388608000*64, 8388608000*128, 8388608000*256, 8388608000*512, 8388608000*1024, 8388608000*2048],
        [17179869184000,17179869184000*2, 17179869184000*4, 17179869184000*8],
        [17179869184000*16, 17179869184000*32, 17179869184000*64, 17179869184000*128, 17179869184000*256]
    ],
    state:'closed',
    button:null,
    init:function(parent){
        this.button = new createjs.Bitmap(Preload.queue.getResult('gfx/shop.png'));//skal være sprite en dag
        this.button.x=parent.canvas.width-64;
        this.button.y=parent.canvas.height-64;
        parent.addChild(this.button)
        this.button.on('click', Shop.toggleShop);
    },
    toggleShop:function(){
        if(Shop.state=='open'){
            Shop.state='closed';
            Shop.close();
        } else {
            Shop.state='open';
            Shop.open();
        }
    },
    open:function(){//shop er world specific, should it be global? (I guess yes)
        var i;
        var xPos=20;
        Shop.state='open';
        var limit = Game.unlocks[Game.currentScene];
        Shop.container = new createjs.Container();
        for(i=0; i<limit; i++){
            var cont = new createjs.Container()
            var t = new createjs.Sprite(Sprites.creatures, (Game.currentScene+1)+"_"+(i+1));
            t.scaleX= t.scaleY=0.7;
            var te = new createjs.Text(this.prices[Game.currentScene][i], '12px Verdana', '#FFF');
            //console.log(this.prices[Game.currentScene][i])
            te.y=50;
            cont.x=xPos;
            cont.addChild(t, te);

            cont.price=this.prices[Game.currentScene][i];
            cont.world = Game.currentScene+1;
            cont.creatureType=i+1;
            if(Game.coins>=cont.price){
                cont.on('click', Shop.buy, Shop);

            } else {
                cont.alpha = 0.4;
            }
            Shop.container.addChild(cont);
            xPos+=70;
        }
        Shop.container.y=Game.stage.canvas.height-80;
        Game.stage.addChild(Shop.container)
        //TODO figure out prices
    },
    buy:function(what){
        Shop.state='closed';
        console.log(what, what.currentTarget.price, what.currentTarget.world, what.currentTarget.creatureType)
        var mod = 0;
        if(Game.currentScene==0){//global ship, first step
            mod=Game.crates.length;
        }

        if(mod + Game.creatures[Game.currentScene].length){
            Game.coins-=what.currentTarget.price;
            //update price
            Shop.prices[Game.currentScene][what.currentTarget.creatureType-1]=Math.floor(what.currentTarget.price*1.2);
            Game.addCreature({world:what.currentTarget.world, level:what.currentTarget.creatureType})
            //TODO, this is a hack
            Shop.close();
            Shop.open();
        }
    },
    close:function(){
        Shop.container.removeAllChildren();
        Game.stage.removeChild(Shop.container);
    }
}
