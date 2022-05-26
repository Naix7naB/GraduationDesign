import { getSearchResult } from '../../service/search';

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
        this.setData({ value: word });
        getSearchResult(word).then(({ result }) => {
          this.triggerEvent('setRes', { res: result.songs });
        });
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
    input(e) {
      const _value = e.detail.value.trim();
      this.setData({ value: _value });
      getSearchResult(_value).then(({ result }) => {
        if (!result) {
          this.triggerEvent('setRes', { res: null });
        } else {
          this.triggerEvent('setRes', { res: result.songs });
        }
      });
    },
    /* 清空输入内容 */
    claer() {
      this.setData({ value: '' });
      this.triggerEvent('setRes', { res: [] });
    },
  },
});
