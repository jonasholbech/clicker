"use strict"
console.log("Game loaded");
Game.canvasDOM = document.querySelector("#canvas");
Game.currentScene = 0;
Game.intervalSpawn = null;
Game.crates = [];
Game.creatures = [[], [], [], [], [], [], []];
Game.cps=[0, 0, 0, 0, 0, 0, 0];
Game.coins=[0, 0, 0, 0, 0, 0, 0];
Game.creatureLevels=[8, 5, 6, 5, 6, 6, 4, 5];

Game.unlocks = [0, 0, 0, 0, 0, 0, 0];

Game.cleanUp = function () {//TODO ever used? If so should it clean up arrays and use db as well?
    Game.stage.removeAllChildren();
}

Game.setupGame = function () {
    console.groupEnd();
    Game.cleanUp();
    Game.settings = Preload.queue.getResult('settings');
    Scenes.init();
    Sprites.init();
    Texts.init();
    Scenes.setScene(Game.currentScene);
    Texts.add(Scenes.list[Game.currentScene])

    Database.init();
    if(Database.load(Game, Shop)){
        //Reinstatiate objects
        var i, z, l;
        //just spawn new creates: (even though x, y are available)
        l = Game.crates.length;
        Game.crates=[];
        Game.spawn(l);

        //creatures
        for(i=0; i<Game.creatureList.length; i++){
            for(z=0; z<Game.creatureList[i].length; z++){
                Game.addCreature({world:Game.creatureList[i][z].world, level:Game.creatureList[i][z].type});
            }
        }
    } else {//new game
        Game.spawn(4);
    }

    Shop.init(Game.stage);
    Game.intervalSpawn   = setInterval(Game.spawn, 10000);
    Game.intervalMove    = setInterval(Game.move, 3000);//TODO, integreres i levels
    Game.intervalCollect = setInterval(Game.collect, 1000)
    Ticker.start();

}
Game.move = function(){
    for(var i=0; i<Game.creatures[Game.currentScene].length; i++){
        var c = Game.creatures[Game.currentScene][i];
        if(!c.beingDragged){
            var rX = Utils.getRandomInt(c.x-10, c.x+10)
            var rY = Utils.getRandomInt(c.y-10, c.y+10)
            if(rX > Game.settings.safeZone && rX < Game.stage.canvas.width -Game.settings.safeZone && rY > Game.settings.safeZone && rY < Game.stage.canvas.width -Game.settings.safeZone){
                createjs.Tween.get(Game.creatures[Game.currentScene][i]).to({x:rX, y:rY}, 500);
            }
        }
    }
}
Game.spawn = function (num) {//only scene 0
    var num = num || 1
    for(var i=0; i<num; i++){
        if (Game.crates.length + Game.creatures[0].length < 16) {
            var t = new createjs.Bitmap("gfx/crate.png");
            var coords = Utils.getRandomCoordinates(Game.settings.safeZone, Game.settings.safeZone);
            t.x = coords.x;
            t.y = coords.y;
            t.regX= t.regY=30;
            Scenes.list[0].addChild(t)
            Game.crates.push(t);
            t.on('click', Game.unpackCrate);
            //console.log("Spawn");
        }
    }
}
Game.unpackCrate = function (e) {//only scene 0
    var i = Game.crates.indexOf(e.currentTarget)
    Game.crates.splice(i, 1);
    var coords = {x: e.currentTarget.x, y: e.currentTarget.y};
    Scenes.list[0].removeChild(e.currentTarget)
    Game.addCreature(coords);
}
Game.collect=function(){
    Game.coins[Game.currentScene]+=Game.cps[Game.currentScene];
    Texts.coinsValue.text=Game.coins[Game.currentScene];
}
Game.calcCPS=function(){
    var sum=0;
    Game.creatures[Game.currentScene].forEach(function(c) {
        switch(c.creatureType){
            case 1:
                sum+=0.5;
                break;
            case 2:
                sum+=1.5;
                break;
            case 3:
                sum+=4;
                break;
            case 4:
                sum+=10;
                break;
            case 5:
                sum+=23;
                break;
            case 6:
                sum+=50;
                break;
            case 7:
                sum+=105;
                break;
            case 8:
                sum+=216;
        }
    });
    Game.cps[Game.currentScene]=sum;
    Texts.cpsValue.text=sum;
}
Game.addCreature = function (setup) {//applied on crate, shop, not on drop
    var setup=setup || {}
    setup.world = setup.world || Game.currentScene+1;
    setup.level = setup.level || 1;
    setup.x = setup.x || Utils.getRandomCoordinates(Game.settings.safeZone, Game.settings.safeZone).x;
    setup.y = setup.y || Utils.getRandomCoordinates(Game.settings.safeZone, Game.settings.safeZone).y;
    //console.log(setup)
    var t = new createjs.Sprite(Sprites.creatures, setup.world+"_"+ setup.level);
    t.creatureType = setup.level;
    t.x = setup.x;
    t.y = setup.y;
    t.regX=t.regY=30
    t.beingDragged=false;
    Scenes.list[setup.world-1].addChild(t)//only first scene
    Game.creatures[setup.world-1].push(t)
    Game.calcCPS();
    t.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        createjs.Tween.removeAllTweens();
        evt.target.beingDragged=true;
    });
    t.on("pressup", function (evt) {
        evt.target.beingDragged=false;
        Game.creatureDropped(evt.target);
    })
    Database.update(Game, Shop)
}
Game.creatureDropped = function (creature) {//TODO noget galt, nogen gange forsvinder den ene ikke ved "new world"

    var i;
    for (i = Game.creatures[Game.currentScene].length-1; i >=0; i--) {
        if (Game.creatures[Game.currentScene][i] == creature || creature.creatureType != Game.creatures[Game.currentScene][i].creatureType) {
            //the creatures don't match, or it's the same
            continue;
        }
        //hvordan fanden handler jeg unlocks på tværs a flevels, de sidste to i hvert skal også kunne unlockes
        if (Utils.distance(creature, Game.creatures[Game.currentScene][i]) < Game.settings.mergeDistance) {
            var newType = creature.creatureType + 1;
            creature.creatureType++;
            if(Sprites.creatures._animations.indexOf((Game.currentScene+1)+"_" + newType)>-1){
                //this scene
                if(Game.unlocks[Game.currentScene]+parseInt(Game.settings.unlockDiff)+1 < newType){
                    Game.unlocks[Game.currentScene]=newType;
                }
                creature.gotoAndStop((Game.currentScene+1)+"_" + newType);
                Scenes.list[Game.currentScene].removeChild(Game.creatures[Game.currentScene][i])
                Game.creatures[Game.currentScene].splice(i, 1);

            } else {
                //add to next world
                //ikke testst, TODO
                var c= {}
                c.world = Game.currentScene+2;
                c.level =  1;

                console.log("going to the next world")


                Scenes.list[Game.currentScene].removeChild(Game.creatures[Game.currentScene][i])
                Game.creatures[Game.currentScene].splice(i, 1);

                Scenes.list[Game.currentScene].removeChild(creature)
                var index = Game.creatures[Game.currentScene].indexOf(creature);
                Game.creatures[Game.currentScene].splice(index, 1);

                Game.addCreature(c);

                //noget med at hvis den DO der trækkes ind kommer bag ved den anden sker der noget og den ene fjernes ikke

            }
            //console.log("merge");


            Game.calcCPS();
            Database.update(Game, Shop)
            break;
        }

    }
}
