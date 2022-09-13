
const {ccclass, property} = cc._decorator;

@ccclass
export default class tree_skill_self extends cc.Component {

    @property({type:cc.AudioClip})
        tree: cc.AudioClip = null;

    private anim: cc.Animation = null;

    @property
    UseTreeSkillSuccessfullyProb: number = 1;

    @property(cc.Prefab)
    TreeSkillPrefab: cc.Prefab = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.tree, false);
        this.play_anim();
        this.scheduleOnce(function(){
            this.testSuccessfully();
            this.node.destroy();
        }, 1.25);
    }

    testSuccessfully(){
        if(Math.random() <= this.UseTreeSkillSuccessfullyProb){
            this.prefab_tree_skill();
        }
    }

    prefab_tree_skill(){
        var children = cc.find("Canvas/monsters").children;
            cc.log(children.length);
            for(var i=0;i<children.length;i++){

                var mon_x =  children[i].x;
                var mon_y = children[i].y;
                var TreeSkillPrefab = cc.instantiate(this.TreeSkillPrefab);
                TreeSkillPrefab.x = mon_x + 7 - 747;
                TreeSkillPrefab.y = mon_y + 22 - 507;
                cc.find('Canvas').addChild(TreeSkillPrefab);

            }
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 3 - 747;
        this.node.y = cc.find('Canvas/map1/player').y + 75 - 507;
    }



    play_anim(){
        this.anim.play();
    }


}
