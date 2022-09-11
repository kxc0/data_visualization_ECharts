function remSize(designWidth, prem) {
    /* 
    designWidth：设计稿的宽度
    prem：换算比例       写100是为了好计算，如：测量的一个宽度是100px，就可以写为1rem
    deviceWidth：设备的宽度
    */
    // 获取除去滚动条和边框的窗口宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth <= 750) {
        deviceWidth = 750
    }
    // 为 HTML 设置 fontSize 属性
    document.documentElement.style.fontSize = deviceWidth / designWidth * prem + 'px'
}
remSize(750, 100)
// 窗口或框架被调整大小时重新计算 HTML 的 fontSize 属性
window.onresize = function () {
    remSize(750, 100)
}