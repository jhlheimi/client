import { jk } from "../../../interface";

export class MoveComponent extends Laya.Script {
    public _speed: number = 0
    private _host: jk.common
    public isMove: boolean = false
    public config: any = {}
    public body: Laya.Sprite;
    public set speed(value: number) {
        this._speed = value;
    }
    public get speed() {
        return this._speed
    }
    public get x() { return this._host.x }
    public get y() { return this._host.y }
    public set x(value: number) {
        this._host.x = value
    }
    public set y(value: number) {
        this._host.y = value
    }
    public init(host: jk.common, speed: number) {
        this._host = host
        this._speed = speed
        this.isMove = false;
    }
    onAwake(): void {

    }
    public to(targetXY: jk.position): Promise<boolean> {
        return new Promise((ok, no) => {
            Laya.Tween.to(this._host, targetXY, 100, null, Laya.Handler.create(null, () => {
                ok(true)
            }))
        })

    }
    /**开启-朝着角度移动 */
    public startAngleMove(angleBody: Laya.Sprite) {
        this.body = angleBody
        Laya.timer.frameLoop(1, this, this._move)
    }
    private _move() {
        //弧度
        const hd = (this.body.rotation - 90) * (Math.PI / 180)
        const dx = this._speed * Math.cos(hd) * 0.1
        const dy = this._speed * Math.sin(hd) * 0.1
        this.x += dx
        this.y += dy
    }
    /**停止-朝着角度移动 */
    public stopAngleMove() {
        Laya.timer.clear(this, this._move)
    }
    onDisable(): void {
        Laya.timer.clear(this, this._move)
    }
}
