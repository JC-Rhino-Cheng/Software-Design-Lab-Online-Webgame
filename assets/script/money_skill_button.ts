
const {ccclass, property} = cc._decorator;

@ccclass
export default class money_skill_button extends cc.Component {

    @property(cc.Prefab)
    MoneySkillSelfPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    MoneySkillSelfFallingMoneyPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_money_skill_self, this);

        if(cc.find('Canvas/map1/player').getComponent('player').CanUseHun(200))
            this.node.getComponent(cc.Button).interactable = true;
        else
            this.node.getComponent(cc.Button).interactable = false;
    }

    use_money_skill_self(){
        if(cc.find('Canvas/map1/player').getComponent('player').WasteHun(200))
            this.prefab_money_skill_self();
    }

    prefab_money_skill_self(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var MoneySkillSelfPrefab = cc.instantiate(this.MoneySkillSelfPrefab);
        MoneySkillSelfPrefab.x = player_x + 2 - 747;
        MoneySkillSelfPrefab.y = player_y - 10 - 507;

        var MoneySkillSelfFallingMoneyPrefab = cc.instantiate(this.MoneySkillSelfFallingMoneyPrefab);
        MoneySkillSelfFallingMoneyPrefab.x = player_x - 5 - 747;
        MoneySkillSelfFallingMoneyPrefab.y = player_y + 80 - 507;

        cc.find('Canvas').addChild(MoneySkillSelfPrefab);
        cc.find('Canvas').addChild(MoneySkillSelfFallingMoneyPrefab);
    }


}
