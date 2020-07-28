// 调整iframe高度
addOnresize(iframeHeight);
addLoadEvent(iframeHeight);
function iframeHeight() {
    let H = document.getElementById('sidebar').offsetHeight;
    document.getElementById('NoteNavigation').style.height = H+'px';
}