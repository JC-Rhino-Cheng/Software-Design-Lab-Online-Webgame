
const {ccclass, property} = cc._decorator;

@ccclass
export default class money_skill_self_falling_money extends cc.Component {

    @property({type:cc.AudioClip})
        money: cc.AudioClip = null;

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.money, false);
        this.play_anim();
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 0.6);
    }

    



    play_anim(){
        this.anim.play();
    }



    update(){
        this.node.y = this.node.y - 2;
        this.node.x = cc.find('Canvas/map1/player').x - 5 - 747;
    }


}
