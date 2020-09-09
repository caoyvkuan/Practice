"use strict";
//全局变量
let Nice = {};

//事件绑定
Nice.EvnetTarget = {
  //绑定事件,参数元素,事件类型,方法
  addEvnet: function (ele, type, func) {
    ele.addEventListener(type, func, false);
  },
  //清除事件
  removeEvent: function (ele, type, func) {
    ele.removeEventListener(type, func, false);
  },
  //取消默认事件
  preventDefault: function (e) {
    e.preventDefault();
  }
};

//自定义事件
Nice.Custom = function () {
  this.handlers = {};
};
Nice.Custom.prototype = {
  constructor: Nice.Custom,
  //注册事件:类型和方法名
  addEvent: function (type, funcName) {
    if (typeof this.handlers[type] == "undefined") {
      this.handlers[type] = [];
    }
    this.handlers[type].push(funcName);
  },
  //使用事件:包含事件类型,要使用的方法名(funcName),不传则触发全部,的对象
  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (this.handlers[event.type] instanceof Array) {
      let handlers = this.handlers[event.type];
      if (event.funcName) {
        let i = handlers.length - 1;
        for (; i > -1; i--) {
          if (handlers[i].name == event.funcName) { break; }
        }
        i > -1 ? handlers[i](event) : console.log("%c 该事件不存在", Nice.Style.consoleTextStyle);
      } else {
        for (let i = handlers.length - 1; i >= 0; i--) {
          handlers[i](event);
        }
      }
    }
  },
  //清除事件:
  removeEvent: function (type, funcName) {
    if (typeof this.handlers[type] instanceof Array) {
      let handlers = this.handlers[type];
      if (funcName) {
        let i = handlers.length - 1;
        for (; i > -1; i--) {
          if (handlers[i].name == event.funcName) { break; }
        }
        if (i > -1) {
          this.handlers.splice(i, 1);
        } else {
          this.handlers.splice(0, this.handlers.length);
        }
      }
    }
  }
};

//自定义错误
Nice.Error = {
  MyError: function (type) {
    function my(message) {
      this.name = type;
      this.message = message;
      // this.line = line;
    }
    my.prototype = new Error();
    return my;
  }
};
//自定义错误类型
Nice.TypeError = {
  random: Nice.Error.MyError('随机错误'),
  type: Nice.Error.MyError('文件类型错误'),
  dataset: Nice.Error.MyError('自定义属性不存在'),
};

//获取DOM元素
Nice.GetDOMElement = {
  getEle: function (str) {
    return document.querySelector(str);
  },
  getEleAll: function (str) {
    return document.querySelectorAll(str);
  }
};

//常量
Nice.Const = {
  GATSIZE: 1000,//每次读取多少字节文本
  //展示div 的类名
  fileName:Nice.GetDOMElement.getEle('[data-id="file-name"]'),
  Div: Nice.GetDOMElement.getEle('#show'),
  hiddenDiv: Nice.GetDOMElement.getEle('.dragshade'),
  SHOW: 'show',
  oneText: 'one-text',
  twoRow: 'two-row',
  twoColumn: 'two-column',
  four: 'four',
  waterfall: 'waterfall',
  //瀑布流
  itemWidth: 290,
  //功能按钮,以及列表
  but: Nice.GetDOMElement.getEle('[data-id="dropswitch"]'),
  list: Nice.GetDOMElement.getEle('.list'),
  listDirection: Nice.GetDOMElement.getEle('.list-show-direction'),
  //右键菜单
  menu: Nice.GetDOMElement.getEle('.contextmenu')
};

//变量保存  不小心漏删一句代码，找bug找到怀疑人生
// Nice.sumSave = function (imgSum, textSum) {
//   //已经加载的文件数量
//   this.imgSum = imgSum;
//   this.textSum = textSum;
// };
// Nice.HasBeenShown = new Nice.sumSave(0, 0);

//样式控制
Nice.Style = {
  consoleTextStyle: "color:black;background: rgba(252,234,187,1);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:20px",

};

