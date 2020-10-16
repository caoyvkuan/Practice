+ 获取设备物理像素和设备独立像素的比值——主要用于适配移动设备
+ window.devicePixelRatio

# BOM

### window对象

+ alert / prompt / confirm

  + **alert**

    + 显示一个警告对话框，上面显示有指定的文本内容以及一个“确定”按钮**「注意：弹出模态框，并暂停脚本，直到用户点击“确定”按钮。」**

```js
    // 语法
    window.alert(message);
    alert(message);
    // 示例
    alert('hello leo!');
```

  + **prompt**

    + 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。**「注意：弹出模态框，并暂停脚本，直到用户点击“确定”按钮。」**当点击确定返回文本，点击取消或按下 Esc 键返回 `null`。语法如下：

    + ```css
      let result = window.prompt(text, value);
      ```

    + `result` 用来存储用户输入文字的字符串，或者是 null。

    + `text` 用来提示用户输入文字的字符串，如果没有任何提示内容，该参数可以省略不写。

    + `value` 文本输入框中的默认值，该参数也可以省略不写。不过在 Internet Explorer 7 和 8 中，省略该参数会导致输入框中显示默认值"undefined"。

  + **confirm**

    + `Window.confirm()` 方法显示一个具有一个可选消息和两个按钮(确定和取消)的模态对话框。**「注意：弹出模态框，并暂停脚本，直到用户点击“确定”按钮。」**语法如下：

    + ```js
      let result = window.confirm(message);
      ```

    + message 是要在对话框中显示的可选字符串。

    + result 是一个布尔值，表示是选择确定还是取消 (true表示OK)。














window.frames["content"].document; //获取iframe里的文档流
