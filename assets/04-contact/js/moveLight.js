
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        //遮罩层
        var node = new cc.Node();
        var msk = node.addComponent(cc.Mask);
        node.parent = this.node;
        node.width = 930;
        node.height = 290;
        node.setPosition(0,0);

        var string = "img/04-contact/" + this.node.name ;
        cc.resources.load(string, cc.SpriteFrame, function (err, spriteFrame) {
            msk.spriteFrame  = spriteFrame;
            msk.type = cc.Mask.Type.IMAGE_STENCIL;
        });
        //光线层
        var node2 = new cc.Node();
        var sp = node2.addComponent(cc.Sprite);
        node2.parent = node;
        node2.width = 930;
        node2.height = 290;
        node2.setPosition(-500,0);
        cc.resources.load("img/04-contact/light", cc.SpriteFrame, function (err, spriteFrame) {
            sp.spriteFrame  = spriteFrame;
        });
        node2.stopAllActions();
        node2.runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(0.3, cc.v2(500, 0)).easing(cc.easeIn(3.0)),
            cc.callFunc(function () {
                node2.setPosition(-500,0);
            }, this),
            cc.moveTo(1.6, cc.v2(500, 0)).easing(cc.easeIn(3.0)),
        )));
    },

    // update (dt) {},
});
