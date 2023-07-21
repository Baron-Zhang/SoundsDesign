//将脚本挂到节点后，鼠标移入该节点就会出现提示气泡
var type = cc.Enum({
    文本气泡: 0,
    图片气泡: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            type: cc.Enum(type),
            default: type.文本气泡,
        },
        text: {
                default: "null",
                visible() {return (this.type == type.文本气泡);},
                tooltip: "请填写文本内容"
        },
        pic: {
                default: "weChatQR",
                visible() {return (this.type == type.图片气泡);},
                tooltip: "请填写在resources/img中的图片的名称"
        },
    },

    onLoad () {
        //生成popover
        this.node.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            //屏幕宽度的一半
            var canWidth = cc.find("Canvas").width / 2 + 10;
            //如果场景无气泡，则生成，反之不生成
            if (cc.find("Canvas/popover") == null) {
                cc.resources.load("prefab/popover", function (err, prefab) {
                    var popover = cc.instantiate(prefab);
                    popover.parent = cc.find("Canvas");
                    cc.find("Canvas").on(cc.Node.EventType.MOUSE_MOVE, function (event) {//【监听鼠标位置】使用枚举类型来注册
                        //获取鼠标的世界坐标
                        popover.setPosition(event.getLocationX()-canWidth, event.getLocationY()-540);
                    }, this);
                });
                this.isShowPopover();
            } else {
                this.isShowPopover();
                cc.find("Canvas/popover").active = true;
                cc.find("Canvas").on(cc.Node.EventType.MOUSE_MOVE, function (event) {//【监听鼠标位置】使用枚举类型来注册
                    //获取鼠标的世界坐标
                    cc.find("Canvas/popover").setPosition(event.getLocationX()-canWidth, event.getLocationY()-540);
                }, this);
            };
        }, this);
        //销毁popover
        this.node.on( cc.Node.EventType.MOUSE_LEAVE, function (event) {
            if (cc.find("Canvas/popover") != null) {
                var popover =cc.find("Canvas/popover");
                popover.active = false;
            };
        }, this);
        },


    //检测气泡是否生成
    isShowPopover:function () {
        if (cc.find("Canvas/popover/text") == null) {
            this.schedule(function() {
                this.isShowPopover(); 
            }, 0.01,1);
        } else {
            //判断是图片还是文版：如果是图片，则显示图片，反之显示文本
            if (this.type == 1) {
                cc.find("Canvas/popover").height = 230;
                cc.find("Canvas/popover/text").active = false;
                cc.find("Canvas/popover/pic").active = true;
                var imgUrl = "img/" + this.pic;
                cc.resources.load(imgUrl, cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("Canvas/popover/pic").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }else{
                cc.find("Canvas/popover").height = 142;
                cc.find("Canvas/popover/text").active = true;
                cc.find("Canvas/popover/pic").active = false;
                cc.find("Canvas/popover/text").getComponent(cc.Label).string = this.text;//设置标题
                cc.find("Canvas/popover/text").color = cc.Color.WHITE;
            };
        }
    },

    // update (dt) {},
});
