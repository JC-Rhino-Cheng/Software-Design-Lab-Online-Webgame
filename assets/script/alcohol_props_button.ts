
const {ccclass, property} = cc._decorator;

@ccclass
export default class alcohol_props_button extends cc.Component {

    @property(cc.Prefab)
    AlcoholPropsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    WaterPropsPrefab: cc.Prefab = null;


    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_alcohol_props, this);
    }

    use_alcohol_props(){
        this.prefab_alcohol_props();
        this.node.destroy();
    }

    prefab_alcohol_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        
        var AlcoholPropsPrefab = cc.instantiate(this.AlcoholPropsPrefab);
        AlcoholPropsPrefab.x = player_x - 2 - 747;
        AlcoholPropsPrefab.y = player_y - 40 - 507;
        cc.find('Canvas').addChild(AlcoholPropsPrefab);

        var WaterPropsPrefab = cc.instantiate(this.WaterPropsPrefab);
        WaterPropsPrefab.x = player_x + 2 - 747;
        WaterPropsPrefab.y = player_y + 40 - 507;
        cc.find('Canvas').addChild(WaterPropsPrefab);
    }


}
