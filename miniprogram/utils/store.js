import { observable, action } from 'mobx-miniprogram';

export const store = observable({
  // 数据字段 (state)
  isLogin: false,
  userInfo: null,
  musicInfo: null,
  playState: false,
  showPlayer: false,

  // 计算属性 (getters)
  get playIcon() {
    return this.playState ? 'pause' : 'play';
  },
  get scrollStyle() {
    return this.showPlayer ? 'height: calc(100vh - 260rpx);' : '';
  },

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
  /* 设置播放状态 */
  setPlayState: action(function (state) {
    this.playState = state;
  }),
  /* 设置是否显示播放器 */
  setShowPlayer: action(function (isShow) {
    this.showPlayer = isShow;
  }),
  /* 设置滚动区样式 */
  setScrollStyle: action(function (style) {
    this.scrollStyle = style;
  }),
});
