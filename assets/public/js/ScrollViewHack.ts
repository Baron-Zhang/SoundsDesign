//【修改鼠标滚动速度】挂载在有ScrollView组建的节点上


const {ccclass, property} = cc._decorator;

@ccclass

export default class ScrollViewHack extends cc.Component {

@property({tooltip: '改变滚轮移动距离的倍数'})

mul: number = 10;

// LIFE-CYCLE CALLBACKS:

onLoad () {

    this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);

}

_onMouseWheel ( event: cc.Event.EventMouse ) {

    event.setScrollData ( event.getScrollX(), event.getScrollY() * this.mul )

    console.log ( event.getScrollY() );

}

// update (dt) {}
}