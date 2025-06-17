import AgoraRTC from "agora-rtc-sdk-ng";

// Replace with your Agora App ID and temporary token
const appId = "ba7ffa9c13fd47e5ae15d0c0d80ae9d5";
const channel = "test"; // Name of your channel
const token = '007eJxTYDirp17NEu186MSLvNjCFxsCxAxXnBF+3XGMiUNgb8j8yl0KDEmJ5mlpiZbJhsZpKSbmqaaJqYamKQbJBikWBomplimm2VsCMxoCGRn03omxMjJAIIjPwlCSWlzCwAAAMm0fQg=='
const uid = null;

let client;
let localAudioTrack;

async function initializeClient() {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  setupEventListeners();
}

async function joinChannel() {
  try {
    await client.join(appId, channel, token, uid);
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([localAudioTrack]);
    console.log("Joined and published audio");
  } catch (error) {
    console.error("Error joining channel:", error);
  }
}

async function leaveChannel() {
  try {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
      localAudioTrack = null;
    }
    await client.leave();
    console.log("Left the channel");
  } catch (error) {
    console.error("Error leaving channel:", error);
  }
}

function setupEventListeners() {
  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "audio") {
      user.audioTrack.play();
      console.log("Playing remote audio");
    }
  });

  client.on("user-unpublished", (user) => {
    console.log("User unpublished:", user.uid);
  });
}

document.getElementById("join").onclick = async () => {
  await initializeClient();
  await joinChannel();
};

document.getElementById("leave").onclick = async () => {
  await leaveChannel();
};
