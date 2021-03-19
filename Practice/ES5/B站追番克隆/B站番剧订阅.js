//获取订阅的番剧列表
let fanDramaList = {
  番剧数量: 0
};
//替换用字符串
let outString = '';

(function () {
  //模拟点击
  let click = new Event('click');
  //获取第一页
  addPage();
  let time = setInterval(() => {
    //下一页按钮
    let next = document.querySelector('.next-page');
    if (next) {
      next.dispatchEvent(click);
      setTimeout(() => {
        addPage();
      }, 2000);
    } else {
      clearInterval(time);
      //将对象转为 JSON 字符串
      outString = JSON.stringify(fanDramaList, null, 3);
      //替换复制信息
      document.addEventListener('copy', function (e) {
        e.clipboardData.setData('text/plain', outString);
        e.preventDefault();
      });
      alert('可以复制了！,(关闭提示随便复制一个文本!!!)');
    }
  }, 5000);

  function addPage() {
    //获取当前页番剧列表
    let page = document.querySelector('.pgc-follow-list').children;

    let arr = Array.prototype.slice.call(page);
    //去除列表最后一个无用项
    arr.pop();
    //获取需要的信息
    let name,
      href,
      status
    for (const item of arr) {
      name = item.querySelector('.pgc-item-title').textContent;
      href = item.querySelector('.pgc-item-cover').href;
      status = item.querySelector('.disabled').textContent.slice(-2);
      //存入信息，计数加一
      fanDramaList[name] = {
        href: href,
        status: status
      }
      fanDramaList['番剧数量']++;
    }
  }
})();


// 油猴注入脚本
// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1603673073633
// @name            番剧订阅
// @url-pattern     /https:\/\/\w{3}\.bilibili\.com\/bangumi\/play\/ss\d+\//
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-10-26 09:33:54

// 显示一个Toast，提示消息
var toast = (content, time) => {
  return new Promise((resolve, reject) => {
    let elAlertMsg = document.querySelector("#message");
    if (!elAlertMsg) {
      let elWrapper = document.createElement('div');
      elWrapper.innerHTML = '<div id="message" style="position:fixed;top:5px;left:50%;z-index:100">' +
        '<p style="background:#000;display:inline-block;color:#fff;text-align:center;' +
        'padding:10px 10px;margin:0 auto;font-size:14px;border-radius:4px;">' + content + '</p></div>';
      elAlertMsg = elWrapper.childNodes[0];
      document.body.appendChild(elAlertMsg);
    } else {
      elAlertMsg.querySelector('p').innerHTML = content;
      elAlertMsg.style.display = 'block';
    }

    window.setTimeout(function () {
      elAlertMsg.style.display = 'none';
      resolve && resolve();
    }, time || 1000);
  });
};

// 简单的sleep实现
var sleep = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

(() => {
  toast('订阅番剧')
    .then(() => {
      console.log('番剧数量:' + fanDramaList['番剧数量']);
    });
  sleep(5000)
    .then(() => toast('开始订阅！', 1000))
    .then(() => {
      let name = document.querySelector('.media-title').textContent;
      if (fanDramaList[name]) {
        fanGet(fanDramaList[name]['status']);
      } else {
        toast('没追此番！！');
      }

      function fanGet(status) {
        let list = document.querySelector('.opt-list').children;
        let c = new Event('click');
        let but = document.querySelector('.btn-follow');
        if (but.querySelector('span').textContent === '追番') {
          but.dispatchEvent(c);
          setTimeout(() => {
            judgment();
          }, 1000);
        } else {
          let st = document.querySelector('.opt-list > .disabled').textContent.slice(-2);
          if (st === status) return;
          setTimeout(() => {
            judgment();
          }, 1000);
        }
        function judgment() {
          switch (status) {
            case '想看': {
              list[0].dispatchEvent(c);
              break;
            }
            case '在看': {
              list[1].dispatchEvent(c);
              break;
            }
            case '看过': {
              list[2].dispatchEvent(c);
              break;
            }
            default:
              console.log('状态:' + status);
              break;
          }
        }
      }
    })
    .then(() => {
      setTimeout(() => {
        window.close()
      }, 1000);
    });;
})();


