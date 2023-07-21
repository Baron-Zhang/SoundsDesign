//将脚本挂载到节点按钮组件并调用CopyTextEvent后，点击此节点即可复制文本

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
 
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class CopyText extends cc.Component {
 
    @property(cc.Label)
    _textDisplayArea: cc.Label = null;
 
      //拷贝文本
      CopyTextEvent () {
        let input = "garryui.cn";
 
        const el = document.createElement('textarea');
 
        el.value = input;
 
        // Prevent keyboard from showing on mobile
        el.setAttribute('readonly', '');
 
        // el.style.contain = 'strict';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '12pt'; // Prevent zooming on iOS
 
        const selection = getSelection();
        let originalRange;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }
 
        document.body.appendChild(el);
        el.select();
 
        // Explicit selection workaround for iOS
        el.selectionStart = 0;
        el.selectionEnd = input.length;
 
        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {}
 
        document.body.removeChild(el);
 
        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }
 
 
        console.log("拷贝文本");

    };

}