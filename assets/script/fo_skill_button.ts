
const {ccclass, property} = cc._decorator;

@ccclass
export default class fo_skill_button extends cc.Component {

    @property(cc.Prefab)
    FoSkillPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_fo_skill, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(250))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_fo_skill(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(250))
            this.prefab_fo_skill();
    }

    prefab_fo_skill(){
        var player_x =  cc.find("Canvas/map1/player").x - 15 - 747;
        var player_y =  cc.find("Canvas/map1/player").y - 10 - 507;
        var FoSkillPrefab = cc.instantiate(this.FoSkillPrefab);
        FoSkillPrefab.x = player_x;
        FoSkillPrefab.y = player_y;
        cc.find('Canvas').addChild(FoSkillPrefab);
    }


}
