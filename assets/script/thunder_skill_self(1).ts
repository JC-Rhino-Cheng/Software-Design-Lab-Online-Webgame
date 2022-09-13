
const {ccclass, property} = cc._decorator;

@ccclass
export default class thunder_skill_self extends cc.Component {

    @property({type:cc.AudioClip})
        thun: cc.AudioClip = null;

    private anim: cc.Animation = null;

    @property
    UseThunderSkillSuccessfullyProb: number = 1;

    @property(cc.Prefab)
    ThunderSkillPrefab: cc.Prefab = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {

        cc.audioEngine.playEffect(this.thun, false);

        this.play_anim();
        this.scheduleOnce(function(){
            this.testSuccessfully();
            this.node.destroy();
        }, 1);
    }

    testSuccessfully(){
        if(Math.random() <= this.UseThunderSkillSuccessfullyProb){
            this.prefab_thunder_skill();
        }
    }

    prefab_thunder_skill(){

            var children = cc.find("Canvas/monsters").children;
            cc.log(children.length);
            for(var i=0;i<children.length;i++){

                var mon_x =  children[i].x;
                var mon_y = children[i].y;
                var ThunderSkillPrefab = cc.instantiate(this.ThunderSkillPrefab);
                ThunderSkillPrefab.x = mon_x + 7 - 747;
                ThunderSkillPrefab.y = mon_y + 60 - 507;
                cc.find('Canvas').addChild(ThunderSkillPrefab);

            }
            
        

        
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x - 747;
        this.node.y = cc.find('Canvas/map1/player').y - 507;
    }



    play_anim(){
        this.anim.play();
    }


}