//文件数组
Nice.File = {
  img: [],
  HasBeenShownImg: -1,//已经展示的数组索引
  text: [],
  HasBeenShownText: -1,//已经展示的数组索引
};
//应用逻辑
Nice.Logic = {
  //开关方法 参数:显示开关文本的span元素
  ButDrop: function (s) {
    // console.log(1);
    if (s.innerText == '开') {
      Nice.Bind.DragDrop.end();
      Nice.Const.hiddenDiv.classList.add('dragshadeclose');
      s.innerText = '关';
    } else {
      Nice.Bind.DragDrop.start();
      Nice.Const.hiddenDiv.classList.remove('dragshadeclose');
      s.innerText = '开';
    }
  },
  //文件数量为二时样式处理 参数:用于显示的div,div的第一个子元素
  styleTow: function (t, sub) {
    let width, height;
    // console.log(sub);
    setTimeout(function () {
      if (!sub) { Nice.Logic.styleTow(t, t.children[0]); return; }
      width = sub.width || sub.offsetWidth;
      height = sub.height || sub.offsetHeight;
      // console.log(width, height);
      if (width > height) {
        t.classList.add(Nice.Const.twoColumn);
      } else {
        t.classList.add(Nice.Const.twoRow);
      }
    }, 10)
  },
  //图片处理 参数:用于显示的div,文件数组
  images: function (target, files) {
    let len = files.length - 1,
      // i = Nice.HasBeenShown.imgSum,
      i = Nice.File.HasBeenShownImg,
      url,
      name;
    Nice.File.HasBeenShownImg = len;
    for (; len > i; len--) {
      url = window.URL.createObjectURL(files[len]);
      name = files[len].name;
      name = name.slice(0, name.lastIndexOf('.'));
      target.innerHTML += `<img class="img" src="${url}" alt="${name}" title="${name}">`;
    }
  },
  //文件读取错误处理
  readError: function (ev) {
    let str = '';
    switch (ev.code) {
      case 3:
        str = '读取中断';
        break;
      case 4:
        str = '文件不可读取';
        break;
      case 5:
        str = '编码错误';
        break;
      default:
        str = '读取错误';
        break;
    }
    console.log(`%c 读取发生错误，错误原因：${str}`, 'color:red');
  },
  //文件读取 参数:用于显示的div,文件,文件所在数组的索引
  fileRead: function (target, file, i) {
    if (!file.getSize) {
      file.getSize = 0;
    }
    if (file.getSize >= file.size) { return false; }
    let size,//读取字节
      fileSize = file.size - file.getSize;//剩余未读取字节
    // 为读取字节是否大与一次读取最大值
    if (fileSize < Nice.Const.GATSIZE) {
      size = fileSize;
    } else {
      size = Nice.Const.GATSIZE;
    }
    // console.log(files[len].getSize + "当前读取字节");
    // files[len].read = new FileReader();
    let read = new FileReader(),
      fileLoad = file.slice(file.getSize, (file.getSize + size + 1)),
      name;
    // files[len].read.readAsText(file, 'utf8');
    read.readAsText(fileLoad, 'UTF-8');
    file.getSize += size;
    name = file.name;
    name = name.slice(0, name.lastIndexOf('.'));
    Nice.EvnetTarget.addEvnet(read, 'error', Nice.Logic.readError);
    read.onloadend = function () {
      if (target.id == 'show') {
        target.innerHTML += `<div class="text" title="文件名：${name}">
        <p>${this.result}</p>
        <button type="button" class="loadmore" data-fileid="${i}">加载更多+</button>
      </div>`;
      } else {
        let str = this.result;
        if (str.indexOf('�') > -1) {
          str = str.replaceAll('�', '');
        }
        // while ()) {
        //   let index = this.result.indexOf('�');
        //   
        // }
        target.children[0].innerHTML += str;
      }
      Nice.EvnetTarget.removeEvent(this, 'error', Nice.Logic.readError);
      this.onloadend = null;
    };
    return true;
  },
  //text处理 参数:用于显示的div,文件数组
  texts: function (target, files) {
    let len = files.length - 1,
      // i = Nice.HasBeenShown.textSum,
      i = Nice.File.HasBeenShownText;
    Nice.File.HasBeenShownText = len;
    for (; len > i; len--) {
      //是否有已读取字节属性
      // console.log(files[len]);
      this.fileRead(target, files[len], len);
    }
    // Nice.HasBeenShown.textSum = len + 2;
  },
  //文件分流处理 参数:用于显示的div
  flieShow: function (target) {
    let File = Nice.File,
      texts = File.text,
      imgs = File.img,
      count = texts.length + imgs.length;
    // window.img = imgs;
    // window.text = texts;
    if (count == 1) {
      if (imgs.length != 0) {
        let url = window.URL.createObjectURL(imgs[0]);
        target.style.backgroundImage = `url(${url})`;
      }
      if (texts.length != 0) {
        this.texts(target, texts);
        target.classList.add(Nice.Const.oneText);
      }
    } else if (count <= 2) {
      if (target.classList.contains(Nice.Const.oneText)) { target.classList.remove(Nice.Const.oneText); }
      if (imgs.length != 0) { this.images(target, imgs); }
      if (texts.length != 0) { this.texts(target, texts); }
      this.styleTow(target, target.children[0]);
    } else if (count <= 4) {
      if (imgs.length != 0) { this.images(target, imgs); }
      if (texts.length != 0) { this.texts(target, texts); }
      target.className = Nice.Const.four;
    }
    if (count > 4) {
      if (imgs.length != 0) { this.images(target, imgs); }
      if (texts.length != 0) { this.texts(target, texts); }
      target.className = Nice.Const.waterfall;
      //瀑布流
      let delay = 200;
      if (count > 50) { delay += 100 * parseFloat(count / 50) }
      setTimeout(function () {
        // debugger;
        let obj = Nice.Logic.waterfall;
        if (obj.firstExecution) {
          //运行方式
          obj.layout();
        } else {
          obj.getTarget(target);
          obj.layout();
        }
      }, delay);
    }
  },
  //瀑布流展示
  waterfall: (function () {
    let waterfall = {},
      subArr = [],
      subIndex = 0,//已经排列的索引
      Height = [],
      itemWidth = Nice.Const.itemWidth,
      gap,
      columns;
    //首次执行先获取目标
    waterfall.firstExecution = false;
    waterfall.getTarget = function (main) {
      subArr = main.children;
      waterfall.gapColumns(main.offsetWidth);
      waterfall.firstExecution = true;
    }
    //重置
    waterfall.reset = function () {
      waterfall.firstExecution = false;
      subArr = [];
      subIndex = 0;
      Height = [];
    }
    //计算列数与间隔
    waterfall.gapColumns = function (contentWidth) {
      columns = parseInt(contentWidth / itemWidth);
      gap = parseInt((contentWidth % itemWidth) / (columns + 1));
    };
    //sashu
    waterfall.layout = function () {
      // debugger;
      for (let len = subArr.length - 1; len >= subIndex; subIndex++) {
        // debugger;
        let top, left, i,
          item = subArr[subIndex];
        if (subIndex < columns) {
          left = (itemWidth) * subIndex + gap * (subIndex + 1);
          item.style = `top:${gap}px;left:${left}px;`;
          Height.push(item.offsetHeight + gap);
        } else {
          i = Height.indexOf(Math.min.apply(null, Height));
          top = Height[i] + gap;
          left = (itemWidth) * i + gap * (i + 1);
          item.style = `top:${top}px;left:${left}px;`;
          Height[i] = top + item.offsetHeight;
        }
      }
    };
    return waterfall;
  })(),
  //瀑布流刷新
  waterfallReset: function () {
    let obj = Nice.Logic.waterfall,
      target = Nice.Const.Div;
    obj.reset();
    obj.getTarget(target);
    obj.layout();
  },
  //处理文件分类 参数:用于显示的div,文件数组
  shunt: function (target, files) {
    let i = files.length - 1;
    // console.dir(Nice.Logic.shunt,this);
    for (; i >= 0; i--) {
      // console.log(files[i], i);
      try {
        switch (files[i].type) {
          case 'image/jpeg':
          case 'image/png': {
            Nice.File.img.push(files[i]);
            break;
          }
          case 'text/plain': {
            Nice.File.text.push(files[i]);
            break;
          }
          default: {
            throw new Nice.TypeError.type(files[i].name);
          }
        }
      } catch (error) {
        console.log(`%c ${error.name}:无法识别 [${error.message}] 文件。`, Nice.Style.consoleTextStyle)
      }
    }
    //调用文件处理
    this.flieShow(target);
  },
  //消息提示框
  modalBox: (function () {
    let modalBox = {},
      box = Nice.GetDOMElement.getEle('.modal-box'),
      title = Nice.GetDOMElement.getEle('.modal-title'),
      content = Nice.GetDOMElement.getEle('.modal-content'),
      show = 'modal-box-show';
    
    modalBox.show = function (titleText,contentText) {
      title.innerText = titleText;
      content.innerText = contentText;
      box.classList.add(show);
    }
    modalBox.hidden = function () {
      box.classList.remove(show);
    }
    return modalBox;
  })(),
};

