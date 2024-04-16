const dayjs = require("dayjs");
require("dayjs/locale/ko");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const duration = require("dayjs/plugin/duration");

dayjs.locale("kor");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration)
dayjs.tz.setDefault("Asia/Seoul");

module.exports = dayjs;