//依次点击列表，利用油侯订阅
(function () {
  //模拟点击
  let ck = new MouseEvent(
    'click',
    {
      'bubbles': true,
    }
  );
  //获取第一页
  addPage();
  let time = setInterval(() => {
    //下一页按钮
    let next = document.querySelector('.next-page');
    if (next) {
      next.dispatchEvent(ck);
      setTimeout(() => {
        addPage();
      }, 2000);
    } else {
      clearInterval(time);
    }
  }, 75000);

  let a = document.createElement('a');
  a.target = '_blank';

  function addPage() {
    //获取当前页番剧列表
    let page = document.querySelector('.pgc-follow-list').children;

    // let arr = Array.prototype.slice.call(page);
    arr = Array.prototype.slice.call(page);
    //去除列表最后一个无用项
    arr.pop();
    let i = 0;
    let t = setInterval(() => {
      if (i <= arr.length - 1) {
        let item = arr[i].querySelector('.pgc-item-info');
        a.href = item.href;
        a.click();
        console.log(item);
      }
      i++;
      if (i == arr.length) {
        clearInterval(t);
      }
      // console.dir(arr[i]);
    }, 5000);
  }
})();


// 第二次
//#region
// 获取 番剧 json 列表
(() => {
  // 保存数据
  let HisPlayList = {
    番剧数量: 0,
    data: new Map()
  }
  //模拟点击
  let click = new Event('click');

  function $(str) { return document.querySelector(str); }
  //获取当前页面
  function getPage() {
    let List = Array.from($('.pgc-follow-list').querySelectorAll('.pgc-space-follow-item'));
    List.map(i => {
      const name = i.querySelector('.pgc-item-title').textContent;
      const state = i.querySelector('.disabled').textContent.slice(-2);
      HisPlayList.data.set(name, state);
    });
  }
  getPage();

  let time = setInterval(() => {
    //下一页按钮
    let next = document.querySelector('.next-page');
    if (next) {
      next.dispatchEvent(click);
      setTimeout(() => {
        getPage();
      }, 2000);
    } else {
      clearInterval(time);
      // 处理数据
      HisPlayList['番剧数量'] = HisPlayList.data.size;
      let temporary = {};
      HisPlayList.data.forEach((v, k) => {
        temporary[k] = v;
      })
      HisPlayList.data = temporary;
      //替换复制信息
      document.addEventListener('copy', function (e) {
        e.clipboardData.setData(
          'text/plain',
          JSON.stringify(HisPlayList, null, 3)
        );
        e.preventDefault();
      });
      alert('可以复制了！,(关闭提示随便复制一个文本!!!)');
    }
  }, 5000);
})();
//#endregion

//#region
// 油猴订阅  给的间隔太短了,请求失败的有点多,多给几秒等待请求完成应该会好很多.
let data = {}
setTimeout(() => {
  function $(str) { return document.querySelector(str); }
  function get() {
    return new Promise((r, j) => {
      setTimeout(() => {
        const name = $('.media-title').textContent;
        if (data[name]) {
          r(data[name])
        } else {
          j()
        }
      })
    });
  }
  const click = new Event('click');
  function ToThem(state) {
    const list = $('.opt-list').children;
    switch (state) {
      case '想看': {
        list[0].dispatchEvent(click);
        break;
      }
      case '在看': {
        list[0].dispatchEvent(click);
        break;
      }
      case '看过': {
        list[0].dispatchEvent(click);
        break;
      }
    }
  }
  get().then(v => {
    const but = $('.btn-follow');
    if (but.querySelector('span').textContent === '追番') {
      but.dispatchEvent(click);
      setTimeout(() => {
        ToThem(v);
        return 'OK!';
      }, 1000);
    } else {
      let state = $('.opt-list > .disabled').textContent.slice(-2);
      if (state === v) return;
      setTimeout(() => {
        ToThem(v);
        return 'OK!';
      }, 1000);
    }
  }, () => {
    window.close()
  }).then(() => {
    setTimeout(() => {
      window.close()
    }, 1000);
  })
}, 3000)

  //#endregion

  //#region 
  // 依次点击
  (() => {
    const click = new Event('click');
    function $(str) { return document.querySelector(str); }
    //获取当前页面
    function getPage() {
      let List = Array.from($('.pgc-follow-list').querySelectorAll('.pgc-space-follow-item'));
      List.map((item, i) => {
        setTimeout(() => {
          const dom = item.querySelector('.pgc-item-cover');
          dom.click();
        }, 5000 * (i + 1));
      });
    }
    getPage();

    let time = setInterval(() => {
      //下一页按钮
      let next = document.querySelector('.next-page');
      if (next) {
        next.dispatchEvent(click);
        setTimeout(() => {
          getPage();
        }, 2000);
      } else {
        clearInterval(time);
        alert('结束了!!!');
      }
    }, 60000);
  })()
//#endregion