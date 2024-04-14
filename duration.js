// const supabase = require("./supabase");

const userState = new Map();

function initUserState(userInfo, state) {
  //console.log(user)
  const { id, name, globalName } = userInfo;
  // Record the start time
  userState.set(id, {
    enter: new Date(),
...state
  });
  // console.log(`${id}:${name} joined`);
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
  // endDuration,
  // saveDuration,
  userState,
};
