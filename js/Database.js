"use strict";
console.log("Database loaded");
var Database = {
    storageAvailable:function(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    },
    init:function(){
        if (this.storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
        }
        else {
            throw new Error('Localstorage doesn\'t work in this browser!');
        }
    },
    get:function(key){
        if(!key){
            throw new Error('You must pass key to Get!');
        }
        return localStorage.getItem(key);
    },
    set:function(key, value){
        if(!key ){
            throw new Error('You must pass key/value to set!');
        }
        localStorage.setItem(key, value)
    },
    delete:function(key){
        if(!key){
            throw new Error('You must pass key to delete!');
        } else {
            localStorage.removeItem(key)
        }
    },
    escape:function(item){
        return JSON.stringify(item);
    },
    unescape:function(item){
        return JSON.parse(item);
    },
    initialSetup:function(Game, Shop){
        this.set('version', Game.settings.version)
        this.set('crates', this.escape(Game.crates))
        this.set('creatureList', this.escape(Game.creatures))//empty initially, so this is safe
        this.set('cps', this.escape(Game.cps))
        this.set('coins', this.escape(Game.coins))
        this.set('unlocks', this.escape(Game.unlocks))
        this.set('firstPlayed', Date.now());
        this.set('prices', this.escape(Shop.prices));
        this.set('highestLevel',0);
    },
    clean:function(){
        this.delete('version');
    },

    setHighestLevel:function(lvl){
        console.log(lvl, parseInt(this.get('highestLevel')));
        if(lvl>parseInt(this.get('highestLevel'))){
            this.set('highestLevel', lvl);
            return true;
        }
        return false;
    },
    update:function(Game, Shop){
        var i, z, a=[];
        for(i=0; i<Game.crates.length; i++){
            a.push({x:Game.crates[i].x, y:Game.crates[i].y});
        }
        this.set('crates', this.escape(a))
        a=[]
        for(i=0; i<Game.creatures.length; i++){
            a.push([])
            for(z=0; z<Game.creatures[i].length; z++){
                a[i].push({"world":i+1, "type":Game.creatures[i][z].creatureType});
                //console.log(Game.creatures[i][z].creatureType)
            }
        }

        this.set('creatureList', this.escape(a));

        this.set('cps', this.escape(Game.cps))
        this.set('coins', this.escape(Game.coins))
        this.set('unlocks', this.escape(Game.unlocks))
        this.set('prices', this.escape(Shop.prices));
    },
    load:function(Game, Shop){//returns stuff loaded
        var v = this.get('version');
        if(!v){
            console.log("first run")
            this.initialSetup(Game, Shop);
            return false;
        } else {
            if(Game.settings.version!=v){
                throw new Error("Version mismatch Database")
            } else {
                Game.crates     = this.unescape(this.get('crates'));
                Game.creatureList  = this.unescape(this.get('creatureList'));
                Game.cps        = this.unescape(this.get('cps'));
                Game.coins      = this.unescape(this.get('coins'));
                Game.unlocks    = this.unescape(this.get('unlocks'));
                Shop.prices     = this.unescape(this.get('prices'))
                return true;
            }
        }

    }
}