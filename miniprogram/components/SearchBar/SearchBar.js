Component({
  /* 组件的配置项 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {
    placeholder: {
      type: String,
      value: '请输入内容',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  /* 组件的初始数据 */
  data: {},

  /* 组件的方法列表 */
  methods: {
    input(e) {
      this.triggerEvent('search', { value: e.detail.value });
    },
  },
});
