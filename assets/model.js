const setUpCamera = () => {
  const videoElm = $("#video");
  console.log(videoElm);
  return new Promise((resolve, reject) => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          video: true,
        },
        (stream) => {
          console.log(stream);
          videoElm.srcObject = stream;
        },
        (error) => reject(error)
      );
    } else {
      reject();
    }
  });
};

async function start() {
  await setUpCamera();
}

start();
