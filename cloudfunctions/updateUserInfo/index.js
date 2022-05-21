// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const keys = Object.keys(event).filter((key) => key !== 'openId');
  const newData = {};
  keys.forEach((k) => (newData[k] = event[k]));

  const { stats } = await db
    .collection('user')
    .where({
      openId: event.openId,
    })
    .update({
      data: newData,
    });

  let msg, type, result;
  if (!stats.updated) {
    msg = '更新失败';
    type = 'fail';
    result = null;
  } else {
    msg = '更新成功';
    type = 'success';
    const { data } = await db
      .collection('user')
      .where({
        openId: event.openId,
      })
      .get();
    const { phone, avatarUrl, nickName, gender, school, point, userType } = data[0];
    result = { phone, avatarUrl, nickName, gender, school, point, userType };
  }

  return {
    msg,
    type,
    data: result,
  };
};
