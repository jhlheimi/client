/**工具类 */
/**常用的一些功能 */
// export class Utils {
//     /**字符串转对象 */
//     public toObj(data: string): any { return JSON.parse(data); }
//     /**对象转字符串 */
//     public toString(data: Object): string { return JSON.stringify(data); }
//     /**2点坐标之间距离
//      * @param startX 启始对象x坐标
//      * @param startY 启始对象y坐标
//      * @param endX 目标对象x坐标
//      * @param endY 目标对象y坐标
//      * @param return number
//     */
//     public distance(startX: number, startY: number, endX: number, endY: number): number {
//         let dX = Math.abs(endX - startX);
//         let dY = Math.abs(endY - startY)
//         return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
//         // console.log("距离:"+Math.sqrt(Math.pow(Math.abs(endX - startX), 2) + Math.pow(Math.abs(endY - startY), 2)));
//         // return Math.sqrt(Math.pow(Math.abs(endX - startX), 2) + Math.pow(Math.abs(endY - startY), 2))
//     }
//     /**2点坐标之间角度
//      * @param startX 启始对象x坐标
//      * @param startY 启始对象y坐标
//      * @param endX 目标对象x坐标
//      * @param endY 目标对象y坐标
//      * @param return number
//     */
//     public angle(startX: number, startY: number, endX: number, endY: number): number {
//         let dX = Math.abs(endX - startX);
//         let dY = Math.abs(endY - startY)
//         let angle = 360 * Math.atan(dY / dX) / (2 * Math.PI)
//         if (endX < startX && endY < startY) {
//             angle = 180 - angle
//         } else if (endX < startX && endY > startY) {
//             angle += 180
//         } else if (endX > startX && endY > startY) {
//             angle = 360 - angle
//         } else if (endX == startX && endY < startY) {
//             angle = 90
//         } else if (endX < startX && endY == startY) {
//             angle = 180
//         } else if (endX == startX && endY > startY) {
//             angle = 270
//         } else if (endX == startX && endY == startY) {
//             angle = 0;
//         }
//         return angle;
//     }
//     /**追踪目标 
//      * @param x1_y1 导弹
//      * @param x2_y2 目标
//      * @param speed 速度
//     */
//     public trackMove(x1: number, y1: number, x2: number, y2: number, speed: number) {
//         let deltax: number = x1 - x2;
//         let deltay: number = y1 - y2;
//         if (deltax == 0) { if (y1 >= y2) { deltax = 0.0000001 } else { deltax = -0.0000001 } }
//         if (deltay == 0) { if (x1 >= x2) { deltay = 0.0000001 } else { deltay = -0.0000001 } }
//         let angle = 0;
//         if (deltax > 0 && deltay > 0) {
//             angle = Math.atan(Math.abs(deltay / deltax))           // 第一项限
//         } else if (deltax < 0 && deltay > 0) {
//             angle = Math.PI - Math.atan(Math.abs(deltay / deltax))          // 第二项限
//         } else if (deltax < 0 && deltay < 0) {
//             angle = Math.PI + Math.atan(Math.abs(deltay / deltax))          // 第三项限
//         } else {
//             angle = 2 * Math.PI - Math.atan(Math.abs(deltay / deltax))         // 第四项限
//         }
//         x1 -= speed * Math.cos(angle)
//         y1 -= speed * Math.sin(angle)
//     }

