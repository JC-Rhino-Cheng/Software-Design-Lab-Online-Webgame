
const {ccclass, property} = cc._decorator;

@ccclass
export default class curry_props_button extends cc.Component {

    @property(cc.Prefab)
    CurryPropsPrefab: cc.Prefab = null;

    update(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.use_curry_props, this);
    }

    use_curry_props(){
        this.prefab_curry_props();
        this.node.destroy();
    }

    prefab_curry_props(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var CurryPropsPrefab = cc.instantiate(this.CurryPropsPrefab);
        CurryPropsPrefab.x = player_x - 3 -747;
        CurryPropsPrefab.y = player_y + 20 -507;
        cc.find('Canvas').addChild(CurryPropsPrefab);
    }


}
