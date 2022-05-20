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
    /* 显示弹窗 */
    show() {
      this.setData({ visible: true });
    },
    /* 隐藏弹窗 */
    hide() {
      this.setData({ visible: false });
    },
    /* 点击取消 */
    onCancel() {
      this.triggerEvent('cancel');
    },
    /* 点击确认 */
    onConfirm() {
      this.triggerEvent('confirm');
    },
    /* 阻止事件冒泡 */
    noop() {},
  },
});
