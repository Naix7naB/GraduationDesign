// components/Dialog/Dialog.js
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
    catch() {
      /* 阻止事件冒泡 */
      return true;
    },
    show() {
      /* 显示弹窗 */
      this.setData({ visible: true });
    },
    hide() {
      /* 隐藏弹窗 */
      this.setData({ visible: false });
    },
    agree() {
      /* 点击登录 */
      this.triggerEvent('login');
    },
  },
});
