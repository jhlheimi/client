import { jk } from "../../../interface";
import { Root } from "../../Root";
/**属性 */
export class AttributeComponent {
    public static temp: jk.attributeName
    private list: { [name: string]: number } = {}
    public getAttr(name: jk.attributeName) {
        return this.list[name] ? this.list[name] : null
    }
    public setAttr(name: jk.attributeName, value: number) {
        this.list[name] ? this.list[name] = value : this.list[name] = value
    }
    public init(npcTypeID: number) {
        console.log(npcTypeID)
        console.log(Root.config.npc[npcTypeID])
        let att = Root.config.npc[npcTypeID].attribute
        for (let name in att) {
            this.setAttr(name as jk.attributeName, att[name])
        }
        // console.log(this.list)
    }
}