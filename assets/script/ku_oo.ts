
const {ccclass, property} = cc._decorator;

@ccclass
export default class ku_oo extends cc.Component {

    private mouse_x:number;
    private mouse_y:number;

    private player_x:number;
    private player_y:number;

    private direction:number; //0:上 1:左 2:下 3:右

    private anim: cc.Animation = null;

    private attack: number = 50;

    private cool_time: number = 0.52;
    private is_weapon_able_to_use: boolean = true;

    @property({type:cc.AudioClip})
        ku_oo_sound: cc.AudioClip = null;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.find('Canvas/inner_map').on(cc.Node.EventType.MOUSE_DOWN, function(event){

            if(this.is_weapon_able_to_use){
                this.is_weapon_able_to_use = false;
                this.scheduleOnce(() => {this.is_weapon_able_to_use = true;}, this.cool_time);

                this.node.runAction(cc.show());
                /*cc.find('Canvas/map1/player').on(cc.Node.EventType.MOUSE_DOWN, function(event){
                    this.node.runAction(cc.hide());
                    return ;
                });*/

                cc.audioEngine.playEffect(this.ku_oo_sound, false);

                this.node.scaleX = 1;
                this.node.rotation = 0;

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

                this.AttackTheScope();

                this.play_anim(this.player_x, this.player_y);
            }
            
        }, this);

        cc.find('angry_props_button').on(cc.Node.EventType.MOUSE_DOWN, function(event){
            this.attack += 100;
            this.scheduleOnce(() => { this.attack -= 100;}, 15);
        });
        cc.find('curry_props_button').on(cc.Node.EventType.MOUSE_DOWN, function(event){
            this.attack += 100;
            this.scheduleOnce(() => { this.attack -= 100;}, 15);
        });
        cc.find('magic_props_button').on(cc.Node.EventType.MOUSE_DOWN, function(event){
            this.attack += 100;
            this.scheduleOnce(() => { this.attack -= 100;}, 15);
        });
    }

    AttackTheScope(){
        var children = cc.find("Canvas/monsters").children;
        for(var i=0;i<children.length;i++){

            var mon_x =  children[i].x;
            var mon_y = children[i].y;
            var mon_map_x = cc.find('Canvas').getComponent('map_position').getMapPos('x', mon_x, 'enemy');
            var mon_map_y = cc.find('Canvas').getComponent('map_position').getMapPos('y', mon_y, 'enemy');
            var player_map_x = cc.find('Canvas').getComponent('map_position').getMapPos('x', this.player_x, 'player');
            var player_map_y = cc.find('Canvas').getComponent('map_position').getMapPos('y', this.player_y, 'player');
            cc.log('mon x:' + mon_map_x);
            cc.log('mon y:' + mon_map_x);
            cc.log('player x:' + player_map_x);
            cc.log('player y:' + player_map_y);

            if(this.direction == 0){
                if(mon_map_x == player_map_x && mon_map_y == player_map_y + 1)
                    this.Attack(children[i]);
            }else if(this.direction == 1){
                if(mon_map_x == player_map_x - 1 && mon_map_y == player_map_y)
                    this.Attack(children[i]);
            }else if(this.direction == 2){
                if(mon_map_x == player_map_x && mon_map_y == player_map_y - 1)
                    this.Attack(children[i]);
            }else if(this.direction == 3){
                if(mon_map_x == player_map_x + 1 && mon_map_y == player_map_y)
                    this.Attack(children[i]);
            }


        }
        
    }

    Attack(monster: cc.Node){
        //TODO:判別我都好了 簡志宇做一下攻擊
        var map_number = cc.find('Canvas').getComponent('map_position').map_number;
        if(map_number == 1){
            monster.getComponent('enemies3').enemyHurt(100);
        }else if(map_number == 2){
            monster.getComponent('enemies2').enemyHurt(100);
        }else if(map_number == 3){
            monster.getComponent('enemies').enemyHurt(100);
        }
    }

    update(){

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

    play_anim(player_x, player_y){
        if(this.direction == 0){
            this.node.rotation = -90;
            this.node.x = player_x - 747;
            this.node.y = player_y + 50 - 507;
        } else if(this.direction == 1){
            this.node.scaleX = -1;
            this.node.x = player_x - 50 - 747;
            this.node.y = player_y - 507;
        } else if(this.direction == 2){
            this.node.rotation = 90;
            this.node.x = player_x - 747;
            this.node.y = player_y - 50 - 507;
        } else if(this.direction == 3){
            this.node.x = player_x + 50 - 747;
            this.node.y = player_y - 507;
        }  
        this.anim.play('ku_oo_hit');
    }

    getMapPos(dir :string, n: number){ //簡志宇的，判斷人在哪一個地圖座標，n是實際位置，適用於第一張地圖
        if(dir == 'x') return Math.floor(Number(n+673.843) /68.75);
        else return Math.floor(Number(n+252.041) /65.55);
        //return [r, c];
    }


}
