import { FighterManage } from "../FighterManage";
import { RigidBodyComponent } from "./RigidBodyComponent";
export class RigidBodyComponent_Bullet extends RigidBodyComponent {
    onTriggerEnter(other: Laya.ColliderBase, self: Laya.ColliderBase, contact?: any): void {
        FighterManage.popFighter(self.label)
        // if (Root.getAerocraft1(other.label).objType === "fighter") {
        //     HurtFormula.npc撞机(Root.getAerocraft1(other.label).host, Root.getAerocraft1(self.label).host)
        //     console.log("撞机")
        // } else {
        //     //俩边都是npc
        // }
    }
}