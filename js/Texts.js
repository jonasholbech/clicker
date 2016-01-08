"use strict";
console.log("Texts loaded");
var Texts = {
    init:function(){
        this.coinsText = new createjs.Text("Coins:", "20px Ubuntu", "#FFF");
        this.coinsValue = new createjs.Text("0", "20px Ubuntu", "#FFF");
        this.cpsText = new createjs.Text("CPS:", "20px Ubuntu", "#FFF");
        this.cpsValue = new createjs.Text("0", "20px Ubuntu", "#FFF");

        this.coinsText.x = this.coinsValue.x = this.cpsText.x=this.cpsValue.x = 20;
        this.coinsText.y=20;
        this.coinsValue.y=40;

        this.cpsText.y=80;
        this.cpsValue.y=100;
    },
    add:function(parent){
        parent.addChild(this.coinsText, this.coinsValue, this.cpsText, this.cpsValue)
    }

}