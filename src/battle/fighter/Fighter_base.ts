import { jk } from "../../interface";
import { Fighter } from "./Fighter";
import { Fighter_user } from "./Fighter_user";
import { RigidBodyComponent_Npc } from "./component/RigidBodyComponent_Npc";
export class Fighter_base extends Fighter {
    public list: { [sceneID: string]: Fighter_user }
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