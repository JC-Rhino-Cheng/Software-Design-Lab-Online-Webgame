
const {ccclass, property} = cc._decorator;

@ccclass
export default class thousand_props extends cc.Component {

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
        }, 60);
    }



    play_anim(){
        this.anim.play();
    }

    method(){
        cc.find('Canvas/map1/player').getComponent('player').WuDi(60); //目前設定五秒
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 10 -747;
        this.node.y = cc.find('Canvas/map1/player').y + 60 -507;
    }



}
