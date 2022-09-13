
const {ccclass, property} = cc._decorator;

@ccclass
export default class angry_props extends cc.Component {

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
        cc.find('Canvas/map1/player').getComponent('player').DisplaceDeffend(-100);
        //TODO: 攻擊提升
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 5 - 747;
        this.node.y = cc.find('Canvas/map1/player').y + 5 - 507;
    }


}
