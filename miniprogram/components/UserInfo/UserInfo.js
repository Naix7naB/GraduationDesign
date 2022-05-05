Component({
  /* 组件的选项 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {
    isLogin: Boolean,
    userInfo: null,
  },

  /* 组件的初始数据 */
  data: {},

  /* 组件的方法列表 */
  methods: {
    onTap() {
      this.triggerEvent('tapEvent');
    },
  },
});