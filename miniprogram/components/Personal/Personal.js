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
    visible: false,
    files: [],
    tempFile: '',
    submitData: {},
    openId: app.globalData.openId,
  },

  /* store */
  storeBindings: {
    store,
    fields: ['userInfo'],
    actions: ['setUserInfo'],
  },

  /* 组件的方法列表 */
  methods: {
    /* 展示弹窗 */
    show() {
      this.setData({ visible: true });
    },
    /* 隐藏弹窗 */
    hide() {
      this.setData({ visible: false });
    },
    /* 取消选择图片 */
    onCancel() {
      this.hide();
      this.setData({ files: [] });
    },
    /* 确认选择图片 */
    onConfirm() {
      this.hide();
      const { url } = this.data.files[0];
      this.data.submitData.avatarUrl = url;
      this.setData({ tempFile: url });
    },
    /* 选择图片 */
    onSelect(e) {
      this.setData({ files: [{ url: e.detail.tempFilePaths[0] }] });
    },
    /* 修改单选框 */
    onChange(e) {
      const gender = e.detail.value / 1;
      this.data.submitData.gender = gender;
    },
    /* 提交修改 */
    onSubmit(e) {
      const { username, school } = e.detail.value;
      this.data.submitData.nickName = username;
      this.data.submitData.school = school;
      wx.cloud
        .callFunction({
          name: 'updateUserInfo',
          data: {
            openId: this.data.openId,
            ...this.data.submitData,
          },
        })
        .then(({ result }) => {
          if (!result.data) {
            wx.showToast({
              icon: 'none',
              title: '提交失败,请稍后再试',
            });
          } else {
            this.setUserInfo(result.data);
            wx.reLaunch({
              url: '/pages/user/user',
              success() {
                wx.showToast({
                  title: '提交成功',
                });
              },
            });
          }
        });
    },
  },
});
