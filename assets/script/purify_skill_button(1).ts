
const {ccclass, property} = cc._decorator;

@ccclass
export default class purify_skill_button extends cc.Component {

    @property(cc.Prefab)
    PurifySkillPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_purify_skill, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(250))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_purify_skill(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(250))
            this.prefab_purify_skill();
    }

    prefab_purify_skill(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var PurifySkillPrefab = cc.instantiate(this.PurifySkillPrefab);
        PurifySkillPrefab.x = player_x - 5 - 747;
        PurifySkillPrefab.y = player_y + 32 - 507;
        cc.find('Canvas').addChild(PurifySkillPrefab);
    }


}
