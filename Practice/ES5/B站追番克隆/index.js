let cache = {
  不匹配数量 : 0
};

function $(str) {
  return document.querySelector(str);
}

function contrast() {
  let one = JSON.parse($('.text-one').textContent),
    two = JSON.parse($('.text-two').textContent);

  (function f(objOne,objTwo) {
    for (const k in objOne) {
      if (!objTwo[k]) {
        addCache(k, objOne[k]);
        continue;
      } else if(typeof objOne[k] === 'object') {
        for (const i in objOne[k]) {
          if (objOne[k][i] === objTwo[k][i]) {
            continue;
          } else {
            addCache(k, objOne[k]);
          }
        }
      }
    }
  })(one, two);
  
  function addCache(key,value) {
    cache[key] = value;
    cache['不匹配数量']++;
  }
  alert('对比完成!!');
}
debugger;
$('.contrast').onclick = contrast;

$('.text-show').onclick = function () {
  let pre = $('.show');
  pre.innerText = JSON.stringify(cache,null,3);
  pre.classList.toggle('block');
}