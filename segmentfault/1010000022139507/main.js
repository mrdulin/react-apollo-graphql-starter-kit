let timeContent = () => {
  let content = '';
  let nowDate = new Date();
  let nowDay = nowDate.getDay();
  let nowHours = nowDate.getHours();
  let nowMinutes = nowDate.getMinutes();
  let nowSeconds = nowDate.getSeconds();
  if (nowDay === 0 || nowDay === 6) {
    content = '距离周末还有0天';
  } else {
    content = `距离周末还有<span>${5 - nowDay}天${23 - nowHours}时${59 - nowMinutes}分${59 - nowSeconds}秒</span>`;
  }
  return content;
};

module.exports = timeContent;
