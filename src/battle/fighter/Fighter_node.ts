import { jk } from "../../interface";
import { Fighter } from "./Fighter";
import { RigidBodyComponent_Npc } from "./component/RigidBodyComponent_Npc";
export class Fighter_node extends Fighter {
    public rigidbody: RigidBodyComponent_Npc
    public init(param: jk.fighterInitParam): Promise<this> {
        return new Promise((ok, on) => {
            this.init2(param).then(() => {
                this.rigidbody = this.body.addComponent(RigidBodyComponent_Npc)
                this.rigidbody.init("userBody", this.sceneID, this.body)
                ok(this)
            })
        })
    }
}