//【偏移动画】缩小
var type = cc.Enum({
    滚动缩小: 0,
    滚动放大: 1,
    滚动视差y方向: 2,
    滚动淡入: 3,
    滚动淡出: 4,
    固定定位: 5,//电梯
    滚动旋转: 6,//
});

cc.Class({
    extends: cc.Component,

    properties: {
        //距离屏幕底部多少时开始动效(%)
        windowPos: {
            default: 10,
            tooltip: "此node锚点距离屏幕底部多少时开始动效(%)，需要高于初始坐标"
        },
        //动效类型
        type: {
            type: cc.Enum(type),
            default: type.滚动缩小,
        },
        //滚动缩放
        scale1: {
                default: 1,
                visible() {return (this.type == type.滚动缩小 || this.type == type.滚动放大);},
                tooltip: "目标大小"
        },
        rate: {
                default: 50,
                visible() {return (this.type == type.滚动缩小 || this.type == type.滚动放大);},
                tooltip: "放大速率(数值越小速度越快)"
        },
        //滚动视差
        parallaxPos1: {//偏移位置与坐标位置不是同一种数值
            default: 3000,
            visible() {return (this.type == type.滚动视差y方向);},
            tooltip: "动效结束偏移位置点(偏移位置≠坐标)"
        },
        parallaxRate: {
                default: 50,
                visible() {return (this.type == type.滚动视差y方向);},
                tooltip: "视差速率(正数向上偏移、负数向下偏移，绝对值越小速度越快)"
        },
        //滚动淡入淡出
        fadeSpeed: {
            default: 1,
            visible() {return (this.type == type.滚动淡入 || this.type == type.滚动淡出);},
            tooltip: "淡入速率"
        },
        //固定定位
        fixEndPos:{
            default: 3000,
            visible() {return (this.type == type.固定定位);},
            tooltip: "动效结束偏移位置点(偏移位置≠坐标)"
        },
        //滚动旋转
        spinSpeed:{
            default: 100,
            visible() {return (this.type == type.滚动旋转);},
            tooltip: "旋转速度"
        },
    },
    

    onLoad () {
        //获取屏幕尺寸
        this.windowSize=cc.winSize.height;
        //添加偏移回调  //找到ScrollView，把带着this的node加到他身上并指定执行scrollAction方法
        var scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = "scrollAction";// 这个是代码文件名
        scrollViewEventHandler.handler = "scrollAction";
        var scrollview = cc.find("Canvas/ScrollView ").getComponent(cc.ScrollView);//找到ScrollView
        scrollview.scrollEvents.push(scrollViewEventHandler);

        //【初始化缩放】位置、缩放大小
        this.pos = -this.node.position.y;//记录起始偏移位置
        if (this.type == 0 || this.type == 1) {
        this.scale0 = this.node.scale;
        };
        //【初始化视差】记录初始位置
        if (this.type == 2) {
            this.pos = -this.node.position.y;//记录记录起始偏移位置
          };
        //【初始化淡入】
        if (this.type == 3) {
            this.pos = -this.node.position.y;//记录起始偏移位置
            this.node.opacity = 0;
          };
        //【初始化淡出】
        if (this.type == 4) {
            this.pos = -this.node.position.y;//记录起始偏移位置
            this.opacity0 = this.node.opacity;//记录起始透明度
          };
        //【初始固定定位】
        if (this.type == 5) {
            this.pos = -this.node.position.y;//记录起始偏移位置
          };
        //【初始滚动旋转】
        if (this.type == 6) {
            this.pos = -this.node.position.y;//记录起始偏移位置
          };
    },

    //根据type调用偏移动画，并被ScrollView回调
    scrollAction:function (event) {
        var scrollY = event.getScrollOffset().y;//偏移量
        cc.find("Canvas/scrollOffset").getComponent(cc.Label).string = "偏移量:" + scrollY;//显示偏移量
        //选择播放动效
        switch (this.type) {
            case 0:
                this.scrollScaleSmall(scrollY);
                break;
            case 1:
                this.scrollScaleBig(scrollY);
                break;
            case 2:
                this.parallaxAction(scrollY);
                break;
            case 3:
                this.scrollFadeIn(scrollY);
                break;
            case 4:
                this.scrollFadeOut(scrollY);
                break;
            case 5:
                this.scrollFix(scrollY);
                break;
            case 6:
                this.scrollSpin(scrollY);
                break;
        
            default:
                break;
        }
    },



    //【↓偏移动画↓】↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 根据偏移量和this.node的位置来判断是否开始播放动效

    //滚动缩小
    scrollScaleSmall:function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos) {
            if (this.node.scale >= this.scale1 && this.node.scale <= this.scale0) {
                this.node.setScale(this.scale0-(scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)/this.rate,this.scale0-(scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)/this.rate,);
            };
            if (this.node.scale < this.scale1) {
                this.node.setScale(this.scale1);
            };
        };
    },
    //滚动放大
    scrollScaleBig:function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos) {
            if (this.node.scale <= this.scale1 && this.node.scale >= this.scale0) {
                this.node.setScale(this.scale0+(scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)/this.rate,this.scale0+(scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)/this.rate,);
            };
            if (this.node.scale > this.scale1) {
                this.node.setScale(this.scale1);
            };
        };
    },
    //滚动视差
    parallaxAction: function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos && scrollY+((1-this.windowPos/100)*this.windowSize) <= this.parallaxPos1) {
            this.node.setPosition(this.node.position.x,(-this.pos)+(scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)/this.parallaxRate);
        };
    },
    //滚动淡入
    scrollFadeIn:function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos) {
            this.node.opacity = (this.fadeSpeed*((scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)));
        };
    },
    //滚动淡入
    scrollFadeOut:function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos) {
            this.node.opacity = this.opacity0-(this.fadeSpeed*((scrollY+((1-this.windowPos/100)*this.windowSize)-this.pos)));
        };
    },
    //固定定位
    scrollFix:function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos  &&  scrollY <= this.fixEndPos) {//如果锚点离底部的起始点 >= this.node的初始位置
            this.node.setPosition(this.node.position.x,-scrollY-((1-this.windowPos/100)*this.windowSize));
        };
    },
    //滚动旋转
    scrollSpin:function (scrollY) {
        if (scrollY+((1-this.windowPos/100)*this.windowSize) >= this.pos) {//如果锚点离底部的起始点 >= this.node的初始位置
            this.node.angle = scrollY*this.spinSpeed;
        };
    },

    //【↑偏移动画↑】↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
});