//     /**朝着角度移动 */
//     public moveAngle(x: number, y: number, angle: number, speed: number): xy {
//         return { x: x += speed * Math.cos(angle * (Math.PI / 180)), y: y += speed * Math.sin(angle * (Math.PI / 180)) }
//     }
//     /**一致的随机数 同步的随机种子*/
//     public seededRandom(seed: number, max: number, min: number) {
//         let _seed = seed;
//         let _max = max || 1;
//         let _min = min || 0;
//         _seed = (_seed * 9301 + 49297) % 233280;
//         let rnd = _seed / 233280.0;
//         return _min + rnd * (_max - _min);
//     }
// }
export namespace utils {
    /**@param 一致的随机数 同步的随机种子*/
    export function seededRandom(seed: number, max: number, min: number) {
        let _seed = seed;
        let _max = max || 1;
        let _min = min || 0;
        _seed = (_seed * 9301 + 49297) % 233280;
        let rnd = _seed / 233280.0;
        return _min + rnd * (_max - _min);
    }
    export namespace angleXY {
        /**2点之间 逆时针 坐标换算成角度
             * 
             * @param x1 起始x
             * @param y1 起始y
             * @param x2 结束x
             * @param y2 结束y
             * @returns 
             */
        export function angleToXY2(x1: number, y1: number, x2: number, y2: number): number {
            // 计算两点之间y坐标和x坐标的差值
            const deltaY = y2 - y1;
            const deltaX = x2 - x1;

            // 使用Math.atan2计算弧度值
            const angleInRadians = Math.atan2(deltaY, deltaX);

            // 将弧度转换为度数
            const angleInDegrees = angleInRadians * (180 / Math.PI);

            // 返回角度（度数），可以根据需要调整为正角度或保持原样
            return angleInDegrees;
        }
        /** 逆时针 角度 换算成 xy坐标
         *  0坐标是右边
         * @param angleDegrees 角度
         * @param radius 半径
         * @returns 
         */
        export function angleToXY(angleDegrees: number, radius: number): { x: number, y: number } {
            // 将角度从度转换为弧度
            const angleRadians = angleDegrees * (Math.PI / 180);

            // 计算 x 和 y 坐标
            const x = Math.floor(radius * Math.cos(angleRadians));
            const y = Math.floor(radius * Math.sin(angleRadians));

            return { x, y };
        }
        /** 逆时针 xy坐标 换算成 角度
         *  0坐标是右边
         * @param angleDegrees 角度
         * @param radius 半径
         * @returns 
         */
        export function xyToAngle(x: number, y: number): number {
            // // 使用Math.atan2计算弧度值
            // const angleInRadians = Math.atan2(y, x);

            // // 将弧度转换为度数
            // const angleInDegrees = angleInRadians * (180 / Math.PI);

            // // 返回角度（度数）
            // return angleInDegrees;
            return Math.atan2(y, x) * (180 / Math.PI)
        }
        /**计算两个角度之间的最小差值,顺时针
         * @return false = 逆时针 true=顺时针
         */
        export function clockwiseRotation(当前角度: number, 期望角度: number): boolean {
            let 顺时针差值 = (期望角度 - 当前角度 + 360) % 360
            let 逆时针差值 = (当前角度 - 期望角度 + 360) % 360
            if (顺时针差值 < 逆时针差值) {
                return true
            }
            return false
        }
    }
    /**2点坐标之间距离
         * @param startX 启始对象x坐标
         * @param startY 启始对象y坐标
         * @param endX 目标对象x坐标
         * @param endY 目标对象y坐标
         * @param return number
        */
    export function distance(startX: number, startY: number, endX: number, endY: number): number {
        let dX = Math.abs(endX - startX);
        let dY = Math.abs(endY - startY)
        return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
        // console.log("距离:"+Math.sqrt(Math.pow(Math.abs(endX - startX), 2) + Math.pow(Math.abs(endY - startY), 2)));
        // return Math.sqrt(Math.pow(Math.abs(endX - startX), 2) + Math.pow(Math.abs(endY - startY), 2))
    }
    /**追踪目标 
         * @param x1_y1 导弹
         * @param x2_y2 目标
         * @param speed 速度
        */
    export function trackMove(x1: number, y1: number, x2: number, y2: number, speed: number) {
        let deltax: number = x1 - x2;
        let deltay: number = y1 - y2;
        if (deltax == 0) { if (y1 >= y2) { deltax = 0.0000001 } else { deltax = -0.0000001 } }
        if (deltay == 0) { if (x1 >= x2) { deltay = 0.0000001 } else { deltay = -0.0000001 } }
        let angle = 0;
        if (deltax > 0 && deltay > 0) {
            angle = Math.atan(Math.abs(deltay / deltax))                    // 第一项限
        } else if (deltax < 0 && deltay > 0) {
            angle = Math.PI - Math.atan(Math.abs(deltay / deltax))          // 第二项限
        } else if (deltax < 0 && deltay < 0) {
            angle = Math.PI + Math.atan(Math.abs(deltay / deltax))          // 第三项限
        } else {
            angle = 2 * Math.PI - Math.atan(Math.abs(deltay / deltax))      // 第四项限
        }
        x1 -= speed * Math.cos(angle)
        y1 -= speed * Math.sin(angle)
    }
    interface xy { x: number, y: number }
    /**朝着角度移动 */
    export function moveAngle(x: number, y: number, angle: number, speed: number): xy {
        return { x: x += speed * Math.cos(angle * (Math.PI / 180)), y: y += speed * Math.sin(angle * (Math.PI / 180)) }
    }
    /**2点坐标之间逆时针角度
         * @param startX 启始对象x坐标
         * @param startY 启始对象y坐标
         * @param endX 目标对象x坐标
         * @param endY 目标对象y坐标
         * @param return number
        */
    // export function angle(startX: number, startY: number, endX: number, endY: number): number {
    //     let dX = Math.abs(endX - startX);
    //     let dY = Math.abs(endY - startY)
    //     let angle = 360 * Math.atan(dY / dX) / (2 * Math.PI)
    //     if (endX < startX && endY < startY) {
    //         angle = 180 - angle
    //     } else if (endX < startX && endY > startY) {
    //         angle += 180
    //     } else if (endX > startX && endY > startY) {
    //         angle = 360 - angle
    //     } else if (endX == startX && endY < startY) {
    //         angle = 90
    //     } else if (endX < startX && endY == startY) {
    //         angle = 180
    //     } else if (endX == startX && endY > startY) {
    //         angle = 270
    //     } else if (endX == startX && endY == startY) {
    //         angle = 0;
    //     }
    //     return angle > 0 ? angle : 0;
    // }
    /**2点坐标之间顺时针,上0,右90,下180,左270角度
         * @param startX 启始对象x坐标
         * @param startY 启始对象y坐标
         * @param endX 目标对象x坐标
         * @param endY 目标对象y坐标
         * @param return number
        */
    // export function getAngle(px: number, py: number, mx: number, my: number) {
    //     //获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    //     var x = Math.abs(px - mx);
    //     var y = Math.abs(py - my);
    //     var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    //     var cos = y / z;
    //     var radina = Math.acos(cos);//用反三角函数求弧度
    //     var angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

    //     if (mx > px && my > py) {//鼠标在第四象限
    //         angle = 180 - angle;
    //     }

    //     if (mx == px && my > py) {//鼠标在y轴负方向上
    //         angle = 180;
    //     }

    //     if (mx > px && my == py) {//鼠标在x轴正方向上
    //         angle = 90;
    //     }

    //     if (mx < px && my > py) {//鼠标在第三象限
    //         angle = 180 + angle;
    //     }

    //     if (mx < px && my == py) {//鼠标在x轴负方向
    //         angle = 270;
    //     }

    //     if (mx < px && my < py) {//鼠标在第二象限
    //         angle = 360 - angle;
    //     }
    //     return angle > 0 ? angle : 0;
    // }
}