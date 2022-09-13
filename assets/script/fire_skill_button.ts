
const {ccclass, property} = cc._decorator;

@ccclass
export default class fire_skill_button extends cc.Component {

    @property(cc.Prefab)
    FireSkillSelfPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_fire_skill_self, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(300))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_fire_skill_self(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(300))
            this.prefab_fire_skill_self();
    }

    prefab_fire_skill_self(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var FireSkillSelfPrefab = cc.instantiate(this.FireSkillSelfPrefab);
        FireSkillSelfPrefab.x = player_x + 30 - 747;
        FireSkillSelfPrefab.y = player_y - 5 - 507;
        cc.find('Canvas').addChild(FireSkillSelfPrefab);
    }


}
