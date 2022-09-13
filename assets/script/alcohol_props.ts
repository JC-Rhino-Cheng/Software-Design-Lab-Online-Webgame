
const {ccclass, property} = cc._decorator;

@ccclass
export default class alcohol_props extends cc.Component {

    @property({type:cc.AudioClip})
        liquid: cc.AudioClip = null;

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);

    }

    start () {
        cc.audioEngine.playEffect(this.liquid, false);
        this.play_anim();
        this.method();
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 15);
    }



    play_anim(){
        this.anim.play();
    }

    method(){
        cc.find('Canvas/map1/player').getComponent('player').WuDiEnergy(15);
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 2 - 747;
        this.node.y = cc.find('Canvas/map1/player').y - 40 - 507;
    }


}
