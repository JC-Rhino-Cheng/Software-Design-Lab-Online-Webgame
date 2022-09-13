
const {ccclass, property} = cc._decorator;

@ccclass
export default class thunder_skill_button extends cc.Component {

    @property(cc.Prefab)
    ThunderSkillSelfPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_thunder_skill, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(350))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_thunder_skill(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(350))
            this.prefab_thunder_skill();
    }

    prefab_thunder_skill(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var ThunderSkillSelfPrefab = cc.instantiate(this.ThunderSkillSelfPrefab);
        ThunderSkillSelfPrefab.x = player_x - 747;
        ThunderSkillSelfPrefab.y = player_y - 507;
        cc.find('Canvas').addChild(ThunderSkillSelfPrefab);
    }


}
