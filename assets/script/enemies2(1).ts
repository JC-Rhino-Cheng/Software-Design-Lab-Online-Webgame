import chi_skill from "./chi_skill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemies2 extends cc.Component {

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
    KwanYienRight: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    KwanYienLeft: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    KwanYienUp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    KwanYien: cc.SpriteFrame = null;

    @property enemyHP: number = 1000;

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

    //private enemyHP: number = 1000;

    private preHP: number = 1000;

    // States for enemy: 
    // 0: rest
    // 1: move
    // 2: hit
    // 3: recover
    // 4: 
    // 7: wait
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

    private canRecover = true;

    private canUseAtkSkill = true;

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
/*
        this.schedule(()=>{
            //this.enemyHP -= 50;
            //cc.log(this.enemyHP);
            this.cando *= -1;
            //if(!this.anim.getAnimationState("Kwan_hit").isPlaying) this.anim.play("Kwan_hit");
        }, 0.5);
        //this.moveToDes(68.75, 0);
        
        /*
        this.scheduleOnce(()=>{
            this.fireFrog();
        }, 5);
        */
    }

    update(dt){
        
        if(this.isDie) return;
        
        if(this.enemyHP <= 0) this.enemyDie();

        if(this.isOut || this.isPlayerOut) return;

        this.playerX = this.tmpPlayerNode.x;
        this.playerY = this.tmpPlayerNode.y;
        
        this.px = this.getMapPos('x', this.playerX);
        this.py = this.getMapPos('y', this.playerY);

        this.ex = this.getMapPos('x', this.node.x);
        this.ey = this.getMapPos('y', this.node.y);
        
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

    moveToDes(posX: number, posY: number){

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
        if(this.node.y < posY){
            numOfBlockPlayerMoved = this.py - this.ey;
            dir = 2;
            this.getComponent(cc.Sprite).spriteFrame = this.KwanYienUp;
            if(!this.anim.getAnimationState("KwanYien_moveup").isPlaying)
                this.animateState = this.anim.play("KwanYien_moveup");
        }
        else if(this.node.y > posY){
            numOfBlockPlayerMoved = this.ey - this.py;
            dir = 0;
            this.getComponent(cc.Sprite).spriteFrame = this.KwanYien;
            if(!this.anim.getAnimationState("KwanYien_movedown").isPlaying)
                this.animateState = this.anim.play("KwanYien_movedown");
        }
        else if(this.node.x < posX){
            numOfBlockPlayerMoved = this.px - this.ex;
            dir = 1;
            this.getComponent(cc.Sprite).spriteFrame = this.KwanYienLeft;
            if(!this.anim.getAnimationState("KwanYien_moveright").isPlaying)
                this.animateState = this.anim.play("KwanYien_moveright");
        }
        else if(this.node.x > posX){
            numOfBlockPlayerMoved = this.ey - this.py;
            dir = 3;
            this.getComponent(cc.Sprite).spriteFrame = this.KwanYienRight;
            if(!this.anim.getAnimationState("KwanYien_moveleft").isPlaying)
                this.animateState = this.anim.play("KwanYien_moveleft");
        }

        let action = cc.sequence(
            //cc.delayTime(1),
            cc.moveTo(0.3, posX, posY).easing(cc.easeInOut(2.0)),
            cc.delayTime(1)
            //cc.moveTo(0.3, -1 * posX, posY).easing(cc.easeInOut(2.0)),
            //cc.delayTime(1)
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
            if(waitTime == 4 && this.canUseAtkSkill){
                this.enemyUseAtkSkill();
            }
            this.scheduleOnce(()=>{
                if(this.enemyState == 0) this.enemyState = 1;
            }, waitTime);
        }
        // move to player nearby
        else if(this.enemyState == 1 && !this.isMoving){
            let dir = Math.floor(Math.random() * 10);
            
            let i, j;
            j = dir% 6 + 1;
            if(dir%3 == 0) i = 1;
            else if(dir%3 == 1) i = -1;
            else i = 0;

            if(this.px != this.ex && this.py != this.ey){
                
                if(dir % 2 == 0){
                    if(Math.abs(this.px - this.ex) <= 6){
                        this.moveToDes(this.node.x, this.playerY + j*i*65.55);
                    }
                    else if(Math.abs(this.py - this.ey) <= 6){
                        this.moveToDes(this.playerX + j*i*68.75, this.node.y);
                    }
                    //this.enemyState = 0;
                }
                else {
                    if(Math.abs(this.py - this.ey) <= 6){
                        this.moveToDes(this.node.x, this.playerY + j*i*65.55);
                    }
                    else if(Math.abs(this.px - this.ex) <= 6){
                        this.moveToDes(this.playerX + j*i*68.75, this.node.y);
                    }
                    //this.enemyState = 0;
                }
            }
            else if((this.px == this.ex && Math.abs(this.py - this.ey) <= 6) || (Math.abs(this.px - this.ex) <= 6 && this.py == this.ey)){
                this.enemyState = 2;
            }
            else if(this.px == this.ex){
                this.moveToDes(this.node.x, this.playerY + j*i*65.55);
            }
            else if(this.py == this.ey){
                this.moveToDes(this.playerX + j*i*68.75, this.node.y);
            }
        }
        // hit
        else if(this.enemyState == 2 && !this.isMoving){
            if(this.px == this.ex){
                if(this.py > this.ey && this.py - this.ey <= 6){
                    this.getComponent(cc.Sprite).spriteFrame = this.KwanYienUp;
                    this.node.scaleX = 1;
                    this.KwanYienHit('up');
                }
                else if(this.py < this.ey && this.ey - this.py <= 6){
                    this.getComponent(cc.Sprite).spriteFrame = this.KwanYien;
                    this.node.scaleX = 1;
                    this.KwanYienHit('down');
                }
                else this.enemyState = 1;
            }
            else if(this.py == this.ey){
                if(this.px > this.ex && this.px - this.ex <= 6){
                    this.getComponent(cc.Sprite).spriteFrame = this.KwanYienRight;
                    this.node.scaleX = 1;
                    this.KwanYienHit('right');
                    
                }
                else if(this.px < this.ex && this.ex - this.px <= 6){
                    this.getComponent(cc.Sprite).spriteFrame = this.KwanYienLeft;
                    this.node.scaleX = -1;
                    this.KwanYienHit('left');
                }
                else this.enemyState = 1;
            }
            else this.enemyState = 1;
        }
        if(this.enemyHP < 250 && this.enemyState != 3 && !this.isMoving && this.canRecover){ // 30% HP
            //if(this.preHP > this.enemyHP){
                //this.enemyState = 1;
            //}
            //else {
                this.enemyState = 3;
                this.enemyRecover();
            //}
        }
        
    }

    KwanYienHit(dir: string){
        if(dir == 'left' || dir == 'right'){
            if(dir == 'left'){
                this.enemyHit(5, 3);
            }
            else {
                this.enemyHit(5, 1);
            }
            if(!this.anim.getAnimationState("Kwan_hit").isPlaying) this.anim.play("Kwan_hit");
        }
        else if(dir == 'down'){
            this.enemyHit(5, 0);
            if(!this.anim.getAnimationState("Kwan_hitdown").isPlaying) this.anim.play("Kwan_hitdown");
        }
        else {
            this.enemyHit(5, 2);
            if(!this.anim.getAnimationState("Kwan_hitup").isPlaying) this.anim.play("Kwan_hitup");
        }
    }

    private enemyHit(numOfBlockThePlayerMoved, dir){
        
        if(this.ex == this.px){
            if(dir == 0){
                if(this.ey - this.py <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(10);
                }
            }
            else if(dir == 2){
                if(this.py - this.ey <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(10);
                    
                }
            }
        }
        else if(this.ey == this.py){
            if(dir == 1){
                if(this.px - this.ex <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(10);
                    
                }
            }
            
            else if(dir == 3){
                if(this.ey - this.py <= 5){
                    // 有衝到
                    //this.tmpPlayerNode.opacity = 0;
                    
                    this.tmpPlayerNode.getComponent("player").playerLoseBlood(10);
                    
                }
            }
        }
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

    enemyUseAtkSkill(){
        
        this.canUseAtkSkill = false;

        let atk_anim = this.atkSkill.getComponent(cc.Animation);
        this.atkSkill.opacity = 255;
        
        if(!atk_anim.getAnimationState("fire_skill_self").isPlaying)
            atk_anim.play("fire_skill_self");
        
        this.scheduleOnce(()=>{
            //this.enemyState = 0;
            // 
            this.atkSkill.opacity = 0;

            this.scheduleOnce(()=>{this.canUseAtkSkill = true;}, 12);
        }, 0.6);
    }

    enemyHurt(p: number){
        this.enemyHP -= p;
        let m = 80 * p/1000;
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