//事件绑定
Nice.Bind = {
  //功能开关
  DragDrop: (function () {
    let dragdrop = new Nice.Custom(),
      resizeType = {},
      mousemove = {},
      listDirection = {
        D: ['右', '左', '下'],
        i: 0,
        右: 'list-right',
        左: 'list-left',
        下: 'list-bottom',
        show: 'list-show',
        showTimeId: 0,
        disTimeId: 0
      },
      backgroundImage = null;

    function drag(ev) {
      // console.dir(ev);
      ev.preventDefault();
      console.log('放置在' + ev.target.nodeName + '里');
      // let target = ev.target;
      // if (ev.type == 'dragleave') { console.dir(ev); }
      if (ev.type == 'dragenter') {
        Nice.Const.hiddenDiv.classList.add('dragshadeshow');
      }
      switch (ev.target.dataset.content) {
        case 'view': {
          if (ev.type == 'drop') {
            let files = ev.dataTransfer.files;
            Nice.Logic.shunt(Nice.Const.Div, files);
            Nice.Const.hiddenDiv.classList.remove('dragshadeshow');
          }
          break;
        }
        // case 'body': {
        //   if (ev.type == 'dragenter') {
        //     Nice.Const.hiddenDiv.classList.add('dragshadeshow');
        //   }
        //   用移出范围清除样式需要反复添加删除,可能会有闪屏
        //   if (ev.type == 'dragleave') {
        //     Nice.Const.hiddenDiv.classList.remove('dragshadeshow');
        //   }
        //   break;
        // }
        default: {
          if (ev.target.dataset.content != 'view' && ev.type == 'drop') {
            console.log("放置目标无效！");
            return;
          }
          break;
        }
      }
      if (ev.type == 'dragover') {
        clearTimeout(mousemove.id);
        mousemove.id = setTimeout(function () {
          Nice.Const.hiddenDiv.classList.remove('dragshadeshow');
        }, 100);
      }
    }

    function classify(ev) {
      let target = ev.target;
      switch (ev.type) {
        case 'click': {
          // console.log(ev.type, target);
          if (target.className.indexOf("loadmore") > -1) {
            // console.log(1);
            let i = parseInt(target.dataset.fileid),
              file = Nice.File.text[i],
              par = target.parentElement,
              ok = Nice.Logic.fileRead(par, file, i);
            if (!ok) { target.innerText = '加载完了!'; }
          }
          //显示文件名
          // console.dir(target, target.title);
          if (target.title) {
            Nice.Const.fileName.innerText = target.title;
          }
          // try {
          switch (target.dataset.id) {
            case 'direction': {
              //先加在赋值避免第一次点击无效
              if (listDirection.i >= listDirection.D.length - 1) {
                listDirection.i = -1;
              }
              listDirection.i++;
              target.innerText = listDirection.D[listDirection.i];
              break;
            }
            case 'empty': {
              //清空元素
              Nice.Const.Div.innerHTML = '';
              //清空元素数组以及计算索引
              let e = Nice.File;
              for (let k in e) {
                if (e[k] instanceof Array) {
                  e[k] = [];
                } else {
                  e[k] = -1;
                }
              }
              //清空瀑布流
              Nice.Logic.waterfall.reset();
              break;
            }
            case 'empty-background': {
              Nice.Const.Div.style.background = '';
              break;
            }
            case 'refresh': {
              if (Nice.Logic.waterfall.firstExecution) {
                Nice.Logic.waterfallReset();
              }
              break;
            }
            case 'set-body-background':
            case 'set-background': {
              // debugger;
              // console.dir(backgroundImage);
              if (backgroundImage.nodeName == 'IMG') {
                if (target.dataset.id == 'set-background') {
                  Nice.Const.Div.style = `background:url(${backgroundImage.src});`;
                } else {
                  document.body.style = `
                    background:url(${backgroundImage.src});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                  `;
                }
              } else {
                Nice.Logic.modalBox.show('选择的文件不对!','请在图片上右击设置背景!');
              }
              break;
            }
            case 'ok':{
              Nice.Logic.modalBox.hidden();
              break;
            }
            case 'Cancel': {
              Nice.Logic.modalBox.hidden();
              break;
            }
            default: {
              break;
            }
          }
          // } catch (er) {
          //由于依靠点击目标的
          // }
          //隐藏右键菜单
          if (Nice.Const.menu.style != '') {
            Nice.Const.menu.style = '';
            backgroundImage = null;
          }
          break;
        }
        case 'load':
        case 'resize': {
          if ((Nice.File.img.length + Nice.File.text.length) > 4) {
            resizeType.type = ev.type;
            resizeType.funcName = 'waterfall';
            dragdrop.fire(resizeType);
          }
          if (document.documentElement.offsetWidth < 1150) {
            if (Nice.Const.listDirection.innerText == '右') {
              Nice.Const.listDirection.innerText = '下';
              listDirection.i = listDirection.D.indexOf('下');
            }
          }
          break;
        }
        case 'change': {
          // debugger;
          if (target.id == 'file') {
            Nice.Logic.shunt(Nice.Const.Div, target.files);
          }
          break;
        }
        case 'contextmenu': {
          ev.preventDefault();
          // console.dir(ev);
          // console.dir(console);
          // debugger;
          let target = Nice.Const.menu,
            X = ev.clientX,
            Y = ev.clientY;
          if ((X + 100) > document.documentElement.offsetWidth) {
            X -= 100;
          }
          if (Y > (document.documentElement.offsetHeight * 0.75)) {
            Y = document.documentElement.offsetHeight - Y;
            target.style = `bottom:${Y}px;left:${X}px;display:block;`;
          } else {
            target.style = `top:${Y}px;left:${X}px;display:block;`;
          }
          backgroundImage = ev.target;
          break;
        }
        default:
          break;
      }
    }
    //不冒泡的
    function mouse(e) {
      let t = Nice.Const.listDirection.innerText;
      switch (e.type) {
        case 'mouseenter': {
          clearTimeout(listDirection.showTimeId);
          clearTimeout(listDirection.disTimeId);
          Nice.Const.list.classList.add(listDirection[t]);
          setTimeout(function () {
            Nice.Const.list.classList.add(listDirection['show']);
          }, 100);
          break;
        }
        case 'mouseleave': {
          listDirection.showTimeId = setTimeout(function () {
            Nice.Const.list.classList.remove(listDirection['show']);
          }, 100)
          listDirection.disTimeId = setTimeout(function () {
            Nice.Const.list.classList.remove(listDirection[t]);
          }, 600);
          break;
        }
      }
    }
    //只启动不关闭
    dragdrop.startOpen = function () {
      Nice.EvnetTarget.addEvnet(document, 'click', classify);
      Nice.EvnetTarget.addEvnet(document, 'change', classify);
      // Nice.EvnetTarget.addEvnet(window, 'reszie', classify);
      window.addEventListener('resize', classify, false);
      window.addEventListener('load', classify, false);
      //功能下拉列表
      Nice.EvnetTarget.addEvnet(Nice.Const.but, 'mouseenter', mouse);
      Nice.EvnetTarget.addEvnet(Nice.Const.but, 'mouseleave', mouse);
      Nice.EvnetTarget.addEvnet(Nice.Const.list, 'mouseenter', mouse);
      Nice.EvnetTarget.addEvnet(Nice.Const.list, 'mouseleave', mouse);
      //右键菜单
      Nice.EvnetTarget.addEvnet(document, 'contextmenu', classify);
    };

    //启动事件
    dragdrop.start = function () {
      document.ondrop = null;
      Nice.EvnetTarget.addEvnet(document, 'dragenter', drag);
      Nice.EvnetTarget.addEvnet(document, 'dragover', drag);
      // Nice.EvnetTarget.addEvnet(document, 'dragleave', drag);
      Nice.EvnetTarget.addEvnet(document, 'drop', drag);
    };
    //关闭事件
    dragdrop.end = function () {
      Nice.EvnetTarget.removeEvent(document, 'drop', drag);
      document.ondrop = function (e) {
        e.preventDefault();
      };
    };
    return dragdrop;
  })(),
  //开关按钮
  DropSwitch: function () {
    let but = Nice.Const.but,
      s = but.children[0],
      func = function (e) {
        e.stopPropagation();
        return Nice.Logic.ButDrop(s);
      };
    //默认打开拖放
    Nice.Logic.ButDrop(s);
    // but.onclick = function () {
    //   return Nice.Logic.ButDrop(s);
    // }
    Nice.EvnetTarget.addEvnet(but, 'click', func);
  },
};
//清除默认事件
document.addEventListener('dragstart', Nice.EvnetTarget.preventDefault, false);
document.addEventListener('dragend', Nice.EvnetTarget.preventDefault, false);

//只开不关事件
Nice.Bind.DragDrop.startOpen();
Nice.Bind.DragDrop.addEvent('resize', function waterfall(ev) {
  // console.log(ev.id);
  clearTimeout(ev.id);
  ev.id = setTimeout(function () {
    Nice.Logic.waterfallReset();
  }, 100);
});

//功能默认为开
// Nice.Logic.DragDrop.start();
Nice.Bind.DropSwitch();
// document.ondragenter = function (ev) {
//   ev.preventDefault();
//   console.log('拖进:' + this);
// };
// document.ondragover = function (ev) {
//   ev.preventDefault();
//   console.dir(ev);
//   console.log('在' + this + '里面移动');
// };
//
// Nice.Logic.DragDrop.addEvent('drop', Drop(ev))