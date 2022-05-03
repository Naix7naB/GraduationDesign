// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { data } = await db
    .collection('user')
    .where({
      openid: event.openid,
    })
    .get();

  let type, msg, result;
  if (!data.length) {
    msg = '用户未注册';
    type = 'fail';
    result = null;
  } else {
    msg = '查询成功';
    type = 'success';
    const { avatarUrl, nickName, gender, point } = data[0];
    result = { avatarUrl, nickName, gender, point };
  }

  return {
    msg,
    type,
    userInfo: result,
  };
};
