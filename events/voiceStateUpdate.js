const { initUserState, userState } = require("../model/userState");

const {
  isEventHappened,
  setUserInfo,
  setChannelInfo,
  setEventState,
  getTime,
  getDuration,
} = require("../utils");


function voiceStateUpdate(oldState, newState){
 const {
   member: { user },
 } = newState;
 if (!user || !oldState || !newState) return;

      const userInfo = setUserInfo(user);

      const channelInfo = setChannelInfo(
        oldState.channelId,
        newState.channelId
      );
      const newState_ = setEventState(newState);
      const oldState_ = setEventState(oldState);

/*
  if (user && channelInfo.new) {


    if (!userState.has(userInfo.id)) {
      initUserState(userInfo, newState_);
      console.log(userState.get(userInfo.id));
    } else {
      const { selfDeaf, selfMute, selfVideo, streaming } = userState.get(
        userInfo.id
      );
      handleEventStateChange(
        newState_.selfDeaf,
        oldState_.selfDeaf,
        selfDeaf,
        "selfDeaf"
      );
      handleEventStateChange(
        newState_.selfMute,
        oldState_.selfMute,
        selfMute,
        "selfMute 발생"
      );
      handleEventStateChange(
        newState_.selfVideo,
        oldState_.selfVideo,
        selfVideo,
        "selfVideo"
      );
      handleEventStateChange(
        newState_.streaming,
        oldState_.streaming,
        streaming,
        "streaming"
      );
      console.log("이벤트 처리 완료", userState.get(userInfo.id));
    }
  } else if (channelInfo.old && userState.has(userInfo.id)) {
    console.log("퇴장 처리~~~");
    userState.delete(userInfo.id);
  } else {
    console.log("그냥 다른 채널에서 발생한 일");
  }*/

    // 추적하는 채널 내에서 이벤트 발생한 경우
    if (user && channelInfo.new) {
      // 처음 입장한 경우
      if (!userState.has(userInfo.id)) {
        initUserState(userInfo, newState_);
        console.log(userState.get(userInfo.id));
      } else {
        const { selfDeaf, selfMute, selfVideo, streaming } = userState.get(
          userInfo.id
        );
        //console.log("이벤트 발생 전", userState.get(userInfo.id))
        // 기타 마이크, 화면 공유, 이어폰 해제, 소리 끄기 이벤트 발생 여부 확인

        if (isEventHappened(newState_.selfDeaf, oldState_.selfDeaf)) {
          // 이어폰
          if (oldState_.selfDeaf) {
            // 꺼짐 => 켜짐
            selfDeaf.time = getTime();
          } else {
            // 켜짐 => 꺼짐
            console.log(
              "self Deaf 발생: 이어폰 DB 저장 필요",
              getDuration(selfDeaf.time, getTime())
            );
            selfDeaf.time = null;
          }
          selfDeaf.state = newState_.selfDeaf;
          console.log("self Deaf 발생: 이어폰");
        }
        if (isEventHappened(newState_.selfMute, oldState_.selfMute)) {
          // 마이크
          if (oldState_.selfMute) {
            // 꺼짐 => 켜짐
            selfMute.time = getTime();
          } else {
            // 켜짐 => 꺼짐
            console.log(
              "self Mute 발생: 마이크 DB 저장 필요",
              getDuration(selfMute.time, getTime())
            );
            selfMute.time = null;
          }
          selfMute.state = newState_.selfMute;
          console.log("self Mute 발생: 마이크");
        }
        if (isEventHappened(newState_.selfVideo, oldState_.selfVideo)) {
          // 카메라

          if (newState_.selfVideo) {
            // 꺼짐 -> 켜짐
            selfVideo.time = getTime();
          } else {
            // 켜짐 -> 꺼짐
            console.log(
              "self Video 발생: 카메라 DB 저장 필요",
              getDuration(selfVideo.time, getTime())
            );
            selfVideo.time = null;
          }
          selfVideo.state = newState_.selfVideo;
          console.log("self Video 발생 : 카메라");
        }
        if (isEventHappened(newState_.streaming, oldState_.streaming)) {
          // 화면 공유

          if (newState_.streaming) {
            streaming.time = getTime();
          } else {
            console.log(
              "streaming 발생: 화면 공유 DB 저장 필요",
              getDuration(streaming.time, getTime())
            );
            streaming.time = null;
          }
          console.log("streaming 발생: 화면 공유");
          streaming.state = newState_.streaming;
        }
        console.log("이벤트 처리 완료", userState.get(userInfo.id));
      }
    } else {
      // console.log(oldChannelTrack, userState.has(user.id))
      if (channelInfo.old && userState.has(user.id)) {
        console.log("퇴장 처리~~~");
        userState.delete(userInfo.id);
      } else {
        console.log("그냥 다른 채널에서 발생한 일");
      }
    }

    // checkJoinLeft(user, oldState, newState);
  

  
}


function handleEventStateChange(newState, oldState, state, type) {
 if (isEventHappened(newState, oldState)) {

    if(newState){
    const duration = getDuration(state.time, getTime());
    console.log(
      `${type}: ${state.state ? "켜짐" : "꺼짐"}, DB 저장 필요`,
      duration
    );
    }

    state.time = state.state ? getTime() : null;
    state.state = newState;
 }
}

module.exports = {
  voiceStateUpdate,
};
