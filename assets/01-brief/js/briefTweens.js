cc.Class({
    extends: cc.Component,

    properties: {
        vitruvianoRightHand:cc.Node,
    },

    onLoad () {
        // cc.tween(this.vitruvianoRightHand)
        //     .to(1, { angle: -10})
        //     .to(1, { angle: 10})
        //     .repeatForever()
        //     .start()
        this.vitruvianoRightHand.runAction(cc.repeatForever(cc.sequence(
            cc.rotateTo(0.2,-10),
            cc.rotateTo(0.2,10),
        )));
    },

    start () {

    },

    // update (dt) {},
});
