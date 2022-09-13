
const {ccclass, property} = cc._decorator;

@ccclass
export default class tree_skill extends cc.Component {

    @property({type:cc.AudioClip})
        tree: cc.AudioClip = null;

    private anim: cc.Animation = null;

    private attack: number = 300;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.tree, false);
        this.play_anim();
        this.method();
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 1);
    }

    method(){
        var children = cc.find("Canvas/monsters").children;
        cc.log(children.length);
        for(var i=0;i<children.length;i++)
            this.Attack(children[i]);

        
    }

    Attack(monster: cc.Node){
        //TODO:判別我都好了 簡志宇做一下攻擊
        var map_number = cc.find('Canvas').getComponent('map_position').map_number;
        if(map_number == 1){
            monster.getComponent('enemies3').enemyHurt(100);
        }else if(map_number == 2){
            monster.getComponent('enemies2').enemyHurt(100);
        }else if(map_number == 3){
            monster.getComponent('enemies').enemyHurt(100);
        }
    }

    



    play_anim(){
        this.anim.play();
    }


}
