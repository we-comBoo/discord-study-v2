// const supabase = require("./supabase");

const { getTime } = require("../utils");

const userState = new Map();

function initUserState(userInfo, state) {
  //console.log(user)
  const { id, name, globalName } = userInfo;
  // Record the start time
  userState.set(id, {
    enter: getTime(),
    selfDeaf: {
      state: state.selfDeaf,
      time: state.selfDeaf ? null : getTime(),
    },
    selfMute: {
      state: state.selfMute,
      time: state.selfMute ? null : getTime(),
    },
    selfVideo: {
      state: state.selfVideo,
      time: state.selfVideo ? getTime() : null,
    },
    streaming: {
      state: state.streaming,
      time: state.streaming ? getTime() : null,
    },
  });
  console.log(`${id}:${name} joined`);
  // console.log(userState.get(id))


}


function endDuration(durationInfo) {
  durationInfo.endTime = new Date();
  durationInfo.totalDuration = Math.floor(
    (durationInfo.endTime.getTime() - durationInfo.startTime.getTime()) / 1000
  );
}

async function saveDuration(dsUId, dsGlobalName, dsTag, start, end, duration) {
  // Save the duration to the Superbase database

  try {
    const { data, error, status } = await supabase
      .from("user")
      .insert({ dsUId, dsGlobalName, dsTag, start, end, duration });

    if (error) {
      console.log(error);
    } else {
      console.log(data, status);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  initUserState,
  userState,
};
