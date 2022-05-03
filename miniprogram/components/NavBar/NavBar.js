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
    titleColor: String,
    menuColor: String,
    menuBgColor: String,
    navBgColor: String,
  },

  /* 组件的初始数据 */
  data: {
    navStyle: `height:${app.globalData.navHeight}px;`,
    titleStyle: `line-height:${app.globalData.menuHeight}px;margin-top:${app.globalData.menuTop}px;`,
    menuStyle: `width:${app.globalData.menuWidth}px;height:${app.globalData.menuHeight}px;top:${app.globalData.menuTop}px;left:${app.globalData.menuRight}px;`,
    menuBtnStyle: '',
  },

  /* 组件的数据监视 */
  observers: {
    navBgColor(newVal) {
      const navStyle = this.data.navStyle + `background:${newVal}`;
      this.setData({ navStyle });
    },
    titleColor(newVal) {
      const titleStyle = this.data.titleStyle + `color:${newVal}`;
      this.setData({ titleStyle });
    },
    'menuColor, menuBgColor': function (newColor, newBgColor) {
      let menuBtnStyle = this.data.menuBtnStyle;
      if (newColor) {
        menuBtnStyle += `color:${newColor};`
      }
      if (newBgColor) {
        menuBtnStyle += `background:${newBgColor};`
      }
      this.setData({ menuBtnStyle });
    },
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
