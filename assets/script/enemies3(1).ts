const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemies3 extends cc.Component {

    @property({type: cc.Node})
    mapNode: cc.Node = null;

    @property({type: cc.Node})
    tmpPlayerNode: cc.Node = null;

    @property({type: cc.Node})
    dieNode: cc.Node = null;

    @property({type: cc.Node})
    recoverHP: cc.Node = null;

    @property({type: cc.Node})
    recoverMP: cc.Node = null;

    @property({type: cc.Node})
    atkSkill: cc.Node = null;

    @property({type: cc.Node})
    defSkill: cc.Node = null;

    @property({type: cc.Node})
    HP_barNode: cc.Node = null;

    @property({type: cc.ParticleSystem})
    ninjutsuStart: cc.ParticleSystem = null;

    @property(cc.SpriteFrame)
    frog: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AkaRight: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AkaLeft: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AkaUp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    Aka: cc.SpriteFrame = null;

    @property enemyHP: number = 400;

    private map: number[][]=[ // row: 9, col: 20
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private path: cc.Vec2[] = [];

    private preHP: number = 400;

    // States for enemy: 
    // 0: rest
    // 1: move
    // 2: hit
    // 3: recover
    // 4: 
    private enemyState: number = 0;
    
    private anim = null;

    private animateState = null;

    private playerX: number;

    private playerY: number;

    private px: number;

    private py: number;

    private ex: number;

    private ey: number;

    private cando: number = 1;

    private canRecover: Boolean = true;

    private isMoving = false;

    private isDie = false;

    private isOut = false;

    private isPlayerOut = false;

    private timer: number = 0;

    private mapOffsetX: number = 68.75;

    private mapOffsetY: number = 65.55;

    private mapStartX: number = 60; // 100 ~ 1395 (若角色置中)

    private mapStartY: number = 255; // 295 ~ 856 (若角色置中)

    private enemyOffsetX: number = 40;

    private enemyOffsetY: number = 41;

    onLoad(){
        this.anim = this.getComponent(cc.Animation);
        this.setMap();
        
    }

    start(){

        //this.node.scaleX = -1;
        this.preHP = this.enemyHP;
        this.schedule(()=>{
            this.timer += 1;
            this.preHP = this.enemyHP;
            //if(!this.anim.getAnimationState("Kwan_hit").isPlaying) this.anim.play("Kwan_hit");
        }, 1);
    }

    update(dt){
        
        if(this.isDie) return;
        
        if(this.enemyHP <= 0){
            cc.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
            this.enemyDie();
        }
        if(this.isOut || this.isPlayerOut) return;

        this.playerX = this.tmpPlayerNode.x;
        this.playerY = this.tmpPlayerNode.y;
        
        this.px = this.getMapPos('x', this.playerX); // player 的 網格位置 x
        this.py = this.getMapPos('y', this.playerY); // player 的 網格位置 y

        this.ex = this.getMapPos('x', this.node.x); // enemy 的 網格位置 x
        this.ey = this.getMapPos('y', this.node.y); // enemy 的 網格位置 y
        
        if(this.cando > 0  && !this.isDie) this.makeChoice();
    }

    getMapPos(dir: string, n: number){
        if(dir == 'x') return Math.floor(Number(n - this.enemyOffsetX - this.mapStartX) / this.mapOffsetX);
        else return Math.floor(Number(n - this.enemyOffsetY - this.mapStartY) / this.mapOffsetY);
    }

    findPath(posX: number, posY: number){
        // DFS??
        let path_arr = [];
        let desC = Math.floor(Number(posX-60) /68.75);
        let desR = Math.floor(Number(posY-255) /65.55);
        //while(this.getEnemyPos() != [desR, desC]){

        //}
        return path_arr;
    }

    setMap(){
        // 從map1拿到map的資訊(包括障礙物位置等等)

    }

    setRebornPos(){
        let r = Math.floor(Math.random() * 100);
        let x: number, y: number;
        x = r%20;
        y = r%9;
        this.node.x = this.mapStartX + this.enemyOffsetX + this.mapOffsetX * this.ex;
        this.node.x = this.mapStartY + this.enemyOffsetY + this.mapOffsetY * this.ey;
    }

    moveToDes(posX: number, posY: number, mapX: number, mapY: number){
        
        let numOfBlockPlayerMoved, dir;
/*
        if(posX < this.mapStartX){
            posX = this.mapStartX;
        }
        else if(posX > 18*this.mapOffsetX + this.enemyOffsetX){
            posX = 18*this.mapOffsetX + this.enemyOffsetX;
        }

        if(posY < this.mapStartY){
            posY = this.mapStartY;
        }
        else if(posY > 7*this.mapOffsetY + this.enemyOffsetY){
            posY = 7*this.mapOffsetY + this.enemyOffsetY
        }
*/
        this.isMoving = true;
        if(this.ey < mapY){
            numOfBlockPlayerMoved = this.py - this.ey;
            dir = 2;
            this.getComponent(cc.Sprite).spriteFrame = this.AkaUp;
            if(!this.anim.getAnimationState("Aka_moveup").isPlaying)
                this.animateState = this.anim.play("Aka_moveup");
        }
        else if(this.ey > mapY){
            numOfBlockPlayerMoved = this.ey - this.py;
            dir = 0;
            this.getComponent(cc.Sprite).spriteFrame = this.Aka;
            if(!this.anim.getAnimationState("Aka_movedown").isPlaying)
                this.animateState = this.anim.play("Aka_movedown");
        }
        else if(this.ex < mapX){
            numOfBlockPlayerMoved = this.px - this.ex;
            dir = 1;
            this.getComponent(cc.Sprite).spriteFrame = this.AkaLeft;
            if(!this.anim.getAnimationState("Aka_moveright").isPlaying)
                this.animateState = this.anim.play("Aka_moveright");
        }
        else if(this.ex > mapX){
            numOfBlockPlayerMoved = this.ey - this.py;
            dir = 3;
            this.getComponent(cc.Sprite).spriteFrame = this.AkaRight;
            if(!this.anim.getAnimationState("Aka_moveleft").isPlaying)
                this.animateState = this.anim.play("Aka_moveleft");
        }

        let action = cc.sequence(
            cc.moveTo(0.3, posX, posY).easing(cc.easeInOut(2.0)),
            cc.delayTime(1)
        );
        this.node.runAction(action);
        this.scheduleOnce(()=> { this.isMoving = false;}, 1.3);

        this.chongRay(numOfBlockPlayerMoved, dir);
    }

    makeChoice(){
        //if(this.isMoving) return;
        // 決定下一步要做甚麼
        
        if(this.enemyState == 0 && !this.isMoving){
            let waitTime = Math.floor(Math.random() * 10) % 5;
            this.enemyState = 7;
            
            this.scheduleOnce(()=>{
                if(this.enemyState == 7) this.enemyState = 1;
            }, waitTime);
        }
        // move to player nearby
        else if(this.enemyState == 1 && !this.isMoving){
            let dir = Math.floor(Math.random() * 10);
            
            let i;
            if(dir%4 > 1) i = 1;
            else if(dir%4 <= 1) i = -1;
            //else i = 0;

            if((this.px != this.ex + 1 && this.px != this.ex - 1) || (this.py != this.ey + 1 && this.py != this.ey - 1)){
                if(dir % 2 == 0){
                    this.moveToDes((this.px+i)*this.mapOffsetX + this.mapStartX + this.enemyOffsetX, this.node.y, this.px+i, this.ey);
                    //this.enemyState = 0;
                }
                else {
                    this.moveToDes(this.node.x, (this.py+i)*this.mapOffsetY + this.mapStartY + this.enemyOffsetY, this.ex, this.py+i);
                    //this.enemyState = 0;
                }
            }
            else {
                this.enemyState = 2;
            }
        }
        // hit
        else if(this.enemyState == 2 && !this.isMoving){
            if((this.px != this.ex + 1 && this.px != this.ex - 1) || (this.py != this.ey + 1 && this.py != this.ey - 1)){
                this.enemyState = 1;
            }
            else this.AkaHit("down");
        }
        if(this.enemyHP < 250 && this.enemyState != 3 && !this.isMoving){ // 30% HP
            //if(this.preHP > this.enemyHP){
                //this.enemyState = 1;
            //}
            //else {
                this.enemyState = 3;
                this.enemyRecover();
            //}
        }
        
    }

    AkaHit(dir: string){
        if(!this.anim.getAnimationState("Aka_hit").isPlaying) this.anim.play("Aka_hit");
        this.enemyHit();
    }

    enemyRecover(){
        // 用回復忍術回復
        this.canRecover = false;
        
        let HP_anim = this.recoverHP.getComponent(cc.Animation);
        this.recoverHP.opacity = 255;
        if(!HP_anim.getAnimationState("chi_skill_2").isPlaying)
            HP_anim.play("chi_skill_2");
        this.scheduleOnce(()=>{
            this.enemyState = 0;
            this.enemyHP += 200;
            this.recoverHP.opacity = 0;
            
            this.scheduleOnce(()=>{this.canRecover = true;}, 5);
        }, 1);
    }

    enemyHurt(p: number){
        this.enemyHP -= p;
        let m = 80 * p/400;
        if(this.HP_barNode.width > m){
            this.HP_barNode.width -= m;
        }
        else {
            //this.isDie = true;       
            this.HP_barNode.width = 0;
        }
    }

    enemyOut(){
        cc.log(this.node.name + " is out!");
        this.isOut = true;
        this.node.opacity = 0;
        this.enemyHurt(20);
        this.setRebornPos();
        this.scheduleOnce(()=>{
            this.isOut = false;
            this.node.opacity = 255;
            cc.log("stop");
        }, 5);
    }

    enemyDie(){
        this.node.scaleX = 1;
        this.isDie = true;
        this.getComponent(cc.Sprite).enabled = false;
        if(!this.dieNode.getComponent(cc.Animation).getAnimationState("die").isPlaying)
            //this.dieNode.scaleX = 1;
            this.dieNode.getComponent(cc.Animation).play("die");
        this.scheduleOnce(()=>{
            this.node.removeFromParent();
            //cc.director.loadScene("hall");

            this.mapNode.getComponent("map1").win();
        }, 1.94);
        
    }

    private enemyHit(){
        if(Math.abs(this.ex-this.px) <= 1){
            this.tmpPlayerNode.getComponent("player").playerLoseBlood(5);
        }
        /*
        if(this.ex == this.px){
            if(dir == 0){
                if(this.ey - this.py <= 1){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(20);
                }
            }
            else if(dir == 2){
                if(this.py - this.ey <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(20);
                    
                }
            }
        }
        else if(this.ey == this.py){
            if(dir == 1){
                if(this.px - this.ex <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(20);
                    
                }
            }
            
            else if(dir == 3){
                if(this.ey - this.py <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(20);
                    
                }
            }
        }
        */
    }

    private chongRay/*「衝」光波*/(numOfBlockThePlayerMoved: number, dir: number) {
        
        if(this.ex == this.px){
            if(dir == 0){
                if(this.ey - this.py <= numOfBlockThePlayerMoved){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    this.tmpPlayerNode.getComponent("player").playerChonged();
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
            else if(dir == 2){
                if(this.py - this.ey <= numOfBlockThePlayerMoved){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    this.tmpPlayerNode.getComponent("player").playerChonged();
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
        }
        else if(this.ey == this.py){
            if(dir == 1){
                if(this.px - this.ex <= numOfBlockThePlayerMoved){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    this.tmpPlayerNode.getComponent("player").playerChonged();
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
            
            else if(dir == 3){
                if(this.ey - this.py <= numOfBlockThePlayerMoved){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.isPlayerOut = true;
                    this.tmpPlayerNode.getComponent("player").playerChonged();
                    this.scheduleOnce(()=>{
                        this.isPlayerOut = false;
                    }, 5);
                }
            }
        }
    }
}
