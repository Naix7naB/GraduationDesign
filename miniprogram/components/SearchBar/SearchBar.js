import { getSearchResult } from '../../service/search';
import { getMusicDetail } from '../../service/toplist';

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
        this.searchMusic(word).then((res) => {
          this.triggerEvent('setRes', { res });
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
      this.searchMusic(_value).then((res) => {
        this.triggerEvent('setRes', { res });
      });
    },
    /* 清空输入内容 */
    claer() {
      this.setData({ value: '' });
      this.triggerEvent('setRes', { res: [] });
    },
    /* 搜索歌曲 */
    searchMusic(word) {
      return new Promise((resolve) => {
        if (!word) return resolve(null);
        getSearchResult(word).then(async ({ result }) => {
          const { songs } = await getMusicDetail(result.songs);
          resolve(songs);
        });
      });
    },
  },
});
