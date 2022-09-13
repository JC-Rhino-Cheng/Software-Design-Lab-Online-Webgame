
const {ccclass, property} = cc._decorator;

@ccclass
export default class purify_skill extends cc.Component {

    private anim: cc.Animation = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
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
        cc.find('Canvas/map1/player').getComponent('player').Purify(5);
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 5 - 747;
        this.node.y = cc.find('Canvas/map1/player').y + 32 - 507;
    }


}
