
const {ccclass, property} = cc._decorator;

@ccclass
export default class curry_props extends cc.Component {

    @property({type:cc.AudioClip})
        shield: cc.AudioClip = null;

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.shield, false);
        this.play_anim();
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 15);
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 3 -747;
        this.node.y = cc.find('Canvas/map1/player').y + 20 -507;
    }



    play_anim(){
        this.anim.play();
    }


}
