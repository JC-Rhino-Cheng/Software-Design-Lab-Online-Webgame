
const {ccclass, property} = cc._decorator;

@ccclass
export default class shuriken extends cc.Component {

    private mouse_x:number;
    private mouse_y:number;

    private player_x:number;
    private player_y:number;

    private direction:number; //0:上 1:左 2:下 3:右

    private anim: cc.Animation = null;

    private vx:number = 0;
    private vy:number = 0;

    private attack: number = 120;

    private cool_time: number = 0.52;
    private is_weapon_able_to_use: boolean = true;

    @property({type:cc.AudioClip})
        shuriken_sound: cc.AudioClip = null;
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

                cc.audioEngine.playEffect(this.shuriken_sound, false);

                this.vx = 0;
                this.vy = 0;

                this.node.x = this.player_x - 747;
                this.node.y = this.player_y - 507;

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
                if(mon_map_x == player_map_x && mon_map_y >= player_map_y && mon_map_y <= player_map_y + 6)
                    this.Attack(children[i]);
            }else if(this.direction == 1){
                if(mon_map_y == player_map_y && mon_map_x >= player_map_x - 6 && mon_map_x <= player_map_x)
                    this.Attack(children[i]);
            }else if(this.direction == 2){
                if(mon_map_x == player_map_x && mon_map_y >= player_map_y - 6 && mon_map_y <= player_map_y)
                    this.Attack(children[i]);
            }else if(this.direction == 3){
                if(mon_map_y == player_map_y && mon_map_x >= player_map_x && mon_map_x <= player_map_x + 6)
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

        var player = cc.find('Canvas/map1/player');
        this.player_x = player.x;
        this.player_y = player.y;

        this.node.x = this.node.x + this.vx;
        this.node.y = this.node.y + this.vy; 

        if(this.node.x >= 1416 - 747 || this.node.x <= 75 - 747 || this.node.y >= 820 - 507 || this.node.y <= 240 - 507){
            this.node.runAction(cc.hide());
        }
        if(this.node.x >= this.player_x + 69 * 6 -747 || this.node.x <= this.player_x -69 * 6 -747 || this.node.y >= this.player_y + 66 * 6 - 507 || this.node.y <= this.player_y -66 * 6 - 507){
            this.node.runAction(cc.hide());
        }


    }   

    get_the_mouse_direction_to_player(mouse_x, mouse_y, player_x, player_y){
        var dif_x = mouse_x - player_x;
        var dif_y = mouse_y - player_y;
        if(dif_x == 0 && dif_y >= 0){
            this.direction = 0;
            this.vy = 20;
        }
        else if(dif_x == 0 && dif_y < 0){
            this.direction = 2;
            this.vy = -20;
        }
        else{
            cc.log('Dif x:' + dif_x);
            cc.log('Dif y:' + dif_y);
            var ratio = dif_y / dif_x;
            if(ratio <= 1 && ratio >= -1){
                if(dif_x > 0){
                    this.direction = 3;
                    this.vx = 20;
                }
                else{
                    this.direction = 1;
                    this.vx = -20;
                }
            }
            else{
                if(dif_y >= 0){
                    this.direction = 0;
                    this.vy = 20;
                }
                else{
                    this.direction = 2;
                    this.vy = -20;
                }
            }
        }
        
       
    }



    play_anim(player_x, player_y){

        this.node.runAction(cc.show());
        
        this.anim.play('shuriken_hit');
    }

    getMapPos(dir :string, n: number){ //簡志宇的，判斷人在哪一個地圖座標，n是實際位置，適用於第一張地圖
        if(dir == 'x') return Math.floor(Number(n+673.843) /68.75);
        else return Math.floor(Number(n+252.041) /65.55);
        //return [r, c];
    }


}
