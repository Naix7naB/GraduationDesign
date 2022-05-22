import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from '../../utils/store';
import { logout } from '../../service/login';
import storage from '../../utils/storage';

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
  data: {},

  /* store */
  storeBindings: {
    store,
    fields: ['isLogin', 'userInfo'],
    actions: ['setLoginState', 'setUserInfo'],
  },

  /* 组件的方法列表 */
  methods: {
    /* 打开权限设置 */
    openSetting() {
      wx.openSetting();
    },
    /* 退出登录 */
    logout() {
      storage.setLocal('_isLogout_', true);
      this.setLoginState(false);
      this.setUserInfo(null);
      logout().then(() => {
        wx.reLaunch({
          url: '/pages/index/index',
          success: () => {
            wx.showToast({
              icon: 'none',
              title: '您已退出登录',
            });
          },
        });
      });
    },
  },
});
