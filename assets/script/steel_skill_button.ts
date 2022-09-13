
const {ccclass, property} = cc._decorator;

@ccclass
export default class steel_skill_button extends cc.Component {

    @property(cc.Prefab)
    SteelSkillPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_steel_skill, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(200))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_steel_skill(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(200))
            this.prefab_steel_skill();
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
