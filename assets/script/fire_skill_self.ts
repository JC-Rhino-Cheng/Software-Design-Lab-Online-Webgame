
const {ccclass, property} = cc._decorator;

@ccclass
export default class fire_skill_self extends cc.Component {

    @property({type:cc.AudioClip})
        aim: cc.AudioClip = null;

    private anim: cc.Animation = null;

    @property
    UseFireSkillSuccessfullyProb: number = 1;

    @property(cc.Prefab)
    FireSkillPrefab: cc.Prefab = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.aim, false);
        this.play_anim();
        this.scheduleOnce(function(){
            this.testSuccessfully();
            this.node.destroy();
        }, 0.5);
    }

    testSuccessfully(){
        if(Math.random() <= this.UseFireSkillSuccessfullyProb){
            this.prefab_fire_skill();
        }
    }

    prefab_fire_skill(){
        var children = cc.find("Canvas/monsters").children;
            cc.log(children.length);
            for(var i=0;i<children.length;i++){

                var mon_x =  children[i].x;
                var mon_y = children[i].y;
                var FireSkillPrefab = cc.instantiate(this.FireSkillPrefab);
                FireSkillPrefab.x = mon_x + 7 - 747;
                FireSkillPrefab.y = mon_y + 20 - 507;
                cc.find('Canvas').addChild(FireSkillPrefab);

            }
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x + 30 - 747;
        this.node.y = cc.find('Canvas/map1/player').y - 5 - 507;
    }



    play_anim(){
        this.anim.play();
    }


}
