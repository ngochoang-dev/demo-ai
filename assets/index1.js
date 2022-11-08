$(document).ready(function () {
  // Grab elements, create settings, etc.
  // var video = document.getElementById('video');

  // // Get access to the camera!
  // if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     // Not adding `{ audio: true }` since we only want video now
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  //         //video.src = window.URL.createObjectURL(stream);
  //         video.srcObject = stream;
  //         video.play();
  //     });
  // }

  // $('#snap').click(function() {
  //     var canvas = document.getElementById("canvas");
  //     var video = document.querySelector("video");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  //     // send msg here

  //     // canvas.toDataURL()
  // })

  var socket = io();

  setTimeout(function () {
    doSendMsg();
  }, 2000);

  socket.on("recivemsg", function (sss) {
    //todo drag anh tai day
    console.log(sss);
    $("#aiimage").attr("src", sss);
    //doSendMsg()
  });

  function doSendMsg() {
    var canvas = document.getElementById("canvas");
    var video = document.querySelector("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("preview");
    ctx.drawImage(img, 100, 100);
    // socket.emit("sendmsg", c.toDataURL());
    // thay vì gửi ảnh fix thì phải gửi ảnh camera gửi lên
    //socket.emit("sendmsg", canvas.toDataURL());
  }
}); /* END ready*/
