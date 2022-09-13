
const {ccclass, property} = cc._decorator;

@ccclass
export default class gold_props extends cc.Component {

    @property({type:cc.AudioClip})
        goldsound: cc.AudioClip = null;

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.goldsound, false);
        this.play_anim();
        this.scheduleOnce(function(){
            cc.find('Canvas/map1/player').getComponent('player').playerResurrect();
            this.node.destroy();
        }, 2);
    }



    play_anim(){
        this.anim.play();
    }



}
