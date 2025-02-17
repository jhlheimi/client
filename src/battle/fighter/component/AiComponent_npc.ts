import { jk } from "../../../interface";
import { Root } from "../../Root";
import { Fighter_npc } from "../Fighter_npc";
/**
 * 简单的ai,一直往下冲
 */
export class AiComponent_npc extends Laya.Script {
    private user固定位: jk.position[]
    private host: Fighter_npc
    public init(host: Fighter_npc) {
        this.host = host
        this.user固定位 = Root.instance.user固定位
        this.host.rotate.角度 = -180
        this.host.move.startAngleMove(this.host.body)
        // this.rotation.rotate(-180).then(() => {
        //     console.log("旋转结束")
        //     this.move.isMove = true;
        // })
    }
    onDisable(): void {

    }
}