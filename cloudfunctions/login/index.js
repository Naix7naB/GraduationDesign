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

  if (!res.data.length) {
    try {
      /* 新增用户信息 */
      const { _id } = await db.collection('user').add({
        data: {
          openid: event.openid,
          nickName: event.nickName,
          /* gender 0:未知 1:男性 2:女性 */
          gender: event.gender,
          avatarUrl: event.avatarUrl,
          point: 0,
          createTime: new Date(),
          userType: 0,
        },
      });
      /* 查询并返回用户信息 */
      const res = await db.collection('user').doc(_id).get();
      data = {
        nickName: res.data.nickName,
        gender: res.data.gender,
        avatarUrl: res.data.avatarUrl,
        point: res.data.point,
        userType: res.data.userType,
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
      nickName: res.data[0].nickName,
      gender: res.data[0].gender,
      avatarUrl: res.data[0].avatarUrl,
      point: res.data[0].point,
      userType: res.data[0].userType,
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
