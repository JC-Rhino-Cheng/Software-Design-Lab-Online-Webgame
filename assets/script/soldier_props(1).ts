
const {ccclass, property} = cc._decorator;

@ccclass
export default class soldier_props extends cc.Component {

    @property({type:cc.AudioClip})
        addblood: cc.AudioClip = null;

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.addblood, false);
        this.play_anim();
        this.method();
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 5);
    }



    play_anim(){
        this.anim.play();
    }

    method(){
        cc.find('Canvas/map1/player').getComponent('player').IncreaseToMaxBlood();
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x + 5 -747;
        this.node.y = cc.find('Canvas/map1/player').y + 20 -507;
    }


}
