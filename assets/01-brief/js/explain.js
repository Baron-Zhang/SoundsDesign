
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
    },

    onLoad () {
        this.bgOpen = true;
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
            this.bg.y = this.node.y + 19;
            this.bg.stopAllActions();
            this.bg.runAction(
                cc.scaleTo(0.5, 1, 1).easing(cc.easeInOut(3)),
            )
            //设置文案
            var name = cc.find("text3",this.node).getComponent(cc.Label).string;
            switch (name) {
                case "用户研究":
                    cc.find("text3",this.bg).getComponent(cc.Label).string = "根据具体项目要求进行需求分析，趋势分析，竞争性分析，用户研究，以便提供适当的解决方案。";
                    break;
                case "交互设计":
                    cc.find("text3",this.bg).getComponent(cc.Label).string = "梳理重构产品信息架构以保证产品逻辑架构清晰易用，并通过建立系统的交互设计规范来达成产品体验的严谨一致性。";
                    break;
                case "视觉设计":
                    cc.find("text3",this.bg).getComponent(cc.Label).string = "用艺术家的视野为产品赋予灵性和美感，从每一个细节入手，为用户提供舒适的视觉体验。";
                    break;
                case "程序开发":
                    cc.find("text3",this.bg).getComponent(cc.Label).string = "利用充分的前端知识来帮助开发团队最大限度的在产品中还原设计效果，每一个像素都要精准落实。";
                    break;
            
                default:
                    break;
            }
          }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            this.bg.y = this.node.y + 19;
            this.bg.runAction(
                cc.scaleTo(0.5, 1, 0).easing(cc.easeInOut(3)),
            )
          }, this);
    },

    //检测偏移量
    colseTheDoor:function (event) { //绑定到ScrollView节点的ScrollView组件的回调函数上
        if (event.getScrollOffset().y > 2908 && this.bgOpen) {
            this.bgOpen = false
            this.bg.runAction(
                cc.scaleTo(0.5, 1, 0).easing(cc.easeInOut(3)),
            )
        };
    },

    // update (dt) {},
});
