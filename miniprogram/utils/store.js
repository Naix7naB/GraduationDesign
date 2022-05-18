import { observable, action } from 'mobx-miniprogram';

export const store = observable({
  // 数据字段 (state)
  isLogin: false,
  userInfo: null,
  musicInfo: null,
  scrollStyle: '',

  // 计算属性 (getters)
  // get sum() {
  //   return this.numA + this.numB;
  // },

  // actions (mutations)
  /* 设置登录状态 */
  setLoginState: action(function (state) {
    this.isLogin = state;
  }),
  /* 设置用户信息 */
  setUserInfo: action(function (info) {
    this.userInfo = info;
  }),
  /* 设置歌曲详细信息 */
  setMusicInfo: action(function (info) {
    this.musicInfo = info;
  }),
  /* 设置滚动区范围 */
  setScrollStyle: action(function (style) {
    this.scrollStyle = style;
  }),
});
