import { jk } from "../../interface";
import { Fighter } from "./Fighter";
import { AiComponent_npc } from "./component/AiComponent_npc";
import { RigidBodyComponent_Npc } from "./component/RigidBodyComponent_Npc";
export class Fighter_npc extends Fighter {
    public npcAi: AiComponent_npc
    public rigidbody: RigidBodyComponent_Npc
    public init(param: jk.fighterInitParam): Promise<this> {
        return new Promise((ok, on) => {
            this.init2(param).then(() => {
                this.npcAi = this.addComponent(AiComponent_npc)
                this.rigidbody = this.body.addComponent(RigidBodyComponent_Npc)
                this.rigidbody.init("npcBody", this.sceneID, this.body)
                this.npcAi.init(this)
            })
        })
    }
}