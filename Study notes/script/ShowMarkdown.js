window.onload = function () {
  document.body.innerHTML += "<div id='content'></div>";
  let a = "../notes/" + document.title;
  ShowMarkdown(a);
}
function ShowMarkdown(url) {
  //取到容器元素
  let content = document.getElementById("content");
  //创建XMLHttpRequest对象
  let xmlhttp;
  if (window.XMLHttpRequest) {
    //不同浏览器有不同的对象
    xmlhttp = new XMLHttpRequest();
  }
  //详情百度  XMLHttpRequest
  //发送请求后会执行4次对应的readState值为1,2.3,4
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      content.innerHTML = marked(xmlhttp.responseText);
    }
  }
  //发送请求
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}