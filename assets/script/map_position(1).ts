
const {ccclass, property} = cc._decorator;

@ccclass
export default class map_position extends cc.Component {

    @property(Number)
    map_number: number;

    private PlayerOffsetX: number = 48;
    private PlayerOffsetY: number = 62;

    private EnemyOffsetX: number = 48;
    private EnemyOffsetY: number = 62;

    private mapStartX_1: number = 60;
    private mapStartY_1: number = 255;
    private mapOffsetX_1: number = 68.75;
    private mapOffsetY_1: number = 65.55;

    private mapStartX_2: number = 1;
    private mapStartY_2: number = 1;
    private mapOffsetX_2: number = 1;
    private mapOffsetY_2: number = 1;


    
    start () {

    }

    getMapPos(dir: string, n: number, object: string){
        if(object == 'player'){
            //if(this.map_number == 1 || this.map_number == 2){
                if(dir == 'x') return Math.floor(Number(n - this.PlayerOffsetX - this.mapStartX_1) / this.mapOffsetX_1);
                else return Math.floor(Number(n - this.PlayerOffsetY - this.mapStartY_1) / this.mapOffsetY_1);
            //}else{
            //    if(dir == 'x') return Math.floor(Number(n - this.PlayerOffsetX - this.mapStartX_2) / this.mapOffsetX_2);
            //    else return Math.floor(Number(n - this.PlayerOffsetY - this.mapStartY_2) / this.mapOffsetY_2);
            //}
        }else{
            //if(this.map_number == 1 || this.map_number == 2){
                if(dir == 'x') return Math.floor(Number(n - this.EnemyOffsetX - this.mapStartX_1) / this.mapOffsetX_1);
                else return Math.floor(Number(n - this.EnemyOffsetY - this.mapStartY_1) / this.mapOffsetY_1);
            //}else{
            //    if(dir == 'x') return Math.floor(Number(n - this.EnemyOffsetX - this.mapStartX_2) / this.mapOffsetX_2);
            //    else return Math.floor(Number(n - this.EnemyOffsetY - this.mapStartY_2) / this.mapOffsetY_2);
            //}

        }
        
        
    }
}
