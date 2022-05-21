import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';

const app = getApp();

Component({
  behaviors: [storeBindingsBehavior],

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
    openId: app.globalData.openId,
  },

  /* store */
  storeBindings: {
    store,
    actions: ['setUserInfo'],
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
      /* 确认弹窗 */
      wx.showModal({
        content: `是否选择${school.name}`,
        success: (res) => {
          if (res.cancel) return;
          /* 更新数据库信息 */
          wx.cloud
            .callFunction({
              name: 'updateUserInfo',
              data: {
                openId: this.data.openId,
                school: school.name,
              },
            })
            .then(({ result }) => {
              if (!result.data) {
                wx.showToast({
                  icon: 'none',
                  title: '选择失败',
                });
              } else {
                /* 更新本地信息 */
                this.setUserInfo(result.data);
                wx.reLaunch({
                  url: '/pages/user/user',
                  success() {
                    wx.showToast({
                      title: '选择成功',
                    });
                  },
                });
              }
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
