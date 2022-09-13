
const {ccclass, property} = cc._decorator;

@ccclass
export default class nine_props extends cc.Component {

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
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
        cc.find('Canvas/map1/player').getComponent('player').WuDi(15); //目前設定五秒
    }
    
    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 5 -747;
        this.node.y = cc.find('Canvas/map1/player').y + 10 -507;
    }


}
