const dayjs = require("./dayjs")

function getTime() {
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
  return now;
}


function getDuration(start, end){
  const startTime = dayjs(start)
  const endTime = dayjs(end)
  const diff = endTime.diff(startTime, "second");
  return diff;
}


module.exports = {
  getTime,
  getDuration
};
