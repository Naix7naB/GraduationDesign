Component({
  /* 组件的选项 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的初始数据 */
  data: {
    visible: false,
  },

  /* 组件的方法列表 */
  methods: {
    /* 阻止事件冒泡 */
    noop() {},
    /* 显示弹窗 */
    show() {
      this.setData({ visible: true });
    },
    /* 隐藏弹窗 */
    hide() {
      this.setData({ visible: false });
    },
    /* 点击登录 */
    agree() {
      this.triggerEvent('login');
    },
  },
});
