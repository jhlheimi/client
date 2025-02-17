import { jk } from "../../../interface"
import { Root } from "../../Root"
import { FighterManage } from "../FighterManage"
import { Fighter_bullet145 } from "../Fighter_bullet145"
type 发射样式 = "z直线多发" | "x旋转发射" | "s扇形多发" | "z子弹组合4" | "z子弹组合5" | "z子弹组合6" | "z子弹组合7" | "z子弹组合8"
export namespace Bullet145Component {
    export class Generator extends Laya.Script {
        private hostNpc: jk.fighter
        public s时间颗粒: number = 20 //毫秒
        private 初始角度: number = 0;
        public type: number = 0
        public level: number = 0
        public f发射频率: number = 0
        public f发射次数: number = 0
        public l冷却时间: number = 0
        public s是否发射: boolean = false
        public config: any
        init(bulletID: number, hostNpc: jk.fighter) {
            this.hostNpc = hostNpc
            this.config = Root.config.bullet[bulletID]
            this.f发射频率 = this.config.发射频率
            this.f发射次数 = this.config.发射次数
            this.l冷却时间 = this.config.冷却时间
            this.s是否发射 = true;
            this.start()
            // this.f发射器()
        }
        public start() {
            Laya.timer.loop(this.s时间颗粒, this, this.f发射器)
        }
        public stop() {
            Laya.timer.clear(this, this.f发射器)
        }
        private f发射器(): void {
            this.l冷却时间 -= this.s时间颗粒
            if (this.l冷却时间 < 1) {
                if (this.f发射频率 >= this.config.发射频率) {
                    this.f发射频率 = 0
                    if (this.f发射次数 > 0) {
                        this[this.config.发射样式 as 发射样式]()
                        // console.log("子弹组合0")
                        this.f发射次数--
                    } else {
                        this.l冷却时间 = this.config.冷却时间
                        this.f发射次数 = this.config.发射次数
                        this.f发射频率 = this.config.发射频率
                    }

                } else {
                    this.f发射频率 += this.s时间颗粒
                }
                // 
            }
        }
        onDisable(): void {
            this.stop();
        }
        private _createBullet(): Promise<Fighter_bullet145> {
            return new Promise((ok, no) => {
                let bullet = FighterManage.createFighter(Fighter_bullet145)
                FighterManage.addList(bullet)
                bullet.init(this.config.typeID, this.hostNpc, this.hostNpc.collisinoType).then(() => {
                    ok(bullet)
                })
            })

        }
        /**
         * z直线多发
         */
        private z直线多发() {
            let xy = 0
            if (this.config.发射数量 === 1) {
                xy = 0
            } else if (this.config.发射数量 === 2) {
                xy = 20
            } else if (this.config.发射数量 === 3) {
                xy = 40
            } else if (this.config.发射数量 === 4) {
                xy = 60
            } else if (this.config.发射数量 === 5) {
                xy = 80
            }
            for (let i = 0; i < this.config.发射数量; i++) {
                this._createBullet().then((bullet) => { bullet.x = (this.hostNpc.x - xy) + i * 40 })
            }
        }

        /**
         *x旋转发射 360方向的子弹
         */
        private x旋转发射() {
            this._createBullet().then((bullet) => {
                bullet.rotation = this.初始角度
                this.初始角度 += 10;
                if (this.初始角度 > 360) { this.初始角度 = 0 }
            })

        }

        /**
         * s扇形多发
         */
        private s扇形多发() {
            let xy = 0
            if (this.config.发射数量 === 1) {
                xy = 0
            } else if (this.config.发射数量 === 2) {
                xy = -5
            } else if (this.config.发射数量 === 3) {
                xy = -10
            } else if (this.config.发射数量 === 4) {
                xy = -15
            } else if (this.config.发射数量 === 5) {
                xy = -20
            }
            for (let i = 0; i < this.config.发射数量; i++) {
                this._createBullet().then((bullet) => {
                    bullet.rotation = xy + i * 10
                })
            }
        }
        private z子弹组合3() { }
        private z子弹组合4() { }
        private z子弹组合5() { }
        private z子弹组合6() { }
        private z子弹组合7() { }
        private z子弹组合8() { }
    }
}