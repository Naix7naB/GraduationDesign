import storage from '../../utils/storage';

Component({
  /* 组件的选项配置 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  /* 组件的属性列表 */
  properties: {},

  /* 组件的初始数据 */
  data: {
    _top: 0,
    keyword: '',
    list: [],
  },

  /* 组件的方法列表 */
  methods: {
    /* 搜索学校 */
    onInput(e) {
      const keyword = e.detail.value.trim();
      if (!keyword) return;
      wx.cloud
        .callFunction({
          name: 'getSchool',
          data: {
            keyword: keyword,
          },
        })
        .then(({ result }) => {
          this.setData({ list: result.list });
        });
    },
    /* 清除输入 */
    onClear() {
      this.setData({ list: [] });
    },
    /* 选择学校 */
    onClick(e) {
      const { idx } = e.currentTarget.dataset;
      const school = this.data.list[idx];
      wx.showModal({
        content: `是否选择${school.name}`,
        success(res) {
          if (res.cancel) return;
          storage.setLocal('_school_', school);
          wx.reLaunch({
            url: '/pages/user/user',
          });
        },
      });
    },
  },

  /* 组件的方法列表 */
  lifetimes: {
    attached() {
      this.createSelectorQuery()
        .select('#search-bar')
        .boundingClientRect((res) => {
          this.setData({ _top: res.height });
        })
        .exec();
    },
  },
});
