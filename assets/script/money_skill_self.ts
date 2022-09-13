
const {ccclass, property} = cc._decorator;

@ccclass
export default class thunder_skill_self extends cc.Component {

    private anim: cc.Animation = null;


    @property(cc.Prefab)
    MoneySkillPrefab: cc.Prefab = null;

    private mouse_x:number;
    private mouse_y:number;

    private player_x:number;
    private player_y:number;

    private direction:number; //0:上 1:左 2:下 3:右

    @property
    isMoneySelfSkillEnd: boolean = false;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        this.play_anim();
        this.isMoneySelfSkillEnd = true;

        cc.find('Canvas/inner_map').on(cc.Node.EventType.MOUSE_DOWN, function(event){

            if(this.isMoneySelfSkillEnd){
                this.isMoneySelfSkillEnd = false;

                this.mouse_x = event.getLocationX();
                this.mouse_y = event.getLocationY();
                cc.log('Mouse x:' + this.mouse_x);
                cc.log('Mouse y:' + this.mouse_y);

                var player = cc.find('Canvas/map1/player');
                this.player_x = player.x;
                this.player_y = player.y;
                cc.log('Player x:' + this.player_x);
                cc.log('Player y:' + this.player_y);

                this.get_the_mouse_direction_to_player(this.mouse_x, this.mouse_y, this.player_x, this.player_y);
                cc.log('Direction:' + this.direction);

                this.prefab_money_skill();

            }

        }, this);
        
    }

    update(){
        this.node.x = cc.find('Canvas/map1/player').x + 2 - 747;
        this.node.y = cc.find('Canvas/map1/player').y - 10 - 507;
    }

    get_the_mouse_direction_to_player(mouse_x, mouse_y, player_x, player_y){
        var dif_x = mouse_x - player_x;
        var dif_y = mouse_y - player_y;
        if(dif_x == 0 && dif_y >= 0)
            this.direction = 0;
        else if(dif_x == 0 && dif_y < 0)
            this.direction = 2;
        else{
            cc.log('Dif x:' + dif_x);
            cc.log('Dif y:' + dif_y);
            var ratio = dif_y / dif_x;
            if(ratio <= 1 && ratio >= -1){
                if(dif_x > 0)
                    this.direction = 3;
                else
                    this.direction = 1;
            }
            else{
                if(dif_y >= 0)
                    this.direction = 0;
                else
                    this.direction = 2;
            }
        }
        
       
    }


    prefab_money_skill(){
        var player_x =  cc.find("Canvas/map1/player").x;
        var player_y =  cc.find("Canvas/map1/player").y;
        var MoneySkillPrefab = cc.instantiate(this.MoneySkillPrefab);
        MoneySkillPrefab.x = player_x - 747;
        MoneySkillPrefab.y = player_y - 507;
        MoneySkillPrefab.getComponent('money_skill').money_skill_fly_derection = this.direction;
        cc.log('prefab the money!!');
        cc.find('Canvas').addChild(MoneySkillPrefab);

        this.node.destroy();
    }



    play_anim(){
        this.anim.play();
    }


}
