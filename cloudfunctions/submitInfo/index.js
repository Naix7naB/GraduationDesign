// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const data = {
    openId: event.openId,
    song: event.song,
    singer: event.singer,
    ordering: event.ordering,
    ordered: event.ordered,
    comment: event.comment,
    chooseDate: new Date(event.chooseDate),
    submitDate: new Date(event.submitDate),
  };

  const res = await db
    .collection('form')
    .where({ openId: _.eq(event.openId) })
    .get();

  let msg = '';
  let type = '';
  if (!res.data.length) {
    /* 该用户第一次点歌 数据库直接添加数据 */
    db.collection('form').add({ data: data });
    msg = '提交成功!';
    type = 'success';
  } else {
    const lastTime = res.data[res.data.length - 1].submitDate.getDate();
    const currentTime = data.submitDate.getDate();
    if (lastTime === currentTime) {
      /* 判断今天是否已经点过歌 */
      msg = '你今天已经点过歌了喔~';
      type = 'fail';
    } else {
      db.collection('form').add({ data: data });
      msg = '提交成功!';
      type = 'success';
    }
  }

  return { msg, type };
};
