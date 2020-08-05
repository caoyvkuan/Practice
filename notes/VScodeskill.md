# VScodeskill

## 快捷使用 ##

1. 选中合并

    + ```
      Ctel+Shift+P 输入join Lines
      ```

2. 选择方式

    * 同时选中多个单词: Alt +Click
    * 同时选择上一行 (Ctrl + Alt + Up) 或者下一行 (Ctrl + Alt + Down) 的相同位置：
    * 依次找出文中所有的当前选中的单词: Ctrl + D
    * 一次性找出文所有的当前选中的单词: Ctrl + Shift + L
    * 拓展性 (Shift + Alt + Right) 或者收缩性 (Shift + Alt + Left) 的选中文本
    * 矩形框的鼠标选择: 同时按住Shit和Alt并使用鼠标进行拖拽选择
    * 切换编程语言语法: Ctrl + K M
    * 在上方复制一行Shift + Alt + Up，在下方复制一行Shift + Alt + Down

3.  快捷生成

    + ```html
      (li>a[href="img/$.png"][title="第$张图"]{第$张图})*5
      <li><a href="img/1.png" title="第1张图">第1张图</a></li>
      <li><a href="img/2.png" title="第2张图">第2张图</a></li>
      ```

    + ```html
      类名 . id # 属性 [] span[title="test"] 文本{} div>span{this is test}
      输入 div.wrapper
      <div class="wrapper"></div>
      <div id="wrapper"></div> <span title="test"></span>
      ```

    + ```html
      自增符 $ @3（表示从3开始计数）
      div[name="$@3"]*3
      <div name="3"></div>
      <div name="4"></div>
      <div name="5"></div>
      ```

    + ```html
      后代 >
      div>span>a
      <div><span><a href=""></a></span></div>
      
      兄弟 +
      div+p+span
      <div></div>
      <p></p>
      <span></span>
      
      上级 ^
      div>span^i
      <div><span></span></div>
      <i></i>
      
      隐式转换
      .class
      <div class="class"></div>
      ul>.item
      <ul>
          <li class="item"></li>
      </ul>
      table>.row>.col
      <table>
          <tr class="row">
              <td class="col"></td>
          </tr>
      </table>
      ```

