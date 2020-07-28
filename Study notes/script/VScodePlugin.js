window.onload = function(){
  readTextFile("../notes/VScodePlugin.json",function(text){Readflie(text);});
}
function showMarkdown(url,content,addhtml) {
  // 获取表单变量
  // 创建XMLHttpRequest对象
  var xmlhttp;
  if (window.XMLHttpRequest) {
      // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp = new XMLHttpRequest();
  }
  else {
      // IE6, IE5 浏览器执行代码
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 得到服务器响应后，对得到的Markdown文档进行解析
  xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // 这里调用了marked框架中的marked函数实现Markdown2HTML的解析
          content.innerHTML += addhtml + marked(xmlhttp.responseText);
      }
  }
  // 向服务器发送请求，获取你需要的Markdown文档
  xmlhttp.open("GET", url, true);
  xmlhttp.send(null);
}
function Readflie(text){
  var data = (JSON.parse(text));
    //取得内容盒子
    let content = document.getElementById("content");
    let addhtml = content.innerHTML;
    for (let i in data) {
      //添加一级标题
      addhtml = addhtml + "<h1>" + i + "</h1>";
      //遍历最外层 i == VScode
      let master = data[i];
      for (const a in master) {
        //遍历分类成
        let mas = master[a];
        for (let b = 0; b <= mas.length - 1; b++) {
          if (typeof mas[b] == "object") {
            //获取二级标题下的分类数组对象
            let mas_1 = mas[b];
            for (const c in mas_1) {
              //遍历分类数组对象
              let mas_2 = mas_1[c];
              for (let d = 0; d <= mas_2.length - 1; d++) {
                if (typeof mas_2[d] == "object") {
                  let el_v = mas_2[d];
                  let str = "<li><strong>" + el_v.name + "</strong><div class ='description'>描述:<span>" + el_v.description
                    + "</span><p><img src='" + el_v.imgsrc + "' alt='" + el_v.name + "'></p></div></li>";
                  switch (d) {
                    //处理开头
                    case 1: {
                      addhtml += "<ol>" + str;
                    }
                      break;
                    //处理结尾
                    case mas_2.length - 1: {
                      addhtml += str + "</ol>"
                    }
                      break;
                    default: {
                      addhtml += str;
                    }
                      break;
                  }
                } else {
                  //添加二级标题下的分类
                  addhtml += "<h4 id='" + mas_2[d] + "'>" + c + "</h4>";
                }
              }
            }
          } else {
            //添加二级标题
            addhtml += "<h2 id='" + mas[b] + "'>" + a + "</h2>";
          }
        }
      }
    }
    showMarkdown("../notes/VScodePlugin.md",content,addhtml);
}
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  //console.log(rawFile.readyState);
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    //console.log(rawFile.readyState);
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    } else {
      //console.log(rawFile.readyState);
    }
  }
  rawFile.send(null);

}
