// 给iframe添加样式
addLoadEvent(addlink);
function addlink() {
    let b = window.frames["content"].document;
    let el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', '../style/SubStyle.css');
    let add = b.getElementsByTagName('head')[0];
    add.appendChild(el);
}
addLoadEvent(aclick);
function aclick() {
    var ifr = document.getElementById('content');
    ifr.onload = function () {
        addlink();
    }
}