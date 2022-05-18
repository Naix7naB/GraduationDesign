Component({
  /* 组件的选项配置 */
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  externalClasses: ['custom-class'],

  /* 组件的属性列表 */
  properties: {
    list: {
      type: Object,
      value: null,
      observer(newVal) {
        let title = '';
        switch (newVal.title) {
          case '飙升榜':
            title = '飙升歌曲';
            break;
          case '热歌榜':
            title = '热门推荐';
            break;
          case '云音乐说唱榜':
            title = '说唱推荐';
            break;
          case '云音乐欧美热歌榜':
            title = '欧美歌曲';
            break;
          case '云音乐古风榜':
            title = '悠韵古风';
            break;
        }
        const { songs } = newVal;
        const _list_ = [];
        for (let i = 0; i < 4; i++) {
          let start = 3 * i,
            step = 3 * (i + 1);
          if (songs.slice(start, step).length < 3) break;
          _list_.push(songs.slice(start, step));
        }
        this.setData({
          title,
          musicList: _list_,
        });
      },
    },
  },

  /* 组件的初始数据 */
  data: {
    title: '',
    musicList: [],
  },

  /* 组件的方法列表 */
  methods: {
    /* 点击歌曲 */
    onTap(e) {
      const { item, song } = e.mark;
      this.triggerEvent('selectItem', {
        item: this.data.musicList[item][song],
      });
    },
  },
});
