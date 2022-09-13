
const {ccclass, property} = cc._decorator;

@ccclass
export default class chi_skill_button extends cc.Component {

    @property(cc.Prefab)
    ChiSkillPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_chi_skill, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(250))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_chi_skill(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(250))
            this.prefab_chi_skill();
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
