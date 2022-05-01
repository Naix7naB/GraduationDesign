App({
  /* 当小程序初始化完成时，会触发 onLaunch（全局只触发一次） */
  onLaunch: function () {
    /* 初始化云函数 */
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init();
    }
    /* 获取系统信息 */
    const systemInfo = wx.getSystemInfoSync();
    /* 获取胶囊位置信息 */
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    /* 手机状态栏高度 */
    const { statusBarHeight, screenWidth } = systemInfo;
    const _height_ =
      (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.bottom - statusBarHeight;

    this.globalData.navHeight = statusBarHeight + _height_;
    this.globalData.menuWidth = menuButtonInfo.width;
    this.globalData.menuHeight = menuButtonInfo.height;
    this.globalData.menuTop = menuButtonInfo.top;
    this.globalData.menuRight = screenWidth - menuButtonInfo.right;
  },

  /* 全局变量 */
  globalData: {
    /* 导航栏高度 */
    navHeight: 0,
    /* 胶囊宽度 */
    menuWidth: 0,
    /* 胶囊高度 */
    menuHeight: 0,
    /* 胶囊距导航栏的 top 值 */
    menuTop: 0,
    /* 胶囊距导航栏的 right 值 */
    menuRight: 0,
  },
});
