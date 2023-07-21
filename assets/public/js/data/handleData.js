cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        //引入bmob插件
        var Bmob = require('Bmob-2.2.5.min');
        Bmob.initialize("aa5fda48cb2538be", "135022");

        //请求数据,获取当前uv
        const query = Bmob.Query('webData');
        query.get('i4K6999P').then(res => {
            gr_webUv = res.uv;//将线上的uv数值赋值给本地全局变量gr_webUv
            //读取数据，判读是否为新用户
            var isNewUser = cc.sys.localStorage.getItem('isNewUser');
            if (isNewUser == null) {
                console.log("欢迎新用户！！！访问人数+1");
            //如果是新用户，则uv+1，记录为老用户
                cc.sys.localStorage.setItem('isNewUser', "1");//前端记录为老用户
                gr_webUv = gr_webUv+1;//则uv+1
                this.setUvData(gr_webUv);
            }else{
                console.log("欢迎老用户啊，总访问人数："+gr_webUv);
            };
        }).catch(err => {
            console.log(err)
        });


        //清除数据，标记为新用户
        // cc.sys.localStorage.removeItem('isNewUser');
    },

    //修改线上uv数值
    setUvData:function (uv) {
        const query = Bmob.Query('webData');
        query.set('id', 'i4K6999P') //需要修改的objectId
        query.set('uv', uv)
        query.save().then(res => {
            console.log(res);
            console.log("总访问人数："+uv);
        }).catch(err => {
            console.log(err)
        })
    },

    // update (dt) {},
});
