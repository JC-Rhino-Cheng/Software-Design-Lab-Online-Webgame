
const {ccclass, property} = cc._decorator;

@ccclass
export default class money_skill extends cc.Component {

    @property({type:cc.AudioClip})
        moneyout: cc.AudioClip = null;

    @property
    money_skill_fly_derection: number = 0;

    private anim: cc.Animation = null;

    private vx:number = 0;
    private vy:number = 0;

    private direction: number = 0;

    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        cc.audioEngine.playEffect(this.moneyout, false);
        this.play_anim();

        if(this.money_skill_fly_derection == 0){
            this.vy = 10;
            this.direction = 0;
        }else if(this.money_skill_fly_derection == 1){
            this.vx = -10;
            this.direction = 1;
        }else if(this.money_skill_fly_derection == 2){
            this.vy = -10;
            this.direction = 2;
        }else{
            this.vx = 10;
            this.direction = 3;
        }

        var children = cc.find("Canvas/monsters").children;
        for(var i=0;i<children.length;i++){

            var mon_x =  children[i].x;
            var mon_y = children[i].y;
            var mon_map_x = cc.find('Canvas').getComponent('map_position').getMapPos('x', mon_x, 'enemy');
            var mon_map_y = cc.find('Canvas').getComponent('map_position').getMapPos('y', mon_y, 'enemy');
            var player_map_x = cc.find('Canvas').getComponent('map_position').getMapPos('x', cc.find('Canvas/map1/player').x, 'player');
            var player_map_y = cc.find('Canvas').getComponent('map_position').getMapPos('y', cc.find('Canvas/map1/player').y, 'player');
            cc.log('mon x:' + mon_map_x);
            cc.log('mon y:' + mon_map_x);
            cc.log('player x:' + player_map_x);
            cc.log('player y:' + player_map_y);

            if(this.direction == 0){
                if(mon_map_x == player_map_x && mon_map_y >= player_map_y)
                    this.Attack(children[i]);
            }else if(this.direction == 1){
                if(mon_map_y == player_map_y && mon_map_x <= player_map_x)
                    this.Attack(children[i]);
            }else if(this.direction == 2){
                if(mon_map_x == player_map_x && mon_map_y <= player_map_y)
                    this.Attack(children[i]);
            }else if(this.direction == 3){
                if(mon_map_y == player_map_y && mon_map_x >= player_map_x)
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
        this.node.x = this.node.x + this.vx;
        this.node.y = this.node.y + this.vy; 

        if(this.node.x >= 1416 - 747 || this.node.x <= 75 - 747 || this.node.y >= 820 - 507 || this.node.y <= 240 - 507){
            this.node.destroy();
        }
            
    }



    play_anim(){
        this.anim.play();
    }

    getMapPos(dir :string, n: number){ //簡志宇的，判斷人在哪一個地圖座標，n是實際位置，適用於第一張地圖
        if(dir == 'x') return Math.floor(Number(n+673.843) /68.75);
        else return Math.floor(Number(n+252.041) /65.55);
        //return [r, c];
    }


}
