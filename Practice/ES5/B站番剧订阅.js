//获取订阅的番剧列表
let fanDramaList = {
  番剧数量: 0
};
let count = 0,
  outString = '';

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