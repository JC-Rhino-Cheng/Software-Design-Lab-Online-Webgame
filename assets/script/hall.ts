// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class hall extends cc.Component {

    @property({type:cc.AudioClip})
        instore: cc.AudioClip = null;
    
    @property({type:cc.AudioClip})
        button: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    go_item_store () {
        //音效
        cc.audioEngine.playEffect(this.instore, false);
        cc.director.loadScene("store");
    }

    go_army_store () {
        cc.audioEngine.playEffect(this.instore, false);
        cc.director.loadScene("armystore");
    }

    go_prepare () {
        cc.audioEngine.playEffect(this.button, false);
        cc.director.loadScene("prepare");
    }

    go_map1 () {
        cc.director.loadScene("map1");
    }

    go_maptest () {
        cc.director.loadScene("map_test");
    }

    go_map2 () {
        cc.director.loadScene("map_test2");
    }

    go_readme () {
        cc.audioEngine.playEffect(this.button, false);
        cc.director.loadScene("readme");
    }

    start () {

    }

    // update (dt) {}
}
