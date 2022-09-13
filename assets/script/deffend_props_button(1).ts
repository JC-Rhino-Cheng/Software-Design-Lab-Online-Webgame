
const {ccclass, property} = cc._decorator;

@ccclass
export default class steel_skill_button extends cc.Component {

    @property(cc.Prefab)
    SteelSkillPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_steel_skill, this);
    }

    use_steel_skill(){
        this.prefab_steel_skill();
        this.node.destroy();
    }

    prefab_steel_skill(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var SteelSkillPrefab = cc.instantiate(this.SteelSkillPrefab);
        SteelSkillPrefab.x = player_x - 747;
        SteelSkillPrefab.y = player_y - 507;
        cc.find('Canvas').addChild(SteelSkillPrefab);
    }


}
