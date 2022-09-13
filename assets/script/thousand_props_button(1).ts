
const {ccclass, property} = cc._decorator;

@ccclass
export default class thousand_props_button extends cc.Component {

    @property(cc.Prefab)
    ThousandPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_thousand_props, this);
    }

    use_thousand_props(){
        this.prefab_thousand_props();
        this.node.destroy();
    }

    prefab_thousand_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var ThousandPropsPrefab = cc.instantiate(this.ThousandPropsPrefab);
        ThousandPropsPrefab.x = player_x - 10 -747;
        ThousandPropsPrefab.y = player_y + 60 -507;
        cc.find('Canvas').addChild(ThousandPropsPrefab);
    }


}
