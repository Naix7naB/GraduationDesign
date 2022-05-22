// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { data } = await db
    .collection('form')
    .where({
      openId: event.openId,
    })
    .get();

  const list = data.map((item) => {
    const { _id, done, song, singer, ordering, ordered, comment, chooseDate } = item;
    return { _id, done, song, singer, ordering, ordered, comment, chooseDate };
  });

  return {
    list: list,
  };
};
