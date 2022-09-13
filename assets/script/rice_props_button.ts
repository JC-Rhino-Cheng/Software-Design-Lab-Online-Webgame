
const {ccclass, property} = cc._decorator;

@ccclass
export default class rice_props_button extends cc.Component {

    @property(cc.Prefab)
    ChiSkillPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_chi_skill, this);
    }

    use_chi_skill(){
        this.prefab_chi_skill();
        this.node.destroy();
    }

    prefab_chi_skill(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var ChiSkillPrefab = cc.instantiate(this.ChiSkillPrefab);
        ChiSkillPrefab.x = player_x - 747;
        ChiSkillPrefab.y = player_y + 50 - 507;
        cc.find('Canvas').addChild(ChiSkillPrefab);
    }


}
