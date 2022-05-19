Component({
  /* 组件的配置项 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 外部样式 */
  externalClasses: ['search-class', 'input-class'],

  /* 组件的属性列表 */
  properties: {
    searchWord: {
      type: String,
      value: '',
      observer(word) {
        this.input(word);
      },
    },
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
  data: {
    value: '',
  },

  /* 组件的方法列表 */
  methods: {
    /* 输入内容 */
    input(content) {
      let _value = '';
      if (typeof content === 'object') {
        _value = content.detail.value;
      } else {
        _value = content;
      }
      this.setData({ value: _value });
      this.triggerEvent('onInput', { value: _value });
    },
    /* 清空输入内容 */
    claer() {
      this.setData({ value: '' });
    },
  },
});
