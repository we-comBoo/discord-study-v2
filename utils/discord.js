function isChannelToTrack(channelId) {
  // YOUR_VOICE_CHANNEL_ID
  const channelToTrack = process.env.VOICE_CHANNEL;

  return channelToTrack === channelId? true:false;
}

function isEventHappened(prev, curr) {
  const stateChanged = !(curr === prev);
  return stateChanged;
}

function setUserInfo(user){
 return {
    id: user.id,
    name: user.username,
    globalName: user.globalName,
  };


}

function setChannelInfo(prev, curr){
  return {
    new: isChannelToTrack(curr),
    old:isChannelToTrack(prev)
  }

}


function setEventState(state){
  return {
    selfDeaf: state.selfDeaf,
    selfMute: state.selfMute,
    selfVideo: state.selfVideo,
    streaming: state.streaming,
  };
}

module.exports = {
  isEventHappened,
  setUserInfo,
  setChannelInfo,
  setEventState,
};