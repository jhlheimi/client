import { config } from "../config";
import { jk } from "../interface";
import { NpcManage } from "./NpcManage";
import { UserManage } from "./UserManage";
import { FighterManage } from "./fighter/FighterManage";

const { regClass, property } = Laya;
export interface position {
    index: number
    x: number
}
@regClass()
export class Root extends Laya.Script {
    public static sceneID: number = 1
    public static instance: Root
    /**主场景中的显示内容的节点层 */
    public static node(name: jk.RootShowNode): Laya.Sprite { return Root.instance.owner.getChildByName(name) as Laya.Sprite }
    public static config: any = {}
    public d道路列表: position[]
    public user固定位: jk.position[]
    public userManage: UserManage = new UserManage();
    public npcManage: NpcManage = new NpcManage()
    onEnable(): void {
        Root.instance = this
        this.loadconfig().then((configData) => {
            Root.config = configData
            this.d道路列表 = []
            this.user固定位 = []
            this.init(1)
        })
    }
    c创建道路() {
        // let z总宽 = 560 
        // let z总宽 = Laya.stage.width * 0.7
        let z总宽 = 600
        let f分段 = 4
        let q起点 = (Laya.stage.width - z总宽) / 2
        for (let i = 0; i < 5; i++) {
            let xy = { index: i, x: q起点 + ((z总宽 / f分段) * i) }
            let sp = new Laya.Sprite()
            sp.loadImage("./resources/ui/common/block_green.png", Laya.Handler.create(null, () => {
                sp.width = 10
                sp.height = 10
                sp.x = xy.x
                sp.y = 200
                this.owner.addChild(sp)
            }))
            this.d道路列表.push(xy)
        }
    }
    private loadconfig(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(config)
        })
    }
    public init(关卡id: number) {
        Root.sceneID = 1
        for (let i = 0; i < 3; i++) {
            let sp = new Laya.Sprite()
            sp.width = Laya.stage.width
            sp.height = Laya.stage.height;
            sp.x = 0
            sp.y = 0
            if (i === 0) {
                sp.name = "map"
            } else if (i === 1) {
                sp.name = "npc"
            } else if (i === 2) {
                sp.name = "bullet"
            }
            this.owner.addChild(sp)
        }
        this.c创建道路();
        FighterManage.init(this.owner.getChildByName("npc") as Laya.Sprite)
        this.userManage.init(this, [10000, 10001])
        this.npcManage.init({ g关卡: 1 }, this)
        this.userManage.j交换框List.forEach((obj: Laya.Sprite) => {
            this.user固定位.push({ x: obj.x, y: obj.y })
        })
    }
    public k开始游戏() { }
    public 暂停游戏() { }
    public 继续游戏() { }
    public 结束游戏() { }
}