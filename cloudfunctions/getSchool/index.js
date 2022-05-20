// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { data } = await db
    .collection('province')
    .field({
      schools: true,
    })
    .get();

  let result = [];
  const keyword = event.keyword;
  data.forEach((item) => {
    const list = item.schools.filter((school) => {
      const res = school.name.match(keyword);
      if (res !== null) {
        return res;
      }
    });
    if (list.length) {
      result.push(...list);
    }
  });

  return {
    list: result,
  };
};
