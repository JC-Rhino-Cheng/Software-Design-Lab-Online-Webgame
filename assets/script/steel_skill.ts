
const {ccclass, property} = cc._decorator;

@ccclass
export default class steel_skill extends cc.Component {

    @property({type:cc.AudioClip})
        shield: cc.AudioClip = null;

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.shield, false);
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
        cc.find('Canvas/map1/player').getComponent('player').DisplaceDeffend(200); //提升200防禦
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 747;
        this.node.y = cc.find('Canvas/map1/player').y - 507;
    }


}
