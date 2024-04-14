const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});



const {
  initUserState,
  // endDuration,
  userState,
  // saveDuration,
} = require("./duration");

client.once("ready", () => {
  console.log("Bot is ready!");
});


function isChannelToTrack(channelId){
  // YOUR_VOICE_CHANNEL_ID
  const channelToTrack = process.env.VOICE_CHANNEL;
  if(channelToTrack===channelId){
    return true
  }
  else{
    return false
  }

}



function checkJoinLeft(user, oldState, newState){

    if (user && newState.channelId === channelToTrack) {
      // 이벤트 발생이 최초로 입장한 유저의 경우
      if (userDurations.has(user.id) === false) {
        // User joined the specified voice channel
        console.log(
          `${user.user.tag} joined ${newState.channel?.name}: ${new Date()}`
        );
        startDuration(user.id);
      }
    } else if (
      user &&
      oldState.channelId === channelToTrack &&
      newState.channel === null
    ) {
      // User left the specified voice channel

      const {
        id: userUId,
        tag: userTag,
        globalName: userGlobalName,
      } = user.user;
      console.log(
        `${userGlobalName} left ${oldState.channel?.name}: ${new Date()}`
      );

      if (userDurations.has(userUId)) {
        const userDurationInfo = userDurations.get(userUId);
        endDuration(userDurationInfo);
        const { startTime, endTime, totalDuration } = userDurationInfo;
        console.log(
          `${userUId} left ${userGlobalName}: ${totalDuration} need to be saved on DB`
        );

        /*saveDuration(
        userUId,
        userGlobalName,
        userTag,
        startTime,
        endTime,
        totalDuration
      );*/

        // Remove the user from the tracking map
        userDurations.delete(user.id);
      }
    }

}

client.on("voiceStateUpdate", (oldState, newState) => {
  const user = newState.member.user;



  if (user && oldState && newState) {
    const userInfo = {
      id: user.id,
      name: user.username,
      globalName: user.globalName,
    };
    const newChannel = newState.channelId;
    const oldChannel = oldState.channelId;
    const newState_ = {
      selfDeaf: newState.selfDeaf,
      selfMute: newState.selfMute,
      selfVideo: newState.selfVideo,
      streaming: newState.streaming,
    };
    const oldState_ = {
      selfDeaf: oldState.selfDeaf,
      selfMute: oldState.selfMute,
      selfVideo: oldState.selfVideo,
      streaming: oldState.streaming,
    };
    // 추적하는 채널 내에서 이벤트 발생한 경우
    if (isChannelToTrack(newChannel)) {
      // 처음 입장한 경우
      if (!userState.has(userInfo.id)) {
        initUserState(userInfo, newState_);
      } else {
        // 기타 마이크, 화면 공유, 이어폰 해제, 소리 끄기 이벤트 발생 여부 확인
      }
    }
    else{
      if(isChannelToTrack(oldChannel) && userState.has(user.id)){
        console.log("퇴장 처리")
         userState.delete(userInfo.id);
      }
      else{
        console.log("그냥 다른 채널에서 발생한 일")
      }
    }
  }



  // checkJoinLeft(user, oldState, newState);
  


});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.log(error);
  process.exit(1);
});

module.exports = client;
