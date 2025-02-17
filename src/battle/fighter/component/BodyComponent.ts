import { jk } from "../../../interface"
import { Root } from "../../Root"

/**身体 */
export class BodyComponent extends Laya.Sprite {
    public init(typeID: number): Promise<Laya.Sprite> {
        return new Promise((fulfilled, no) => {
            this.loadImage(Root.config.npc[typeID].皮肤地址, Laya.Handler.create(this, () => {
                this.anchorX = 0.5
                this.anchorY = 0.5
                fulfilled(this)
            }))
        })

    }
}