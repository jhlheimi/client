import { jk } from "../../interface";

export abstract class Common extends Laya.Sprite implements jk.common {
    sceneID: string;
    typeID: number;
    _state: jk.state;
    collisinoType: jk.collisionType
    public set state(value: jk.state) {
        if (this._state != value) {
            this._state = value
            if (value === "die") {
                this.removeSelf()
                // console.log("删除子弹:",this.sceneID)
            } else if (value === "battle") {

            } else if (value === "idling") {
            }
        }
    }
    public get state() { return this._state }
} 