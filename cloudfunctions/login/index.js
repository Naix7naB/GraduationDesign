// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let data, message, type;
  const res = await db
    .collection('user')
    .where({
      openid: event.openid,
    })
    .get();
  const temp = res.data;
  if (!temp.length) {
    try {
      const { _id } = await db.collection('user').add({
        data: {
          openid: event.openid,
          nickName: event.nickName,
          /* gender 0:未知 1:男性 2:女性 */
          gender: event.gender,
          avatarUrl: event.avatarUrl,
          point: 0,
          createTime: new Date(),
          isAdmin: 0,
        },
      });
      const res = await db.collection('user').doc(_id).get();
      data = {
        nickName: res.data.nickName,
        gender: res.data.gender,
        avatarUrl: res.data.avatarUrl,
        point: res.data.point,
      };
      type = 'success';
      message = '注册成功!';
    } catch (err) {
      type = 'fail';
      message = '注册失败!';
      console.error(err);
    }
  } else {
    data = {
      nickName: temp[0].nickName,
      gender: temp[0].gender,
      avatarUrl: temp[0].avatarUrl,
      point: temp[0].point,
    };
    type = 'success';
    message = '登录成功!';
  }

  return {
    data,
    type,
    message,
  };
};
