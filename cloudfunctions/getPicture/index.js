// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const fileID = `cloud://naixnab-5g2whrh799a6162e.6e61-naixnab-5g2whrh799a6162e-1311602487/images/${event.name}.png`;

  const { fileContent } = await cloud.downloadFile({ fileID });

  return {
    buffer: fileContent,
  };
};
