
const {ccclass, property} = cc._decorator;

@ccclass
export default class tree_skill_button extends cc.Component {

    @property(cc.Prefab)
    TreeSkillSelfPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_tree_skill_self, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(350))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_tree_skill_self(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(350))
            this.prefab_tree_skill_self();
    }

    prefab_tree_skill_self(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var TreeSkillSelfPrefab = cc.instantiate(this.TreeSkillSelfPrefab);
        TreeSkillSelfPrefab.x = player_x - 3 - 747;
        TreeSkillSelfPrefab.y = player_y + 75 - 507;
        cc.find('Canvas').addChild(TreeSkillSelfPrefab);
    }


}
