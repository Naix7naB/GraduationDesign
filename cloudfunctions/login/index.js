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
      openId: event.openId,
    })
    .get();

  if (!res.data.length) {
    try {
      /* 新增用户信息 */
      const { _id } = await db.collection('user').add({
        data: {
          openId: event.openId,
          phone: event.phone,
          avatarUrl: event.avatarUrl,
          nickName: event.nickName,
          /* gender 0:未知 1:男性 2:女性 */
          gender: event.gender,
          school: '',
          point: 0,
          userType: 0,
          createTime: new Date(),
        },
      });
      /* 查询并返回用户信息 */
      const res = await db.collection('user').doc(_id).get();
      data = {
        phone: res.data.phone,
        avatarUrl: res.data.avatarUrl,
        nickName: res.data.nickName,
        gender: res.data.gender,
        school: res.data.school,
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
      phone: res.data[0].phone,
      avatarUrl: res.data[0].avatarUrl,
      nickName: res.data[0].nickName,
      gender: res.data[0].gender,
      school: res.data[0].school,
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
