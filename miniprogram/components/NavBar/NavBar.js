const app = getApp();

Component({
  /* 组件的配置项 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {
    showIcon: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '导航栏标题',
    },
    titleColor: {
      type: String,
      value: '#000000',
    },
    menuColor: {
      type: String,
      value: '#ffffff',
    },
    menuBgColor: {
      type: String,
      value: '#b9b9b9',
    },
    navBgColor: {
      type: String,
      value: '#ffffff',
    },
  },

  /* 组件的初始数据 */
  data: {
    navHeight: app.globalData.navHeight,
    menuWidth: app.globalData.menuWidth,
    menuHeight: app.globalData.menuHeight,
    menuTop: app.globalData.menuTop,
    menuRight: app.globalData.menuRight,
  },

  /* 组件的方法列表 */
  methods: {
    /* 返回上一级 */
    stepBack() {
      wx.navigateBack({
        delta: 1,
      });
    },
    /* 返回首页 */
    returnHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      });
    },
  },
});
