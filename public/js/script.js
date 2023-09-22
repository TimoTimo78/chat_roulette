const videoContainer = document.getElementById("video-container");
const myVideo = document.createElement("video");
myVideo.muted = true;
const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "peerjs-server.herokuapp.com",
  secure: true,
  port: "443",
});

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then((stream) => {
    myVideo.srcObject = stream;
    myVideo.addEventListener("loadedmetadata", () => {
      myVideo.play();
    });
    videoContainer.append(myVideo);
  });

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

socket.on("user-connected", (userId) => {
  console.log("userId", userId);
});